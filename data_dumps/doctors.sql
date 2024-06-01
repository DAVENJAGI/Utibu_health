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
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctors` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `license_no` varchar(128) NOT NULL,
  `availability_time` varchar(128) DEFAULT NULL,
  `hospital_id` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `license_no` (`license_no`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES
('09de45a2-b9df-48c0-a7a1-ffaf81459848','2024-05-25 17:47:43','2024-05-25 17:47:43','lowalkal49@gmail.com','882hk','Kalpano','Lowal','zk18282s',NULL,'c5a91327-d68b-4465-be03-9689af28b191'),
('12a4cabb-75df-4e5f-84cc-87707b211ecc','2024-05-25 17:43:09','2024-05-25 17:43:09','owinosteph98@gmail.com','salT@','Stephan','Owino','zk29144s',NULL,'8c88d30f-8343-4647-bde2-1502b5f5cb0f'),
('271ffc89-6c1e-4e60-8efe-9d92b6b81637','2024-05-25 17:44:22','2024-05-25 17:44:22','cess87@gmail.com','DkhhJu','Cecily','Chepkor','zk39248s',NULL,'4e0aa448-5dbb-4b93-9775-a3bb0cdaabb2'),
('48e317e1-55f9-4c30-a15e-ca0b5058cdb6','2024-05-26 18:12:31','2024-05-26 18:12:31','machariamaina@gmail.com','mmkJ1','Jenipher','Maina','zk280933',NULL,'c5a91327-d68b-4465-be03-9689af28b191'),
('49e6abd0-f7d4-45a4-97ba-7ce84b1727db','2024-05-25 17:45:37','2024-05-25 17:45:37','susitum52@gmail.com','skI1Ju','Susan','Mutitu','zk45258s',NULL,'43cae53d-30df-4578-83b8-5623b71e54a9'),
('930c1580-0d59-4f54-bb62-c9e05162679f','2024-05-25 17:46:46','2024-05-25 17:46:46','ndetigladys72@gmail.com','jimNah','Gladys','Ndeti','zk41268s',NULL,'3e791884-1f9f-41a1-a3e0-8d97e7b0dfe0'),
('c83cee22-247b-47c0-a8a6-fbcfaf0db8d6','2024-05-27 23:04:15','2024-05-27 23:04:15','esterarunga@gmail.com','@#aad4','Ester','Arunga','zk287642',NULL,'43cae53d-30df-4578-83b8-5623b71e54a9'),
('cebf8177-5714-4da6-8d54-4a1fa1546335','2024-05-27 22:29:45','2024-05-27 22:29:45','cessjane@gmail.com','jane82','Celina','Jane','zk216945',NULL,'43cae53d-30df-4578-83b8-5623b71e54a9'),
('e505edbe-8550-4f72-931e-9b09fa71f072','2024-05-26 18:23:44','2024-05-26 18:23:44','amorijane@gmail.com','amori002','Sr_Jane','Amori','zk184933',NULL,'43cae53d-30df-4578-83b8-5623b71e54a9');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01 11:47:32
