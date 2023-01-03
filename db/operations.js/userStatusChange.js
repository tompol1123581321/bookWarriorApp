import { getDbClient } from "../connect.js";

const unknownError = { ok: false, error: "Unknown error" };

export const userStatusChange = async (params = {}) => {
  const data = params;
  const DB = getDbClient();
  if (!DB) {
    return unknownError;
  }
  const user = await DB.collection("Users").findOne({ userName: data.u.userName });
  if (data.s === 1) {
    DB.collection("Users").updateOne({ userName: user.userName }, { $set: { status: "ACTIVE" } });
    return { ok: true };
  } else {
    DB.collection("Users").updateOne({ userName: user.userName }, { $set: { status: "BAN" } });
    return { ok: true };
  }
};
