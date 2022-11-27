import { connectToDb } from "./db/index.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getUsers } from "./db/operations.js/getUsers.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await connectToDb();

const app = express();
const port = 3001;
const reactBuild = path.join(__dirname, "client", "build");
app.use(express.static(reactBuild));

app.get("/api/ping", async (req, res) => {
  res.send({ message: "pong" });
});

app.get("/api/users", async (req, res) => {
  const users = await getUsers();
  res.send({ users });
});

app.get("*", async (req, res) => {
  res.sendFile(path.join(reactBuild, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
