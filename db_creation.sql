ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Iver4son3!';

CREATE DATABASE arlington_nightlife;

USE arlington_nightlife;

CREATE TABLE `venues` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) NOT NULL,
  `ADDRESS` varchar(100) NOT NULL,
  `PHONE_NUM` varchar(12) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(25) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `venue_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `venue_id` FOREIGN KEY (`id`) REFERENCES `venues` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;