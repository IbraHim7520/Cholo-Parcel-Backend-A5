/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `merchent` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `merchent` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryPrice` on the `percels` table. All the data in the column will be lost.
  - You are about to drop the column `isBanned` on the `rider` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MerchentRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'BANNED');

-- AlterEnum
ALTER TYPE "RiderRequestStatus" ADD VALUE 'BANNED';

-- DropIndex
DROP INDEX "merchent_ComphanyWebsite_key";

-- DropIndex
DROP INDEX "rider_isBanned_idx";

-- AlterTable
ALTER TABLE "merchent" DROP COLUMN "CreatedAt",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "percels" DROP COLUMN "deliveryPrice",
ADD COLUMN     "deliveryCharge" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "rider" DROP COLUMN "isBanned";

-- CreateIndex
CREATE INDEX "merchent_ownerId_idx" ON "merchent"("ownerId");

-- CreateIndex
CREATE INDEX "merchent_status_idx" ON "merchent"("status");

-- CreateIndex
CREATE INDEX "rider_status_idx" ON "rider"("status");
