import { Router } from "express";
import authRouter from "./authRouter.js";
import linkRouter from "./linksRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(linkRouter);

export default router;
