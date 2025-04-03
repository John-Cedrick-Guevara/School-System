/*
  Warnings:

  - Added the required column `term` to the `grades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `grades` ADD COLUMN `term` ENUM('PRELIM', 'MIDTERM', 'FINALS') NOT NULL;
