import { PercelStatus, RiderRequestStatus, UserRole, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { userServices } from "../UserModel/user.service";
import { ICreateRider, IUpdateParcelStatus, IUpdateRiderProfile } from "./rider.interface"
// const result = await prisma.$transaction(async (tx) => {
//     const isExistUser = await tx.user.findUnique({
//         where: {
//             email: riderLoginData.email
//         }
//     });
//     if (isExistUser?.id && isExistUser.status === UserStatus.DEACTIVE) {
//         throw new Error("User is not active");
//     } else if (isExistUser?.id && isExistUser.status === UserStatus.DELETED) {
//         throw new Error("User is deleted");
//     }

//     if (isExistUser?.id && isExistUser.status === UserStatus.ACTIVE) {

//         const createRiderProfile = await tx.rider.create({
//             data: {
//                 userId: isExistUser.id,
//                 nid: riderData.nid,
//                 dob: riderData.dob,
//                 bloodGrouph: riderData.bloodGrouph,
//                 contact: riderData.contact,
//                 address: riderData.address,
//                 deliveryArea: riderData.deliveryArea,
//                 experience: riderData.experience,
//                 vehicleType: riderData.vehicleType,
//                 vehicleNumber: riderData.vehicleNumber
//             }
//         });

//         return {
//             createRiderProfile
//         }

//     }
//     const signUpRider = await userServices.userSignUp(riderLoginData);

//     if (!signUpRider.user) {
//         throw new Error("User creation failed");
//     }
//     const createRiderProfile = await tx.rider.create({
//         data: {
//             userId: signUpRider.user.id,
//             nid: riderData.nid,
//             dob: riderData.dob,
//             bloodGrouph: riderData.bloodGrouph,
//             contact: riderData.contact,
//             address: riderData.address,
//             deliveryArea: riderData.deliveryArea,
//             experience: riderData.experience,
//             vehicleType: riderData.vehicleType,
//             vehicleNumber: riderData.vehicleNumber
//         }
//     });


//     return {
//         signUpRider,
//         createRiderProfile
//     };
// });
const createRider = async (riderPayload: ICreateRider) => {
    try{
        const riderResult = await prisma.rider.create({
            data:{
                nid: riderPayload.nid,
                dob: riderPayload.dob,
                bloodGrouph: riderPayload.bloodGrouph,
                contact: riderPayload.contact,
                address: riderPayload.address,
                deliveryArea: riderPayload.deliveryArea,
                experience: riderPayload.experience,
                vehicleType: riderPayload.vehicleType,
                vehicleNumber: riderPayload.vehicleNumber,
                userId: riderPayload.userId
            }
        })
        if(riderResult.userId){
            await prisma.user.update({
                where: {
                    id: riderResult.userId
                },
                data: {
                    role: UserRole.RIDER
                }
            })
        }
        return riderResult

    }catch (error) {
        throw error;
    }
};

const changeRiderStatustoApprove = async(riderId:string)=>{
    return await prisma.rider.update({
        where: {
            id: riderId
        },
        data:{
            status: RiderRequestStatus.APPROVED 
        }
    })
}

const changeRiderStatustoReject = async(riderId:string)=>{
    return await prisma.rider.update({
        where: {
            id: riderId
        },
        data:{
            status: RiderRequestStatus.REJECTED 
        }
    })
}


const updateRider = async (userId:string , riderData:IUpdateRiderProfile)=>{
    return await prisma.rider.update({
        where: {
            userId: userId
        },
        data: {
            dob: riderData.dob,
            nid: riderData.nid,
            bloodGrouph: riderData.bloodGrouph,
            contact: riderData.contact,
            address: riderData.address,
            deliveryArea: riderData.deliveryArea,
            experience: riderData.experience,
            vehicleType: riderData.vehicleType,
            vehicleNumber: riderData.vehicleNumber
        }
    })
}

const getRiderProfile = async (userId:string)=>{
    return await prisma.rider.findUnique({
        where: {
            userId: userId
        },
        include: {
            user: true
        }
    })
}


const getMyParcels = async (userId:string)=>{
    const riderData = await prisma.rider.findUnique({where:{userId: userId}});
    if(!riderData){
        throw new Error("Rider not found");
    }
    const riderId = riderData.id;
    return await prisma.percel.findMany({
        where:{
            riderId:riderId,
            status: PercelStatus.REQUESTED
        },
        include:{
            merchent:{
                select:{
                    ComphanyName:true,
                    id:true,
                    ComphanyEmail:true,
                    ComphanyAddress:true,
                    ComphanyPhone:true
                }
            }
        }
    })
}

const updatePercelStatus  = async(percelId:string , status:IUpdateParcelStatus)=>{
    return await prisma.percel.update({
        where: {
            id: percelId
        },
        data: {
            status: status.status as PercelStatus
        }
    })
}



export const riderService = {
    createRider,
    changeRiderStatustoApprove,
    changeRiderStatustoReject,
    updateRider,
    getRiderProfile,
    updatePercelStatus,
    getMyParcels,
}