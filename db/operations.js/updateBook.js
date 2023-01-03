import { ObjectId } from "mongodb";
import { getDbClient } from "../connect.js";

const unknownError = { ok: false, error: "Unknown error" };

export const updateBook = async (params = {}) => {
    try {
      const client = getDbClient();
      if (!client) {
        return unknownError;
      }
      const book = await client.collection("Books").findOne({ _id: ObjectId(params.id) });
      if(params.status === "rentBook"){
        client.collection("Books").updateOne({ _id: ObjectId(book._id) }, { $set: { BIL: book.BIL - 1 } });
        return { ok: true };
      }
      else if(params.status === "returnBook"){
        await client.collection("Books").updateOne({ _id: ObjectId(book._id) }, { $set: { BIL: book.BIL + 1 } });
        return { ok: true };
      }
    } catch (_) {
      return unknownError;
    }
  };