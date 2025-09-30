// src/data/finishes.js

// ========= ANODIZED =========
import C9001 from "../assets/finishes/Anodized/C-9001.png";
import C9204 from "../assets/finishes/Anodized/C-9204.png";
import C9602 from "../assets/finishes/Anodized/C-9602.png";
import C9604 from "../assets/finishes/Anodized/C-9604.png";

// ========= BRUSHED =========
import BKL105 from "../assets/finishes/Brushed/BKL-105.png";
import BKL101 from "../assets/finishes/Brushed/BKL-101.png";
import BKL201 from "../assets/finishes/Brushed/BKL-201.png";
import BKL202 from "../assets/finishes/Brushed/BKL-202.png";

// ========= FANTASY =========
import C6001 from "../assets/finishes/Fantasy/C-6001.png";
import C6209 from "../assets/finishes/Fantasy/C-6209.png";
import C6505 from "../assets/finishes/Fantasy/C-6505.png";
import C6803 from "../assets/finishes/Fantasy/C-6803.png";

// ========= METALLIC =========
import LT30P from "../assets/finishes/Metallic/LT-30P.png";
import LT8004 from "../assets/finishes/Metallic/LT-8004.png";
import LT8005 from "../assets/finishes/Metallic/LT-8005.png";
import LT8101 from "../assets/finishes/Metallic/LT-8101.png";

// ========= MIRROR =========
import BKJ104 from "../assets/finishes/Mirror/BKJ-104.png";
import BKJ106 from "../assets/finishes/Mirror/BKJ-106.png";
import GOLDMIRROR from "../assets/finishes/Mirror/BLL-1002.png";
import SILVERMIRROR from "../assets/finishes/Mirror/BLL-1001.png";

// ========= PEARL =========
import BKZ001 from "../assets/finishes/Pearl/BKZ-001.png";
import BKZ003 from "../assets/finishes/Pearl/BKZ-003.png";
import BKZ005 from "../assets/finishes/Pearl/BKZ-005.png";
import BKZ010 from "../assets/finishes/Pearl/BKZ-010.png";

// ========= SOLID =========
import LT34M from "../assets/finishes/Solid/LT-34M.png";
import LT8006 from "../assets/finishes/Solid/LT-8006.png";
import LT8202 from "../assets/finishes/Solid/LT-8202.png";
import PE1006 from "../assets/finishes/Solid/PE-1006.png";

// ========= SPECIAL =========
import LT34M2374 from "../assets/finishes/Special/LT-34M-2374.png";
import LT34W2376 from "../assets/finishes/Special/LT-34W-2376.png";
import LT23M2227 from "../assets/finishes/Special/LT-23M-2227.png";
import LT34Z2392 from "../assets/finishes/Special/LT-34Z-2392.png";

// ========= STONE =========
import BKS109 from "../assets/finishes/Stone/BKS-109.png";
import BLL2379 from "../assets/finishes/Stone/BLL-2379.png";
import BLL23855 from "../assets/finishes/Stone/BLL-2385-5.png";
import BLL24062 from "../assets/finishes/Stone/BLL-2406-2.png";

// ========= SUEDE =========
import BKR001 from "../assets/finishes/Suede/BKR-001.png";
import BKR002 from "../assets/finishes/Suede/BKR-002.png";
import BKR004 from "../assets/finishes/Suede/BKR-004.png";
import BKR005 from "../assets/finishes/Suede/BKR-005.png";

// ========= WOOD =========
import BLL1052 from "../assets/finishes/Wood/BLL-105-2.png";
import BLL12392 from "../assets/finishes/Wood/BLL-1239-2.png";
import BLL12802 from "../assets/finishes/Wood/BLL-1280-2.png";
import PLT1275 from "../assets/finishes/Wood/PLT-1275.png";

const finishes = [
  {
    category: "Anodized",
    items: [
      { code: "C-9001", name: "ECLIPSE SILVER", img: C9001 },
      { code: "C-9204", name: "GOLD", img: C9204 },
      { code: "C-9602", name: "ASH", img: C9602 },
      { code: "C-9604", name: "BLACK", img: C9604 },
    ],
  },
  {
    category: "Brushed",
    items: [
      { code: "BKL-105", name: "BRONZE BRUSH", img: BKL105 },
      { code: "BKL-101", name: "GOLD BRUSH", img: BKL101 },
      { code: "BKL-201", name: "STAINLESS STEEL BRUSH", img: BKL201 },
      { code: "BKL-202", name: "BROWN BRUSH", img: BKL202 },
    ],
  },
  {
    category: "Fantasy",
    items: [
      { code: "C-6001", name: "SNOWFLAKE WHITE", img: C6001 },
      { code: "C-6209", name: "WEAVING BLACK", img: C6209 },
      { code: "C-6505", name: "WEAVING OCHER", img: C6505 },
      { code: "C-6803", name: "DAWN BLUE", img: C6803 },
    ],
  },
  {
    category: "Metallic",
    items: [
      { code: "LT-30P", name: "SANDY DARK GRAY", img: LT30P },
      { code: "LT-8004", name: "PALM COPPER", img: LT8004 },
      { code: "LT-8005", name: "JADE WHITE", img: LT8005 },
      { code: "LT-8101", name: "FLASH SILVER", img: LT8101 },
    ],
  },
  {
    category: "Mirror",
    items: [
      { code: "BKJ-104", name: "BLACK MIRROR", img: BKJ104 },
      { code: "BKJ-106", name: "TAWNY MIRROR", img: BKJ106 },
      { code: "BLL-1002", name: "GOLD MIRROR", img: GOLDMIRROR },
      { code: "BLL-1001", name: "SILVER MIRROR", img: SILVERMIRROR },
    ],
  },
  {
    category: "Pearl",
    items: [
      { code: "BKZ-001", name: "PEARL WHITE", img: BKZ001 },
      { code: "BKZ-003", name: "PEARL SILVER", img: BKZ003 },
      { code: "BKZ-005", name: "PEARL MAROON", img: BKZ005 },
      { code: "BKZ-010", name: "PEARL BLACK", img: BKZ010 },
    ],
  },
  {
    category: "Solid",
    items: [
      { code: "LT-34M", name: "CHARCOAL GRAY", img: LT34M },
      { code: "LT-8006", name: "BLACK MATTE", img: LT8006 },
      { code: "LT-8202", name: "PURE WHITE", img: LT8202 },
      { code: "PE-1006", name: "SNOW WHITE", img: PE1006 },
    ],
  },
  {
    category: "Special",
    items: [
      { code: "LT-34M-2374", name: "ANTIBACTERIAL WHITE", img: LT34M2374 },
      { code: "LT-34W-2376", name: "ANTIGLARE WHITE", img: LT34W2376 },
      { code: "LT-23M-2227", name: "ANTISTATIC IVORY WHITE", img: LT23M2227 },
      { code: "LT-34Z-2392", name: "EXTREMELY MATTE SNOW WHITE", img: LT34Z2392 },
    ],
  },
  {
    category: "Stone",
    items: [
      { code: "BKS-109", name: "ASHY STONE", img: BKS109 },
      { code: "BLL-2379", name: "COFFEE NET", img: BLL2379 },
      { code: "BLL-2385-5", name: "DAZZLE GRAY BLUE (X)", img: BLL23855 },
      { code: "BLL-2406-2", name: "CEMENT ASH", img: BLL24062 },
    ],
  },
  {
    category: "Suede",
    items: [
      { code: "BKR-001", name: "IVORY SUEDE", img: BKR001 },
      { code: "BKR-002", name: "GRAY SUEDE", img: BKR002 },
      { code: "BKR-004", name: "RED SUEDE", img: BKR004 },
      { code: "BKR-005", name: "BLACK SUEDE", img: BKR005 },
    ],
  },
  {
    category: "Wood",
    items: [
      { code: "BLL-105-2", name: "LIGHT TEAK", img: BLL1052 },
      { code: "BLL-1239-2", name: "OLIVE WOOD", img: BLL12392 },
      { code: "BLL-1280-2", name: "BLACK PINE", img: BLL12802 },
      { code: "PLT-1275", name: "OAK MOCCO", img: PLT1275 },
    ],
  },
];

export default finishes;
