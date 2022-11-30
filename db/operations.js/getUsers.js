import { getDbClient } from "../connect.js";

export const getUsers = async (params = {}) => {
  if (client) {
    const data = await client.collection("Users").find(params).toArray();
    return data;
  }
};
