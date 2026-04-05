import z from "zod"
import { ComphanyType, VehicleType } from "../../../generated/prisma/enums"

    // nid String @unique
    // dob String
    // bloodGrouph String ?
    // contact String
    // address String
    // deliveryArea String
    // vehicleType VehicleType @default (BIKE)
    // experience String @default ("No Experience")
    // vehicleNumber String
export const createMerchentZodSchema = z.object({
    ownerName: z.string("Owner name is required").min(3, "Owner name must be at least 3 characters long").max(20 , "Owner name must be at most 20 characters long"),
    ownerEmail: z.email("Owner email is required"),
    ownerImage: z.string().optional(),
    ownerPassword: z.string("Password is required").min(6, "Password must be at least 6 characters long").max(8 , "Password must be at most 8 characters long"),

    comphanyName: z.string("Company name is required").min(3, "Company name must be at least 3 characters long").max(20 , "Company name must be at most 20 characters long"),
    comphanyAddress: z.string("Company address is required").min(3, "Company address must be at least 3 characters long").max(100 , "Company address must be at most 20 characters long"),
    comphanyPhone: z.string("Company phone is required").min(11, "Company phone must be at least 11 characters long").max(11 , "Company phone must be at most 11 characters long"),
    comphanyEmail: z.email("Company email is required"),
    comphanyLogo: z.string().optional(),
    comphanyWebsite: z.string().optional(),
    comphanyDescription: z.string("Company description is required").min(3, "Company description must be at least 3 characters long").max(100 , "Company description must be at most 20 characters long"),
    comphanyType: z.enum(ComphanyType , "Invalid company type"),

})

export const createRiderZodSchema = z.object({
    username: z.string("Username is required").min(3, "Username must be at least 3 characters long").max(20 , "Username must be at most 20 characters long"),
    useremail: z.email("User email is required"),
    userpassword: z.string("Password is required").min(6, "Password must be at least 6 characters long").max(8 , "Password must be at most 8 characters long"),
    userimage: z.string().optional(),
    nid: z.string("NID is required").min(10, "NID must be at least 10 characters long").max(10 , "NID must be at most 10 characters long"),
    dob: z.string("DOB is required").min(10, "DOB must be at least 10 characters long").max(10 , "DOB must be at most 10 characters long"),
    bloodGrouph: z.string("Blood group is required").min(2, "Blood group must be at least 2 characters long").max(3 , "Blood group must be at most 3 characters long"),
    contact: z.string("Contact is required").min(11, "Contact must be at least 11 characters long").max(11 , "Contact must be at most 11 characters long"),
    address: z.string("Address is required").min(3, "Address must be at least 3 characters long").max(100 , "Address must be at most 100 characters long"),
    deliveryArea: z.string("Delivery area is required").min(3, "Delivery area must be at least 3 characters long").max(100 , "Delivery area must be at most 100 characters long"),
    vehicleType: z.enum(VehicleType , "Invalid vehicle type"),
    experience: z.string("Experience is required").min(3, "Experience must be at least 3 characters long").max(100 , "Experience must be at most 100 characters long").optional(),
    vehicleNumber: z.string("Vehicle number is required").min(3, "Vehicle number must be at least 3 characters long").max(100 , "Vehicle number must be at most 100 characters long"),

})