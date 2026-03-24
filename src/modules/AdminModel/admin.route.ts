import { Router } from "express";
import { adminController } from "./admin.controller";

const adminRoute = Router();

//admin access
//?ekahen admin er kaj korbo
adminRoute.get("/admin-profile", adminController.handleAdminProfile);


export default adminRoute;