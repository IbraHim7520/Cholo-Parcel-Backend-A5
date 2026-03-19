import { auth } from "../../lib/auth"
import { IUserLogin, IUserSignup } from "./user.interface"

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

export const userServices = {
    userSignUp,
    userSignin
}