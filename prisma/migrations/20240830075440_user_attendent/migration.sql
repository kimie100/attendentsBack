-- CreateTable
CREATE TABLE `userAttends` (
    `id` VARCHAR(191) NOT NULL,
    `userid` VARCHAR(191) NOT NULL,
    `clockIn` DATETIME(3) NOT NULL,
    `clockOut` DATETIME(3) NOT NULL,
    `totalHours` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userAttends` ADD CONSTRAINT `userAttends_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
