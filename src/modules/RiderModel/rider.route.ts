import { Router } from "express";
import { riderController } from "./rider.controller";
import ValidateReqBody from "../../middlewere/ValidateZodSchema";
import { createRiderZodSchema, UpdatePercelStatusZodSchema, updateRiderZodSchema } from "./rider.zodSchema";

const riderRoute = Router();


//rider access
riderRoute.post('/create-rider',ValidateReqBody(createRiderZodSchema), riderController.handleCreateRider);

//admin access
riderRoute.patch("/approve-rider/:riderId", riderController.handleChangeRiderStatustoApprove)
riderRoute.patch("/reject-rider/:riderId", riderController.handleChangeRiderStatustoReject)


//rider access
riderRoute.patch('/update-profile', ValidateReqBody(updateRiderZodSchema), riderController.handleUpdateRider)
riderRoute.get('/profile', riderController.handleGetRiderProfile)


riderRoute.get("/my-parcels", riderController.handleGetMyParcels);

riderRoute.patch("update-percel-status/:percelId", ValidateReqBody(UpdatePercelStatusZodSchema), riderController.handleUpdatePercelStatus)

export default riderRoute;


