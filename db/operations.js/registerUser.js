import { getDbClient } from "../connect.js";
import sha256 from "crypto-js/sha256.js";
import base64 from "crypto-js/enc-base64.js";

export const registerUser = async (userData) => {
  const client = getDbClient();
  const user = {
    ...userData,
    password: sha256(userData.password).toString(base64),
  };
  if (client) {
    await client.collection("Users").insert(user);
  }
};
