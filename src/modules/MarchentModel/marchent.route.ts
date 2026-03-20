import { Router } from "express";
import { marchentController } from "./marchent.controller";
import { CreateMarchentZodSchema } from "./marchent.zodSchema";
import ValidateReqBody from "../../middlewere/ValidateZodSchema";

const marchentRouter = Router();

//user accessable
marchentRouter.post('/create-marchent', ValidateReqBody(CreateMarchentZodSchema), marchentController.handleCreateMarchent);

//admin accessable
marchentRouter.patch("/approve-marchent/:id", marchentController.handleApproveMarchent);
marchentRouter.patch("/reject-marchent/:id", marchentController.handleRejectMarchent);
//marchent accessable


//public
export default marchentRouter;