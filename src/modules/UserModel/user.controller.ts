import { NextFunction, Request, Response } from "express"
import { userServices } from "./user.service"
import status from "http-status"
import { createJWTToken } from "../../utils/jwtToken"
import { env } from "../../config/env"

const handleUserSignUp =async(req:Request , res:Response, next:NextFunction)=>{
    const signupData = req.body
    try {
        const signupResult = await userServices.userSignUp(signupData);
        if(!signupResult.user){
            res.status(status.BAD_REQUEST).send({
                success:false,
                message: "Failed to register!",
                data:signupResult
            })
        }

        const accessToken = createJWTToken(signupResult.user, { expiresIn: "24h" });
        const refreshToken = createJWTToken(signupResult.user,  { expiresIn: "7d" });
        res.cookie("accessToken", accessToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict"
        })
        res.cookie("refreshToken", refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict"
        })
        res.cookie("better-auth_session.token", signupResult.token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict"
        })
        res.status(status.OK).send({
            success:true,
            message: "User registration successfully.",
            data: {
                accessToken,
                refreshToken,
                ...signupResult
            }
        })
    } catch (error) {
        next(error)
    }
}


const handleUserLogin = async(req:Request , res:Response , next:NextFunction)=>{
    const siginData = req.body;
    try {
        const siginResult = await userServices.userSignin(siginData);
        if(!siginResult.user){
            res.status(status.BAD_REQUEST).send({
                success: false,
                message: "Failed to register!",
                data: siginResult
            })            
        }
        
        const accessToken = createJWTToken(siginResult.user, { expiresIn: "24h" });
        const refreshToken = createJWTToken(siginResult.user, { expiresIn: "7d" });
        res.cookie("accessToken", accessToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict"
        })
        res.cookie("refreshToken", refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict"
        })
        res.cookie("better-auth_session.token", siginResult.token , {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict"
        })
        res.status(status.OK).send({
            success: true,
            message: "User Login successfully.",
            data:{
                accessToken,
                refreshToken,
                ...siginResult
            }
            
        })
    } catch (error) {
        next(error)
    }
}

const handleUserLogout = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const logoutResult = await userServices.userLogout(req);
        if(!logoutResult.success){
            res.status(status.BAD_REQUEST).send({
                success: false,
                message: "Failed to logout!",
                data: logoutResult
            })
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.clearCookie("better-auth_session.token");
        res.status(status.OK).send({
            success: true,
            message: "User Logout successfully.",
            data: logoutResult
        })
    } catch (error) {
        next(error)
    }
}


const handleChangePassword = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const changePasswordData = req.body;
        const changePasswordResult = await userServices.userChangePassword(changePasswordData);
        if(!changePasswordResult.user){
            res.status(status.BAD_REQUEST).send({
                success: false,
                message: "Failed to change password!",
                data: changePasswordResult
            })
        }
        res.status(status.OK).send({
            success: true,
            message: "Password changed successfully.",
            data: changePasswordResult
        })
    } catch (error) {
        next(error)
    }
}
export const userController = {
    handleUserSignUp,
    handleUserLogin,
    handleUserLogout,
    handleChangePassword
}