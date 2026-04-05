import { MarchentStatus, PercelStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { IUsercreateReviws } from "../UserModel/user.interface"
import { ICreateParcel, IMerchentGetReviews } from "./merchent.interface"

export const getMerchentID = async(userId:string)=>{
    const isMerchentExist = await prisma.merchent.findFirst({
        where: {
            AND:[
                {ownerId: userId},
                {status: MarchentStatus.APPROVED}
            ]
        }
    })
    if(!isMerchentExist){
        return null
    }
    return isMerchentExist.id
}
const createPercel = async (merchentData: ICreateParcel) => {
    const merchentId = await getMerchentID(merchentData.merchentId)
    if(!merchentId){
        throw new Error("Merchent not found")
    }

    return await prisma.percel.create({
        data:{
            name: merchentData.name,
            weight: merchentData.weight,
            notes: merchentData.notes,
            price: merchentData.price,
            deliveryCharge: merchentData.deliveryCharge,
            pickupLocation: merchentData.pickupLocation,
            deliveryTime: new Date(merchentData.deliveryTime),
            status: PercelStatus.REQUESTED,
            merchentId: merchentId,
            reciverName: merchentData.reciverName,
            reciverContact: merchentData.reciverContact,
            reciverAddress: merchentData.reciverAddress,
            pickupTime: new Date(merchentData.pickupTime),
        }
    })
}

const getMyPercels = async (userId: string) => {
    const merchentId = await getMerchentID(userId)
    if(!merchentId){
        throw new Error("Merchent not found")
    }
    return await prisma.percel.findMany({
        where: {
            merchentId: merchentId
        }
    })
}

const deletePercel = async (percelId: string) => {
    const isPercelExist = await prisma.percel.findFirst({
        where: {
            id: percelId
        }
    })
    if(!isPercelExist){
        throw new Error("Percel not found")
    }
    if(isPercelExist.status === PercelStatus.CONFIRMED){
        throw new Error("Percel is already confirmed")
    }else if(isPercelExist.status === PercelStatus.IN_TRANSIT){
        throw new Error("Percel is already in transit")
    }else if(isPercelExist.status === PercelStatus.PICKED){
        throw new Error("Percel is already picked up")
    }else if(isPercelExist.status === PercelStatus.SHIPPED){
        throw new Error("Percel is already shipped")
    }else if(isPercelExist.status === PercelStatus.DRIVER_ASSIGNED){
        throw new Error("Percel is already assigned to a driver")
    }else if(isPercelExist.status === PercelStatus.ARRIVED_WARHOUSE){
        throw new Error("Percel is already arrived at warehouse")
    }
    return await prisma.percel.delete({
        where: {
            id: percelId
        }
    })
}

const updateStatus = async (percelId: string, status: PercelStatus) => {
    const isPercelExist = await prisma.percel.findFirst({
        where: {
            id: percelId
        }
    })
    if(!isPercelExist){
        throw new Error("Percel not found")
    }
    return await prisma.percel.update({
        where: {
            id: percelId
        },
        data: {
            status: status
        }
    })
}

const merchentGetPercelReviews = async (userId: string) => {
    const merchentId = await getMerchentID(userId || "a8No6q3ECrcPHxVoluKiDZrDfMeQu2la")

    if (!merchentId) {
        throw new Error("Merchent not found")
    }

    const reviews = await prisma.reviews.findMany({
        where: {
            percel: {
                merchentId: merchentId
            }
        },
        include: {
            percel: {
                select:{
                    id:true,
                    name:true,
                    reciverName:true,
                    reciverAddress:true,
                }
            }, // optional (if you want parcel info)
            user: {
                select:{
                    name:true,
                    email:true,
                    image:true,
                    id:true
                }
            }   // optional (if you want reviewer info)
        }
    })

    return reviews
}

const deleteReview = async (reviewId: string) => {
    const isReviewExist = await prisma.reviews.findFirst({
        where: {
            id: reviewId
        }
    })
    if(!isReviewExist){
        throw new Error("Review not found")
    }
    return await prisma.reviews.delete({
        where: {
            id: reviewId
        }
    })
}
export const merchentService = {
    createPercel,
    getMyPercels,
    deletePercel,
    merchentGetPercelReviews,
    updateStatus,
    deleteReview
}