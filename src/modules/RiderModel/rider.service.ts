import { RiderRequestStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { userServices } from "../UserModel/user.service";
import { ICreateRider } from "./rider.interface"

const createRider = async (riderPayload: ICreateRider) => {
    const riderLoginData = riderPayload.riderSignupData;
    const riderData = riderPayload.riderInfoData;

    try {
        const result = await prisma.$transaction(async (tx) => {
            const signUpRider = await userServices.userSignUp(riderLoginData);

            if (!signUpRider.user) {
                throw new Error("User creation failed");
            }
            const createRiderProfile = await tx.rider.create({
                data: {
                    userId: signUpRider.user.id,
                    nid: riderData.nid,
                    dob: riderData.dob,
                    bloodGrouph: riderData.bloodGrouph,
                    contact: riderData.contact,
                    address: riderData.address,
                    deliveryArea: riderData.deliveryArea,
                    experience: riderData.experience,
                    vehicleType: riderData.vehicleType,
                    vehicleNumber: riderData.vehicleNumber
                }
            });
            return {
                signUpRider,
                createRiderProfile
            };
        });

        return result;

    } catch (error) {
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

export const riderService = {
     createRider,
    changeRiderStatustoApprove,
    changeRiderStatustoReject
}