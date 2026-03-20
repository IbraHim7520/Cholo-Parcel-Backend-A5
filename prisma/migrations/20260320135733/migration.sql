-- CreateEnum
CREATE TYPE "RiderRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "rider" ADD COLUMN     "status" "RiderRequestStatus" NOT NULL DEFAULT 'PENDING';
