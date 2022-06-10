import { MongoClient } from 'mongodb'

const options  = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxIdleTimeMS: 1000 * 60  // 1 minute.
};

// Configure our client connection.
const baseURI  = process.env.MONGO_DBURI,
      dbName   = process.env.MONGO_DBNAME,
      endpoint = dbName + '?retryWrites=true&w=majority',
      client   = new MongoClient(`${baseURI}/${endpoint}`, options);

// Cache our results for reuse.
let cacheDb, collections;

export async function connect() {
  /** If no cached database exists, 
   *  start new database connection.
   */
  if (!cacheDb || !collections) {
    await client.connect();
    cacheDb = client.db();
    collections = await cacheDb
      .listCollections()
      .toArray();
  }
  return { cacheDb, collections };
}