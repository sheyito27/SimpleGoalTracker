/*
  Warnings:

  - You are about to drop the column `endDate` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Task` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'INACTIVE', 'PAUSED', 'COMPLETED', 'REJECTED');

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "endDate",
DROP COLUMN "isCompleted",
DROP COLUMN "startDate",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "isCompleted",
DROP COLUMN "startDate",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';
