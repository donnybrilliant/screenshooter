import express from "express";
import { takeScreenshot, cleanupScreenshots } from "./controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("use /shoot?url=... to take a screenshot");
});
router.get("/shoot", takeScreenshot);
router.get("/cleanup", cleanupScreenshots);

export default router;
