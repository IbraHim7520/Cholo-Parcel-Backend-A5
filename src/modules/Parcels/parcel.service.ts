import { Request } from "express"
import { ICreateParcel } from "./parcel.interface"
import { userServices } from "../UserModel/user.service"
import { prisma } from "../../lib/prisma";
import { PercelStatus } from "../../../generated/prisma/enums";

const createParcel = async(req:Request , parcelPayload:ICreateParcel)=>{
    
    const userData = await userServices.userGetUserData(req);
    const userId = userData?.id ;
    
    if(!userId) return "User not found!!";
    
    const marchent = await prisma.merchent.findUnique({ where: { ownerId: userId}});
    if(!marchent) return "Marchent not found!!";
    const marchentId = marchent.id ;
    
    parcelPayload.pickupTime = new Date(parcelPayload.pickupTime);
    parcelPayload.deliveryTime = new Date(parcelPayload.deliveryTime);
    const parcelCreate = await prisma.percel.create({
        data:{
            ...parcelPayload,
            merchentId: marchentId,
            status: PercelStatus.REQUESTED
        }
    })

    return parcelCreate;
    
}
const getAllParcels = async(userId:string)=>{
    const marchentData = await prisma.merchent.findUnique({where: {ownerId: userId}});
    const marchetID = marchentData?.id;
    if(!marchetID) return "Marchent not found!!";
    const parcels = await prisma.percel.findMany({
        where: {
            merchentId: marchetID
        }
    });
    return parcels;
}

const queryParcel = async(query:string , userId:string)=>{
    const marchentData = await prisma.merchent.findUnique({where: {ownerId: userId}});
    const marchetID = marchentData?.id;
    if(!marchetID) return "Marchent not found!!";
    const parcels = await prisma.percel.findMany({
        where: {
            merchentId: marchetID,
            status: query as PercelStatus
        }
    });
    return parcels;
}

const getMarchentParcel = async(userId:string)=>{
    const marchentData = await prisma.merchent.findUnique({where: {ownerId: userId}});
    const marchetID = marchentData?.id;
    if(!marchetID) return "Marchent not found!!";
    const parcels = await prisma.percel.findMany({
        where: {
            merchentId: marchetID
        }
    });
    return parcels;
}

export const parcelService = {
    createParcel,
    getAllParcels,
    queryParcel,
    getMarchentParcel
}