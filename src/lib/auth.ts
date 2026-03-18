import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { env } from "../config/env.js";
import { UserRole, UserStatus } from "../../generated/prisma/enums.js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    baseURL: process.env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    emailAndPassword:{
        enabled:true
    },
    user:{
        additionalFields:{
            role:{
                type: "string",
                required:true,
                defaultValue: UserRole.USER
            },
            status: {
                type: "string",
                required:true,
                defaultValue:UserStatus.ACTIVE,
            },
            isDeleted:{
                type: "boolean",
                required:true,
                defaultValue: false
            },
            deletedAt:{
                type: "date",
                required:false,
                defaultValue: null
            }

        }
    }
});
