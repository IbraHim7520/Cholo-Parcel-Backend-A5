// export const createMerchentZodSchema = z.object({
//     ownerName: z.string("Owner name is required").min(3, "Owner name must be at least 3 characters long").max(20 , "Owner name must be at most 20 characters long"),
//     ownerEmail: z.email("Owner email is required"),
//     ownerImage: z.string().optional(),
//     ownerPassword: z.string("Password is required").min(6, "Password must be at least 6 characters long").max(8 , "Password must be at most 8 characters long"),

import { ComphanyType, VehicleType } from "../../../generated/prisma/enums";

export interface IAdminCreateMerchent  {
    ownerName: string;
    ownerEmail: string;
    ownerImage: string;
    ownerPassword: string;
    comphanyName: string;
    comphanyAddress: string;
    comphanyPhone: string;
    comphanyEmail: string;
    comphanyLogo: string;
    comphanyWebsite: string;
    comphanyDescription: string;
    comphanyType: ComphanyType;
}


export interface IAdminCreateRider {
    username: string;
    useremail: string;
    userpassword: string;
    userimage: string;
    nid: string;
    dob: string;
    bloodGrouph: string;
    contact: string;
    address: string;
    deliveryArea: string;
    vehicleType: VehicleType;
    experience: string;
    vehicleNumber: string;
}