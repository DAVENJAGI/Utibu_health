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
-- Table structure for table `hospitals`
--

DROP TABLE IF EXISTS `hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospitals` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `town_id` varchar(60) NOT NULL,
  `email` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `town_id` (`town_id`),
  CONSTRAINT `hospitals_ibfk_1` FOREIGN KEY (`town_id`) REFERENCES `wards` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospitals`
--

LOCK TABLES `hospitals` WRITE;
/*!40000 ALTER TABLE `hospitals` DISABLE KEYS */;
INSERT INTO `hospitals` VALUES
('3e791884-1f9f-41a1-a3e0-8d97e7b0dfe0','2024-05-25 13:46:21','2024-05-25 13:46:21','a088eecd-ca20-47e3-815a-c3f9210e58ea','info@nwch.co.ke','Nairobi Women Hospital',36.7961,-1.2937),
('43cae53d-30df-4578-83b8-5623b71e54a9','2024-05-25 13:23:43','2024-05-25 13:23:43','894100c8-a9e0-4396-baf1-100def204a8d','knhadmin@knh.or.ke','Kenyatta National Hospital',36.8116,-1.30118),
('4e0aa448-5dbb-4b93-9775-a3bb0cdaabb2','2024-05-25 14:03:17','2024-05-25 14:03:17','894100c8-a9e0-4396-baf1-100def204a8d','mbagathihosp@gmail.com','Mbagathi County Hospital',36.8035,-1.30842),
('8c88d30f-8343-4647-bde2-1502b5f5cb0f','2024-05-25 13:58:02','2024-05-25 13:58:02','7df6feb5-9d1d-4379-bc43-e268d00e6267','enquiry@nairobiwesthospital.com','Nairobi West',36.8259,-1.3066),
('c5a91327-d68b-4465-be03-9689af28b191','2024-05-25 14:21:36','2024-05-25 14:21:36','06ee101d-80f0-44b8-9345-5e7a5fe38eea','info@mpshahhospital.org','MP Shah',36.8121,-1.2635);
/*!40000 ALTER TABLE `hospitals` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-25 11:34:26
