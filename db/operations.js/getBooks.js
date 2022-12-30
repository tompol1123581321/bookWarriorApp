import { getDbClient } from "../connect.js";

export const getBooks = async (params = {}) => {
  const client = getDbClient();
  if (client) {
    const data = await client.collection("Books").find(params).toArray();
    return data;
  }
};
