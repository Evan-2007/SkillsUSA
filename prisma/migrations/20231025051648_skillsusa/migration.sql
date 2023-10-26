/*
  Warnings:

  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Events";

-- CreateTable
CREATE TABLE "MSEvents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "Body" TEXT NOT NULL,

    CONSTRAINT "MSEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YCEvents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "Body" TEXT NOT NULL,

    CONSTRAINT "YCEvents_pkey" PRIMARY KEY ("id")
);
