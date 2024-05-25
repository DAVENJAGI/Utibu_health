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
-- Table structure for table `diseases`
--

DROP TABLE IF EXISTS `diseases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diseases` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `description` varchar(256) NOT NULL,
  `medication_id` varchar(60) NOT NULL,
  `user_id` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medication_id` (`medication_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `diseases_ibfk_1` FOREIGN KEY (`medication_id`) REFERENCES `medication` (`id`),
  CONSTRAINT `diseases_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diseases`
--

LOCK TABLES `diseases` WRITE;
/*!40000 ALTER TABLE `diseases` DISABLE KEYS */;
INSERT INTO `diseases` VALUES
('1b2f2bd1-121d-4436-8222-09d992ae1fe3','2024-05-25 18:57:05','2024-05-25 18:57:05','High Cholestrol','This means you have too much of a waxy substance in your blood. This can build uo in your arteries, making them narrow while increasing risk of heart disease or stroke.','861d9025-fb5f-4100-b4c4-31bbd3da2d7c',NULL),
('1d1aa496-0b66-4b25-8cdf-4977c01d9252','2024-05-25 18:58:20','2024-05-25 18:58:20','Type II Diabetes','A condition in which the body struggles to regulate blood sugar levels. Your body either does not make enough insulin orthe cells become resistant to insulin','a1ddad6d-3bd8-48d3-9189-ef5518561ab1',NULL),
('390d8fc9-64d3-4c68-9707-8df3864eb8eb','2024-05-25 18:53:11','2024-05-25 18:53:11','Diabetic Nephropathy','This is kidney damage caused by high blood suger levels in diabetes','f9d0f097-d5f4-4529-8717-f103a6689890',NULL),
('58503a30-ddcc-4211-9ce0-902151ddaef9','2024-05-25 19:15:32','2024-05-25 19:15:32','Type II Diabetes','A condition in which the body struggles to regulate blood sugar levels. Your body either does not make enough insulin orthe cells become resistant to insulin','a1ddad6d-3bd8-48d3-9189-ef5518561ab1',NULL),
('66a2261a-7c98-4c9b-8f83-224492545664','2024-05-25 18:48:50','2024-05-25 18:48:50','Exercise induced bronchospasm','This is the narrowing of the airways triggered by exercise','03b3d006-67c4-45a2-a67f-b51cf9f9e407',NULL),
('96005399-d045-43ec-a716-531154d0d66e','2024-05-25 18:43:10','2024-05-25 18:43:10','Type II Diabetes','A condition in which the body struggles to regulate blood sugar levels. Your body either does not make enough insulin orthe cells become resistant to insulin','db979a05-f977-4828-bb9c-30baba5242b7',NULL),
('9fce7877-4c61-41ad-9374-c073bf456714','2024-05-25 18:51:51','2024-05-25 18:51:51','Hypertension','This is a disease where the force of blood pushing artery walls is consistently too high. This extra strain can damage arteries over time leading to diseases like stroke.','f9d0f097-d5f4-4529-8717-f103a6689890',NULL),
('acb376d1-76b6-48b6-b39b-0063508ba67b','2024-05-25 18:37:05','2024-05-25 18:37:05','Bipolar Disorder','A mental condition that causes significant shifts in mood, energy, and activity levels. Mood swings can be extreme and disrupt te daily life','4f5bca29-e4d7-45d5-af8b-c00d47d5f5fd',NULL),
('b9b6c2a8-2ccf-44fc-9685-1c64d5d13b5f','2024-05-25 18:45:44','2024-05-25 18:45:44','Asthma','A chronic lung condition that causes inflamation of theairways making breathing difficult','03b3d006-67c4-45a2-a67f-b51cf9f9e407',NULL),
('da008408-2d4b-458b-8200-1db1e987b2b1','2024-05-25 18:47:44','2024-05-25 18:47:44','Chronic obtrusive pulmonary disease','A lung disease that makes it hard to breath. Develops due to long term exposure to irritants like cigarette or air pollution','03b3d006-67c4-45a2-a67f-b51cf9f9e407',NULL),
('dc51bbaf-9312-44c7-aed7-4cf6146a9efa','2024-05-25 18:41:11','2024-05-25 18:41:11','Type I Diabetes','A condition in which the body attacks the insulin producing cells. Due to this attack the pancrease stops making enough insulin, a crucial hormone used for blood sugar regulation','db979a05-f977-4828-bb9c-30baba5242b7',NULL);
/*!40000 ALTER TABLE `diseases` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-25 15:33:22
