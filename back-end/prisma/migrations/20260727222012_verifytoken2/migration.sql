/*
  Warnings:

  - You are about to drop the column `userId` on the `VerificationToken` table. All the data in the column will be lost.
  - Added the required column `email` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_userId_fkey";

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
