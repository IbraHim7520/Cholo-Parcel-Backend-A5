import { NextFunction, Request, Response } from 'express'
import z from 'zod'
const ValidateReqBody = (zodSchema: z.ZodObject)=>{

    return (req:Request , res:Response , next:NextFunction)=>{
        const zodParseResult = zodSchema.safeParse(req.body);

        if(!zodParseResult.success){
                next(zodParseResult.error);
        }

        req.body = zodParseResult.data;
        next();
    }

}


export default ValidateReqBody;