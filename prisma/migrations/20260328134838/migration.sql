/*
  Warnings:

  - Added the required column `deliveryPrice` to the `percels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "percels" ADD COLUMN     "deliveryPrice" INTEGER NOT NULL;
