const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to capture the full infographic
  await page.setViewportSize({ width: 1200, height: 1500 });

  // Navigate to the page
  await page.goto('http://localhost:5173');

  // Wait for the infographic to load
  await page.waitForSelector('[data-name="DesignWithAI"]');

  // Take screenshot
  await page.screenshot({
    path: 'screenshot-designwith-ai.png',
    fullPage: false
  });

  console.log('Screenshot saved as screenshot-designwith-ai.png');

  await browser.close();
})();