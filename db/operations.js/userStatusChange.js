import { getDbClient } from "../connect.js";

export const userStatusChange = async (params = {}) => {
  const data = params;
  const DB = getDbClient();
  const user = await DB.collection("Users").findOne({ userName: data.u.userName });
  if (data.s === 1) {
    DB.collection("Users").updateOne({ userName: user.userName }, { $set: { status: "ACTIVE" } });
  } else {
    DB.collection("Users").updateOne({ userName: user.userName }, { $set: { status: "BAN" } });
  }
  console.log(user);
};
