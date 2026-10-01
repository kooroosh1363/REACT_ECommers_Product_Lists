# MERIDIAN — Product Discovery State Lab

MERIDIAN modernizes a 2023 React product-list exercise into a focused local-first catalog discovery project.

The original repository rendered six placeholder "hat" cards, depended on Create React App and several unused UI libraries, included duplicated image folders, referenced image paths that did not exist in the maintained tree, used a fake `Add to Card` control with no behavior, and exposed search/basket icons that were only decorative.

## Engineering focus

MERIDIAN demonstrates product discovery state without pretending to be a complete commerce platform:

- search across product metadata
- color filtering
- deterministic sorting
- shortlist limited to three products
- sanitized localStorage persistence
- shareable query-string catalog state
- invalid URL recovery
- stale shortlist recovery
- explicit shortlist summary calculations
- responsive and keyboard-accessible controls

## Architecture

```text
src/data/products.js
        │
        ▼
src/lib/catalogState.js
        ├─ query normalization
        ├─ color / sort validation
        ├─ filtering
        ├─ deterministic sorting
        ├─ shortlist sanitization
        ├─ shortlist transitions
        ├─ summary calculations
        └─ URL read/write rules
        │
        ▼
src/App.jsx
        ├─ React discovery state
        ├─ localStorage persistence
        ├─ history.replaceState()
        ├─ catalog rendering
        └─ shortlist rendering
```

The product-selection rules are independent of React so they can be tested without a browser.

## State boundaries

Catalog discovery state is stored in the query string:

- `q` — search
- `color` — color filter
- `sort` — sort mode

Shortlist state is stored locally under:

```text
meridian:shortlist:v1
```

Unknown query values and stale product ids are sanitized before rendering.

## Product scope

MERIDIAN intentionally does **not** claim to implement:

- cart state
- checkout
- payments
- inventory
- shipping
- user accounts
- authentication
- analytics
- a backend

Reference prices are demo metadata used to exercise sorting and shortlist summaries.

## Accessibility

- semantic search input and sort select
- real filter and shortlist buttons
- `aria-pressed` for selected filters and shortlist state
- disabled state when shortlist capacity is reached
- skip navigation
- visible keyboard focus
- responsive layout
- reduced-motion handling
- descriptive image alt text

## Modernization summary

- Create React App → Vite
- React 18 → React 19
- removed React Router
- removed Bootstrap
- removed Bootstrap Icons
- removed React Icons
- removed Sass
- removed Web Vitals / CRA test boilerplate
- removed duplicate image directory
- removed unused logo/search assets
- replaced broken image path strings with explicit imports
- replaced Lorem Ipsum / `hat 1` naming with structured demo metadata
- removed fake Add to Cart behavior
- removed console logging
- added Vitest, CI, Pages deployment, and documentation

## Local development

Requirements:

- Node.js 22+
- npm

```bash
npm install --legacy-peer-deps --no-audit --no-fund
npm run dev
```

The install flag avoids the npm 10 Arborist resolver crash observed on current GitHub-hosted Node 22 runners.

## Tests

```bash
npm test
```

The suite covers:

- search normalization
- invalid color recovery
- invalid sort recovery
- color filtering
- metadata search
- combined filtering
- ascending and descending reference-price sorting
- combined filter + sort selection
- stale/duplicate shortlist cleanup
- shortlist capacity
- shortlist add/remove behavior
- shortlist capacity enforcement
- shortlist summary calculations
- invalid URL recovery
- query-parameter preservation

## Quality gate

```bash
npm run check
```

This runs syntax checks, Vitest, and a Vite production build.

## CI

`.github/workflows/quality.yml` runs on pull requests and pushes to `main`.

## Deployment

MERIDIAN is static and includes a manual GitHub Pages workflow.

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Open **Actions → Deploy Pages**.
4. Run the workflow.

## Security review

No API keys, tokens, passwords, credentials, backend endpoints, authentication assumptions, or user-controlled HTML injection are required.

localStorage contains only known public product identifiers after sanitization.

## License

MIT. See [LICENSE](./LICENSE).
