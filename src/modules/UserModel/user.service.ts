import { Request } from "express";
import { auth } from "../../lib/auth"
import { IUserChangePassword, IUserLogin, IUserSignup } from "./user.interface"

const userSignUp =async(signupData: IUserSignup)=>{
    const data = await auth.api.signUpEmail({
        body:{
            name: signupData.name,
            email:signupData.email,
            password:signupData.password,
            image:signupData.image
        }
    })
    return data
}

const userSignin = async(siginData: IUserLogin)=>{
    const data = await auth.api.signInEmail({
        body: {
            email: siginData.email,
            password:siginData.password
        }
    })
    return data;
}
const userLogout = async(req:Request)=>{
    return await auth.api.signOut({
        headers: req.headers as Record<string , string>
    })
}

const userChangePassword = async(passwordData:IUserChangePassword)=>{
    return await auth.api.changePassword({
        body:{
            newPassword: passwordData.newPassword,
            currentPassword: passwordData.newPassword,
            revokeOtherSessions:true
        }
    })

}

export const userServices = {
    userSignUp,
    userSignin,
    userChangePassword,
    userLogout,
}