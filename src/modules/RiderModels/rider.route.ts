import { Router } from "express";
import { riderController } from "./rider.controller";

const riderRoute = Router();


riderRoute.get("/requested-percels", riderController.handleGetRequestedPercels)
riderRoute.patch("/accept-percel/:id", riderController.handleAcceptPercel)
riderRoute.get("/my-percels", riderController.handleMyPercels)
export default riderRoute;