import { MarchentStatus, UserRole, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateMarchent } from "./marchent.interface"

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
    const marchentResult = await prisma.merchent.update({
        where: {id: marchentId},
        data: {
            status: MarchentStatus.APPROVED
        }
    })
    return marchentResult;
}

const rejectMarchent = async(marchentId:string)=>{
    const isMarchentExists = await prisma.merchent.findUnique({where: {id: marchentId}});
    if(!isMarchentExists) throw new Error("Marchent not found")
    if(isMarchentExists.status ===  MarchentStatus.REJECTED) throw new Error("Marchent is already rejected");
    const marchentResult = await prisma.merchent.update({
        where: {id: marchentId},
        data: {
            status: MarchentStatus.REJECTED
        }
    })
    return marchentResult;
}
export const marchentService = {
    createMarchent,
    approveMarchent,
    rejectMarchent
}