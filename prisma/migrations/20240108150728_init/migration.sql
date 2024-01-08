-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "isBorrowing" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);
