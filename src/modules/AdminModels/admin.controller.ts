import { NextFunction, Request, Response } from "express"
import { adminService } from "./admin.service";
import status from "http-status";

const handleCreateMarchent = async (req: Request , res: Response, next: NextFunction) => {
    const merchentData = req.body;
    try {
        const result = await adminService.createMerchant(merchentData);

        if(!result.success){
            return res.status(status.BAD_REQUEST).send({
                success: false,
                message: "Merchent created failed",
                data: result.data
            })
        }

        return res.status(status.CREATED).send({
            success: true,
            message: "Merchent created successfully",
            data: result.data
        })
    } catch (error) {
        next(error)
    }    

}


const handleGetMerchentByRequest = async (req: Request , res: Response, next: NextFunction) => {
    try {
        const result = await adminService.getMerchentByRequest();

        if(!result){
            return res.status(status.BAD_REQUEST).send({
                success: false,
                message: "No merchent found",
                data: result
            })
        }

        return res.status(status.CREATED).send({
            success: true,
            message: "Merchent request get successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }    

}

const handleGetAllMerchent = async (req: Request , res: Response, next: NextFunction) => {
    try {
        const result = await adminService.getAllMerchent();

        if(!result){
            return res.status(status.BAD_REQUEST).send({
                success: false,
                message: "No merchent found",
                data: result
            })
        }

        return res.status(status.CREATED).send({
            success: true,
            message: "Merchent request get successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }    

}


const handleUpdateMerchentStatus = async (req: Request , res: Response, next: NextFunction) => {
    const {id} = req.params;
    const status = req.body.status;
    try {
        const result = await adminService.updateMerchentStatus(id as string, status);

        if(!result){
            return res.status(400).send({
                success: false,
                message: "Merchent update failed",
                data: result
            })
        }

        return res.status(201).send({
            success: true,
            message: `Merchent ${result.status} successfully`,
            data: result
        })
    } catch (error) {
        next(error)
    }    

}


const handleCreateRider = async (req: Request , res: Response, next: NextFunction) => {
    const riderData = req.body;
    try {
        const result = await adminService.createRider(riderData);

        if(!result.success){
            return res.status(status.BAD_REQUEST).send({
                success: false,
                message: "Rider created failed",
                data: result.data
            })
        }

        return res.status(status.CREATED).send({
            success: true,
            message: "Rider created successfully",
            data: result.data
        })
    } catch (error) {
        next(error)
    }    

}

const handleGetAllRiders = async (req: Request , res: Response, next: NextFunction) => {
    try {
        const result = await adminService.getAllRiders();

        if(!result){
            return res.status(status.BAD_REQUEST).send({
                success: false,
                message: "No riders found",
                data: result
            })
        }

        return res.status(status.CREATED).send({
            success: true,
            message: "Riders get successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }    

}

const handleGetRidersByRequest = async (req: Request , res: Response, next: NextFunction) => {
    try {
        const result = await adminService.getRidersByRequest();

        if(!result){
            return res.status(status.BAD_REQUEST).send({
                success: false,
                message: "No riders found",
                data: result
            })
        }

        return res.status(status.CREATED).send({
            success: true,
            message: "Riders get successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }    

}

const handleUpdateRiderStatus = async (req: Request , res: Response, next: NextFunction) => {
    const {id} = req.params;
    const status = req.body.status;
    try {
        const result = await adminService.updateRiderStatus(id as string, status);

        if(!result){
            return res.status(400).send({
                success: false,
                message: "Rider update failed",
                data: result
            })
        }

        return res.status(201).send({
            success: true,
            message: `Rider ${result.status} successfully`,
            data: result
        })
    } catch (error) {
        next(error)
    }    

}

const handleGetAllPercels = async (req: Request , res: Response, next: NextFunction) => {
    try {
        const result = await adminService.getAllPercels();

        if(!result){
            return res.status(status.BAD_REQUEST).send({
                success: false,
                message: "No percels found",
                data: result
            })
        }

        return res.status(status.CREATED).send({
            success: true,
            message: "Percels get successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }    

}

const handleDeleteParcel = async (req: Request , res: Response, next: NextFunction) => {
    const {id} = req.params;
    try {
        const result = await adminService.deleteParcel(id as string);

        if(!result){
            return res.status(400).send({
                success: false,
                message: "Parcel delete failed",
                data: result
            })
        }

        return res.status(201).send({
            success: true,
            message: "Parcel delete successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }    

}

const handleGetAllUsers = async (req: Request , res: Response, next: NextFunction) => {
    const me = req?.user || { email: "mdibrahim752006@gmail.com"}
    try {
        const result = await adminService.getAllUsers(me?.email as string );

        if(!result){
            return res.status(status.BAD_REQUEST).send({
                success: false,
                message: "No users found",
                data: result
            })
        }

        return res.status(status.CREATED).send({
            success: true,
            message: "Users get successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }    

}

const handleDeleteUser = async (req: Request , res: Response, next: NextFunction) => {
    const {id} = req.params;
    try {
        const result = await adminService.deleteUser(id as string);

        if(!result){
            return res.status(400).send({
                success: false,
                message: "User delete failed",
                data: result
            })
        }

        return res.status(201).send({
            success: true,
            message: "User delete successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }    

}
export const adminController = {
    handleCreateMarchent,
    handleGetMerchentByRequest,
    handleGetAllMerchent,
    handleUpdateMerchentStatus,
    handleCreateRider,
    handleGetAllRiders,
    handleGetRidersByRequest,
    handleUpdateRiderStatus,
    handleGetAllPercels,
    handleDeleteParcel,
    handleGetAllUsers,
    handleDeleteUser
}