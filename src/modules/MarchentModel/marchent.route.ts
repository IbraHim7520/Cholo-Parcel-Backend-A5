import { Router } from "express";
import { marchentController } from "./marchent.controller";

const marchentRouter = Router();

marchentRouter.post('/create-marchent', marchentController.handleCreateMarchent);

export default marchentRouter;