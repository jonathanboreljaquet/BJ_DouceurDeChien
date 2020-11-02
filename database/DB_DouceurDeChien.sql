CREATE TABLE `client` (
  `id` int PRIMARY KEY,
  `firstname` varchar(255) NOT NULL,
  `secondname` varchar(255) NOT NULL,
  `password_iteration_count` int NOT NULL,
  `password_salt` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `isAdministrator` boolean NOT NULL
);

CREATE TABLE `dog` (
  `id` int PRIMARY KEY,
  `chip_id` int,
  `name` varchar(255) NOT NULL,
  `client_id` int
);

CREATE TABLE `document` (
  `id` int PRIMARY KEY,
  `type` ENUM ('conditions_of_registration', 'poster') NOT NULL,
  `path` varchar(255) NOT NULL,
  `client_id` int
);

ALTER TABLE `dog` ADD FOREIGN KEY (`client_id`) REFERENCES `client` (`id`);

ALTER TABLE `document` ADD FOREIGN KEY (`client_id`) REFERENCES `client` (`id`);
