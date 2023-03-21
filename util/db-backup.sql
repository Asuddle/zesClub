
CREATE DATABASE `zesclub`; 

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(280) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'user',
  `token` varchar(10000) DEFAULT NULL,
  `isVerified` tinyint DEFAULT '0',
  `status` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `enquiry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `enquiryType` varchar(100) DEFAULT NULL,
  `message` varchar(800) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `pages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `home_event_management` varchar(1000) NOT NULL,
  `about_whoweare` varchar(1500) NOT NULL,
  `about_zesbeauty` varchar(1500) NOT NULL,
  `about_zesclub` varchar(1500) NOT NULL,
  `about_zesevents` varchar(1500) NOT NULL,
  `about_zesfounder` varchar(2000) NOT NULL,
  `whyzes_lifewithzes` varchar(1500) DEFAULT NULL,
  `whyzes_lifewithoutzes` varchar(2000) DEFAULT NULL,
  `whyzes_event_management_solutions` varchar(1500) DEFAULT NULL,
  `whyzes_clientsatisfaction` varchar(1400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `image` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(105) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `designation` varchar(400) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(400) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(1000) NOT NULL,
  `venue` varchar(400) NOT NULL,
  `audience` varchar(100) NOT NULL,
  `date` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(400) NOT NULL,
  PRIMARY KEY (`id`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `image` varchar(100) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_event_id` (`event_id`),
  CONSTRAINT `fk_event_id` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `image` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(100) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_id` (`category_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `deals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(400) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `brand_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `price` varchar(45) NOT NULL,
  `qr` varchar(150) DEFAULT NULL,
  `code` varchar(150) DEFAULT NULL,
  `date` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_brand_id` (`brand_id`),
  CONSTRAINT `fk_brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `middleName` varchar(45) DEFAULT NULL,
  `country` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `nationality` varchar(45) NOT NULL,
  `profession` varchar(45) NOT NULL,
  `emiratesID` varchar(45) NOT NULL,
  `mobile` varchar(45) NOT NULL,
  `haveOwnBusiness` tinyint DEFAULT '0',
  `industrySector` varchar(45) DEFAULT NULL,
  `website` varchar(45) DEFAULT NULL,
  `hobbies` varchar(45) DEFAULT NULL,
  `interest` varchar(45) DEFAULT NULL,
  `height` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `makeHappy` varchar(512) DEFAULT NULL,
  `expectations` varchar(512) DEFAULT NULL,
  `photo` varchar(125) DEFAULT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `spouse_title` varchar(45) DEFAULT NULL,
  `spouse_firstName` varchar(45) DEFAULT NULL,
  `spouse_lastName` varchar(45) DEFAULT NULL,
  `spouse_middleName` varchar(45) DEFAULT NULL,
  `spouse_country` varchar(45) DEFAULT NULL,
  `spouse_emiratesID` varchar(45) DEFAULT NULL,
  `spouse_nationality` varchar(45) DEFAULT NULL,
  `spouse_profession` varchar(45) DEFAULT NULL,
  `spouse_city` varchar(45) DEFAULT NULL,
  `passportFile` varchar(125) DEFAULT NULL,
  `emiratesIdFile` varchar(125) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `is_paid` tinyint NOT NULL DEFAULT '0',
  `event_id` int DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
