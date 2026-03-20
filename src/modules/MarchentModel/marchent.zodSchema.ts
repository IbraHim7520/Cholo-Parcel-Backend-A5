import z from "zod";
import { ComphanyType } from "../../../generated/prisma/enums";

export const CreateMarchentZodSchema = z.object({
    ComphanyName: z.string().min(3, "Company name must be at least 3 characters long"),
    ComphanyAddress: z.string().min(3, "Company address must be at least 3 characters long"),
    ComphanyPhone: z.string().min(11, "Company phone must be at least 11 characters long"),
    ComphanyEmail: z.email("Invalid email address"),
    ComphanyLogo: z.string().optional(),
    ComphanyWebsite: z.url("Invalid URL"),
    ComphanyDescription: z.string().min(10, "Company description must be at least 10 characters long"),
    ComphanyType: z.enum(ComphanyType),
    ownerId: z.string("Owner ID is required"),
})