-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('STUDENT', 'TEACHER', 'ADMIN') NOT NULL;
