/*
  Warnings:

  - You are about to drop the column `expires` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `sessionID` on the `sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionid]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionid` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sessions_sessionID_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "expires",
DROP COLUMN "sessionID",
ADD COLUMN     "sessionid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionid_key" ON "sessions"("sessionid");
