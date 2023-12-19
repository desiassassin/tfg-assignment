// import { Request, Response } from "express";
import express from "express";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { SQL_DATABASE } from "../db/mysql.js";
import JWT from "jsonwebtoken";

/**
 * Register controller to register user
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function register(req, res) {
     const { username, email, password } = req.body;

     if (!username || !email || !password) return res.status(StatusCodes.BAD_REQUEST).send("Please fill out all the details.");

     try {
          // Checking if username and email already exist
          const [existingUsers] = await SQL_DATABASE.execute("SELECT * FROM users WHERE username = ? OR email = ?", [username, email]);

          if (existingUsers.length > 0) return res.status(StatusCodes.BAD_REQUEST).send("Username or email already exists");

          // hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Inserting the user data into the mysql
          const [result] = await SQL_DATABASE.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [
               username,
               email,
               hashedPassword
          ]);

          return res.status(StatusCodes.CREATED).send("User registered.");
     } catch (error) {
          console.log(error);
          return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
     }
}

/**
 * Login controller to send JWT to the authed user
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function login(req, res) {
     try {
          const { email, password } = req.body;

          // Validating the data
          if (!email || !password) return res.status(StatusCodes.BAD_REQUEST).send("Please fill out all the details.");

          // Fetching the users data from the database
          const [users] = await SQL_DATABASE.execute("SELECT * FROM users WHERE email = ?", [email]);

          if (users.length === 0) return res.status(StatusCodes.UNAUTHORIZED).send("Wrong email or password.");

          const user = users[0];

          // Comparing passwords
          const passwordMatched = await bcrypt.compare(password, user.password);

          if (!passwordMatched) return res.status(StatusCodes.UNAUTHORIZED).send("Wrong email or password.");

          // Create an access token
          const accessToken = JWT.sign({ userID: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });

          return res.status(200).json({ accessToken });
     } catch (error) {
          console.log(error);
          return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
     }
}
