import { fileURLToPath } from "url";
import path from "path";

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Path to the screenshots directory
export const screenshotsDir = path.join(__dirname, "../screenshots");
// Port to run the server on
export const PORT = process.env.PORT || 3000;
