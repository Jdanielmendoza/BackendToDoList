import express from "express";
import router from "./routes/routes.js";
import "dotenv/config.js";
import cors from "cors";

const whiteList = [process.env.CLIENT1_ACCESS_ALLOW,process.env.CLIENT2_ACCESS_ALLOW];

const app = express();
app.use(
  cors({
    origin: whiteList,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);
app.use(express.json());
app.use("/api-v1", router);

export default app;
