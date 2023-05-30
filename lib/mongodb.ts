import { MongoClient } from "mongodb";
const url: string = process.env.MONGODB_URL || "";
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URL) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(url, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
  console.log("MongoDB Connected in Development Mode");
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(url, options);
  clientPromise = client.connect();
  console.log("MongoDB Connected in Production Mode");
}

export default clientPromise;
