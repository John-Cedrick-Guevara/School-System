/*
  Warnings:

  - You are about to drop the column `grade` on the `grades` table. All the data in the column will be lost.
  - You are about to drop the column `term` on the `grades` table. All the data in the column will be lost.
  - Added the required column `finalsGrade` to the `grades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `midtermGrade` to the `grades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prelimGrade` to the `grades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `grades` DROP COLUMN `grade`,
    DROP COLUMN `term`,
    ADD COLUMN `finalsGrade` DOUBLE NOT NULL,
    ADD COLUMN `midtermGrade` DOUBLE NOT NULL,
    ADD COLUMN `prelimGrade` DOUBLE NOT NULL;
