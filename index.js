import { connectToDb } from "./db/index.js";
import express from "express";

await connectToDb();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
  // tady se bude servovat html
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
