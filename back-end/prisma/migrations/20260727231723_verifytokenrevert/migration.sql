/*
  Warnings:

  - You are about to drop the column `email` on the `VerificationToken` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `VerificationToken` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `VerificationToken` table. All the data in the column will be lost.
  - Added the required column `userId` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "email",
DROP COLUMN "passwordHash",
DROP COLUMN "username",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
