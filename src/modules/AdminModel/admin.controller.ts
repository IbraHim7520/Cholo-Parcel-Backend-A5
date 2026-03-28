import { NextFunction, Request, Response } from "express"
import { adminService } from "./admin.service"
import status from "http-status";

const handleAdminProfile = async(req:Request , res:Response , next:NextFunction)=>{
    const userId = req.user?.id as string
    try {
        const data = await adminService.getAdminProfile(userId);
        if(!data?.id){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Admin not found",
                data:data
            })
        }

        res.status(status.OK).send({
            success:true,
            message: "Admin profile fetched successfully",
            data:data
        })
    } catch (error) {
        next(error)   
    }

}

const handleGetAllUsers = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const users = await adminService.getAllUsers();
        if(!users){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Users not found",
                data:users
            })
        }
        res.status(status.OK).send({
            success:true,
            message: "Users fetched successfully",
            data:users
        })
    } catch (error) {
        next(error)
    }
}

const handleGetAllMarchent = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const marchents = await adminService.getAllMarchent();
        if(!marchents){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Marchents not found",
                data:marchents
            })
        }
        res.status(status.OK).send({
            success:true,
            message: "Marchents fetched successfully",
            data:marchents
        })
    } catch (error) {
        next(error)
    }
}

const handleGetAllRiders = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const riders = await adminService.getAllRiders();
        if(!riders){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Riders not found",
                data:riders
            })
        }
        res.status(status.OK).send({
            success:true,
            message: "Riders fetched successfully",
            data:riders
        })
    } catch (error) {
        next(error)
    }
}

    const handleGetStatistics = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const statistics = await adminService.getStatistics();
        if(!statistics){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Statistics not found",
                data:statistics
            })
        }
        res.status(status.OK).send({
            success:true,
            message: "Statistics fetched successfully",
            data:statistics
        })
    } catch (error) {
        next(error)
    }
}

const handleGetAllParcels = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const parcels = await adminService.getAllParcels();
        if(!parcels){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Parcels not found",
                data:parcels
            })
        }
        res.status(status.OK).send({
            success:true,
            message: "Parcels fetched successfully",
            data:parcels
        })
    } catch (error) {
        next(error)
    }
}   
export const adminController = {
    handleAdminProfile,
    handleGetAllUsers,
    handleGetAllMarchent,
    handleGetAllRiders,
    handleGetStatistics,
    handleGetAllParcels
}