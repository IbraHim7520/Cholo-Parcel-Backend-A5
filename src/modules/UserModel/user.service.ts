import { Request } from "express";
import { auth } from "../../lib/auth"
import { IUserChangePassword, IUserLogin, IUserSignup } from "./user.interface"
import cloudinary from "../../config/cloudinaryConfig";
import { fromNodeHeaders } from "better-auth/node";
import { deocodeToken } from "../../utils/jwtToken";
import { prisma } from "../../lib/prisma";

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


const userUploadImage = async(file:Express.Multer.File)=>{
    const result = new Promise((resolve , reject)=>{
        cloudinary.uploader.upload_stream({
            folder: "Cholo-Parcel-Users",
            transformation: [{width: 500 , height: 500 , crop: "fill"}]
        },
        (err , result)=>{
            if(err){
                return reject(err)
            }
            resolve(result)
        }
    ).end(file.buffer)
    })

    return result
}


const userGetUserData = async(req:Request)=>{
    const token = req.cookies?.accessToken;
    const userData = deocodeToken(token);
   
    return userData
}

const userGetPercelStatus = async(percelId:string)=>{
    return await prisma.percel.findUnique({
        where: {
            id: percelId
        },
        select:{
            status:true,
            reciverName:true,
            reciverContact:true,
            reciverAddress:true,
            deliveryTime:true,
            isSelfPickup:true
        }
    })
}
export const userServices = {
    userSignUp,
    userSignin,
    userChangePassword,
    userLogout,
    userUploadImage,
    userGetUserData,
    userGetPercelStatus
}