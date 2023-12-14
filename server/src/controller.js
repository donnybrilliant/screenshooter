import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { screenshotsDir } from "./config.js";
import {
  isValidUrl,
  createFilenameFromUrl,
  cleanupScreenshotsFolder,
} from "./utils.js";
import { PORT } from "./config.js";

// Take a screenshot of a URL
async function takeScreenshot(req, res) {
  const url = req.query.url;

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: "Invalid URL provided" });
  }

  try {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    const modifiedUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;
    await page.goto(modifiedUrl, { waitUntil: "networkidle0" });
    // Modify the root element's display property
    await page.evaluate(() => {
      const rootElement = document.querySelector("#root");
      if (rootElement) {
        rootElement.style.display = "block"; // Change display from grid to block
      }

      // Adjust footer position
      const footerElement = document.querySelector("footer");
      if (footerElement) {
        footerElement.style.position = "relative";
      }

      // Adjust main wrapper to allow for full-page content
      const wrapper = document.getElementById("wrapper");
      if (wrapper) {
        wrapper.style.overflowY = "visible";
        wrapper.style.height = "auto";
        wrapper.style.maxHeight = "none";

        // Make header non-sticky
        document.querySelector("header").style.position = "relative";

        // Expand scrollable areas
        document.querySelectorAll(".scrollarea").forEach((el) => {
          el.style.overflowY = "visible";
          el.style.height = "auto";
        });
      }
    });

    const filename = createFilenameFromUrl(url) + Date.now() + ".webp";
    const filepath = path.join(screenshotsDir, filename);

    await page.screenshot({ path: filepath, type: "webp", fullPage: true });
    await browser.close();

    const screenshotUrl = `http://${req.hostname}/screenshots/${filename}`;
    res.json({ screenshotUrl });
  } catch (e) {
    console.error("Error taking screenshot:", e.message);
    res.status(500).json({ error: "Error taking screenshot" });
  }
}

function cleanupScreenshots(req, res) {
  cleanupScreenshotsFolder(0); // Immediately delete all files
  res.send("Cleanup process started.");
}

export { takeScreenshot, cleanupScreenshots };
