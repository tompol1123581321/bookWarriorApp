import { getDbClient } from "../connect.js";

const unknownError = { ok: false, error: "Unknown error" };

export const returnBook = async (params = {}) => {
    try {
      const client = getDbClient();
      if (!client) {
        return unknownError;
      }
      const result = await client.collection("Users_Books").deleteOne({ bookId: params.id, userId: params.userId })
      return { ok: true };
    } catch (_) {
      return unknownError;
    }
  };