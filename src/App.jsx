import { useMemo, useState } from "react";
import { colors, products, sortOptions } from "./data/products.js";
import {
  SHORTLIST_STORAGE_KEY,
  readCatalogState,
  sanitizeShortlist,
  selectProducts,
  shortlistSummary,
  toggleShortlist,
  writeCatalogState
} from "./lib/catalogState.js";

function safeReadShortlist() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SHORTLIST_STORAGE_KEY) || "[]");
    return sanitizeShortlist(parsed, products);
  } catch {
    return [];
  }
}

function updateUrl(state) {
  const search = writeCatalogState(window.location.search, state);
  const next = `${window.location.pathname}${search}${window.location.hash}`;
  history.replaceState(null, "", next);
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5h10v15l-5-3-5 3z" />
    </svg>
  );
}

export default function App() {
  const initial = useMemo(
    () => readCatalogState(window.location.search, colors, sortOptions),
    []
  );

  const [catalogState, setCatalogState] = useState(initial);
  const [shortlist, setShortlistState] = useState(safeReadShortlist);

  const visibleProducts = useMemo(
    () => selectProducts(products, catalogState),
    [catalogState]
  );

  const summary = useMemo(
    () => shortlistSummary(shortlist, products),
    [shortlist]
  );

  function setCatalog(next) {
    setCatalogState((current) => {
      const merged = { ...current, ...next };
      updateUrl(merged);
      return merged;
    });
  }

  function setShortlist(next) {
    const safe = sanitizeShortlist(next, products);
    setShortlistState(safe);
    localStorage.setItem(SHORTLIST_STORAGE_KEY, JSON.stringify(safe));
  }

  function toggleProduct(id) {
    setShortlist(toggleShortlist(shortlist, id, products));
  }

  function clearDiscovery() {
    const next = { query: "", color: "all", sort: "featured" };
    setCatalogState(next);
    updateUrl(next);
  }

  function clearShortlist() {
    setShortlist([]);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="layout nav-row">
          <a className="brand" href="#catalog" aria-label="MERIDIAN catalog home">
            <span className="brand-mark">M</span>
            <span>
              <strong>MERIDIAN</strong>
              <small>Product discovery state lab</small>
            </span>
          </a>

          <div className="header-stat" aria-label="Shortlist count">
            <BookmarkIcon />
            <span>{summary.count} / 3 shortlisted</span>
          </div>
        </div>
      </header>

      <main>
        <section className="hero layout">
          <p className="eyebrow">React · filtering · shortlist state</p>
          <h1>Explore a catalog without pretending checkout exists.</h1>
          <p className="hero-copy">
            MERIDIAN turns a static product-card exercise into a local-first discovery system:
            search, color filters, deterministic sorting, shortlist persistence, and shareable URL state.
          </p>

          <div className="scope-note">
            <strong>Scope boundary</strong>
            <p>
              Reference prices are demo metadata. There is no cart, payment flow, inventory service,
              authentication, shipping calculation, or backend.
            </p>
          </div>
        </section>

        <section id="catalog" className="catalog-section layout" aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <div>
              <p className="eyebrow">Discovery workspace</p>
              <h2 id="catalog-title">Six visual studies, one explicit state model.</h2>
            </div>
            <p>{visibleProducts.length} of {products.length} products visible</p>
          </div>

          <div className="catalog-toolbar">
            <label className="search-field">
              <span>Search catalog</span>
              <div>
                <SearchIcon />
                <input
                  type="search"
                  value={catalogState.query}
                  placeholder="Search profile, color, finish…"
                  onChange={(event) => setCatalog({ query: event.target.value })}
                />
              </div>
            </label>

            <label className="sort-field">
              <span>Sort</span>
              <select
                value={catalogState.sort}
                onChange={(event) => setCatalog({ sort: event.target.value })}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Reference price: low to high</option>
                <option value="price-desc">Reference price: high to low</option>
                <option value="name">Name</option>
              </select>
            </label>

            <button className="reset-button" type="button" onClick={clearDiscovery}>
              Reset discovery
            </button>
          </div>

          <div className="filter-row" aria-label="Color filters">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                aria-pressed={catalogState.color === color}
                onClick={() => setCatalog({ color })}
              >
                {color}
              </button>
            ))}
          </div>

          {visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product) => {
                const selected = shortlist.includes(product.id);
                const blocked = !selected && shortlist.length >= 3;

                return (
                  <article className="product-card" key={product.id} data-selected={selected}>
                    <div className="product-visual">
                      <img src={product.image} alt={product.alt} loading="lazy" />
                      <span>{product.color}</span>
                    </div>

                    <div className="product-copy">
                      <div className="product-meta">
                        <span>{product.profile}</span>
                        <span>{product.finish}</span>
                      </div>

                      <h3>{product.name}</h3>
                      <p>{product.description}</p>

                      <div className="reference-row">
                        <div>
                          <small>Reference</small>
                          <strong>${product.referencePrice}</strong>
                        </div>

                        <button
                          type="button"
                          aria-pressed={selected}
                          disabled={blocked}
                          onClick={() => toggleProduct(product.id)}
                        >
                          <BookmarkIcon />
                          {selected ? "Remove" : blocked ? "Shortlist full" : "Shortlist"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <strong>No products match this discovery state.</strong>
              <p>Reset the search or choose a different color.</p>
              <button type="button" onClick={clearDiscovery}>Reset discovery</button>
            </div>
          )}
        </section>

        <section className="shortlist-section layout" aria-labelledby="shortlist-title">
          <div className="shortlist-panel">
            <div>
              <p className="eyebrow">Local shortlist</p>
              <h2 id="shortlist-title">Compare a bounded set, not a fake cart.</h2>
              <p>
                Up to three selections are stored locally in this browser. They are not orders
                and are never sent to a server.
              </p>
            </div>

            <div className="shortlist-metrics">
              <div>
                <span>Selected</span>
                <strong>{summary.count} / 3</strong>
              </div>
              <div>
                <span>Combined reference</span>
                <strong>${summary.totalReferencePrice}</strong>
              </div>
              <div>
                <span>Average reference</span>
                <strong>${summary.averageReferencePrice}</strong>
              </div>
            </div>

            <div className="shortlist-items">
              {summary.ids.length ? summary.ids.map((id) => {
                const product = products.find((item) => item.id === id);
                return (
                  <button key={id} type="button" onClick={() => toggleProduct(id)}>
                    <span>{product.name}</span>
                    <small>remove</small>
                  </button>
                );
              }) : <p>No shortlisted products yet.</p>}
            </div>

            <button
              className="clear-shortlist"
              type="button"
              onClick={clearShortlist}
              disabled={!summary.count}
            >
              Clear shortlist
            </button>
          </div>
        </section>

        <section className="engineering-section layout">
          <div>
            <p className="eyebrow">Engineering angle</p>
            <h2>Discovery behavior lives outside the cards.</h2>
          </div>

          <div className="engineering-grid">
            <article>
              <span>01</span>
              <h3>Selection</h3>
              <p>Search, filter, and sort policies are pure functions instead of component-specific branches.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Recovery</h3>
              <p>Unknown query parameters and stale shortlist ids are normalized before they affect the UI.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Boundaries</h3>
              <p>Shortlisting is explicit local state. It never claims cart, checkout, inventory, or payment behavior.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer layout">
        <strong>MERIDIAN</strong>
        <span>Local-first product discovery state lab</span>
      </footer>
    </div>
  );
}
