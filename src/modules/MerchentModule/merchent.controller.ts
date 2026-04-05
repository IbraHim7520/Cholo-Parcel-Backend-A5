import { NextFunction, Request, Response } from "express";
import { merchentService } from "./merchent.service";
import { PercelStatus } from "../../../generated/prisma/enums";

const handleCreatePercel = async (req: Request, res: Response, next:NextFunction) => {
    const percelData = req.body;
    try {
        const result = await merchentService.createPercel(percelData)
        res.status(200).send({
            success:true,
            message:"Percel created successfully",
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const handleGetMyPercels = async (req: Request, res: Response, next:NextFunction) => {
    const userId = req.params.userId;
    try {
        const result = await merchentService.getMyPercels(userId as string)
        res.status(200).send({
            success:true,
            message:"Percels fetched successfully",
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const handleDeletePercel = async (req: Request, res: Response, next:NextFunction) => {
    const percelId = req.params.percelId;
    try {
        const result = await merchentService.deletePercel(percelId as string)
        res.status(200).send({
            success:true,
            message:"Percel deleted successfully",
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const handleUpdateStatus = async (req: Request, res: Response, next:NextFunction) => {
    const percelId = req.params.percelId;
    const status = req.body.status;
    try {
        const result = await merchentService.updateStatus(percelId as string, status as PercelStatus)
        res.status(200).send({
            success:true,
            message:"Percel status updated successfully",
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const handleGetMyReviews = async(req:Request , res:Response , next:NextFunction)=>{
    const userId = req?.user?.id
    try {
        const reviewsResult = await merchentService.merchentGetPercelReviews(userId as string);
        if(!reviewsResult){
            res.status(400).send({
                success:false,
                message:"Failed to add review",
                error:"Review not added"
            })
        }
        res.status(200).send({
            success:true,
            message:"Review added successfully",
            data:reviewsResult
        })
    } catch (error) {
        next(error)
    }
}

const handleDeleteReview = async(req:Request , res:Response , next:NextFunction)=>{
    const reviewId = req.params.reviewId;
    try {
        const result = await merchentService.deleteReview(reviewId as string)
        res.status(200).send({
            success:true,
            message:"Review deleted successfully",
            data:result
        })
    } catch (error) {
        next(error)
    }
}
export const merchentController = {
    handleCreatePercel,
    handleGetMyPercels,
    handleDeletePercel,
    handleUpdateStatus,
    handleGetMyReviews,
    handleDeleteReview
}