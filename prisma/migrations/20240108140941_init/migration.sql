/*
  Warnings:

  - The primary key for the `StationStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "StationStatus" DROP CONSTRAINT "StationStatus_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "StationStatus_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserHistory" DROP CONSTRAINT "UserHistory_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id");
