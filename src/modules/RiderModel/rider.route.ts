import { Router } from "express";
import { riderController } from "./rider.controller";

const riderRoute = Router();


//rider access
riderRoute.post('/create-rider', riderController.handleCreateRider);

//admin access
riderRoute.patch("/approve-rider/:riderId", riderController.handleChangeRiderStatustoApprove)
riderRoute.patch("/reject-rider/:riderId", riderController.handleChangeRiderStatustoReject)


//user access



export default riderRoute;