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
-- Table structure for table `disease_medication`
--

DROP TABLE IF EXISTS `disease_medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `disease_medication` (
  `disease_id` varchar(60) NOT NULL,
  `medication_id` varchar(60) NOT NULL,
  KEY `disease_id` (`disease_id`),
  KEY `medication_id` (`medication_id`),
  CONSTRAINT `disease_medication_ibfk_1` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`),
  CONSTRAINT `disease_medication_ibfk_2` FOREIGN KEY (`medication_id`) REFERENCES `medication` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disease_medication`
--

LOCK TABLES `disease_medication` WRITE;
/*!40000 ALTER TABLE `disease_medication` DISABLE KEYS */;
INSERT INTO `disease_medication` VALUES
('66a2261a-7c98-4c9b-8f83-224492545664','03b3d006-67c4-45a2-a67f-b51cf9f9e407'),
('1d1aa496-0b66-4b25-8cdf-4977c01d9252','a1ddad6d-3bd8-48d3-9189-ef5518561ab1'),
('390d8fc9-64d3-4c68-9707-8df3864eb8eb','f9d0f097-d5f4-4529-8717-f103a6689890'),
('dc51bbaf-9312-44c7-aed7-4cf6146a9efa','db979a05-f977-4828-bb9c-30baba5242b7'),
('da008408-2d4b-458b-8200-1db1e987b2b1','861d9025-fb5f-4100-b4c4-31bbd3da2d7c'),
('da008408-2d4b-458b-8200-1db1e987b2b1','4f5bca29-e4d7-45d5-af8b-c00d47d5f5fd'),
('da008408-2d4b-458b-8200-1db1e987b2b1','3e8df047-a6c8-4166-af45-864661aef9e3');
/*!40000 ALTER TABLE `disease_medication` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01 11:48:12
