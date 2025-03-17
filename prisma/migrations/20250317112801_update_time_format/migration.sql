/*
  Warnings:

  - You are about to drop the column `endTime` on the `time` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `time` table. All the data in the column will be lost.
  - Added the required column `timeStamp` to the `time` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `time` DROP COLUMN `endTime`,
    DROP COLUMN `startTime`,
    ADD COLUMN `timeStamp` VARCHAR(191) NOT NULL;
