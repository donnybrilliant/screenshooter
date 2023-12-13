import express from "express";
import cors from "cors";
import router from "./src/routes.js";
import { setupCronJobs } from "./src/utils.js";
import { PORT } from "./src/config.js";

const app = express();

app.use(cors());
app.use("/screenshots", express.static("screenshots"));
app.use(router);

setupCronJobs();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
