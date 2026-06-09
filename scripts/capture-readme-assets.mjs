import { access, mkdir } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const demoPath = path.join(repositoryRoot, "demo", "index.html");
const outputDirectory = path.join(repositoryRoot, "assets", "readme");

const captures = [
  {
    name: "desktop",
    output: path.join(outputDirectory, "demo-screenshot.png"),
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 1
  },
  {
    name: "mobile",
    output: path.join(outputDirectory, "demo-screenshot-mobile.png"),
    viewport: { width: 390, height: 1200 },
    deviceScaleFactor: 1
  }
];

async function launchBrowser() {
  const configuredExecutable = process.env.README_ASSET_BROWSER;
  if (configuredExecutable) {
    return chromium.launch({
      executablePath: configuredExecutable,
      headless: true
    });
  }

  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    if (process.platform === "win32") {
      return chromium.launch({ channel: "msedge", headless: true });
    }
    throw error;
  }
}

await access(demoPath, constants.R_OK);
await mkdir(outputDirectory, { recursive: true });

const browser = await launchBrowser();

try {
  for (const capture of captures) {
    const context = await browser.newContext({
      viewport: capture.viewport,
      deviceScaleFactor: capture.deviceScaleFactor,
      colorScheme: "dark",
      reducedMotion: "reduce"
    });
    const page = await context.newPage();

    await page.goto(pathToFileURL(demoPath).href, {
      waitUntil: "load"
    });
    await page.screenshot({
      path: capture.output,
      fullPage: false
    });
    await context.close();
    await access(capture.output, constants.R_OK);
  }
} finally {
  await browser.close();
}

console.log(
  `Captured ${captures.length} README demo assets in ${path.relative(repositoryRoot, outputDirectory)}.`
);
