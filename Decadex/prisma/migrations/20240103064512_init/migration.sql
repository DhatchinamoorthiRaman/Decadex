/*
  Warnings:

  - Made the column `access_token` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `access_token` VARCHAR(191) NOT NULL;
