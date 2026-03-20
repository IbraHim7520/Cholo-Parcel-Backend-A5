import { Router } from "express";
import { riderController } from "./rider.controller";
import ValidateReqBody from "../../middlewere/ValidateZodSchema";
import { createRiderZodSchema } from "./rider.zodSchema";

const riderRoute = Router();


//rider access
riderRoute.post('/create-rider',ValidateReqBody(createRiderZodSchema), riderController.handleCreateRider);

//admin access
riderRoute.patch("/approve-rider/:riderId", riderController.handleChangeRiderStatustoApprove)
riderRoute.patch("/reject-rider/:riderId", riderController.handleChangeRiderStatustoReject)


//user access



export default riderRoute;