import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_DB_URI;

export const connectToDb = async () => {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
    await client.connect();
    console.log("successfully connected to DB");
  } catch (error) {
    console.log("connection failed", error);
  }
};
