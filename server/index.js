import express from "express";
import puppeteer from "puppeteer";
import cron from "node-cron";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, "screenshots");

const app = express();
const PORT = process.env.PORT || 3000;

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

app.use("/screenshots", express.static(screenshotsDir));

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
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "")
    .replace(/[\/:.]/g, "_")
    .substring(0, 100);
}

app.get("/shoot", async (req, res) => {
  const url = req.query.url;

  if (!isValidUrl(url)) {
    return res.status(400).send("Invalid URL provided");
  }

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
    const filepath = path.join(screenshotsDir, filename);

    await page.screenshot({ path: filepath, type: "webp", fullPage: true });
    await browser.close();

    res.json({ screenshotUrl: `/screenshots/${filename}` });
  } catch (e) {
    console.error("Error taking screenshot:", e.message);
    res.status(500).send("Error taking screenshot");
  }
});

function cleanupScreenshots(ageLimit) {
  fs.readdir(screenshotsDir, (err, files) => {
    if (err) {
      console.error("Error reading screenshots directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(screenshotsDir, file);
      const stats = fs.statSync(filePath);
      const now = new Date().getTime();
      const fileAge = now - new Date(stats.ctime).getTime();

      if (fileAge > ageLimit) {
        fs.unlink(filePath, (err) => {
          if (err) console.error(`Error deleting file ${file}:`, err);
          else console.log(`File ${file} deleted successfully.`);
        });
      }
    });
  });
}

// For manual cleanup
app.get("/cleanup", (req, res) => {
  cleanupScreenshots(0); // Immediately delete all files
  res.send("Cleanup process started.");
});

// For scheduled cleanup
cron.schedule("0 0 * * *", () => {
  cleanupScreenshots(24 * 60 * 60 * 1000); // Delete files older than 24 hours
});

app.get("/", (req, res) => {
  res.send("use /shoot?url=... to take a screenshot");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
