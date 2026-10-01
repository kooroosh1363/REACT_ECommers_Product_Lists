import noirImage from "../assets/products/noir.png";
import mossImage from "../assets/products/moss.png";
import signalImage from "../assets/products/signal.png";
import ivoryImage from "../assets/products/ivory.png";
import sandImage from "../assets/products/sand.png";
import stoneImage from "../assets/products/stone.png";

export const products = Object.freeze([
  {
    id: "noir-36w",
    name: "Noir 36W",
    color: "black",
    profile: "Low profile",
    finish: "Matte",
    referencePrice: 34,
    description: "A high-contrast catalog study designed to stress-test search, selection, and dark-product presentation.",
    image: noirImage,
    alt: "Black headwear product study on a neutral background"
  },
  {
    id: "moss-36w",
    name: "Moss 36W",
    color: "green",
    profile: "Mid profile",
    finish: "Soft",
    referencePrice: 36,
    description: "A muted green catalog study used to validate filtering and visual differentiation across adjacent cards.",
    image: mossImage,
    alt: "Green headwear product study on a neutral background"
  },
  {
    id: "signal-36w",
    name: "Signal 36W",
    color: "red",
    profile: "Low profile",
    finish: "Bold",
    referencePrice: 32,
    description: "A saturated red study that makes active shortlist state and result ordering visually obvious.",
    image: signalImage,
    alt: "Red headwear product study on a neutral background"
  },
  {
    id: "ivory-36w",
    name: "Ivory 36W",
    color: "white",
    profile: "Mid profile",
    finish: "Clean",
    referencePrice: 35,
    description: "A light catalog study for checking card boundaries, focus states, and image separation on pale surfaces.",
    image: ivoryImage,
    alt: "White headwear product study on a neutral background"
  },
  {
    id: "sand-46v",
    name: "Sand 46V",
    color: "sand",
    profile: "High profile",
    finish: "Warm",
    referencePrice: 38,
    description: "A warm neutral study used to exercise alphabetical, price, and color-based discovery paths.",
    image: sandImage,
    alt: "Sand-colored headwear product study on a neutral background"
  },
  {
    id: "stone-48v",
    name: "Stone 48V",
    color: "grey",
    profile: "Structured",
    finish: "Neutral",
    referencePrice: 37,
    description: "A grey and white study that provides a neutral comparison point for shortlist and sort behavior.",
    image: stoneImage,
    alt: "Grey and white headwear product study on a neutral background"
  }
]);

export const colors = Object.freeze([
  "all",
  "black",
  "green",
  "red",
  "white",
  "sand",
  "grey"
]);

export const sortOptions = Object.freeze([
  "featured",
  "price-asc",
  "price-desc",
  "name"
]);
