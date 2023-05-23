const { MongoClient } = require('mongodb');
const { URL } = require('url');

const connectionUrl = 'mongodb+srv://Byunk:MvvTElsik7syWhhh@boa-main-cluster.8qsc1tg.mongodb.net/?retryWrites=true&w=majority';

function extractDbAndCollectionNames(connectionString) {
  const url = new URL(connectionString);
  const pathSegments = url.pathname.split('/').filter(segment => segment !== '');

  const dbName = pathSegments[0];
  const collectionNames = pathSegments.slice(1);

  return {
    db: dbName,
    collections: collectionNames,
  };
}

const { db, collections } = extractDbAndCollectionNames(connectionUrl);

console.log('Database:', db);
console.log('Collections:', collections);


// async function queryMongoDB() {
  
//   const client = new MongoClient(DB_HOST);

//   try {
//     // Connect to the MongoDB server
//     await client.connect();
//     console.log('Connected to MongoDB');

//     // Access the desired database and collection
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Perform a query to retrieve documents
//     const query = { key: 'value' };
//     const documents = await collection.find(query).toArray();

//     // Process the retrieved documents
//     console.log(documents);
//   } catch (error) {
//     console.error('Error querying MongoDB:', error);
//   } finally {
//     // Close the connection to the MongoDB server
//     await client.close();
//     console.log('Disconnected from MongoDB');
//   }
// }

// queryMongoDB();