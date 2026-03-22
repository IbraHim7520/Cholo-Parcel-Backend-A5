import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/prisma/enums";
import status from "http-status";
import { prisma } from "../lib/prisma";
import { tokenVerify } from "../utils/jwtToken";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: UserRole;
                createdAt: Date;
                updatedAt: Date;
            };
        }
    }
}

export const verifyRequest = (...allowedRoles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.cookies?.accessToken;

            if (!accessToken) {
                return res.status(status.UNAUTHORIZED).send({
                    success: false,
                    message: "Unauthorized! No access token."
                });
            }

            const decoded = tokenVerify(accessToken);

            if (!decoded) {
                return res.status(status.UNAUTHORIZED).send({
                    success: false,
                    message: "Unauthorized! Invalid token."
                });
            }

            const sessionToken = req.cookies?.['better-auth_session.token'];
            if(!sessionToken){
                return res.status(status.UNAUTHORIZED).send({
                    success: false,
                    message: "Unauthorized! No session token."
                });
            }

            const sessionData = await prisma.session.findUnique({
                where:{
                    token: sessionToken
                },
                include:{
                    user:true
                }
            })

            // ✅ attach user
            req.user = {
                id: sessionData?.user.id as string,
                email: sessionData?.user.email as string,
                role: sessionData?.user.role as UserRole,
                name: sessionData?.user.name as string,
                createdAt: sessionData?.user.createdAt as Date,
                updatedAt: sessionData?.user.updatedAt as Date
            };

            // ✅ role check
            if (allowedRoles.length && !allowedRoles.includes(sessionData?.user.role as UserRole)) {
                return res.status(status.FORBIDDEN).send({
                    success: false,
                    message: "Forbidden! You are not allowed."
                });
            }

            next();

        } catch (error) {
            next(error);
        }
    };
};