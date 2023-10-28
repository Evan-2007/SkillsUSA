/*
  Warnings:

  - You are about to drop the `MSNews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MSOfficers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YLCEvents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YLCNews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YLCOfficers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MSNews";

-- DropTable
DROP TABLE "MSOfficers";

-- DropTable
DROP TABLE "YLCEvents";

-- DropTable
DROP TABLE "YLCNews";

-- DropTable
DROP TABLE "YLCOfficers";

-- CreateTable
CREATE TABLE "ylcevents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "Body" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "ylcevents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "msnews" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "Body" TEXT NOT NULL,

    CONSTRAINT "msnews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ylcnews" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "Body" TEXT NOT NULL,

    CONSTRAINT "ylcnews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "msofficers" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "Body" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "msofficers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ylcofficers" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "Body" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "ylcofficers_pkey" PRIMARY KEY ("id")
);
