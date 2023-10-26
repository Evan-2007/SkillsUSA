/*
  Warnings:

  - You are about to drop the column `name` on the `MSEvents` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `MSNews` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `MSOfficers` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `YLCEvents` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `YLCNews` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `YLCOfficers` table. All the data in the column will be lost.
  - Added the required column `time` to the `MSEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `MSEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `MSNews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `MSOfficers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `MSOfficers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `YLCEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `YLCEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `YLCNews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `YLCOfficers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `YLCOfficers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MSEvents" DROP COLUMN "name",
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "MSNews" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MSOfficers" DROP COLUMN "name",
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "YLCEvents" DROP COLUMN "name",
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "YLCNews" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "YLCOfficers" DROP COLUMN "name",
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
