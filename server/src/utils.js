import fs from "fs";
import path from "path";
import cron from "node-cron";
import { screenshotsDir } from "./config.js";

// Check if a string is a valid URL
export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (e) {
    return false;
  }
}

// Create a filename from a URL
export function createFilenameFromUrl(url) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "")
    .replace(/[\/:.]/g, "_")
    .substring(0, 100);
}

// Deletes screenshots older than ageLimit (in milliseconds)
export function cleanupScreenshotsFolder(ageLimit) {
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

// Cron job to cleanup screenshots folder every day at midnight
export function setupCronJobs() {
  cron.schedule("0 0 * * *", () => {
    cleanupScreenshotsFolder(24 * 60 * 60 * 1000); // Delete files older than 24 hours
  });
}
