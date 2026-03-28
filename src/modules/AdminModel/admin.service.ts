import { MarchentStatus, NotificationTarget, PercelStatus, RiderRequestStatus, UserRole, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"

const getAdminProfile = async(userId:string)=>{
    const profileData = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })
    return profileData;
}

const getAllUsers = async()=>{
    const users = await prisma.user.findMany();
    return users;
}

const getAllMarchent = async()=>{
    const marchents = await prisma.merchent.findMany({
        include:{
            user:true
        }
    });
    return marchents;
}

const getAllRiders = async()=>{
    const riders = await prisma.rider.findMany({
        include:{
            user:true
        }
    });
    return riders;
}

const getAllParcels = async()=>{
    const parcels = await prisma.percel.findMany();
    const parcelGroup = await prisma.percel.groupBy({
        by: ['status'],
        _count:true,
        
    })
    return {
        parcels,
        parcelGroup
    };
}

const getStatistics = async () => {
    // ✅ Run all queries in parallel
    const [users, merchants, riders] = await Promise.all([
        getAllUsers(),
        getAllMarchent(),
        getAllRiders(),
        
    ]);
    const {parcels}= await getAllParcels()

    // ✅ Users stats (single loop)
    let activeUser = 0, inactiveUser = 0, deletedUser = 0;

    for (const user of users) {
        if (user.status === UserStatus.ACTIVE) activeUser++;
        else if (user.status === UserStatus.DEACTIVE) inactiveUser++;
        else if (user.status === UserStatus.DELETED) deletedUser++;
    }

    // ✅ Riders stats
    let pendingRiders = 0, approvedRiders = 0, rejectedRiders = 0;

    for (const rider of riders) {
        if (rider.status === RiderRequestStatus.PENDING) pendingRiders++;
        else if (rider.status === RiderRequestStatus.APPROVED) approvedRiders++;
        else if (rider.status === RiderRequestStatus.REJECTED) rejectedRiders++;
    }

    // ✅ Parcels stats
    let deliveredParcels = 0, returnedParcels = 0, cancelledParcels = 0;

    for (const parcel of parcels) {
        if (parcel.status === PercelStatus.DELIVERED) deliveredParcels++;
        else if (parcel.status === PercelStatus.RETURNED) returnedParcels++;
        else if (parcel.status === PercelStatus.CANCELLED) cancelledParcels++;
    }

    return {
        totalUser: users.length,
        activeUser,
        inactiveUser,
        deletedUser,

        totalMarchent: merchants.length,

        totalRider: riders.length,
        pendingRiders,
        approvedRiders,
        rejectedRiders,

        totalParcels: parcels.length,
        deliveredParcels,
        returnedParcels,
        cancelledParcels
    };
}

const updateUser = async(id:string , payload:any)=>{
    const isUserExist = await prisma.user.findUnique({
        where: { id },
    });

    if (!isUserExist) {
        throw new Error('User not found!');
    }

    const result = await prisma.user.update({
        where: { id },
        data: payload, // This handles { role: 'RIDER' } or { status: 'ACTIVE' }
        select: {
            id: true,
            name: true,
            role: true,
            status: true,
            updatedAt: true
        }
    });
    return result;
}

const assignRiderToDuty = async (riderId: string) => {
    const rider = await prisma.rider.findUnique({
        where: { id: riderId },
    });

    if (!rider) throw new Error("Rider not found");
    if (rider.isBanned) throw new Error("Cannot modify a banned rider");

    // Toggle the boolean: if true -> false, if false -> true
    const newStatus = !rider.isAvailable;

    const updatedRider = await prisma.rider.update({
        where: { id: riderId },
        data: {
            isAvailable: newStatus,
            // If we are unassigning (making available), clear the timestamp
            assignedAt: newStatus ? null : new Date(),
        },
    });

    return {
        updatedRider,
        message: newStatus ? "Rider is now Available" : "Rider has been Assigned"
    };
};

const updateMarchent = async(id:string , status:string)=>{
    // 1. Check if merchant exists
    const merchant = await prisma.merchent.findUnique({
        where: { id }
    });

    if (!merchant) {
        throw new Error("Merchant not found");
    }

    if(status === MarchentStatus.APPROVED && merchant.status === MarchentStatus.APPROVED){
        throw new Error("Merchant is already approved");
    }
    if(status === MarchentStatus.REJECTED && merchant.status === MarchentStatus.REJECTED){
        throw new Error("Merchant is already rejected");
    }

    if(status === MarchentStatus.PENDING && merchant.status === MarchentStatus.PENDING){
        throw new Error("Merchant is already pending");
    }

    // 2. Update status
    const updatedMerchant = await prisma.merchent.update({
        where: {
            id: id
        },
        data: {
            status: status as MarchentStatus,
            UpdatedAt: new Date()
        }
    });
    if (updatedMerchant.status === MarchentStatus.APPROVED){
        await prisma.user.update({
            where: {
                id: updatedMerchant.ownerId
            },
            data: {
                role:   UserRole.MERCHENT
            }
        });
    }

    return updatedMerchant;
}

const createNotification = async(title:string , message:string , target:string)=>{
    const notification = await prisma.notification.create({
        data: {
            title,
            message,
            target: target as NotificationTarget
        }
    });
    return notification;
}
export const adminService = {
    getAdminProfile,
    getAllUsers,
    getAllMarchent,
    getAllRiders,
    getStatistics,
    getAllParcels,
    updateUser,
    assignRiderToDuty,
    updateMarchent,
    createNotification
}   