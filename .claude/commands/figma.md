Push the current design to the user's Figma file.

## What this does

Captures the currently active mode from the local dev server (localhost:5173) and pushes it to the user's Figma file, targeting the correct page based on design type.

| Design type | Figma target |
|-------------|--------------|
| Carousel | `FIGMA_CAROUSEL_NODE_ID` from `.env` |
| Infographic | `FIGMA_INFOGRAPHIC_NODE_ID` from `.env` |

## Steps to execute

1. **Read the Figma config from `.env`.** Load `FIGMA_FILE_KEY`, `FIGMA_CAROUSEL_NODE_ID`, and `FIGMA_INFOGRAPHIC_NODE_ID`. If `FIGMA_FILE_KEY` is missing or empty, stop and tell the user to add it to `.env` (see Setup section below).

2. **Check the dev server.** Run `netstat -ano | findstr :5173` (Windows) or `lsof -i :5173` (macOS/Linux). If nothing is listening, tell the user to run `pnpm dev` first and wait for them to confirm.

3. **Identify the active mode.** Ask the user which design to push if it is not clear from context. You need the Vite URL query param (e.g. `?mode=ai-operating-system`) and the design type (carousel or infographic).

4. **Select the target node ID.** Use `FIGMA_CAROUSEL_NODE_ID` for carousels and `FIGMA_INFOGRAPHIC_NODE_ID` for infographics. If the relevant node ID is not set in `.env`, ask the user to supply it before continuing.

5. **Generate a Figma capture ID.** Call `mcp__figma__generate_figma_design` with:
   - `outputMode: "existingFile"`
   - `fileKey: <FIGMA_FILE_KEY>`
   - `nodeId: <selected node ID>`

6. **Open the capture URL in the browser.** Use the Windows `Start-Process` PowerShell command with the hash URL returned by the tool. Include `&figmadelay=2000` so the page has time to render. Format:
   ```
   Start-Process "http://localhost:5173/?mode=<mode-key>#figmacapture=<captureId>&figmaendpoint=<encoded-endpoint>&figmadelay=2000"
   ```
   **Always show the user the full URL before opening it. Never shell-open a browser without showing the URL first.**

7. **Poll for completion.** Call `mcp__figma__generate_figma_design` with just `captureId` every 5 seconds until status is `completed`. Poll up to 10 times before troubleshooting.

8. **Report the result.** Share the Figma file URL with the node ID so the user can jump straight to the pushed frame.

## Setup — how to configure Figma push

If `FIGMA_FILE_KEY` is not set, guide the user through this one-time setup:

1. Open your Figma file in the browser. The URL looks like:
   `figma.com/design/<FIGMA_FILE_KEY>/your-file-name`
   Copy the alphanumeric key between `/design/` and the next `/`.

2. Navigate to the target page (e.g. "Carousels"). Right-click the page or a frame → **Copy link**. The link contains `?node-id=<id>` — that is your node ID (replace `-` with `:` if needed).

3. Add these to your `.env`:
   ```
   FIGMA_FILE_KEY=<your-file-key>
   FIGMA_CAROUSEL_NODE_ID=<carousels-page-node-id>
   FIGMA_INFOGRAPHIC_NODE_ID=<infographics-page-node-id>
   ```

If a user has no Figma account or no node IDs yet, remind them they can skip Figma push and instead download designs as PNG/PDF (infographics/carousels) or `.pptx` (slide decks) directly from the browser preview.

## Auth reminder

The push lands in the Figma account that is authenticated via the MCP Figma server — that is the user's own Figma account. No extra auth step needed beyond the MCP connection.

## Notes

- The capture script is already injected in `index.html` — do not add it again.
- Leave the capture script in `index.html` after the push; the browser toolbar allows re-capture without running this command again.
- If the user says "push to figma" or "send to figma" without invoking this command explicitly, follow the same steps above.
