import { NextFunction, Request, Response } from "express"
import { riderService } from "./rider.service";
import status from "http-status";
import { env } from "../../config/env";
import { createJWTToken } from "../../utils/jwtToken";
import { SendCookies } from "../../utils/Cookie";

const handleCreateRider =async (req:Request , res:Response , next:NextFunction)=>{
    const riderData = req.body;
    try {
        const riderCreateResult = await riderService.createRider(riderData);
        if(!riderCreateResult){
            res.status(status.BAD_REQUEST).send({
                success:false,
                message: "Failed to create request!!",
            })
        }

        const accessToken = createJWTToken(riderCreateResult.isUserloggedin , { expiresIn: "24h" });
        const refreshToken = createJWTToken(riderCreateResult.isUserloggedin,  { expiresIn: "7d" });
        SendCookies(res , "accessToken", accessToken , {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly:true,
            secure: env.NODE_ENV === "production",
            sameSite:"strict"
        })
        SendCookies(res , "refreshToken", refreshToken , {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            secure: env.NODE_ENV === "production",
            sameSite:"strict"
        })
        res.status(status.OK).send({
            success:true,
            message: "Request Submitted successfully."
        })
    } catch (error) {
        next(error)
    }
}


const handleChangeRiderStatustoApprove = async (req:Request , res:Response , next:NextFunction)=>{
    const riderId = req.params.riderId as string
    try {
        const result = await riderService.changeRiderStatustoApprove(riderId);
        if(!result){
            res.status(status.BAD_REQUEST).send({
                success:false,
                message: "Failed to change status!!",
            })
        }

        res.status(status.OK).send({
            success:true,
            message: "Status changed to Approved successfully."
        })
    } catch (error) {
        next(error)
    }
}

const handleChangeRiderStatustoReject = async (req:Request , res:Response , next:NextFunction)=>{
    const riderId = req.params.riderId as string
    try {
        const result = await riderService.changeRiderStatustoReject(riderId);
        if(!result){
            res.status(status.BAD_REQUEST).send({
                success:false,
                message: "Failed to change status!!",
            })
        }

        res.status(status.OK).send({
            success:true,
            message: "Status changed to Rejected successfully."
        })
    } catch (error) {
        next(error)
    }
}
export const riderController = {
    handleCreateRider,
    handleChangeRiderStatustoApprove,
    handleChangeRiderStatustoReject
}