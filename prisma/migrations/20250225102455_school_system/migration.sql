-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('STUDENT', 'TEACHER') NOT NULL,
    `sectionId` VARCHAR(191) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sections` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `sections_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subjects` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `subjects_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedules` (
    `id` VARCHAR(191) NOT NULL,
    `teacherId` VARCHAR(191) NOT NULL,
    `sectionId` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NOT NULL,
    `day` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY') NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `schedules_sectionId_day_startTime_endTime_key`(`sectionId`, `day`, `startTime`, `endTime`),
    UNIQUE INDEX `schedules_teacherId_day_startTime_endTime_key`(`teacherId`, `day`, `startTime`, `endTime`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grades` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `teacherId` VARCHAR(191) NOT NULL,
    `sectionId` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NOT NULL,
    `grade` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `grades_studentId_subjectId_key`(`studentId`, `subjectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `sections`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `sections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `sections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
