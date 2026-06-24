export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root { --error-bg: oklch(0.985 0.002 270); --error-fg: oklch(0.14 0.003 270); --error-muted: oklch(0.42 0.006 270); --error-border: oklch(0.84 0.006 270); --error-primary-fg: oklch(1 0 0); --error-surface: oklch(1 0 0); }
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: var(--error-bg); color: var(--error-fg); display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: var(--error-muted); margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: var(--error-fg); color: var(--error-primary-fg); }
      .secondary { background: var(--error-surface); color: var(--error-fg); border-color: var(--error-border); }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
