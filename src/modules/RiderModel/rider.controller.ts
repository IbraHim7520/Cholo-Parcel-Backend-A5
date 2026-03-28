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

const handleUpdateRider = async (req:Request , res:Response , next:NextFunction)=>{
    const riderId = req.user?.id as string
    const riderData = req.body;
    try {
        const result = await riderService.updateRider(riderId , riderData)
        if(!result){
            res.status(status.BAD_REQUEST).send({
                success:false,
                message: "Failed to update rider!!",
            })
        }
        res.status(status.OK).send({
            success:true,
            message: "Rider updated successfully."
        })
    } catch (error) {
        next(error)
    }
}

const handleGetRiderProfile = async (req:Request , res:Response , next:NextFunction)=>{
    const userId = req.user?.id as string
    try {
        const result = await riderService.getRiderProfile(userId)
        if(!result){
            res.status(status.BAD_REQUEST).send({
                success:false,
                message: "Failed to get rider profile!!",
            })
        }
        res.status(status.OK).send({
            success:true,
            message: "Rider profile fetched successfully.",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const handleGetMyParcels = async (req:Request , res:Response , next:NextFunction)=>{
    const userId = req.user?.id as string
    try {
        const result = await riderService.getMyParcels(userId)
        if(!result){
            res.status(status.BAD_REQUEST).send({
                success:false,
                message: "Failed to get my parcels!!",
            })
        }
        res.status(status.OK).send({
            success:true,
            message: "My parcels fetched successfully.",
            data: result
        })
    } catch (error) {
        next(error)
    }
}


const handleUpdatePercelStatus = async (req:Request , res:Response , next:NextFunction)=>{
    const percelId = req.params.percelId as string
    const status = req.body.status
    try {
        const result = await riderService.updatePercelStatus(percelId , status)
        if(!result){
            res.status(status.BAD_REQUEST).send({
                success:false,
                message: "Failed to update percel status!!",
            })
        }
        res.status(status.OK).send({
            success:true,
            message: "Percel status updated successfully."
        })
    } catch (error) {
        next(error)
    }
}
export const riderController = {
    handleCreateRider,
    handleChangeRiderStatustoApprove,
    handleChangeRiderStatustoReject,
    handleUpdateRider,
    handleGetRiderProfile,
    handleGetMyParcels,
    handleUpdatePercelStatus
}