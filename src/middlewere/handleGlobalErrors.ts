import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import  { ZodError } from 'zod'
import status from "http-status";
import { PrismaClientValidationError } from "@prisma/client/runtime/client";
const GlobalError = (err:any , req:Request , res:Response , next:NextFunction)=>{
    if(env.NODE_ENV === 'development'){
        console.log("Error From Global Error-> ", err);
    }
    let statusCode = status.INTERNAL_SERVER_ERROR || 500

    if(err instanceof ZodError){
        const zodError = err.issues.map((issue)=>{
            return {
                path: issue.path,
                message: issue.message
            }
        })

        res.status(statusCode).json({
            success: false,
            message: "Internal Server Error",
            error: zodError
        })
    }



    if(err instanceof PrismaClientValidationError){
        if(Array.isArray(err)){
            const messages = err.map((issue)=>{
                return issue.message
            })

            res.status(statusCode).json({
                success: false,
                message: "Input Validatio  Error",
                error: messages
            })
        }else{
            res.status(statusCode).json({
                success: false,
                message: "Input Validatio  Error",
                error: err.message
            })
        }
    }


    


    res.status(statusCode).json({
        success: false,
        message: "Internal Server Error",
        error: err?.message ? err.message : JSON.stringify(err)
    })

}


export default GlobalError;