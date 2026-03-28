import { PercelStatus, RiderRequestStatus, UserStatus } from "../../../generated/prisma/enums";
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
export const adminService = {
    getAdminProfile,
    getAllUsers,
    getAllMarchent,
    getAllRiders,
    getStatistics,
    getAllParcels
}   