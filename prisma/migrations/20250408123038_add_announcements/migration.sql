/*
  Warnings:

  - You are about to alter the column `for` on the `announcements` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `announcements` MODIFY `for` VARCHAR(191) NOT NULL;
