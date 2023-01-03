import { connectToDb } from "./db/index.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getUsers } from "./db/operations.js/getUsers.js";
import { getBooks } from "./db/operations.js/getBooks.js"
import { getRentedBooks } from "./db/operations.js/getRentedBooks.js";
import { registerUser } from "./db/operations.js/registerUser.js";
import { rentBookToUser } from "./db/operations.js/rentBookToUser.js";
import { userStatusChange } from "./db/operations.js/userStatusChange.js";
import { loginUser } from "./db/operations.js/login.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await connectToDb();

const app = express();
const port = 3001;
const reactBuild = path.join(__dirname, "client", "build");
app.use(express.static(reactBuild));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Id of current logged user
let currentUserId;

app.get("/api/ping", async (req, res) => {
  res.send({ message: "pong" });
});

app.get("/api/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.get("/api/books", async(req,res)=>{
  const books = await getBooks();
  res.send(books);
})

app.post("/api/statusChange", async(req,res)=>{
  await userStatusChange(req.body);
})

app.get("/api/currentUserId", async(req,res)=>{
  res.send(currentUserId);
})

app.get("/api/getRentedBooks", async(req,res)=>{
  const rented = await getRentedBooks();
  res.send(rented);
})

app.post("/api/logIn", async (req, res) => {
  const body = req.body;
  const loginResponse = await loginUser(body);
  currentUserId = loginResponse.id;
  res.send(loginResponse);
});

app.post("/api/register", async (req, res) => {
  const body = req.body;
  const response = await registerUser(body);
  res.send(response);
});

app.post("/api/rent", async (req, res)=>{
  const body = req.body;
  const response = await rentBookToUser(body);
  res.send(response);
})

app.get("*", async (req, res) => {
  res.sendFile(path.join(reactBuild, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
