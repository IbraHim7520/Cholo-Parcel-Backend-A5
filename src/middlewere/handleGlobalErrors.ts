import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import z from 'zod'
const GlobalError = (err:any , req:Request , res:Response , next:NextFunction)=>{
    if(env.NODE_ENV === 'development'){
        console.log("Error From Global Error-> ", err);
    }


    let statusCode:number = 500;

    res.status(statusCode).json({
        success: false,
        message: "Internal Server Error",
        error: err?.message ? err.message : JSON.stringify(err)
    })

}


export default GlobalError;