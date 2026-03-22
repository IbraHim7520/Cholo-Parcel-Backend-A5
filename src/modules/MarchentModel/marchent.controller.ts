import { NextFunction, Request, Response } from "express"
import { marchentService } from "./marchent.service";
import status from "http-status";
import { MarchentStatus } from "../../../generated/prisma/enums";

const handleCreateMarchent = async(req:Request , res:Response , next:NextFunction)=>{
    const createMarchentData = req.body;
    try {
        const createResult = await marchentService.createMarchent(createMarchentData);
        if(createResult.id){
           return res.status(status.OK).send({
                success:true,
                message:"Marchent Application Submitted",
                data:createResult.id
            })
        }
        
        return res.status(status.BAD_REQUEST).send({
            success:false,
            message:"Marchent Application Not Submitted",
            data:null
        })
    } catch (error) {
        next(error)
    }
}

const handleApproveMarchent = async(req:Request , res:Response , next:NextFunction)=>{
    const marchentId = req.params.id as string;
    try {
        const approveResult = await marchentService.approveMarchent(marchentId);
        if(approveResult.approve.status === MarchentStatus.APPROVED){
            return res.status(status.OK).send({
                success:true,
                message:"Marchent Approved",
                data:approveResult.approve.id
            })
        }
        
        return res.status(status.BAD_REQUEST).send({
            success:false,
            message:"Marchent Not Approved",
            data:null
        })
    } catch (error) {
        next(error)
    }
}

const handleRejectMarchent = async(req:Request , res:Response , next:NextFunction)=>{
    const marchentId = req.params.id as string;
    try {
        const rejectResult = await marchentService.rejectMarchent(marchentId);
        if(rejectResult.reject.status === MarchentStatus.REJECTED){
            return res.status(status.OK).send({
                success:true,
                message:"Marchent Rejected",
                data:rejectResult.reject.id
            })
        }
        
        return res.status(status.BAD_REQUEST).send({
            success:false,
            message:"Marchent Not Rejected",
            data:null
        })
    } catch (error) {
        next(error)
    }
}

const handleGetMarchentProfile = async(req:Request, res:Response , next:NextFunction)=>{
    try {
        const userId = req.user?.id as string || "hNfVJattPmHigWQzvD52C8BCXYb0Nvwu"; // test id
        const marchentProfile = await marchentService.getMarchentProfile(userId);
        if(marchentProfile){
            return res.status(status.OK).send({
                success:true,
                message:"Marchent Profile",
                data:marchentProfile
            })
        }
        
        return res.status(status.BAD_REQUEST).send({
            success:false,
            message:"Marchent Profile Not Found",
            data:null
        })
    } catch (error) {
        next(error)
    }
}

const handleDeleteMarchent = async(req:Request, res:Response , next:NextFunction)=>{
    const marchentId = req.params.id as string;
    try {
        const deleteResult = await marchentService.deleteMarchent(marchentId);
        if(deleteResult.deleteMarchent.id){
            return res.status(status.OK).send({
                success:true,
                message:"Marchent Deleted",
                data:deleteResult.deleteMarchent.id
            })
        }
        
        return res.status(status.BAD_REQUEST).send({
            success:false,
            message:"Marchent Not Deleted",
            data:null
        })
    } catch (error) {
        next(error)
    }
}

const handleUpdateMarchentProfile = async(req:Request , res:Response , next:NextFunction)=>{
    const marchentId = req.params.id as string;
    const updateData = req.body;
    try {
        const updateResult = await marchentService.updateMarchent(marchentId , updateData);
        if(updateResult.id){
            return res.status(status.OK).send({
                success:true,
                message:"Marchent Updated",
                data:updateResult.id
            })
        }
        
        return res.status(status.BAD_REQUEST).send({
            success:false,
            message:"Marchent Not Updated",
            data:null
        })
    } catch (error) {
        next(error)
    }
}

const handleGetMyParcels = async(req:Request , res:Response , next:NextFunction)=>{
    const userId = req.user?.id;
    try {
        const myParcelList = await marchentService.getMyParcels(userId);
        if(myParcelList.length > 0){
            return res.status(status.OK).send({
                success:true,
                message:"My Parcels",
                data:myParcelList
            })
        }
        
        return res.status(status.BAD_REQUEST).send({
            success:false,
            message:"My Parcels Not Found",
            data: []
        })
    } catch (error) {
        next(error)
    } 
}
export const marchentController = {
    handleCreateMarchent,
    handleApproveMarchent,
    handleRejectMarchent,
    handleGetMarchentProfile,
    handleDeleteMarchent,
    handleUpdateMarchentProfile,
    handleGetMyParcels
}