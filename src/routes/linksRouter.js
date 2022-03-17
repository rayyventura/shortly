import { Router } from "express";
import { postLink } from "../controllers/linksController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import linkSchema from "../schemas/linkSchema.js";

const linkRouter = Router();
linkRouter.post(
  "/urls/shorten",
  validateTokenMiddleware,
  validateSchemaMiddleware(linkSchema),
  postLink
);

export default linkRouter;