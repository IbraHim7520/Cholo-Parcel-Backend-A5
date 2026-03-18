-- CreateEnum
CREATE TYPE "ComphanyType" AS ENUM ('ONLINE', 'PHYSICAL', 'BOTH');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'DEACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'MERCHENT', 'ADMIN', 'RIDER');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('BIKE', 'CYCLE', 'VAN');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('READ', 'UNREAD');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'UNPAID', 'PENDING', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethode" AS ENUM ('CASH', 'MOBILE_BANKING', 'BANK_TRANSFER', 'CARD');

-- CreateEnum
CREATE TYPE "PercelStatus" AS ENUM ('REQUESTED', 'CONFIRMED', 'PICKED', 'SHIPPED', 'ARRIVED_WARHOUSE', 'IN_TRANSIT', 'DRIVER_ASSIGNED', 'DELIVERED', 'CANCELLED', 'RETURNED');

-- CreateEnum
CREATE TYPE "PercelType" AS ENUM ('DOCUMENT', 'GLASS', 'PAKAGE', 'FOOD', 'OTHERS');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "merchent" (
    "id" TEXT NOT NULL,
    "ComphanyName" TEXT NOT NULL,
    "ComphanyAddress" TEXT NOT NULL,
    "ComphanyPhone" TEXT NOT NULL,
    "ComphanyEmail" TEXT NOT NULL,
    "ComphanyLogo" TEXT,
    "ComphanyWebsite" TEXT,
    "ComphanyDescription" TEXT NOT NULL,
    "ComphanyType" "ComphanyType" NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "merchent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "status" "NotificationStatus" NOT NULL DEFAULT 'UNREAD',
    "userId" TEXT NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "percelId" TEXT NOT NULL,
    "paymentMethod" "PaymentMethode" NOT NULL DEFAULT 'CASH',
    "transactionId" TEXT,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "percels" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "notes" TEXT,
    "weight" DOUBLE PRECISION NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "PercelStatus" NOT NULL DEFAULT 'REQUESTED',
    "pickupLocation" VARCHAR(255) NOT NULL,
    "deliveryLocation" VARCHAR(255) NOT NULL,
    "isSelfPickup" BOOLEAN NOT NULL DEFAULT false,
    "percelType" "PercelType" NOT NULL DEFAULT 'PAKAGE',
    "reciverName" TEXT NOT NULL,
    "reciverContact" TEXT NOT NULL,
    "reciverAddress" TEXT NOT NULL,
    "pickupTime" TIMESTAMP(3) NOT NULL,
    "deliveryTime" TIMESTAMP(3) NOT NULL,
    "merchentId" TEXT NOT NULL,
    "riderId" TEXT,

    CONSTRAINT "percels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "percelId" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rider" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "joinDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nid" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "bloodGrouph" TEXT,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "deliveryArea" TEXT NOT NULL,
    "experience" TEXT NOT NULL DEFAULT 'No Experience',
    "vehicleType" "VehicleType" NOT NULL DEFAULT 'BIKE',
    "isAssigned" BOOLEAN NOT NULL DEFAULT false,
    "assignedAt" TIMESTAMP(3),
    "vehicleNumber" TEXT NOT NULL,

    CONSTRAINT "rider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PercelToRider" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PercelToRider_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "merchent_ComphanyPhone_key" ON "merchent"("ComphanyPhone");

-- CreateIndex
CREATE UNIQUE INDEX "merchent_ComphanyEmail_key" ON "merchent"("ComphanyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "merchent_ComphanyWebsite_key" ON "merchent"("ComphanyWebsite");

-- CreateIndex
CREATE UNIQUE INDEX "merchent_ownerId_key" ON "merchent"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_percelId_key" ON "payments"("percelId");

-- CreateIndex
CREATE INDEX "payments_isPaid_idx" ON "payments"("isPaid");

-- CreateIndex
CREATE INDEX "payments_paymentMethod_idx" ON "payments"("paymentMethod");

-- CreateIndex
CREATE INDEX "payments_percelId_idx" ON "payments"("percelId");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_transactionId_idx" ON "payments"("transactionId");

-- CreateIndex
CREATE INDEX "percels_riderId_idx" ON "percels"("riderId");

-- CreateIndex
CREATE INDEX "percels_percelType_idx" ON "percels"("percelType");

-- CreateIndex
CREATE INDEX "percels_merchentId_idx" ON "percels"("merchentId");

-- CreateIndex
CREATE INDEX "percels_status_idx" ON "percels"("status");

-- CreateIndex
CREATE UNIQUE INDEX "rider_userId_key" ON "rider"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "rider_nid_key" ON "rider"("nid");

-- CreateIndex
CREATE INDEX "rider_userId_idx" ON "rider"("userId");

-- CreateIndex
CREATE INDEX "rider_isAssigned_idx" ON "rider"("isAssigned");

-- CreateIndex
CREATE INDEX "rider_isBanned_idx" ON "rider"("isBanned");

-- CreateIndex
CREATE INDEX "_PercelToRider_B_index" ON "_PercelToRider"("B");

-- AddForeignKey
ALTER TABLE "merchent" ADD CONSTRAINT "merchent_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_percelId_fkey" FOREIGN KEY ("percelId") REFERENCES "percels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "percels" ADD CONSTRAINT "percels_merchentId_fkey" FOREIGN KEY ("merchentId") REFERENCES "merchent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_percelId_fkey" FOREIGN KEY ("percelId") REFERENCES "percels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rider" ADD CONSTRAINT "rider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PercelToRider" ADD CONSTRAINT "_PercelToRider_A_fkey" FOREIGN KEY ("A") REFERENCES "percels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PercelToRider" ADD CONSTRAINT "_PercelToRider_B_fkey" FOREIGN KEY ("B") REFERENCES "rider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
