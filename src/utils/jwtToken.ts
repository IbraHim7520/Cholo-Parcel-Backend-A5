import jwt,{ JwtPayload, SignOptions }  from "jsonwebtoken"
import { env } from "../config/env";

export const createJWTToken = (payload:JwtPayload, {expiresIn}:SignOptions)=>{
    const secret = env.JWT_SECRET;
    const token = jwt.sign(payload , secret, {expiresIn})
    return token;
}


export const tokenVerify = (token:string)=>{
    const secret:string = env.JWT_SECRET;
    try {
        const decoded = jwt.verify(token , secret) as JwtPayload
        return {
            success:true,
            data:decoded
        }
    } catch (error) {
        if(env.NODE_ENV === 'development'){
            console.log(error)
        }
        return {
            success:false,
            data:null,
            error:"Invalid Token"
        }
    }
}


export const deocodeToken = (token:string)=>{
    return jwt.decode(token) as JwtPayload;
}
