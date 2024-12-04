/*
  Warnings:

  - Made the column `userId` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Program` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Section` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Workout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Program" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Section" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "userId" SET NOT NULL;
