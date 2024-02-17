/*
  Warnings:

  - You are about to drop the column `input_1` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `input_2` on the `History` table. All the data in the column will be lost.
  - Changed the type of `result` on the `History` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `History` DROP COLUMN `input_1`,
    DROP COLUMN `input_2`,
    DROP COLUMN `result`,
    ADD COLUMN `result` JSON NOT NULL;
