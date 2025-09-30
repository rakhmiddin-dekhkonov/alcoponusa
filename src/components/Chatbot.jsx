import React, { useEffect, useRef, useState } from "react";
import {
  FaComments,
  FaPaperPlane,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import "../styles/Chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I’m Alcopon Assistant. Ask me about products, finishes, systems, or anything on this site.",
      ts: Date.now(),
    },
  ]);
  const listRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open, minimized]);

  // Close with ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Optional: persist open/minimized state
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

  async function handleSend(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    const userMsg = { role: "user", content: text, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);

    // --- Replace this with your real API call if you have one ---
    // Example: await callChatApi(text)
    const reply = await fakeReply(text);
    setMessages((m) => [...m, reply]);
  }

  // Example fetch you can wire to your backend later:
  async function callChatApi(prompt) {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      return {
        role: "assistant",
        content: data.reply ?? "I couldn't fetch a reply.",
        ts: Date.now(),
      };
    } catch {
      return {
        role: "assistant",
        content:
          "Hmm, I couldn't reach the server. Please try again in a moment.",
        ts: Date.now(),
      };
    }
  }

  // Temporary local reply (remove once API is connected)
  function fakeReply(text) {
    return new Promise((resolve) =>
      setTimeout(() => {
        let canned =
          "Thanks! I’ll route that to our team. Meanwhile you can check the Catalog and Systems pages.";
        if (/finish|color|colour|sample/i.test(text))
          canned =
            "For finishes & samples, open “Finishes” → pick a finish → click “Request Sample.”";
        if (/system|panel|spec|thick|core/i.test(text))
          canned =
            "Panel systems & specs are under “Systems.” Click a system to view core, thickness, and installation details.";
        if (/contact|email|phone|support/i.test(text))
          canned = "You can reach us on the Contact page — we’ll get back fast.";
        resolve({ role: "assistant", content: canned, ts: Date.now() });
      }, 600)
    );
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
                    <div className="alc-msg__bubble">{m.content}</div>
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
                />
                <button className="alc-send-btn" aria-label="Send">
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
