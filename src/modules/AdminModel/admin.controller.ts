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

const handleUpdateUser = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const {id} = req.params;
        const payload = req.body;
        const updatedUser = await adminService.updateUser(id as string, payload);
        if(!updatedUser){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "User not found",
                data:updatedUser
            })
        }
        res.status(status.OK).send({
            success:true,
            message: "User updated successfully",
            data:updatedUser
        })
    } catch (error) {
        next(error)
    }
}

const handleAssignRider = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const { riderId } = req.params;
        const result = await adminService.assignRiderToDuty(riderId as string);

        res.status(200).json({
            success: true,
            message: "Rider assigned to duty successfully",
            data: result,
        });
    } catch (error: any) {
       next(error)
    }
}

const handleMarchentStatus = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const {id} = req.params;
        const {status} = req.body;
        
        const updatedMarchent = await adminService.updateMarchent(id as string, status as string);
        if(!updatedMarchent){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Marchent not found",
                data:updatedMarchent
            })
        }
        res.status(200).send({
            success:true,
            message: "Marchent updated successfully",
            data:updatedMarchent
        })
    } catch (error) {
        next(error)
    }
}

const handleCreateNotification = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const {title , message , target} = req.body;
        const notification = await adminService.createNotification(title , message , target);
        if(!notification){
            return res.status(status.NOT_FOUND).send({
                success:false,
                message: "Notification not found",
                data:notification
            })
        }
        res.status(status.OK).send({
            success:true,
            message: "Notification created successfully",
            data:notification
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
    handleGetAllParcels,
    handleAssignRider,
    handleUpdateUser,
    handleMarchentStatus,
    handleCreateNotification
}