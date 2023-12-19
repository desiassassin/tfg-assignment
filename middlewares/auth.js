import express from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

/**
 * middleware to check if user is authenticated or not
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const isUserAuthorized = (req, res, next) => {
     const { authorization } = req.headers;

     if(!authorization) return res.status(StatusCodes.BAD_REQUEST).send("No auth header present.");

     const [type, accessToken] = authorization.split(" ");

     if(type !== "Bearer") return res.status(StatusCodes.BAD_REQUEST).send("Invalid token type.");

     if (!accessToken) return res.sendStatus(StatusCodes.UNAUTHORIZED);

     try {
          req.user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
     } catch (error) {
          return res.sendStatus(StatusCodes.UNAUTHORIZED);
     }

     next();
};
