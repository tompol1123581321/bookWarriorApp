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
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.get("/api/ping", async (req, res) => {
  res.send({ message: "pong" });
});

app.get("/api/users", async (req, res) => {
  const users = await getUsers();
  res.send({ users });
});

app.post("/api/logIn", async (req, res) => {
  const body = req.body;
  console.log(body);
  res.send({ ok: true, role: "ADMIN" });
});

app.get("*", async (req, res) => {
  res.sendFile(path.join(reactBuild, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
