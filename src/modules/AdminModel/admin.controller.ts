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
export const adminController = {
    handleAdminProfile
}