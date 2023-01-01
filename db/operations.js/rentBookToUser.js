import { getDbClient } from "../connect.js";

const unknownError = { ok: false, error: "Unknown error" };

export const rentBookToUser = async (userData) => {
  try {
    const client = getDbClient();
    if (!client) {
      return unknownError;
    }
    console.log(userData);
    const user_books = {
      ...userData
    };
/*     const rentCollection = client.collection("Users_Books");
    const duplicatedRent = await rentCollection
      .find({
        $or: [
          { birthNumber: userData.birthNumber },
          { password: user.password },
          { userName: user.userName },
        ],
      })
      .toArray();
    if (duplicatedRent.length > 0) {
      return {
        ok: false,
        error: "Duplicated password, username or birth number",
      };
    } */
    await client.collection("Users_Books").insertOne(user_books);
    return { ok: true };
  } catch (_) {
    return unknownError;
  }
};
