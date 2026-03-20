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
        if(approveResult.status === MarchentStatus.APPROVED){
            return res.status(status.OK).send({
                success:true,
                message:"Marchent Approved",
                data:approveResult.id
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
        if(rejectResult.status === MarchentStatus.REJECTED){
            return res.status(status.OK).send({
                success:true,
                message:"Marchent Rejected",
                data:rejectResult.id
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
export const marchentController = {
    handleCreateMarchent,
    handleApproveMarchent,
    handleRejectMarchent
}