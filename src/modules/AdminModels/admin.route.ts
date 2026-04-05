import { Router } from "express";
import { adminController } from "./admin.controller";
import { createMerchentZodSchema, createRiderZodSchema } from "./admin.zodSchema";
import ValidateReqBody from "../../middlewere/ValidateZodSchema";
import { verifyRequest } from "../../middlewere/verifyRequest";
import { UserRole } from "../../../generated/prisma/enums";

const adminRoute = Router();

adminRoute.post("/create-merchent", ValidateReqBody(createMerchentZodSchema), adminController.handleCreateMarchent)
adminRoute.post("/create-rider", ValidateReqBody(createRiderZodSchema), adminController.handleCreateRider)
adminRoute.get("/get-merchent-by-request", adminController.handleGetMerchentByRequest)
adminRoute.get("/get-all-merchent", adminController.handleGetAllMerchent)
adminRoute.get("/all-riders", adminController.handleGetAllRiders)
adminRoute.get("/riders-by-request", adminController.handleGetRidersByRequest)
adminRoute.patch("/update-rider-status/:id", adminController.handleUpdateRiderStatus)
adminRoute.delete("/delete-parcel/:id", adminController.handleDeleteParcel)

adminRoute.get("/all-percels" , adminController.handleGetAllPercels)
adminRoute.get("/all-users",  adminController.handleGetAllUsers)
adminRoute.patch("/update-merchent-status/:id", adminController.handleUpdateMerchentStatus);
adminRoute.delete("/delete-user/:id", adminController.handleDeleteUser)
export default adminRoute