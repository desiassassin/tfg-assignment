import { Router } from "express";
import { register } from "../controller/auth.js";

const authRouter = Router();

authRouter.post("/register", register);

export default authRouter;