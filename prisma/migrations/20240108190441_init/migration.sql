-- CreateTable
CREATE TABLE "StationStatus" (
    "name" TEXT NOT NULL DEFAULT 'nitic',
    "availableBatteries" INTEGER NOT NULL DEFAULT 3,
    "Ports" INTEGER,

    CONSTRAINT "StationStatus_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "UserHistory" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT,
    "stationName" TEXT NOT NULL DEFAULT '茨城高専',
    "port" INTEGER,
    "borrowedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" TIMESTAMP(3),
    "usageTime" TEXT,

    CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "isBorrowing" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Passcode" (
    "secretKey" TEXT NOT NULL,
    "passcode" INTEGER NOT NULL,

    CONSTRAINT "Passcode_pkey" PRIMARY KEY ("secretKey")
);
