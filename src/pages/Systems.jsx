import React from "react";
import { Link } from "react-router-dom";
import systems from "../data/systems.js";
import "../styles/Systems.css";

export default function Systems() {
  return (
    <section className="section">
      <div className="container">
        <header className="prod__header">
          <div className="header__content">
            <h1 className="section-heading">
              <span className="heading__text">Systems</span>
              <span className="heading__accent"></span>
            </h1>
            <p className="section-sub">
              Explore our rainscreen and ventilated façade systems.
            </p>
          </div>
        </header>

        <div className="systemRows">
          {systems.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.id}
                className={`systemRow ${reverse ? "systemRow--reverse" : ""}`}
              >
                <div className="systemRow__text">
                  <h3>{s.name}</h3>
                  <p>{s.tagline}</p>
                  <Link to={`/system/${s.slug}`} className="btn btn--outline">Learn more</Link>
                </div>
                <div className="systemRow__media">
                  <img src={s.images[0]} alt={s.name} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
