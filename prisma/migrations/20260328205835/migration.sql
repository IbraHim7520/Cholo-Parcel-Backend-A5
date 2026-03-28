/*
  Warnings:

  - You are about to drop the column `status` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `notifications` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationTarget" AS ENUM ('ALL', 'USER', 'MERCHENT', 'RIDER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "status",
DROP COLUMN "userId",
ADD COLUMN     "target" "NotificationTarget" NOT NULL DEFAULT 'ALL';

-- DropEnum
DROP TYPE "NotificationStatus";
