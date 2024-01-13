/*
  Warnings:

  - Made the column `Ports` on table `StationStatus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "StationStatus" ALTER COLUMN "Ports" SET NOT NULL;
