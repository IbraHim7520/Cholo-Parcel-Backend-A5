import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/prisma/enums";
import status from "http-status";
import { prisma } from "../lib/prisma";
import { deocodeToken, tokenVerify } from "../utils/jwtToken";

declare global {
    namespace Express {
        interface Request {
            user: {
                id:string,
                name:string,
                email:string,
                role:UserRole,
                createdAt: Date,
                updatedAt: Date
            }
        }
    }
}

export const verifyRequest = (...UserRoles:UserRole[])=>{
    return async(req:Request , res:Response , next: NextFunction)=>{
        const accessToken = req.cookies["accessToken"];
        const sessionToken = req.cookies["better-auth_session.token"];
        const refreshToken = req.cookies["refreshToken"];
        if(!sessionToken){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Unauthorized access! No Session Token Provided."
            })
        }

        if(!accessToken){
           return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Unauthorized access! No Access Token Provided."
            })
        }

        if(!refreshToken){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Unauthorized access! No Refresh Token Provided."
            })
        }

        const decodedAccessToken = tokenVerify(accessToken);
        const decodedRefreshToken = tokenVerify(refreshToken);

        if(!decodedAccessToken || !decodedRefreshToken){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Unauthorized access! Invalid Token."
            })
        }

        const decodeAccessTokenData = deocodeToken(accessToken);
        const decodeRefreshTokenData = deocodeToken(refreshToken);
        
        const existUser = await prisma.session.findUnique({
            where:{
                token: sessionToken
            },
            include:{
                user:true
            }
        })
        const userData = existUser?.user;
        if(!userData){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Unauthorized access! No User Found."
            })
        }
        
        req.user = {
            id: userData.id,
            email: userData.email,
            role: userData.role,
            name: userData.name,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt
        }

        if(UserRoles.length > 0 && !UserRoles.includes(userData.role)){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Unauthorized access! No User Found."
            })
        }


        next();
    }
}

export default verifyRequest;