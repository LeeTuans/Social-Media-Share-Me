import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

import upload from "./utils/multer.js";
import connectDB from "./mongodb/connect.js";

import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import pinRouter from "./routes/pin.routes.js";
import saveRouter from "./routes/save.routes.js";
import commentRouter from "./routes/comment.routes.js";

const app = express();

dotenv.config();

app.use(cors());

// for application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// for parsing multipart/form-data and max 5 files upload
app.use(upload.array("upload", 5));

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/pins", pinRouter);
app.use("/api/v1/saved", saveRouter);
app.use("/api/v1/comments", commentRouter);

const startServer = () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on port ${process.env.PORT || 8080}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
