-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `pdfOrImg` VARCHAR(191) NOT NULL,
    `faceImage` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `aml` BOOLEAN NOT NULL,
    `kyc` BOOLEAN NOT NULL,
    `accountType` ENUM('SAVINGS', 'CURRENT') NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
