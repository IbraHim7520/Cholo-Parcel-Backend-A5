import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { prisma } from "../lib/prisma";
import { tokenVerify } from "../utils/jwtToken";
import { UserRole } from "../../generated/prisma/enums";

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
            const accessToken = req.cookies.accessToken;
            
            if (!accessToken) {
                return res.status(status.UNAUTHORIZED).json({
                    success: false,
                    message: "Unauthorized! No access token.",
                });
            }

            const decoded = tokenVerify(accessToken);

            if (!decoded) {
                return res.status(status.UNAUTHORIZED).json({
                    success: false,
                    message: "Unauthorized! Invalid token.",
                });
            }

            const sessionToken = req.cookies?.["better-auth.session_token"];

            if (!sessionToken) {
                return res.status(status.UNAUTHORIZED).json({
                    success: false,
                    message: "Unauthorized! No session token.",
                });
            }

            const sessionData = await prisma.session.findUnique({
                where: {
                    token: sessionToken,
                },
                include: {
                    user: true,
                },
            });

            // ❗ Important check
            if (!sessionData || !sessionData.user) {
                return res.status(status.UNAUTHORIZED).json({
                    success: false,
                    message: "Unauthorized! Session not found.",
                });
            }

            // ✅ attach user safely
            req.user = {
                id: sessionData.user.id,
                email: sessionData.user.email,
                role: sessionData.user.role,
                name: sessionData.user.name,
                createdAt: sessionData.user.createdAt,
                updatedAt: sessionData.user.updatedAt,
            };

            // ✅ role check
            if (
                allowedRoles.length &&
                !allowedRoles.includes(sessionData.user.role)
            ) {
                return res.status(status.FORBIDDEN).json({
                    success: false,
                    message: "Forbidden! You are not allowed.",
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};