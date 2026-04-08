import { PercelStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const getRequestedPercel = async():Promise<any[]>=>{
    const result = await prisma.percel.findMany({
        where:{
            AND:[
                { status: PercelStatus.REQUESTED },
                {riderId: null},
            ]
        },
       
    })
    return result
}
const acceptPercel = async(percelId:string, userId:string, newStatus:PercelStatus)=>{
    const rider = await prisma.rider.findUnique({
        where:{
            userId: userId
        }
    })
    if(!rider){
        throw new Error("Rider not found")
    }
    const riderId = rider.id;
    const result = await prisma.percel.update({
        where:{
            id:percelId
        },
        data:{
            status: newStatus,
            riderId: riderId
        }
    })
    return result
}

const getMyPercels = async(userId:string):Promise<any[]>=>{
    const rider = await prisma.rider.findUnique({
        where:{
            userId: userId
        }
    })
    if(!rider){
        throw new Error("Rider not found")
    }
    const riderId = rider.id;
    const result = await prisma.percel.findMany({
        where:{
            riderId: riderId
        }
    })
    return result
}
export const riderService = {
    getRequestedPercel,
    acceptPercel,
    getMyPercels
}