import { MarchentStatus, UserRole, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateMarchent, IUpdateMarchentData } from "./marchent.interface"

const createMarchent = async(marchentPayload:ICreateMarchent)=>{
    const userId = marchentPayload.ownerId;
    const isUserExists = await prisma.user.findUnique({where: {id: userId}});
    if(!isUserExists) throw new Error("User not found")
    if(isUserExists.role === UserRole.MERCHENT ) throw new Error("User is already a marchent");
    if(isUserExists.status === UserStatus.DEACTIVE) throw new Error("User is not active");
    if(isUserExists.status === UserStatus.DELETED) throw new Error("User is deleted");
    const marchentResult = await prisma.merchent.create({
        data:{
            ComphanyName: marchentPayload.ComphanyName,
            ComphanyAddress: marchentPayload.ComphanyAddress,
            ComphanyPhone: marchentPayload.ComphanyPhone,
            ComphanyEmail: marchentPayload.ComphanyEmail,
            ComphanyDescription: marchentPayload.ComphanyDescription,
            ComphanyLogo: marchentPayload.ComphanyLogo,
            ComphanyWebsite: marchentPayload.ComphanyWebsite,
            ownerId: marchentPayload.ownerId,
            ComphanyType: marchentPayload.ComphanyType
        }
    })

    return marchentResult;
}

const approveMarchent = async(marchentId:string)=>{
    const isMarchentExists = await prisma.merchent.findUnique({where: {id: marchentId}});
    if(!isMarchentExists) throw new Error("Marchent not found")
    if(isMarchentExists.status ===  MarchentStatus.APPROVED) throw new Error("Marchent is already approved");
    const marchentApprove = await prisma.$transaction(async(tx)=>{
        const approve = await tx.merchent.update({
            where: { id: marchentId },
            data: {
                status: MarchentStatus.APPROVED
            }
        })
        const userRoleUpdate = await tx.user.update({
            where: { id: isMarchentExists.ownerId },
            data: {
                role: UserRole.MERCHENT
            }
        })
        return {approve, userRoleUpdate};
    })
    return marchentApprove;
}

const rejectMarchent = async(marchentId:string)=>{
    const isMarchentExists = await prisma.merchent.findUnique({where: {id: marchentId}});
    if(!isMarchentExists) throw new Error("Marchent not found")
    if(isMarchentExists.status ===  MarchentStatus.REJECTED) throw new Error("Marchent is already rejected");
    const marchentReject = await prisma.$transaction(async(tx)=>{
        const reject = await tx.merchent.update({
            where: { id: marchentId },
            data: {
                status: MarchentStatus.REJECTED
            }
        })
        const userRoleUpdate = await tx.user.update({
            where: { id: isMarchentExists.ownerId },
            data: {
                role: UserRole.USER
            }
        })
        return {reject, userRoleUpdate};
    })
    return marchentReject;
}
const getMarchentProfile = async(userId:string)=>{
    const profileData = await prisma.merchent.findUnique({
        where:{
            ownerId: userId
        },
        include:{
            user:true,
            percels:true,
        }
    })
    return profileData;

}

const deleteMarchent = async(marchentId:string)=>{
    const isMarchentExists = await prisma.merchent.findUnique({where: {id: marchentId}});
    if(!isMarchentExists) throw new Error("Marchent not found")
    const marchentDelete = await prisma.$transaction(async(tx)=>{
        const deleteMarchent = await tx.merchent.delete({
            where: { id: marchentId },
        })
        const userRoleUpdate = await tx.user.update({
            where: { id: isMarchentExists.ownerId },
            data: {
                role: UserRole.USER
            }
        })
        return {deleteMarchent, userRoleUpdate};
    })
    return marchentDelete;
}

const updateMarchent = async(marchentId:string , updateData:IUpdateMarchentData)=>{
    const isMarchentExists = await prisma.merchent.findUnique({where: {id: marchentId}});
    if(!isMarchentExists) throw new Error("Marchent not found")
    const marchentUpdate = await prisma.merchent.update({
        where: { id: marchentId },
        data: {
            ComphanyName: updateData.ComphanyName,
            ComphanyAddress: updateData.ComphanyAddress,
            ComphanyPhone: updateData.ComphanyPhone,
            ComphanyEmail: updateData.ComphanyEmail,
            ComphanyDescription: updateData.ComphanyDescription,
            ComphanyLogo: updateData.ComphanyLogo,
            ComphanyWebsite: updateData.ComphanyWebsite,
            ComphanyType: updateData.ComphanyType
        }
    })
    return marchentUpdate;
}

const getMyParcels  = async(userId:string)=>{
    const marchentData = await prisma.merchent.findUnique({
        where:{
            ownerId: userId
        }
    })
    if(!marchentData) throw new Error("Marchent not found")
    const marchentId = marchentData?.id as string;
    const parcels = await prisma.percel.findMany({
        where:{
            merchentId: marchentId
        }
    });

    return parcels
    
}

const getMarchentDetails = async(marchentId:string)=>{
    const marchentDetails = await prisma.merchent.findUnique({
        where:{
            id: marchentId
        },
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                    email:true,
                    image:true
                }
            }
        }
    })
    return marchentDetails;
}

export const marchentService = {
    createMarchent,
    approveMarchent,
    rejectMarchent,
    getMarchentProfile,
    deleteMarchent,
    updateMarchent,
    getMarchentDetails,
    getMyParcels
}