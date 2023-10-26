/*
  Warnings:

  - You are about to drop the `MSEvents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MSEvents";

-- CreateTable
CREATE TABLE "msevents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "Body" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "msevents_pkey" PRIMARY KEY ("id")
);
