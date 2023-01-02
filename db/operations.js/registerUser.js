import { getDbClient } from "../connect.js";
import sha256 from "crypto-js/sha256.js";
import base64 from "crypto-js/enc-base64.js";

const unknownError = { ok: false, error: "Unknown error" };

export const registerUser = async (userData) => {
  try {
    const client = getDbClient();
    if (!client) {
      return unknownError;
    }
    const user = {
      ...userData,
      password: sha256(userData.password).toString(base64),
      role: "VISITOR",
      status: "INACTIVE"
    };
    const userCollection = client.collection("Users");
    const duplicatedUsers = await userCollection
      .find({
        $or: [
          { birthNumber: userData.birthNumber },
          { password: user.password },
          { userName: user.userName },
        ],
      })
      .toArray();
    if (duplicatedUsers.length > 0) {
      return {
        ok: false,
        error: "Duplicated password, username or birth number",
      };
    }
    await client.collection("Users").insertOne(user);
    return { ok: true };
  } catch (_) {
    return unknownError;
  }
};
