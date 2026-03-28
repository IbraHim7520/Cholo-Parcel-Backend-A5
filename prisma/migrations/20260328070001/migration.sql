/*
  Warnings:

  - You are about to drop the column `isRead` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `isAssigned` on the `rider` table. All the data in the column will be lost.
  - You are about to drop the `_PercelToRider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PercelToRider" DROP CONSTRAINT "_PercelToRider_A_fkey";

-- DropForeignKey
ALTER TABLE "_PercelToRider" DROP CONSTRAINT "_PercelToRider_B_fkey";

-- DropIndex
DROP INDEX "payments_isPaid_idx";

-- DropIndex
DROP INDEX "rider_isAssigned_idx";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "isRead";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "isPaid";

-- AlterTable
ALTER TABLE "rider" DROP COLUMN "isAssigned",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "_PercelToRider";

-- CreateIndex
CREATE INDEX "rider_isAvailable_idx" ON "rider"("isAvailable");

-- AddForeignKey
ALTER TABLE "percels" ADD CONSTRAINT "percels_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "rider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
