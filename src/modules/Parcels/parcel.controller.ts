import { NextFunction, Request, Response } from "express"
import { parcelService } from "./parcel.service";

const handleCreateParcel = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const parcelData = req.body;
        const result = await parcelService.createParcel(req , parcelData);
        
        if(!result){
            return res.status(400).json({
                success: false,
                message: "Parcel not created!!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Parcel created successfully!!",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

    const handleGetAllParcels = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const user = req.user;
        const result = await parcelService.getAllParcels(user?.id as string);
        if(!result){
            return res.status(400).json({
                success: false,
                message: "Parcels not found!!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Parcels fetched successfully!!",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const handleQueryParcel = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const query = req.query.status;
        const user = req.user;
        const result = await parcelService.queryParcel(query as string, user?.id as string);
        if(!result){
            return res.status(400).json({
                success: false,
                message: "Parcel not found!!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Parcel fetched successfully!!",
            data: result
        })
    } catch (error) {
        next(error)
    }
}



export const parcelController = {
    handleCreateParcel,
    handleGetAllParcels,
    handleQueryParcel
}