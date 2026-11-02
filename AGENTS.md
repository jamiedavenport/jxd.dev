# Git

- Write conventional commit messages.

## Development

Use Bun for dependencies and scripts, with tooling versions managed by mise.

Linting and formatting use Oxfmt and type-aware Oxlint, matching `~/jamiedavenport.me`. Run `bun run format` and `bun run lint` to check, or their `:fix` variants to apply fixes. Do not add Prettier or ESLint. Keep `.astro` template formatting consistent manually; Oxfmt does not support these files.

After changes, run `bun run format`, `bun run lint`, `bun run check`, and `bun run build`.

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Writing

- Write as "we".
- Links to other posts should use `ArticleLink`.

## Documentation

Full documentation: https://docs.astro.build
