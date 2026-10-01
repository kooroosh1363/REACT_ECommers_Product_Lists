import { describe, expect, it } from "vitest";
import { colors, products, sortOptions } from "../data/products.js";
import {
  MAX_SHORTLIST,
  filterProducts,
  normalizeColor,
  normalizeQuery,
  normalizeSort,
  readCatalogState,
  sanitizeShortlist,
  selectProducts,
  shortlistSummary,
  sortProducts,
  toggleShortlist,
  writeCatalogState
} from "./catalogState.js";

describe("catalog state policy", () => {
  it("normalizes whitespace in search queries", () => {
    expect(normalizeQuery("  low   profile  ")).toBe("low profile");
  });

  it("recovers unknown colors to all", () => {
    expect(normalizeColor("purple", colors)).toBe("all");
  });

  it("recovers unknown sort modes to featured", () => {
    expect(normalizeSort("random", sortOptions)).toBe("featured");
  });

  it("filters products by color", () => {
    expect(filterProducts(products, { color: "red" }).map((item) => item.id))
      .toEqual(["signal-36w"]);
  });

  it("searches across product metadata", () => {
    expect(filterProducts(products, { query: "structured" }).map((item) => item.id))
      .toEqual(["stone-48v"]);
  });

  it("combines query and color filters", () => {
    expect(filterProducts(products, { query: "profile", color: "green" }).map((item) => item.id))
      .toEqual(["moss-36w"]);
  });

  it("sorts by ascending reference price", () => {
    expect(sortProducts(products, "price-asc")[0].id).toBe("signal-36w");
  });

  it("sorts by descending reference price", () => {
    expect(sortProducts(products, "price-desc")[0].id).toBe("sand-46v");
  });

  it("selects products with filter and sort together", () => {
    expect(selectProducts(products, { query: "36W", color: "all", sort: "price-asc" }).map((item) => item.id))
      .toEqual(["signal-36w", "noir-36w", "ivory-36w", "moss-36w"]);
  });

  it("sanitizes unknown and duplicate shortlist ids", () => {
    expect(sanitizeShortlist(["noir-36w", "missing", "noir-36w", "moss-36w"], products))
      .toEqual(["noir-36w", "moss-36w"]);
  });

  it("caps shortlist size", () => {
    expect(sanitizeShortlist(products.map((item) => item.id), products)).toHaveLength(MAX_SHORTLIST);
  });

  it("adds and removes shortlist products", () => {
    expect(toggleShortlist([], "noir-36w", products)).toEqual(["noir-36w"]);
    expect(toggleShortlist(["noir-36w"], "noir-36w", products)).toEqual([]);
  });

  it("does not exceed shortlist capacity", () => {
    const full = ["noir-36w", "moss-36w", "signal-36w"];
    expect(toggleShortlist(full, "ivory-36w", products)).toEqual(full);
  });

  it("summarizes shortlist reference pricing", () => {
    expect(shortlistSummary(["signal-36w", "noir-36w"], products)).toEqual({
      count: 2,
      ids: ["signal-36w", "noir-36w"],
      totalReferencePrice: 66,
      averageReferencePrice: 33,
      colors: ["red", "black"]
    });
  });

  it("recovers invalid URL state", () => {
    expect(readCatalogState("?q=%20red%20&color=purple&sort=random", colors, sortOptions))
      .toEqual({ query: "red", color: "all", sort: "featured" });
  });

  it("writes canonical URL state while preserving unrelated params", () => {
    expect(writeCatalogState("?ref=portfolio", {
      query: "low profile",
      color: "black",
      sort: "price-desc"
    })).toBe("?ref=portfolio&q=low+profile&color=black&sort=price-desc");
  });
});
