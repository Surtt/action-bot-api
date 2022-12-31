/*
  Warnings:

  - Made the column `status` on table `ActionModel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ActionModel" ALTER COLUMN "status" SET NOT NULL;
