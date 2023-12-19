import "dotenv/config";
import express from "express";
import connectMongoDB from "./db/mongodb.js";
import connectMYSQL from "./db/mysql.js";
import authRouter from "./route/auth.js";

const app = express();

// MIDDLEWARES
app.use(
     express.json({
          limit: "50mb"
     })
);
app.use(
     express.urlencoded({
          limit: "50mb",
          parameterLimit: 100000,
          extended: false
     })
);

// routers
app.use("/auth", authRouter);

/**
 * Connect database else shutdown the server
 */
await connectMongoDB();
await connectMYSQL();

// LISTENING PORT
app.listen(3001, () => console.log("Server running on PORT 3001"));
