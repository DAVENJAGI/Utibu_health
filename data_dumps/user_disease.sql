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
-- Table structure for table `user_disease`
--

DROP TABLE IF EXISTS `user_disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_disease` (
  `user_id` varchar(60) NOT NULL,
  `disease_id` varchar(60) NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `disease_id` (`disease_id`),
  CONSTRAINT `user_disease_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_disease_ibfk_2` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_disease`
--

LOCK TABLES `user_disease` WRITE;
/*!40000 ALTER TABLE `user_disease` DISABLE KEYS */;
INSERT INTO `user_disease` VALUES
('36f5c732-0ba9-4ba5-97fe-49c67ec03aa9','1d1aa496-0b66-4b25-8cdf-4977c01d9252'),
('444046a9-f248-4548-9e9d-6edb8463775d','58503a30-ddcc-4211-9ce0-902151ddaef9'),
('5e1bc648-b236-42c5-980c-132d061ce257','58503a30-ddcc-4211-9ce0-902151ddaef9'),
('5ef26a35-ff0e-4188-a9c2-e6526e9e6302','1d1aa496-0b66-4b25-8cdf-4977c01d9252'),
('73bdf402-c1de-4695-9fa1-0ab131492387','da008408-2d4b-458b-8200-1db1e987b2b1'),
('73c09a97-83d6-4f11-8058-a550c20d5c53','acb376d1-76b6-48b6-b39b-0063508ba67b'),
('73c09a97-83d6-4f11-8058-a550c20d5c53','da008408-2d4b-458b-8200-1db1e987b2b1'),
('73c09a97-83d6-4f11-8058-a550c20d5c53','e9ed5eea-6980-4dc5-9464-09bb1fd132b2'),
('73c09a97-83d6-4f11-8058-a550c20d5c53','58503a30-ddcc-4211-9ce0-902151ddaef9');
/*!40000 ALTER TABLE `user_disease` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01 11:45:50
