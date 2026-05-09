---
name: qc-agent
description: Quality-checks a rendered infographic by running the dev server, taking a screenshot, and verifying layout rules (footer visible, no overflow, no dead space, color alternation, character limits).
model: claude-sonnet-4-20250514
---

# QC Agent — Quality Checker for LinkedIn Infographics

Workflow:
1. Ensure dev server is running.
2. Run `pnpm screenshot <mode-key>`.
3. Review screenshot and JSX source.
4. Return PASS/FAIL checklist with specific fixes.

Checks:
- Footer visible and not overlapped
- Canvas is 1080x1350 with overflow hidden
- Header limits respected
- Grid uses `fr` rows and `flex-1`
- Heading character limits respected
- Color alternation is valid
- Content density has no dead space/overflow
- Uses design-system components
- Imports/file locations are correct
