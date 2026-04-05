import { Router } from "express";
import { merchentController } from "./merchent.controller";
import ValidateReqBody from "../../middlewere/ValidateZodSchema";
import { MerchentCreatePercelSchema } from "./merchent.zodSchema";

const merchentRoute = Router();
merchentRoute.post("/create-percels", ValidateReqBody(MerchentCreatePercelSchema) ,merchentController.handleCreatePercel)
merchentRoute.get("/my-percels/:userId", merchentController.handleGetMyPercels)
merchentRoute.delete("/delete-percel/:percelId", merchentController.handleDeletePercel)
merchentRoute.patch("/update-status/:percelId", merchentController.handleUpdateStatus)
merchentRoute.get("/my-reviews", merchentController.handleGetMyReviews)
merchentRoute.delete("/delete-review/:reviewId", merchentController.handleDeleteReview)
export default merchentRoute;