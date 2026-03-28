import z from "zod"
import { PercelType } from "../../../generated/prisma/enums"
    // name String @db.VarChar(255)
    // notes String ?
    // weight Float
    // price Int
    // pickupLocation String @db.VarChar(255)
    // isSelfPickup Boolean @default (false)

    // percelType PercelType @default (PAKAGE)

    // reciverName String @db.Text
    // reciverContact String @db.Text
    // reciverAddress String @db.Text
    
    // pickupTime DateTime
    // deliveryTime DateTime
export const createParcelZodSchema = z.object({
    name:z.string().min(1 , "Name is required"),
    notes:z.string().optional(),
    weight:z.number().min(1 , "Weight is required"),
    price:z.number().min(1 , "Price is required"),
    pickupLocation:z.string().min(1 , "Pickup location is required"),
    isSelfPickup:z.boolean().default(false),
    percelType:z.enum(PercelType),
    reciverName:z.string().min(1 , "Reciver name is required"),
    reciverContact:z.string().min(1 , "Reciver contact is required"),
    reciverAddress:z.string().min(1 , "Reciver address is required"),
    pickupTime:z.string().min(1 , "Pickup time is required"),
    deliveryTime:z.string().min(1 , "Delivery time is required")
})