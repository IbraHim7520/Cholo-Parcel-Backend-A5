import { Router } from "express";
import { parcelController } from "./parcel.controller";
import { createParcelZodSchema } from "./parcel.zodSchema";
import ValidateReqBody from "../../middlewere/ValidateZodSchema";

const parcelRoute = Router();

parcelRoute.post("/create-parcel", ValidateReqBody(createParcelZodSchema), parcelController.handleCreateParcel);
parcelRoute.get("/all-parcels", parcelController.handleGetAllParcels);
parcelRoute.get("/query-parcel", parcelController.handleQueryParcel);
export default parcelRoute;