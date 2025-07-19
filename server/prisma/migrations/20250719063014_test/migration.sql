-- CreateTable
CREATE TABLE `project_b_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(32) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `birth` DATE NOT NULL,
    `description` TEXT NULL,
    `avatar_path` VARCHAR(191) NOT NULL DEFAULT '/images/avatars/avatar-default.jpg',
    `is_deleted` BOOLEAN NULL,
    `default_username` VARCHAR(32) NOT NULL DEFAULT 'Anonymous User',
    `default_avatar` VARCHAR(191) NOT NULL DEFAULT '/images/avatars/avatar-default.jpg',

    UNIQUE INDEX `project_b_users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
