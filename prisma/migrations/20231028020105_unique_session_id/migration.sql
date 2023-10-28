/*
  Warnings:

  - A unique constraint covering the columns `[sessionID]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionID_key" ON "sessions"("sessionID");
