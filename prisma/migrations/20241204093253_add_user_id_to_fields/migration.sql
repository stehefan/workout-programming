-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkUserId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
