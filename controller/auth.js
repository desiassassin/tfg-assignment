// import { Request, Response } from "express";
import express from "express";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import {SQL_DATABASE} from "../db/mysql.js";

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
