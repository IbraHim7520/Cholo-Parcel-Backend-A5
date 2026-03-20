import z from 'zod'
import { userSignupSchema } from '../UserModel/user.zodschema'
import { VehicleType } from '../../../generated/prisma/enums'

export const createRiderZodSchema = z.object({
    riderSignupData: userSignupSchema,
    riderInfoData: z.object({
        nid: z.string("NID Number is required").min(9, "NID Number must be at least 9 digits").max(17, "NID Number must be at most 17 digits"),
        dob:z.string("Date of Birth is required").refine((value)=>{
            const date = new Date(value)
            const today = new Date()
            const age = today.getFullYear() - date.getFullYear()
            return age >= 18
        }, "You must be at least 18 years old"),
        bloodGrouph:z.string("Blood Grouph is required"),
        contact:z.string("Contact Number is required").min(11, "Contact Number must be at least 11 digits").max(11, "Contact Number must be at most 11 digits"),
        address:z.string("Address is required"),
        deliveryArea:z.string("Delivery Area is required"),
        experience:z.string("Experience is required").optional(),
        vehicleType:z.enum(VehicleType),
        vehicleNumber:z.string("Vehicle Number is required"),
    })
})