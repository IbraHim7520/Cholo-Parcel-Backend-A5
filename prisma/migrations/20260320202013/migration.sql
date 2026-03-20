-- CreateEnum
CREATE TYPE "MarchentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "merchent" ADD COLUMN     "status" "MarchentStatus" NOT NULL DEFAULT 'PENDING';
