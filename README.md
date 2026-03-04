## Outrage as a Service

A lightweight parody “publication” that generates ragebait-style comparative headlines from JSON files. Built with Vue 3, Vite, and static hosting in mind.

### URL parameters and canonical links

The home view is driven by three query parameters:

- **cat**: category key (for example `tech`)
- **s**: statement id within that category (for example `t1`)
- **i**: comma-separated item keys, aligned with the statement’s `slots` (for example `react,vue`)

Examples:

- `?cat=tech&s=t1&i=react,vue`
- `?cat=tech&s=p1&i=backend_engineers,javascript,php`

On load the app:

- Parses the current URL parameters.
- Validates them against the JSON content.
- Randomizes only any missing or invalid parts while keeping valid ones.
- Rewrites the browser URL with a canonical query string so the same URL always renders the same content.

The canonicalization is done with `history.replaceState`, so the page does not reload but the address bar shows the shareable URL.

### JSON content model

Editable content lives under `content`:

- `content/index.json` – lists available categories.
- `content/<category>/items.json` – item keys and display labels, grouped by type.
- `content/<category>/statements.json` – templates and slot definitions.

Default structure:

- **`content/index.json`**

  ```json
  {
    "categories": [
      { "key": "tech", "label": "Tech" }
    ]
  }
  ```

- **`content/tech/items.json`**

  ```json
  {
    "types": {
      "people": {
        "backend_engineers": "backend engineers",
        "founders": "founders"
      },
      "tech": {
        "ai": "AI",
        "php": "PHP",
        "javascript": "JavaScript",
        "react": "React",
        "vue": "Vue"
      }
    }
  }
  ```

- **`content/tech/statements.json`**

  ```json
  {
    "statements": [
      {
        "id": "t1",
        "slots": ["tech", "tech"],
        "template": "{tech} engineers realize: It’s time to move on to {tech}."
      },
      {
        "id": "t2",
        "slots": ["tech", "tech"],
        "template": "{tech} makes no sense anymore. {tech} is what everyone is using."
      },
      {
        "id": "p1",
        "slots": ["people", "tech", "tech"],
        "template": "{people} are choosing {tech} over {tech}."
      }
    ]
  }
  ```

#### Adding a new category

1. Add an entry to `content/index.json`:

   ```json
   {
     "categories": [
       { "key": "tech", "label": "Tech" },
       { "key": "sports", "label": "Sports" }
     ]
   }
   ```

2. Create a folder `content/sports/` with:

   - `items.json` – mirrored structure of `types` by slot type.
   - `statements.json` – an array of `{ id, slots, template }` objects.

3. Make sure every `slots` entry (e.g. `"people"`, `"team"`) has matching keys under `items.types[slotType]`.

### Slot filling and templates

- Each statement defines an ordered `slots` array, for example `["people","tech","tech"]`.
- The `i` parameter is parsed into an array and aligned by index with that slots array.
- For each slot:
  - If `i[n]` is a valid key under `items.types[slotType]`, it is used.
  - Otherwise, a key is randomized from the available keys for that slot type.
- Templates use `{slotType}` placeholders, for example `{tech}`. Placeholders are replaced in order, so repeated slot types will map to the correct items for that statement.

### Dark / light mode

- The app supports a simple light/dark toggle.
- Initial mode:
  - Uses `localStorage.colorMode` if present.
  - Otherwise follows the system `prefers-color-scheme`.
- The current mode is applied via `data-theme` on `<html>` and CSS variables in `src/main.css`.
- Toggling the mode:
  - Updates `data-theme`.
  - Persists the choice back to `localStorage` so it is remembered between visits.

### Theme registry and layouts

Themes live under `src/themes`:

- `registry.js` – returns the list of available themes.
- `defaultTheme.js` – defines a single default theme.
- `DefaultLayout.vue` – the layout wrapper for that theme.

Each theme object has:

- `id`: unique identifier.
- `label`: human-readable name.
- `layout`: Vue component used to wrap the app.
- `tokens`: optional design tokens, for example the publication name and tagline.

To add a new theme:

1. Create a new layout component (for example `ModernLayout.vue`).
2. Create a new theme definition (for example `modernTheme.js`) exporting `{ id, label, layout, tokens }`.
3. Import and add it to the list in `src/themes/registry.js`.

The app will automatically use the first theme in the registry, and you can extend the UI later to expose theme switching if desired.

### Running locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

The build output in `dist/` is static and can be served from GitHub Pages, Netlify, or any static host.

### Deploying to GitHub Pages

- The app uses relative asset paths and fetches JSON via `./content/...`, so it works under a GitHub Pages subpath.
- Set the `base` path in `vite.config.js` if you host under a non-root path and need a different configuration.

