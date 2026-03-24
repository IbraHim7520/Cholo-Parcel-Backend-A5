import { prisma } from "../../lib/prisma"

const getAdminProfile = async(userId:string)=>{
    const profileData = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })
    return profileData;
}
export const adminService = {
    getAdminProfile
}