import { Router } from "express";
import { parcelController } from "./parcel.controller";
import { createParcelZodSchema } from "./parcel.zodSchema";
import ValidateReqBody from "../../middlewere/ValidateZodSchema";
import { verifyRequest } from "../../middlewere/verifyRequest";
import { UserRole } from "../../../generated/prisma/enums";

const parcelRoute = Router();

parcelRoute.post("/create-parcel", ValidateReqBody(createParcelZodSchema), parcelController.handleCreateParcel);
parcelRoute.get("/all-parcels", parcelController.handleGetAllParcels);
parcelRoute.get("/query-parcel", parcelController.handleQueryParcel);

parcelRoute.get("/marchent-parcel", parcelController.handleGetMarchentParcel)



export default parcelRoute;