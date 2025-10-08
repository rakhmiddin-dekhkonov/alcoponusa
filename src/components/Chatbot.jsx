// src/components/Chatbot.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  FaComments,
  FaPaperPlane,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import "../styles/Chatbot.css";

/**
 * ⚠️ Frontend-only prototype.
 * Your API key will be exposed in the browser. For production, proxy via a backend.
 */

const GEMINI_MODEL = "gemini-2.5-flash"; // current, fast & affordable

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I’m Alcopon Assistant. Ask me about products, finishes, systems, or anything on this site.",
      ts: Date.now(),
    },
  ]);

  const listRef = useRef(null);
  const genAIRef = useRef(null);
  const chatRef = useRef(null);

  // Read API key (supports both CRA and Vite)
  useEffect(() => {
    const key =
      (typeof import.meta !== "undefined" &&
        import.meta?.env?.VITE_GEMINI_API_KEY) ||
      process.env.REACT_APP_GEMINI_API_KEY;

    if (!key) {
      // eslint-disable-next-line no-console
      console.error(
        "Missing API key. Set VITE_GEMINI_API_KEY (Vite) or REACT_APP_GEMINI_API_KEY (CRA) in your .env and restart."
      );
      return;
    }
    genAIRef.current = new GoogleGenerativeAI(key);
  }, []);

  // Auto-scroll to bottom on new messages or state changes
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open, minimized, isSending]);

  // Close with ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Restore open/minimized state
  useEffect(() => {
    const saved = localStorage.getItem("alcopon_chatbot_state");
    if (saved) {
      const { open: o, minimized: m } = JSON.parse(saved);
      setOpen(!!o);
      setMinimized(!!m);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "alcopon_chatbot_state",
      JSON.stringify({ open, minimized })
    );
  }, [open, minimized]);

  // Build Gemini history that ALWAYS starts with a user turn
  function toGeminiHistory(msgs) {
    // Find the first user message; history must begin with 'user'
    const firstUserIdx = msgs.findIndex(
      (m) => m.role === "user" && m.content?.trim()
    );
    if (firstUserIdx === -1) return []; // No user messages yet

    const sliced = msgs.slice(firstUserIdx);
    const history = [];
    for (const m of sliced) {
      if (!m?.content?.trim()) continue;
      if (m.role === "user") {
        history.push({ role: "user", parts: [{ text: m.content }] });
      } else if (m.role === "assistant") {
        history.push({ role: "model", parts: [{ text: m.content }] });
      }
    }
    return history;
  }

  async function handleSend(e) {
    e?.preventDefault();

    const text = input.trim();
    if (!text || isSending) return;

    setInput("");
    const userMsg = { role: "user", content: text, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);

    try {
      setIsSending(true);

      if (!genAIRef.current) {
        throw new Error(
          "Gemini client not initialized. Check your API key / .env and restart dev server."
        );
      }

      // Trim history to avoid long contexts during dev
      const MAX_TURNS = 16;
      const trimmed = [...messages, userMsg].slice(-MAX_TURNS);

      const model = genAIRef.current.getGenerativeModel({
        model: GEMINI_MODEL,
        // Put instructions here instead of seeding a 'model' turn in history
        systemInstruction: {
          text:
            "You are Alcopon Assistant — concise, helpful, and on-brand. " +
            "Help with products, finishes, systems, installation, and site navigation. " +
            "If unsure, ask for clarification or direct the user to the Contact page.",
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
        generationConfig: {
          temperature: 0.6,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 512,
        },
      });

      const history = toGeminiHistory(trimmed);
      chatRef.current = model.startChat({ history });

      const result = await chatRef.current.sendMessage(text);
      const replyText = (await result.response.text())?.trim() || "…";

      const reply = { role: "assistant", content: replyText, ts: Date.now() };
      setMessages((m) => [...m, reply]);
    } catch (err) {
      // Verbose error surfacing
      let msg = "Couldn’t reach Gemini.";
      try {
        if (err?.message) msg += ` ${err.message}`;
        const detail =
          err?.cause || err?.response || err?.error || err || "(no details)";
        // eslint-disable-next-line no-console
        console.error("Gemini error detail:", detail);
      } catch {
        // ignore
      }
      const fallback = {
        role: "assistant",
        content: `${msg} Check API key, model access, network, or console for details.`,
        ts: Date.now(),
      };
      setMessages((m) => [...m, fallback]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          aria-label="Open chat"
          className="alc-chat-fab"
          onClick={() => {
            setOpen(true);
            setMinimized(false);
          }}
        >
          <FaComments />
        </button>
      )}

      {open && (
        <section
          className={`alc-chat ${minimized ? "alc-chat--min" : ""}`}
          aria-live="polite"
        >
          <header className="alc-chat__header">
            <div className="alc-chat__title">
              <span className="alc-chat__dot" />
              Alcopon Assistant
            </div>
            <div className="alc-chat__actions">
              <button
                className="alc-icon-btn"
                aria-label={minimized ? "Expand chat" : "Minimize chat"}
                onClick={() => setMinimized((m) => !m)}
                title={minimized ? "Expand" : "Minimize"}
              >
                <FaChevronDown
                  style={{ transform: minimized ? "rotate(180deg)" : "none" }}
                />
              </button>
              <button
                className="alc-icon-btn"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                title="Close"
              >
                <FaTimes />
              </button>
            </div>
          </header>

          {!minimized && (
            <>
              <div ref={listRef} className="alc-chat__messages">
                {messages.map((m, i) => (
                  <div
                    key={m.ts + "-" + i}
                    className={`alc-msg alc-msg--${m.role}`}
                  >
                    <div className="alc-msg__bubble">
                      {m.content}
                      {i === messages.length - 1 &&
                      isSending &&
                      m.role === "user" ? (
                        <span className="alc-typing"> …</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              <form className="alc-chat__input" onSubmit={handleSend}>
                <input
                  type="text"
                  placeholder="Type your message…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  aria-label="Message"
                  disabled={isSending}
                />
                <button
                  className="alc-send-btn"
                  aria-label="Send"
                  disabled={isSending || !input.trim()}
                >
                  <FaPaperPlane />
                </button>
              </form>
            </>
          )}
        </section>
      )}
    </>
  );
}
