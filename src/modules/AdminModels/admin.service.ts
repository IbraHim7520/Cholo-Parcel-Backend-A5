import { MarchentStatus, PercelStatus, RiderRequestStatus, UserRole, UserStatus } from "../../../generated/prisma/enums"
import { auth } from "../../lib/auth"
import { prisma } from "../../lib/prisma"
import { userServices } from "../UserModel/user.service"
import { IAdminCreateMerchent, IAdminCreateRider } from "./admin.interface"

interface IUser {
    id: string;
    status: UserStatus;
    email: string;
    name: string;
    emailVerified: boolean;
    image: string | null;
    role: UserRole;
    isDeleted: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export const createMerchant = async (payload: IAdminCreateMerchent) => {
    const existingMerchant = await prisma.merchent.findUnique({
        where: { ComphanyEmail: payload.comphanyEmail },
    });

    if (existingMerchant) {
        throw new Error("Merchant already exists with this company email");
    }

    let user: IUser | null = await prisma.user.findUnique({
        where: { email: payload.ownerEmail },
    });
    if (!user) {
        const result = await auth.api.signUpEmail({
            body: {
                name: payload.ownerName,
                email: payload.ownerEmail,
                password: payload.ownerPassword,
                image: payload.ownerImage,
                role: UserRole.MERCHENT,
            },
        });

        user = result.user as IUser;
    }

    if (!user) throw new Error("Failed to create user");
    return await prisma.$transaction(async (tx) => {
        const merchant = await tx.merchent.create({
            data: {
                ownerId: user.id,
                status: MarchentStatus.APPROVED,
                ComphanyName: payload.comphanyName,
                ComphanyAddress: payload.comphanyAddress,
                ComphanyPhone: payload.comphanyPhone,
                ComphanyEmail: payload.comphanyEmail,
                ComphanyLogo: payload.comphanyLogo,
                ComphanyWebsite: payload.comphanyWebsite,
                ComphanyDescription: payload.comphanyDescription,
                ComphanyType: payload.comphanyType,
            },
        });

        return {
            success: true,
            data: merchant,
        };
    });
};

const getAllMerchent = async () => {
    return await prisma.merchent.findMany({
        where:{
         NOT:{
            status: MarchentStatus.PENDING
         }
        },
        include:{
            user:{
                select:{
                    name:true,
                    email:true,
                    image:true,
                }
            }
        }
    })
}

const getMerchentByRequest = async()=> {
    return await prisma.merchent.findMany({
        where: {
            status: MarchentStatus.PENDING,
        },
        select:{
            id:true,
            ComphanyName:true,
            ComphanyLogo:true,
            ComphanyEmail:true,
            status:true,
            user:{
                select:{
                    name:true,
                    email:true
                }
            }
        }
    })
}

const updateMerchentStatus = async (id: string, status: MarchentStatus) => {
    return await prisma.merchent.update({
        where: {
            id
        },
        data: {
            status
        }
    })
}

const createRider = async(riderDataPayload: IAdminCreateRider)=>{
    const existingRider = await prisma.user.findUnique({
        where: {
            email: riderDataPayload.useremail
        }
    });

    if (existingRider?.role === UserRole.RIDER) {
        throw new Error("Rider already exists with this email");
    }

    let user: IUser | null = await prisma.user.findUnique({
        where: { email: riderDataPayload.useremail },
    });
    if (!user) {
        const result = await auth.api.signUpEmail({
            body: {
                name: riderDataPayload.username,
                email: riderDataPayload.useremail,
                password: riderDataPayload.userpassword,
                image: riderDataPayload.userimage,
                role: UserRole.RIDER,
            },
        });

        user = result.user as IUser;
    }

    if (!user) throw new Error("Failed to create user");
    return await prisma.$transaction(async (tx) => {
        const rider = await tx.rider.create({
            data: {
                userId: user.id,
                status: RiderRequestStatus.APPROVED,
                nid: riderDataPayload.nid,
                dob: riderDataPayload.dob,
                bloodGrouph: riderDataPayload.bloodGrouph,
                contact: riderDataPayload.contact,
                address: riderDataPayload.address,
                deliveryArea: riderDataPayload.deliveryArea,
                vehicleType: riderDataPayload.vehicleType,
                experience: riderDataPayload.experience,
                vehicleNumber: riderDataPayload.vehicleNumber,
            },
        });

        return {
            success: true,
            data: rider,
        };
    }); 
}

const getAllRiders = async()=>{
    return await prisma.rider.findMany({
        where:{
            NOT:{
                status: RiderRequestStatus.PENDING
            }
        },
        include:{
            user:{
                select:{
                    name:true,
                    email:true,
                    image:true
                }
            }
        }
    })
}

const getRidersByRequest = async()=>{
    return await prisma.rider.findMany({
        where: {
            status: RiderRequestStatus.PENDING,
        },
        select:{
            id:true,
            nid:true,
            dob:true,
            bloodGrouph:true,
            contact:true,
            address:true,
            deliveryArea:true,
            vehicleType:true,
            experience:true,
            vehicleNumber:true,
            status:true,
            user:{
                select:{
                    name:true,
                    email:true,
                    image:true
                }
            }
        }
    })
}

const updateRiderStatus = async (id: string, status: RiderRequestStatus) => {
    return await prisma.rider.update({
        where: {
            id
        },
        data: {
            status
        }
    })
}

const getAllPercels = async()=>{
    return await prisma.percel.findMany({
        include:{
            merchent:{
                select: {
                    ComphanyName:true,
                    ComphanyLogo:true,
                    ComphanyPhone:true,
                    ComphanyWebsite:true
                }
            },
            rider:{
                select:{
                    user:{
                        select:{
                            name:true,
                            email:true,
                            image:true
                        }
                    }
                }
            }
        }
    })
}

const deleteParcel = async (id: string) => {
    const parcel = await prisma.percel.findUnique({
        where: {
            id
        }
    });
    if(!parcel){
        throw new Error("Parcel not found");
    }

    if(parcel.status === PercelStatus.REQUESTED){
        throw new Error("Parcel is requested so you can't delete it");
    }

    if(parcel.status === PercelStatus.CONFIRMED){
        throw new Error("Parcel is confirmed so you can't delete it");
    }

    if(parcel.status === PercelStatus.IN_TRANSIT){
        throw new Error("Parcel is in transit so you can't delete it");
    }

    if(parcel.status === PercelStatus.DRIVER_ASSIGNED){
        throw new Error("Parcel is driver assigned so you can't delete it");
    }

    if(parcel.status === PercelStatus.SHIPPED){
        throw new Error("Parcel is shipped so you can't delete it");
    }
    if(parcel.status === PercelStatus.ARRIVED_WARHOUSE){
        throw new Error("Parcel is arrived at warehouse so you can't delete it");
    }
    if(parcel.status === PercelStatus.PICKED){
        throw new Error("Parcel is picked up so you can't delete it");
    }
    
    return await prisma.percel.delete({
        where: {
            id: id
        }
    })
    
}

const getAllUsers = async(myEmail:string)=>{
    return await prisma.user.findMany({
        where:{
            NOT:{
                email: myEmail
            }
        }
    })
}

const deleteUser = async(id:string)=>{
   //1. chek if user exits
   const user = await prisma.user.findUnique({
    where: {
        id
    }
   })
   if(!user){
    throw new Error("User not found");
   }
   //2. chek if user is admin
   if(user.role === UserRole.ADMIN){
    throw new Error("Admin can't be deleted");
   }

   return await prisma.user.delete({
    where: {
        id
    }
   })
}
export const adminService = {
    createMerchant,
    getAllMerchent,
    getMerchentByRequest,
    updateMerchentStatus,
    createRider,
    getAllRiders,
    getRidersByRequest,
    updateRiderStatus,
    getAllPercels,
    deleteParcel,
    getAllUsers,
    deleteUser

}