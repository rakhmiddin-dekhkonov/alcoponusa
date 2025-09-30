// src/data/products.js
import nonfr1 from "../assets/products/non-fr-1.jpg";
import nonfr2 from "../assets/products/non-fr-2.jpg";
import b1_1 from "../assets/products/b1-1.jpg";
import b1_2 from "../assets/products/b1-2.png";
import a2_1 from "../assets/products/a2-1.jpg";
import print1 from "../assets/products/dp-1.jpg";
import print2 from "../assets/products/dp-2.jpg";
import fa_1 from "../assets/products/fa-1.jpg";
import fa_2 from "../assets/products/fa-2.jpg";

const products = [
  {
    id: "non-fr",
    slug: "non-fr",
    name: "NON-FR PANELS",
    series: "NON-FR",
    tagline:
      "Non-FR aluminum composite panels for general purposes where fire-rated materials are not required.",
    description:
      "Engineered for cost-effective performance and smooth flatness in signage and general cladding where fire-rating is not specified.",
    images: [nonfr1, nonfr2],
    specs: {
      Thickness: '4 mm (0.157") ±0.2 mm',
      "Standard Size": "4’×8’ (1220×2438 mm)",
      Width: 'Up to 62" ±0.02"',
      Length: 'Up to 236" ±0.02"',
      Core: "PE",
    },
  },
  {
    id: "b1-fr",
    slug: "b1-fr",
    name: "B1, FR PANELS",
    series: "B1",
    tagline:
      "B1, FR (fire-retardant) aluminum composite panels that meet building code requirements.",
    description:
      "Balanced fire performance and finish quality for projects requiring a B1 FR rating.",
    images: [b1_1, b1_2],
    specs: {
      Thickness: '4 mm (0.157") ±0.2 mm',
      "Standard Size": "4’×8’ (1220×2438 mm)",
      Width: 'Up to 62" ±0.02"',
      Length: 'Up to 236" ±0.02"',
      Core: "MINERAL",
    },
  },
  {
    id: "a2",
    slug: "a2",
    name: "A2 PANELS",
    series: "A2",
    tagline: "High-performance panels with non-combustible materials.",
    description:
      "Designed for the strictest fire safety scenarios without compromising aesthetics and fabricability.",
    images: [a2_1],
    specs: {
      Thickness: '4 mm (0.157") ±0.2 mm',
      "Standard Size": "4’×8’ (1220×2438 mm)",
      Width: 'Up to 62" ±0.02"',
      Length: 'Up to 236" ±0.02"',
      Core: "MINERAL",
    },
  },
  {
    id: "digitally-printable",
    slug: "digitally-printable",
    name: "DIGITALLY PRINTABLE",
    series: "DIGITALLY PRINTABLE",
    tagline:
      "For advertising, printed signs, and architectural applications.",
    description:
      "Optimized surface for vivid printing and reliable adhesion. Suitable for signage, branding, and architectural accent panels.",
    images: [print1, print2],
    specs: {
      Thickness: '3 mm, 4 mm (0.118", 0.157") ±0.2 mm',
      "Standard Size":
        '4’×8’ (1220×2438 mm); length up to 236" on request',
      Core: "PE / MINERAL / CORRUGATED",
    },
  },
  {
    id: "flat-aluminum",
    slug: "flat-aluminum",
    name: "FLAT ALUMINUM",
    series: "FLAT ALUMINUM",
    tagline:
      "For advertising, printed signs, and architectural applications.",
    description:
      "Flat aluminum sheets are an ideal addition to the  main ALCOPON product. Good for coping, trims,  and  flashing. Flat aluminum sheets also comes  with any finishes of the ALCOPON chart.",
    images: [fa_1, fa_2],
    specs: {
      Thickness: '1 mm (0.04”) ±0.05mm',
      "Standard Size":
        '4’x8’ (1220mmx2438mm)',
    },
  },
  
];

export default products;
