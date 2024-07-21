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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` varchar(64) NOT NULL,
  `doctor_id` varchar(60) NOT NULL,
  `medication_id` varchar(60) NOT NULL,
  `user_id` varchar(60) NOT NULL,
  `delivery_mode` varchar(128) DEFAULT 'Pickup from hospital',
  `billing_cost` int(11) NOT NULL,
  `order_status` enum('pending approval','approved') NOT NULL DEFAULT 'pending approval',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `medication_id` (`medication_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`medication_id`) REFERENCES `medication` (`id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES
('4885c8de-520a-4548-9f88-bde79bc7451a','271ffc89-6c1e-4e60-8efe-9d92b6b81637','a1ddad6d-3bd8-48d3-9189-ef5518561ab1','5ef26a35-ff0e-4188-a9c2-e6526e9e6302','Pickup from hospital',204,'pending approval','2024-06-25 00:14:21','2024-06-25 00:14:21',3),
('48baebad-ecea-4368-8f44-f18623bd1718','12a4cabb-75df-4e5f-84cc-87707b211ecc','4f5bca29-e4d7-45d5-af8b-c00d47d5f5fd','73c09a97-83d6-4f11-8058-a550c20d5c53','Pickup from hospital',480,'pending approval','2024-06-25 00:12:47','2024-06-25 00:12:47',4),
('5415a7c7-2942-4a2c-9890-f827dc785747','49e6abd0-f7d4-45a4-97ba-7ce84b1727db','f9d0f097-d5f4-4529-8717-f103a6689890','c4398890-fca7-486f-9493-123a2f323193','Pickup from hospital',240,'pending approval','2024-07-19 14:13:50','2024-07-19 14:13:50',3),
('7704e895-c5e7-4bc1-9020-f816f23a2ecb','49e6abd0-f7d4-45a4-97ba-7ce84b1727db','a1ddad6d-3bd8-48d3-9189-ef5518561ab1','36f5c732-0ba9-4ba5-97fe-49c67ec03aa9','Pickup from hospital',136,'approved','2024-06-25 00:15:26','2024-06-24 20:40:57',2),
('88db14c6-75c1-4897-b4c9-749dd0d50079','12a4cabb-75df-4e5f-84cc-87707b211ecc','f9d0f097-d5f4-4529-8717-f103a6689890','73c09a97-83d6-4f11-8058-a550c20d5c53','Pickup from hospital',80,'pending approval','2024-07-20 14:12:41','2024-07-20 14:12:41',1),
('c3586156-efeb-4e12-ad70-0f2a5afa8824','49e6abd0-f7d4-45a4-97ba-7ce84b1727db','f9d0f097-d5f4-4529-8717-f103a6689890','444046a9-f248-4548-9e9d-6edb8463775d','Pickup from hospital',80,'pending approval','2024-07-20 14:01:08','2024-07-20 14:01:08',1),
('ceb2acf1-ae6a-435f-8e68-79ce54d8275d','49e6abd0-f7d4-45a4-97ba-7ce84b1727db','f9d0f097-d5f4-4529-8717-f103a6689890','444046a9-f248-4548-9e9d-6edb8463775d','Pickup from hospital',80,'pending approval','2024-07-19 14:15:51','2024-07-19 14:15:51',1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-20 10:15:57
