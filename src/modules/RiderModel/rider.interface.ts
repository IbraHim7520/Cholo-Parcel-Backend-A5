import { VehicleType } from "../../../generated/prisma/enums";

export interface ICreateRider {
    nid:string,
    dob:string,
    bloodGrouph:string,
    contact:string,
    address:string,
    deliveryArea:string,
    experience?:string,
    vehicleType: VehicleType,
    vehicleNumber:string,
    userId:string
}


export interface IUpdateRiderProfile {
    nid?:string,
    dob?:string,
    bloodGrouph?:string,
    contact?:string,
    address?:string,
    deliveryArea?:string,
    experience?:string,
    vehicleType?: VehicleType,
    vehicleNumber?:string  
}

export interface IUpdateParcelStatus {
    status: string
}