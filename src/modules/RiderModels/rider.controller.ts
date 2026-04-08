import { NextFunction, Request, Response } from "express"
import { riderService } from "./rider.service"
import { PercelStatus } from "../../../generated/prisma/enums";


const handleGetRequestedPercels = async (req: Request, res: Response , next:NextFunction) => {
    try {
        const percelsList = await riderService.getRequestedPercel();
        if(percelsList.length > 0){
            return res.status(200).json({
                success: true,
                message: "Percels list",
                data: percelsList
            })
        }
        return res.status(404).json({
            success: false,
            message: "No percels found",
            data: []
        })
    } catch (error) {
        next(error)
    }
}
    
const handleAcceptPercel = async (req: Request, res: Response , next:NextFunction) => {
    try {
        const userId = req?.user?.id as string || "2d743Gf6gvxPSW4Gpl6kc7oqf8v3vWKD"
        const {id} = req.params
        const status = req.body.status as PercelStatus  
        const result = await riderService.acceptPercel(id as string, userId , status)
        if(result){
            return res.status(200).json({
                success: true,
                message: "Percel accepted",
                data: result
            })
        }
        return res.status(404).json({
            success: false,
            message: "Percel not found",
            data: []
        })
    } catch (error) {
        next(error)
    }
}

    const handleMyPercels = async (req: Request, res: Response , next:NextFunction) => {
    try {
        const userId = req?.user?.id as string || "2d743Gf6gvxPSW4Gpl6kc7oqf8v3vWKD"
        const percelsList = await riderService.getMyPercels(userId)
        if(percelsList.length > 0){
            return res.status(200).json({
                success: true,
                message: "Percels list",
                data: percelsList
            })
        }
        return res.status(404).json({
            success: false,
            message: "No percels found",
            data: []
        })
    } catch (error) {
        next(error)
    }
}
export const riderController = {
    handleGetRequestedPercels,
    handleAcceptPercel,
    handleMyPercels
}