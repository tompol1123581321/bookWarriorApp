import { connectToDb } from "./db/index.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
//import  {users}  from "./books.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongo = await connectToDb();

const app = express();
const port = 3001;
const reactBuild = path.join(__dirname, "client", "build");
app.use(express.static(reactBuild));

const DBinstance = mongo.db("BookWarriorDB").collection("Users");
const x = mongo.db("BookWarriorDB").collection("Users");

//mongo.db("BookWarriorDB").collection("Users").insertMany(users);
//console.log(users)
app.get("/api", async (req, res) => {
  res.send({ message: "Hello" });
});

app.get("*", async (req, res) => {
  res.sendFile(path.join(reactBuild, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
