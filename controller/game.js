import express from "express";
import { StatusCodes } from "http-status-codes";
import GameModel from "../model/game.js";

/**
 * Register controller to register user
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createGame(req, res) {
     const { game_type, players } = req.body;

     // player validations
     if(!players?.length) return res.status(StatusCodes.BAD_REQUEST).send("Players are required.");
     else if(players.length < 2) return res.status(StatusCodes.BAD_REQUEST).send("Atleast 2 players are required.");

     try {
          const game = await GameModel.create({ game_type, players });
          return res.status(StatusCodes.CREATED).json({ game });
     } catch (error) {
          // handle mongoose error
          if (error.name === "ValidationError") return res.status(StatusCodes.BAD_REQUEST).send(error.message);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
     }
}
