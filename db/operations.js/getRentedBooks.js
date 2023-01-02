import { getDbClient } from "../connect.js";

export const getRentedBooks = async (params = {}) => {
  const client = getDbClient();
  if (client) {
    const data = await client.collection("Users_Books").find(params).toArray();
    return data;
  }
};
