import { getDbClient } from "../connect.js";
import sha256 from "crypto-js/sha256.js";
import base64 from "crypto-js/enc-base64.js";


export const loginUser = async (userData) => {
  const client = getDbClient();
  
/*
  return { ok: true, role: "VISITOR"};
  return { ok: true, role: "ADMIN"};
*/
  if (client) {
    const user = await client
      .collection("Users")
      .findOne({ userName: userData.userName });
    
    if (user) {
      const hashedPassword = sha256(userData.password).toString(base64);
      return {
        id: user._id,
        ok: hashedPassword === user.password,
        role: user.role,
      };
    }
  }
  return { ok: false };
};
