import z from "zod";
import { PercelType } from "../../../generated/prisma/enums";


export const MerchentCreatePercelSchema = z.object({
    name: z.string("Name is required").min(3, "Name must be at least 3 characters long").max(20 , "Name must be at most 20 characters long"),
    notes: z.string("Notes is required").min(3, "Notes must be at least 3 characters long").max(100 , "Notes must be at most 100 characters long").optional(),
    weight: z.number("Weight is required").nonnegative("Weight must be a non-negative number"),
    price: z.number("Price is required").nonnegative("Price must be a non-negative number"),
    deliveryCharge: z.number("Delivery charge is required").nonnegative("Delivery charge must be a non-negative number"),
    pickupLocation: z.string("Pickup location is required").min(3, "Pickup location must be at least 3 characters long").max(100 , "Pickup location must be at most 100 characters long"),
    isSelfPickup: z.boolean("Is self pickup is required"),
    percelType: z.enum(PercelType, "Invalid percel type"),
    reciverName: z.string("Reciver name is required").min(3, "Reciver name must be at least 3 characters long").max(20 , "Reciver name must be at most 20 characters long"),
    reciverContact: z.string("Reciver contact is required").min(11, "Reciver contact must be at least 11 characters long").max(11 , "Reciver contact must be at most 11 characters long"),
    reciverAddress: z.string("Reciver address is required").min(3, "Reciver address must be at least 3 characters long").max(100 , "Reciver address must be at most 100 characters long"),
    pickupTime: z.string("Pickup time is required").min(3, "Pickup time must be at least 3 characters long").max(100 , "Pickup time must be at most 100 characters long"),
    deliveryTime: z.string("Delivery time is required").min(3, "Delivery time must be at least 3 characters long").max(100 , "Delivery time must be at most 100 characters long"),
})