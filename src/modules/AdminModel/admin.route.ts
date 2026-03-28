import { Router } from "express";
import { adminController } from "./admin.controller";

const adminRoute = Router();

//admin access
//?ekahen admin er kaj korbo
adminRoute.get("/admin-profile", adminController.handleAdminProfile);
adminRoute.get("/all-users", adminController.handleGetAllUsers);
adminRoute.get("/all-marchent", adminController.handleGetAllMarchent);
adminRoute.get("all-riders", adminController.handleGetAllRiders);
adminRoute.get("/all-parcels", adminController.handleGetAllParcels)
adminRoute.get("/statistics", adminController.handleGetStatistics)

export default adminRoute;