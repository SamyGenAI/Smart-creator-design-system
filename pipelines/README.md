# Pipelines

One content pipeline: the waterfall. It covers LinkedIn, the newsletter, X and YouTube. Per-platform work is a writer skill plus a row in [`platforms.json`](platforms.json), not a second pipeline.

Read [`vault.md`](vault.md) and `$VAULT/CLAUDE.md` (Content Workflow) first. `$VAULT` is `VAULT_PATH` in `.env`, default `../Samy-SmartOS`. If that checkout is missing, stop and ask Samy to set the path.

Nothing here posts or sends. Samy approves. A folder moves from `drafts/` to `published/` only after he says the piece is published. The Notion calendar is his.

Notion stages, in order: **Idea**, **Research / Scripting**, **Design or Filming**, **Final copy / Editing**, **Scheduled**, **Posted**.

| Doc | When |
|---|---|
| [content-waterfall.md](content-waterfall.md) | The only pipeline. One idea, one asset at a time, newsletter then YouTube then LinkedIn then X |
| [platforms.json](platforms.json) | Writers, asset filenames, design handoff |
| [vault.md](vault.md) | `VAULT_PATH` and the read-only `raw/` rules |
