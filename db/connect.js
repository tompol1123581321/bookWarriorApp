import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let dbClient;
const connectToDb = async () => {
  try {
    dbClient = await client.connect();

    console.log("successfully connected to DB");
  } catch (error) {
    console.log("connection failed", error);
    throw new Error("Connection to db failed");
  }
};

const getDbClient = () => {
  if (!dbClient) {
    return;
  }
  return dbClient.db("BookWarriorDB");
};

export { connectToDb, getDbClient };
