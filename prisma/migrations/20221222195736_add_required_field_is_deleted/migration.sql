/*
  Warnings:

  - Made the column `isDeleted` on table `UserModel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserModel" ALTER COLUMN "isDeleted" SET NOT NULL;
