export interface IUserSignup {
    name:string,
    email:string,
    password:string,
    image?:string
}

export interface IUserLogin {
    email:string,
    password:string
}


export interface IUserChangePassword {
    oldPassword:string,
    newPassword:string
}