# Vault

The private vault is [Samy-SmartOS](https://github.com/SamyGenAI/Samy-SmartOS). This repo does not contain it and does not copy it. Point at a local checkout with one setting.

| Setting | Meaning |
|---|---|
| `VAULT_PATH` | Absolute path, or a path relative to this repo. Default: `../Samy-SmartOS`. Set it in `.env` (see `.env.example`). |

`$VAULT` in the skills means that checkout. Resolve it before reading or writing:

```bash
node scripts/content-waterfall.mjs paths --title "<title>"
```

If the directory is missing, stop. Ask Samy to clone the vault beside this repo, or to set `VAULT_PATH`. Do not create a stand-in vault inside this repo.

## Layout

Karpathy's LLM-wiki layout. The schema is `$VAULT/CLAUDE.md`. Follow its Content Workflow.

| Path | Rule |
|---|---|
| `$VAULT/raw/` | Immutable source. Read-only from this repo. Never create, edit, move, or delete anything under `raw/`. |
| `$VAULT/raw/me/voice.md` | How Samy writes. |
| `$VAULT/raw/me/proof.md` | The only place public numbers, results, and testimonials come from, along with wiki pages that cite a source. |
| `$VAULT/raw/me/offer.md` | The Smart Operating System offer. |
| `$VAULT/raw/ideas/` | Idea inbox. Read it. Do not file drafts here. |
| `$VAULT/raw/content/` | Content research. Read it. Do not edit it. |
| `$VAULT/wiki/index.md` | Read this first when looking for topic pages. |
| `$VAULT/wiki/content-os.md` | Content OS hub. |
| `$VAULT/wiki/log.md` | Append-only. Add a line only when the vault schema says to. |
| `$VAULT/outputs/content/<channel>/drafts/<title>/` | One folder per draft. Channels: `newsletter`, `youtube`, `linkedin`, `x`. Images in `Assets/`. |
| `$VAULT/outputs/content/<channel>/published/<title>/` | Approved pieces only, after Samy says the piece is published. |

## Drafts

- Never overwrite a file that is already in a draft folder. If Samy wrote `How to design with AI.md`, that file is the draft. Edit it only when he asks, and do not add a second copy under another name.
- A new asset file is allowed when that file does not exist yet.
- `waterfall.json` is the idea manifest this repo maintains. It records folder names, skips, and approval. The files on disk are the asset state. Do not put the manifest in `raw/`.
- Facts in copy come from `proof.md` or a wiki page that cites a source. Do not invent numbers, results, testimonials, or a voice.

## Publishing

Nothing in this repo posts, schedules, uploads, or sends. Samy publishes on the platform. When he says a piece is published, move that channel's folder:

```bash
node scripts/content-waterfall.mjs approve --title "<title>" --channel newsletter --yes
```

Without `--yes` the command refuses. The move is the whole of "published" here. It does not call a platform.
