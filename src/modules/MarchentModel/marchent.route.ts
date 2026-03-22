import { Router } from "express";
import { marchentController } from "./marchent.controller";
import { CreateMarchentZodSchema, UpdateMarchentZodSchema } from "./marchent.zodSchema";
import ValidateReqBody from "../../middlewere/ValidateZodSchema";

const marchentRouter = Router();

//user accessable
marchentRouter.post('/create-marchent', ValidateReqBody(CreateMarchentZodSchema), marchentController.handleCreateMarchent);

//admin accessable
marchentRouter.patch("/approve-marchent/:id", marchentController.handleApproveMarchent);
marchentRouter.patch("/reject-marchent/:id", marchentController.handleRejectMarchent);

//marchent accessable
marchentRouter.get('/marchent-profile', marchentController.handleGetMarchentProfile)
marchentRouter.delete("/delete-marchent/:id", marchentController.handleDeleteMarchent);
marchentRouter.patch('/update-marchent/:id', ValidateReqBody(UpdateMarchentZodSchema), marchentController.handleUpdateMarchentProfile)

marchentRouter.get("/my-parcels", marchentController.handleGetMyParcels)
//public
export default marchentRouter;