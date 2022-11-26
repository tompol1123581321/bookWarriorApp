import { connectToDb } from "./db/index.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongo = await connectToDb();

const app = express();
const port = 3000;
mongo.db("").collection("").insertMany([{}]);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
  // tady se bude servovat html
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
