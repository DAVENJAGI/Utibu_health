-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: utibu_health
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB-2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `date_of_birth` varchar(128) NOT NULL,
  `doctor_id` varchar(60) DEFAULT 'e505edbe-8550-4f72-931e-9b09fa71f072',
  `disease_id` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('36f5c732-0ba9-4ba5-97fe-49c67ec03aa9','2024-05-25 19:27:55','2024-05-25 19:27:55','willypaulo1@gmail.com','YYATyH','William','Paul','1979-02-28','49e6abd0-f7d4-45a4-97ba-7ce84b1727db','1d1aa496-0b66-4b25-8cdf-4977c01d9252'),
('444046a9-f248-4548-9e9d-6edb8463775d','2024-05-25 19:29:04','2024-05-25 19:29:04','wycliffeowino09@gmail.com','ddTyH','Wycliffe','Owino','1989-02-12','49e6abd0-f7d4-45a4-97ba-7ce84b1727db','58503a30-ddcc-4211-9ce0-902151ddaef9'),
('5e1bc648-b236-42c5-980c-132d061ce257','2024-05-28 14:11:52','2024-05-28 14:11:52','njagidave@gmail.com','ckLK8','Dave','Njagi','2003-01-05','09de45a2-b9df-48c0-a7a1-ffaf81459848','58503a30-ddcc-4211-9ce0-902151ddaef9'),
('5ef26a35-ff0e-4188-a9c2-e6526e9e6302','2024-05-25 19:26:05','2024-05-25 19:26:05','frankoloo@gmail.com','olFk@ffa','Franklin','Omondi','19820-03-09','271ffc89-6c1e-4e60-8efe-9d92b6b81637','1d1aa496-0b66-4b25-8cdf-4977c01d9252'),
('73bdf402-c1de-4695-9fa1-0ab131492387','2024-05-25 19:23:23','2024-05-25 19:23:23','alfredkihik20@gmail.com','ak8hhl','Alfred','Kihika','1999-10-01',NULL,'da008408-2d4b-458b-8200-1db1e987b2b1'),
('73c09a97-83d6-4f11-8058-a550c20d5c53','2024-05-25 19:24:27','2024-05-25 19:24:27','alaijm@gmail.com','#2@ffa','Alai','Jamusi','1970-12-21','12a4cabb-75df-4e5f-84cc-87707b211ecc','acb376d1-76b6-48b6-b39b-0063508ba67b'),
('a9140068-cd66-4164-a167-53d271eb4d3f','2024-05-26 15:40:30','2024-05-26 15:40:30','njagidave155@gmail.com','122334','Dave','Njagi','1999-01-05',NULL,NULL),
('c4398890-fca7-486f-9493-123a2f323193','2024-05-26 15:44:42','2024-05-26 15:44:42','elvisk@gmail.com','3412s34','Elvis','Njagi','1988-01-05','49e6abd0-f7d4-45a4-97ba-7ce84b1727db',NULL),
('ed415efc-3fe1-4b16-8b16-f35e64cb6e9c','2024-05-25 17:53:19','2024-05-25 17:53:19','maryjenkin12@gmail.com','66639Dk*','Mary','Jenkins','2002-07-01','3e791884-1f9f-41a1-a3e0-8d97e7b0dfe0',NULL),
('f8aa699a-e783-4999-add5-4e5623e7d29a','2024-05-26 15:45:51','2024-05-26 15:45:51','schonjeri@gmail.com','yyh76a8','Scholasticah','Njeri','2005-01-05','12a4cabb-75df-4e5f-84cc-87707b211ecc',NULL),
('f99e5bdc-12a8-40ac-b2a4-331ed0354a05','2024-05-26 15:47:18','2024-05-26 15:47:18','jaydennjeru7@gmail.com','ckLK8','Jayden','Njeru','2003-01-05','09de45a2-b9df-48c0-a7a1-ffaf81459848',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01 11:45:33
