-- CreateTable
CREATE TABLE "StationStatus" (
    "name" TEXT NOT NULL DEFAULT '茨城高専',
    "availableBatteries" INTEGER NOT NULL DEFAULT 3,
    "Ports" INTEGER,

    CONSTRAINT "StationStatus_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "UserHistory" (
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'borrowing',
    "stationName" TEXT NOT NULL DEFAULT '茨城高専',
    "port" INTEGER NOT NULL,
    "borrowedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "usageTime" INTEGER,

    CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("email")
);
