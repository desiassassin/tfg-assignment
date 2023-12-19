import { Router } from "express";
import {createGame} from "../controller/game.js";
import {isUserAuthorized} from "../middlewares/auth.js";

const gameRouter = Router();

// add global auth middleware
gameRouter.use(isUserAuthorized);

gameRouter.post("/", createGame);

export default gameRouter;