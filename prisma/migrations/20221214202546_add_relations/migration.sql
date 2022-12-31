/*
  Warnings:

  - Added the required column `authorId` to the `ActionModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActionModel" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ActionModel" ADD CONSTRAINT "ActionModel_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
