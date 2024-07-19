import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

let client: MongoClient;

export async function getMongoDbInstance() {
    if (!uri) {
        throw new Error(
            "Please define the MONGODB_CONNECTION_STRING environment variable inside .env.local"
        );
    }
    if (!client) {
        // Connect the client to the server (optional starting in v4.7)
        client = await MongoClient.connect(uri);
        await client.connect();
    }
    // Send a ping to confirm a successful connection
    return client;
}

// ==== cara ke 2=====
// import { MongoClient } from "mongodb";
// // const uri =
// //  "mongodb+srv://mspadilapadlidev:zoPeMOS5XZkgn9ZE@cluster0.nhsjhxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const uri = process.env.MONGODB_URI;
// if (!uri) {
//     throw new Error("Please define the MongoDB uri connection");
// }

// // Create a new client and connect to MongoDB
// export const client = new MongoClient(uri);
// export const database = client.db("buybuy-app");
