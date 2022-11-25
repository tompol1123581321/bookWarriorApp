import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv' 
dotenv.config()




const uri = process.env.MONGO_DB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('connected',collection,err)

  // perform actions on the collection object
  client.close();
});
