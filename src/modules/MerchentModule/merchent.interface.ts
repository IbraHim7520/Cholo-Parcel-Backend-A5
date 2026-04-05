import { PercelType } from "../../../generated/prisma/enums";

export interface ICreateParcel {
    name: string;
    notes?: string;
    weight: number;
    price: number;
    deliveryCharge: number;
    pickupLocation: string;
    isSelfPickup: boolean;

    percelType: PercelType;

    reciverName: string;
    reciverContact: string;
    reciverAddress: string;

    pickupTime: string;   // ISO Date string
    deliveryTime: string; // ISO Date string

    merchentId: string;
}