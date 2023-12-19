import mongoose from "mongoose";

export default async function connectMongoDB() {
     try {
          await mongoose.connect(process.env.MONGOD_DB_URL, { autoCreate: true });
          console.log("Connected to MongoDB Atlas Cloud Database");
     } catch (error) {
          console.log(`Error connecting to MongoDB Atlas Cloud Database. ${error}`);
          process.exit();
     }
}