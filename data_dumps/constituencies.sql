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
-- Table structure for table `constituencies`
--

DROP TABLE IF EXISTS `constituencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `constituencies` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `county_id` varchar(60) NOT NULL,
  `constituency_name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `county_id` (`county_id`),
  CONSTRAINT `constituencies_ibfk_1` FOREIGN KEY (`county_id`) REFERENCES `counties` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `constituencies`
--

LOCK TABLES `constituencies` WRITE;
/*!40000 ALTER TABLE `constituencies` DISABLE KEYS */;
INSERT INTO `constituencies` VALUES
('1a34b623-0d39-477a-9389-15eae6a27ca2','2024-05-24 12:13:51','2024-05-24 12:13:51','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Embakasi North'),
('288bfdfa-5e72-4a7c-997c-88e140f2748d','2024-05-24 12:13:36','2024-05-24 12:13:36','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Embakasi South'),
('51cf94b8-5b2a-4219-8f06-70fb7d86a6df','2024-05-24 12:14:26','2024-05-24 12:14:26','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Embakasi East'),
('54ec8031-9150-4862-ab9c-f0d4cbe845a6','2024-05-24 12:14:14','2024-05-24 12:14:14','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Embakasi Central'),
('586c5e08-f08f-45cd-b79f-364b858d2e51','2024-05-24 12:14:48','2024-05-24 12:14:48','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Makadara'),
('611c853e-063c-4928-aec0-3eb5d9d6c4aa','2024-05-24 12:12:19','2024-05-24 12:12:19','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Dagoreti South'),
('650485c1-27af-4f35-8a36-2dafea664f70','2024-05-24 12:16:07','2024-05-24 12:16:07','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Mathare'),
('70434583-0464-4395-bad4-85f0b49f3686','2024-05-24 12:14:57','2024-05-24 12:14:57','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Kamkunji'),
('766d7f8f-1e5e-4f82-92bc-e30a98f6ea40','2024-05-24 12:14:35','2024-05-24 12:14:35','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Embakasi West'),
('8bd42ea3-4d75-4e03-ab30-32feee30615b','2024-05-24 12:11:21','2024-05-24 12:11:21','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Westlands'),
('9fab01d5-15ce-4ed7-9306-17306745fb68','2024-05-24 12:13:19','2024-05-24 12:13:19','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Ruaraka'),
('ae2bafe1-26c8-48b6-a5f3-e41b121c0bf9','2024-05-24 12:12:56','2024-05-24 12:12:56','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Roysambu'),
('b0fa55b8-c279-4b12-8f4b-d930617c7340','2024-05-24 12:12:43','2024-05-24 12:12:43','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Kibra'),
('c5aa8465-cb34-4ad3-8c4f-6e6564948dfd','2024-05-24 12:12:31','2024-05-24 12:12:31','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Langata'),
('c93da50a-52e1-4173-b20f-21e5c2773041','2024-05-24 12:11:52','2024-05-24 12:11:52','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Dagoreti North'),
('d14a0d61-d6c7-4a2d-8ee6-6c2c750682f5','2024-05-24 12:13:09','2024-05-24 12:13:09','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Kasarani'),
('d44d07be-d116-4d44-8697-8be438328a88','2024-05-24 12:15:06','2024-05-24 12:15:06','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','Starehe');
/*!40000 ALTER TABLE `constituencies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01 11:48:51
