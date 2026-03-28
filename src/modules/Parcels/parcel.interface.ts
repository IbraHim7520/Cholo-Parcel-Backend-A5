import { PercelType } from "../../../generated/prisma/enums";

export interface ICreateParcel {
    name:string;
    notes?:string;
    weight:number;
    price:number;
    pickupLocation:string;
    isSelfPickup:boolean;
    percelType:PercelType;
    reciverName:string;
    reciverContact:string;
    reciverAddress:string;
    pickupTime:Date;
    deliveryTime:Date;

}
