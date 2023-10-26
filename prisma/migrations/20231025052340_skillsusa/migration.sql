/*
  Warnings:

  - You are about to drop the `YCEvents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "YCEvents";

-- CreateTable
CREATE TABLE "YLCEvents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "Body" TEXT NOT NULL,

    CONSTRAINT "YLCEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MSNews" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "Body" TEXT NOT NULL,

    CONSTRAINT "MSNews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YLCNews" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "Body" TEXT NOT NULL,

    CONSTRAINT "YLCNews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MSOfficers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "Body" TEXT NOT NULL,

    CONSTRAINT "MSOfficers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YLCOfficers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "Body" TEXT NOT NULL,

    CONSTRAINT "YLCOfficers_pkey" PRIMARY KEY ("id")
);
