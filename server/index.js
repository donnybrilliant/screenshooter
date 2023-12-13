import express from "express";
import router from "./src/routes.js";
import { setupCronJobs } from "./src/utils.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/screenshots", express.static("screenshots"));
app.use(router);

setupCronJobs();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
