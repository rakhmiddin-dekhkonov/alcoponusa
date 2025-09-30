// src/hooks/useReveal.js
import { useEffect } from "react";

export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");

    // Use rAF to avoid jank when lots of entries fire at once
    let rafId = 0;
    const schedule = (fn) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(fn);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        schedule(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            } else {
              entry.target.classList.remove("visible");
            }
          });
        });
      },
      {
        threshold: 0.15,          // reveal when ~15% visible
        rootMargin: "0px 0px -8% 0px",
      }
    );

    els.forEach((el) => observer.observe(el));

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);
}
