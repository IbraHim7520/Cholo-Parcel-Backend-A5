import { Router } from "express";
import { adminController } from "./admin.controller";

const adminRoute = Router();

//admin access
//?ekahen admin er kaj korbo
adminRoute.get("/admin-profile", adminController.handleAdminProfile);
adminRoute.get("/all-users", adminController.handleGetAllUsers);

adminRoute.get("/all-marchents", adminController.handleGetAllMarchent);
adminRoute.get("/all-riders", adminController.handleGetAllRiders);
adminRoute.get("/all-parcels", adminController.handleGetAllParcels)
adminRoute.get("/statistics", adminController.handleGetStatistics)

adminRoute.patch("/update-user/:id", adminController.handleUpdateUser)

adminRoute.patch("/assign/:riderId", adminController.handleAssignRider)
adminRoute.patch("/marchent-status/:id", adminController.handleMarchentStatus)
adminRoute.post("/create-notification", adminController.handleCreateNotification)
export default adminRoute;  