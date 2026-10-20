---
name: content-waterfall
description: Run a weekly content waterfall: find the idea of the week from what is hot on YouTube, X and LinkedIn, make 1 long video, grow its 3 roots into posts on every platform, ship the week and turn the engagers into conversations. Use when the author gives the idea of the week, wants posts from a video, hands over a recording or YouTube link, or asks to repurpose. Orchestrates the stage skills.
---

Workspace: this repo is the Content OS. Read `CLAUDE.md` here, then `brain/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `brain/raw/me/` (`voice.md`, `proof.md`, `offer.md`, and sibling pages). Never write `brain/raw/`. Topic knowledge starts at `brain/wiki/index.md` and `brain/wiki/content-os.md`. The operating order for this skill is [`pipelines/content-waterfall.md`](../../pipelines/content-waterfall.md). The master brief is saved to `brain/outputs/content/youtube/drafts/<title>/brief.md`. Each piece is then drafted in its own channel folder under `brain/outputs/content/<channel>/drafts/<title>/`, with images in that folder's `Assets/`. If `brain/` is not checked out, stop and ask Samy to add the submodule (command in the README). Do not copy vault files into this repo, and do not invent numbers, results or testimonials. Skill-local `references/` resolve from this skill directory.

# Content waterfall

1 idea a week becomes 1 long video, and everything else flows down from it. The idea is the most important piece, so it gets its own stage. The live video is the trunk, 3 roots grow from it in parallel, idea posts fill open slots after the release week, and the people who engage become conversations. The full walkthrough is on YouTube: https://www.youtube.com/watch?v=8z_GiPtnO80.

This skill is the operating order. Each stage has its own skill; use it, do not redo its work here. Video cutting, motion graphics and upload automation are **later**. Samy records and uploads.

## The stages at a glance

| Stage | What happens | Output | The author decides |
|---|---|---|---|
| 0 Idea | Scan what is hot on YouTube, X and LinkedIn, add last week's signals | A slate of 3 to 5 ideas with proof of heat | The pick |
| 1 Brief | Packaging first, then the brief and a video outline | 1 brief page (`references/brief-template.md`) | Release date; their verdict when the video is a review |
| 2 Board | The big post plus its dated sub-posts | 1 dated plan in the brief, and a Notion update only if Samy asked | Nothing, unless a date collides |
| 3 Record | The author records from the outline | Raw recording | Everything on camera. **Later** for any edit automation |
| 4 Package | Titles, description, thumbnail concept. Cut and upload stay with Samy | The packaging files in the YouTube draft | Title and thumbnail pick; the upload |
| 5 Draft | Root by root, newsletter first; mine the transcript for idea posts | Copy in each channel draft | Edits; which ideas stand on their own |
| 6 Schedule | Queue each piece on its date, by hand | A plan Samy can schedule himself | Go for anything that publishes or sends |
| 7 Convert | Engagers into conversations, from threads Samy pastes | DM drafts | Every send |
| 8 Close | Mark what shipped, rank the winners, collect questions | Results in the brief, next idea | The next idea; what doubles down. Samy moves folders to `published/` |

Enter where the work is. A raw recording starts at stage 4 and a YouTube link at stage 5, but create the big post first if it is missing.

## Standing rules

- The idea is the author's. The slate proposes 3 to 5 ideas with proof of heat; the author picks. Never pick or invent the idea of the week for them.
- Truth over packaging: every title, thumbnail and newsletter claim must be shown in the video. Numbers come only from `brain/raw/me/proof.md`; drop planned numbers the video does not show.
- Write in the author's voice (`brain/raw/me/voice.md`). When the author calls a line generic or AI-sounding, rewrite the section from their own words.
- Link videos with the full `https://www.youtube.com/watch?v=<id>` URL. Never a shortener: link shorteners trip spam and phishing filters.
- 1 big post per waterfall with dated sub-posts, not a board full of separate cards. Every sub-post has a status, platform and date.
- Date everything from the video's release day (D). The newsletter and the X Article go out on D; posts follow.
- Text, image and graphic pieces carry the week. The video itself goes out only as the native upload of the finished video on LinkedIn and X.
- Drafting is not publishing. Nothing is sent, scheduled or posted without the author's go. This repo never posts or sends.

## The system: 1 trunk, 3 roots

| Part | What it reuses | Pieces | Funnel job |
|---|---|---|---|
| Trunk | The live video: the file, the argument, the transcript | The YouTube video | |
| Root 1, the file | The video itself | LinkedIn video, X video: the native upload | Reach |
| Root 2, the argument | The newsletter's argument | Newsletter, X Article, lesson post, resource post | Belief; the resource post is Signup |
| Root 3, the transcript | Ideas that stand on their own | Chapter post, graphic, proof post, opinion post, micro posts | Reach, or Belief for graphic and proof |

Timing from D: the video, newsletter, X Article and X video on D; the LinkedIn video and lesson that week; the resource post on D+7. Idea posts fill open slots after that; the rest waits in a backlog. Winners get reposted on the other platform at the close.

Platform jobs: YouTube is the library, the newsletter the list you own, X the builders, LinkedIn the buyers. The funnel job (Reach, Belief, Signup) is a writing decision per piece, set before drafting; it decides the hook and the ask.

## Stage 0: Find the idea

| Scan | Tools | What to bring back |
|---|---|---|
| Your signals | Last week's close: winners, the best questions from the comments, customer wins and calls | What already worked for this audience |
| YouTube | The vidIQ plugin if installed (trend radar, video ideas), `youtube-title-outlier-packaging` | Outliers and rising topics in the niche, with their titles and thumbnails |
| X | X Radar (X Premium) on your keywords, X search, the viral lane of `x-planner` | Posts going viral in the niche |
| LinkedIn | By hand: scroll the creators you follow, LinkedIn search, saved posts | Outlier posts, with their hooks |

The slate: 3 to 5 ideas, each with its proof of heat (the outlier or the numbers), the pillar from `brain/wiki/` (start at `brain/wiki/content-os.md`), the funnel job and the receipt the author can show on camera. Prefer ideas with more demand than supply. Content only about what the author finds interesting is the most common miss.

Notion stage after the pick: **Idea**.

## Stage 1: Brief

1. Take the picked idea in the author's words. Choose 1 pillar and 1 funnel stage; ground in `brain/raw/me/` (positioning, ICP, offer) and `brain/raw/me/voice.md`.
2. Stance check: read what the author published on the topic recently, starting from `brain/wiki/`. The video builds on it or names the change.
3. Facts: check every product, model or market claim at its source and date it. Numbers, results and testimonials come only from `brain/raw/me/proof.md` or a source quoted in the brief.
4. Worked example and resource: prefer what the author can show on screen and what already exists. The resource is usually an existing kit, not a new build.
5. Packaging first: 2 titles (`youtube-title-outlier-packaging`) and 2 thumbnail directions (`youtube-thumbnail`) before the outline. The outline has to deliver that promise.
6. Outline: chapters with what is on screen and which claim each makes deliverable. 1 chapter answers 1 buyer objection, so it can be sent as an answer in a DM later. There is no separate script skill in this repo; the outline is the script.
7. Write the brief from `references/brief-template.md` to `brain/outputs/content/youtube/drafts/<title>/brief.md`.

Ask the author only what they alone know: the release date and their verdict. Decide the rest and list it under open decisions.

Notion stage: **Research / Scripting**.

## Stage 2: Board

The content calendar lives in Notion. Look for the dates around the release and for an existing card on the same topic first; reuse a card that exists. Update Notion only when the author asked and `brain/wiki/` documents that database. 1 big post for the video, each piece noted with a status, platform and date. The Notion stages are Idea, Research / Scripting, Design or Filming, Final copy / Editing, Scheduled, Posted. Without Notion, return the dated plan in chat and keep it in the brief.

Default sub-posts from release day D:

| Day | Piece | Platform | Root, job | Skill |
|---|---|---|---|---|
| D | The video (the big post) | YouTube | Trunk | stage 4 |
| D | Newsletter | Newsletter | Root 2, Belief | `newsletter-writer` |
| D | X Article | X | Root 2, Belief | `x-article-writer` |
| D | The video is live | X | Root 1, Reach | `x-article-writer` (the video post) |
| Author's pick | The video, native | LinkedIn | Root 1, Reach | `linkedin-copywriter` |
| That week's slot | The lesson | LinkedIn | Root 2, Belief | `linkedin-copywriter` |
| D+7 | The resource post | LinkedIn | Root 2, Signup | `linkedin-copywriter` |
| Open slots | 1 or 2 idea posts after the harvest | LinkedIn | Root 3 | `linkedin-copywriter` |

Create everything else only when it is picked: micro posts, chapter threads, reposts of winners. That keeps the card near 8 sub-posts, not 30. Other X posts are planned with the author in `x-planner`.

## Stage 3: Record

The author records from the outline. Remind them: a clean screen, accounts that are safe to show, no client data on screen, 1 dry run. Editing and motion graphics are **later**.

Notion stage while the video is being made: **Design or Filming**.

## Stage 4: Package

| # | Step | Skill | Done when |
|---|---|---|---|
| 1 | Cut | later | Samy cuts. Only false starts, dead air and the tail removed from screen demos |
| 2 | Final-cut transcript | later | Samy supplies the transcript. Chapter times come from the final cut, not the raw file |
| 3 | Promise check, title A/B | `youtube-title-outlier-packaging` | Both titles deliverable from the cut, or marked provisional if there is no cut yet |
| 4 | Description and chapters | `youtube-description` | Paste-ready block |
| 5 | Thumbnail | `youtube-thumbnail` | Concept checked at 1280×720 and 320×180. This app has no YouTube thumbnail canvas yet |
| 6 | Upload | The author | The YouTube video ID; private first. Nothing in this repo uploads |

## Stage 5: Draft

Write the newsletter first; it is the approved argument every other piece reuses. Then the X Article from the newsletter, the X video post, then the LinkedIn posts. Do not re-derive the argument from the transcript for each piece. Run LinkedIn copy through `linkedin-copywriter` and `linkedin-hook-writer`. On LinkedIn, links go in the first comment and the post says so.

Save each piece under `brain/outputs/content/<channel>/drafts/<title>/`:

| Piece | Folder |
|---|---|
| Newsletter | `brain/outputs/content/newsletter/drafts/<title>/` |
| X Article and X posts | `brain/outputs/content/x/drafts/<title>/` |
| LinkedIn posts | `brain/outputs/content/linkedin/drafts/<title>/` |
| Titles, description, thumbnail concept | `brain/outputs/content/youtube/drafts/<title>/` |

Root 3, the harvest: read the final-cut transcript and tag every idea by type: chapter, framework, proof moment, strong claim, line, receipt, take. Ask of each: does it stand on its own without the video? Yes: a chapter post, a graphic (`graphics-designer`, then the design-system skill it names, or `flowchart`), a proof post or an opinion post, or a micro post through `x-planner`. No: the backlog.

Notion stage once copy is in draft: **Final copy / Editing**.

## Stage 6: Schedule

Queue each piece on its date only on the author's go, in that platform's own scheduler. There is no publishing tool wired in this repo. The newsletter stays a draft in the email tool until approved. Keep each status truthful: drafted until it is live. Keep 1 LinkedIn post a day; idea posts fill open slots, never a second post.

Notion stage **Scheduled** only after the author has queued it. The agent does not schedule.

## Stage 7: Convert

Impressions alone do not pay. There is no inbox tool yet. Work from threads and engagers the author pastes.

- Qualify company and person fit from the paste and from ICP in `brain/raw/me/`. Do not invent fit.
- People who commented the keyword on a resource post get the resource by DM and nothing else. Draft that DM with `linkedin-unibox-reply`. The author sends it.
- Replies: `linkedin-unibox-reply` drafts from the pasted thread. The author sends. Answer an objection with the chapter that answers it: the full YouTube URL plus `&t=<seconds>s`.
- No sequence, workflow or send without the author's go. Nothing is sent automatically.

## Stage 8: Close

The author marks each piece published as it goes live: they move the draft folder to the matching `published/` folder and set the Notion stage to **Posted**. Rank the week's pieces, including older ones still running. The top 1 or 2 are candidates for a repost on the other platform and for the next video. Customer wins go into the next brief only with permission and cleared numbers from `brain/raw/me/proof.md`. Bring the winners and the best questions to the author with the ask for next week's idea; the idea stays theirs. Record results and replies in the brief.

## Hand-off

After each stage, tell the author the file and the next stage. Keep the brief current: titles, description, thumbnail files, dates and links.
