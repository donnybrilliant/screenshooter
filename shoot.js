#!/usr/bin/env node
// Usage: ./shoot.js <url>
// Or: node shoot.js <url>
// Or: npm run shoot -- <url>
// Global usage: npm link && shoot <url>

import puppeteer from "puppeteer";
import chalk from "chalk";

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (e) {
    return false;
  }
}

function createFilenameFromUrl(url) {
  return url
    .replace(/^https?:\/\//, "") // Remove http or https
    .replace(/^www\./, "") // Remove www
    .replace(/\/$/, "") // Remove trailing slash
    .replace(/[\/:.]/g, "_") // Replace other special chars with underscore
    .substring(0, 100); // Limit length to avoid excessively long filenames
}

async function takeScreenshot(url) {
  if (!isValidUrl(url)) {
    console.error(chalk.red("Invalid URL provided."));
    process.exit(1);
  }

  console.log(chalk.blue(`Taking screenshot of ${url}...`));

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0" });

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

    await page.screenshot({
      path: filename,
      type: "webp",
      fullPage: true,
    });

    console.log(
      chalk.green(`Screenshot saved as `) + chalk.green.underline(filename)
    );

    await browser.close();
  } catch (e) {
    console.error(chalk.red("Error taking screenshot:", e.message));
    process.exit(1);
  }
}

const url = process.argv[2];
if (!url) {
  console.error(chalk.yellow("No URL provided. Usage: ./shoot.js <url>"));
  process.exit(1);
}

takeScreenshot(url);
