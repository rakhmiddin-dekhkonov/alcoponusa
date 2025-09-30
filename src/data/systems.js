// src/data/systems.js
import rs45 from "../assets/systems/RS-45.png";
import vs50 from "../assets/systems/VS-50.png";

const systems = [
  {
    id: "rs-45",
    slug: "rs-45",
    name: "RS-45 System",
    tagline:
      "Lightweight rainscreen system with exposed and invisible fastening options.",
    description:
      "ALCOPON has developed a lightweight rainscreen system RS-45 that offers two solutions: aluminum composite cassettes with exposed and invisible fastening. Specially designed extrusion profiles significantly reduce assembly time. This system offers versatile combinations with any ALCOPON composite panels, enabling complex architectural solutions from classic to ultra-modern.",
    images: [rs45],
  },
  {
    id: "vs-50",
    slug: "vs-50",
    name: "VS-50 System",
    tagline:
      "Ventilated façade system designed to improve building energy efficiency.",
    description:
      "VS-50 is a ventilated system designed to improve energy efficiency. Its double thermal bridge reduces heat transfer and prevents dampness. The air gap between wall and decorative panel increases system efficiency. It reduces material usage, saving construction costs, and its lightweight design allows installation on high-rise buildings.",
    images: [vs50],
  },
];

export default systems;
