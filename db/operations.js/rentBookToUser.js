import { getDbClient } from "../connect.js";

const unknownError = { ok: false, error: "Unknown error" };

export const rentBookToUser = async (userData) => {
  try {
    const client = getDbClient();
    if (!client) {
      return unknownError;
    }
    const user_books = {
      ...userData
    };
    
    await client.collection("Users_Books").insertOne(user_books);
    return { ok: true };
  } catch (_) {
    return unknownError;
  }
};
