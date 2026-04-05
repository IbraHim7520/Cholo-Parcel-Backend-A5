import { NextFunction, Request, Response } from "express"
import { userServices } from "./user.service"
import status from "http-status"
import { createJWTToken } from "../../utils/jwtToken"
import { env } from "../../config/env"
import { SendCookies } from "../../utils/Cookie"

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
        SendCookies(res , "accessToken", accessToken, {
            httpOnly:true,
            secure: env.NODE_ENV === "production" ? true : false,
            sameSite: env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        })
        SendCookies(res , "refreshToken", refreshToken, {
            httpOnly:true,
            secure: env.NODE_ENV === "production" ? true : false,
            sameSite: env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        SendCookies(res , "better-auth.session_token", signupResult.token as string, {
            httpOnly:true,
            secure: env.NODE_ENV === "production" ? true : false,
            sameSite: env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
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
        SendCookies(res , "accessToken", accessToken, {
            httpOnly:true,
            secure: env.NODE_ENV === "production" ? true : false,
            sameSite: env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        })
        SendCookies(res , "refreshToken", refreshToken, {
            httpOnly:true,
            secure: env.NODE_ENV === "production" ? true : false,
            sameSite: env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        SendCookies(res , "better-auth.session_token", siginResult.token, {
            httpOnly:true,
            secure: env.NODE_ENV === "production" ? true : false,
            sameSite: env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
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
        res.clearCookie("better-auth.session_token");
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

const handleUploadImage = async(req:Request , res:Response , next:NextFunction)=>{
   try {
    const file = req.file;
    if(!file){
        return res.status(status.BAD_REQUEST).send({
            success: false,
            message: "No Image Uploaded!",
            data:null
        })
    }
    const uploadResult = await userServices.userUploadImage(file);
    if(!uploadResult){
        return res.status(status.BAD_REQUEST).send({
            success: false,
            message: "Failed to upload image!",
            data:null
        })
    }
    res.status(status.OK).send({
        success: true,
        message: "Image uploaded successfully.",
        data: uploadResult
    })
   } catch (error) {
    next(error)
   }
}

const handleGetUserData = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const userData = await userServices.userGetUserData(req);
        if(!userData){
            res.status(status.BAD_REQUEST).send({
                success: false,
                message: "Failed to get user data!",
                data: null
            })
        }
        res.status(status.OK).send({
            success: true,
            message: "User data fetched successfully.",
            data: userData
        })
    } catch (error) {
        next(error)
    }
}


const handleGetPercelStatus = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const percelId = req.params.percelId;
        const percelStatus = await userServices.userGetPercelStatus(percelId as string);
        if(!percelStatus){
            res.status(status.BAD_REQUEST).send({
                success: false,
                message: "Failed to get percel status!",
                data: null
            })
        }
        res.status(status.OK).send({
            success: true,
            message: "Percel status fetched successfully.",
            data: percelStatus
        })
    } catch (error) {
        next(error)
    }
}

const handleCreateReviews = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const reviewsData = req.body;
        console.log(reviewsData)
        const reviewsResult = await userServices.userCreateReviews(reviewsData);
        if(!reviewsResult){
            res.status(status.BAD_REQUEST).send({
                success: false,
                message: "Failed to create reviews!",
                data: null
            })
        }
        res.status(status.OK).send({
            success: true,
            message: "Reviews created successfully.",
            data: reviewsResult
        })
    } catch (error) {
        next(error)
    }
}

export const userController = {
    handleUserSignUp,
    handleUserLogin,
    handleUserLogout,
    handleChangePassword,
    handleUploadImage,
    handleGetUserData,
    handleGetPercelStatus,
    handleCreateReviews
}