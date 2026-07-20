import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://nectar-design.vercel.app';
const OUTPUT_DIR = './snapshots';

const pages = [
  { path: '/', name: 'home', waitFor: '#flavors' },
  { path: '/shop', name: 'shop', waitFor: '#available' },
  { path: '/shop/yuzu', name: 'product-yuzu', waitFor: null },
  { path: '/shop/berry', name: 'product-berry', waitFor: null },
  { path: '/shop/cucumber', name: 'product-cucumber', waitFor: null },
  { path: '/cart', name: 'cart', waitFor: null },
  { path: '/checkout', name: 'checkout', waitFor: 'h1' },
];

async function takeSnapshots() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });

  for (const page of pages) {
    const pageInstance = await context.newPage();
    try {
      console.log(`Capturing ${page.name}...`);
      await pageInstance.goto(`${BASE_URL}${page.path}`, { 
        waitUntil: 'networkidle',
        timeout: 60000 
      });
      
      if (page.waitFor) {
        await pageInstance.waitForSelector(page.waitFor, { timeout: 15000 });
      }
      
      // Wait for animations and React hydration
      await pageInstance.waitForTimeout(5000);
      
      // Full page screenshot
      await pageInstance.screenshot({
        path: path.join(OUTPUT_DIR, `${page.name}-full.png`),
        fullPage: true,
      });
      
      // Viewport screenshot (above fold)
      await pageInstance.screenshot({
        path: path.join(OUTPUT_DIR, `${page.name}-viewport.png`),
        fullPage: false,
      });
      
      console.log(`  ✓ Saved ${page.name}-full.png & ${page.name}-viewport.png`);
    } catch (error) {
      console.error(`  ✗ Failed ${page.name}:`, error.message);
    } finally {
      await pageInstance.close();
    }
  }

  await browser.close();
  console.log('\nDone! Snapshots saved to', OUTPUT_DIR);
}

takeSnapshots().catch(console.error);