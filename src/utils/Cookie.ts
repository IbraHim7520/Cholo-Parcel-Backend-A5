import { CookieOptions, Response } from "express";

export const SendCookies = (res:Response , cookieName:string , cookieValue:string , options:CookieOptions)=>{
    res.cookie(cookieName , cookieValue , options)
}