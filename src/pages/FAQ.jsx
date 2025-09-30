import React, { useState } from "react";
import "../styles/FAQ.css";

const QUESTIONS = [
  {
    q: "What sizes do your panels come in?",
    a: "Standard widths are 1220mm, 1250mm, and 1500mm. Lengths up to 6000mm are available, and custom sizes can be arranged."
  },
  {
    q: "Do you supply fire-rated ACP?",
    a: "Yes. We offer FR (Fire-Rated) panels with mineral-filled cores tested to international standards."
  },
  {
    q: "How long is delivery lead time?",
    a: "Typically 2–3 weeks for standard stock. Custom colors and finishes may take 4–6 weeks depending on quantity."
  },
  {
    q: "Can I order color-matched finishes?",
    a: "Absolutely. We provide custom RAL and Pantone color matching for large projects."
  },
  {
    q: "Do you provide installation services?",
    a: "We primarily supply panels and systems. Installation can be arranged through our certified contractor network."
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  return (
    <section className="section">
      <div className="container">
        <header className="faq__header">
          <h1 className="section-heading">Frequently Asked Questions</h1>
          <p className="section-sub">
            Quick answers to common questions about our products, finishes, and support.
          </p>
        </header>

        <div className="faqList">
          {QUESTIONS.map((item, i) => (
            <div key={i} className={`faqItem ${open === i ? "faqItem--open" : ""}`}>
              <button
                className="faqQ"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                {item.q}
                <span className="faqIcon">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <div className="faqA">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
