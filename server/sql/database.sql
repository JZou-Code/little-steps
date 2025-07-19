DROP TABLE IF EXISTS project_b_users;

CREATE TABLE IF NOT EXISTS project_b_users
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(32) UNIQUE NOT NULL,
    password    VARCHAR(128)       NOT NULL,
    first_name  VARCHAR(255)       NOT NULL,
    last_name   VARCHAR(255)       NOT NULL,
    birth       DATE               NOT NULL,
    description TEXT,
    avatar_path VARCHAR(255) DEFAULT '/images/avatars/avatar-default.jpg',
    is_deleted BOOLEAN,
    default_username VARCHAR(32) DEFAULT 'Anonymous User',
    default_avatar VARCHAR(255) DEFAULT '/images/avatars/avatar-default.jpg'
);