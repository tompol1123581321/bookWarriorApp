import { books } from "../../books.js";
import { getDbClient } from "../connect.js";

export const loadBooks = async () => {
  const client = getDbClient();
  if (client) {
    await client.collection("Books").insertMany(books);
  }
};
