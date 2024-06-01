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
-- Table structure for table `medication`
--

DROP TABLE IF EXISTS `medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medication` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `description` varchar(256) NOT NULL,
  `dosage` varchar(128) NOT NULL,
  `in_stock` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication`
--

LOCK TABLES `medication` WRITE;
/*!40000 ALTER TABLE `medication` DISABLE KEYS */;
INSERT INTO `medication` VALUES
('03b3d006-67c4-45a2-a67f-b51cf9f9e407','2024-05-25 18:13:45','2024-05-25 18:13:45','Albuterol','A short acting bronchodilator that prevents breath shortness and chest tightness caused by asthma or chronic obstructive pulmonary disease','1*3','False'),
('08b168fe-3f79-4e04-9eda-e7d0f83b9895','2024-05-25 18:16:49','2024-05-25 18:16:49','Prednisone','Used to treat a variety of conditions including autoimmune diseases, asthma, and cancer. Works by reducing inflamation','1*2','True'),
('229bc2a4-1227-4be1-8877-a55aa6d2e5f3','2024-05-25 18:23:49','2024-05-25 18:23:49','Inhaler','Delivers medication to the lungs directly. Used to treat asthma','When needed','False'),
('3e8df047-a6c8-4166-af45-864661aef9e3','2024-05-25 18:19:56','2024-05-25 18:19:56','Levothyroxine','A synthetic thyroid hormone used to treat hypothyroidsm, a condition in which the thyroid gland does not produce enough thyroid hormone','3*1','True'),
('4f5bca29-e4d7-45d5-af8b-c00d47d5f5fd','2024-05-25 18:17:58','2024-05-25 18:17:58','Lithium','A ood stabilizer used to treat bipolar disorder. It helps regulate brain chemicals to prevent mood swings','1*1','True'),
('861d9025-fb5f-4100-b4c4-31bbd3da2d7c','2024-05-25 18:10:00','2024-05-25 18:10:00','Stanins','A class of drugs that lower cholestrol level by blocking an enzyme in liver needed to produce cholestrol. Prevents stroke and heart disease','2*3','True'),
('a1ddad6d-3bd8-48d3-9189-ef5518561ab1','2024-05-25 18:07:43','2024-05-25 18:07:43','Metformin','Used to treat type 2 diabetes by helping the body use insulin more effectively and lowering blood sugar levels.','2*4','True'),
('aafb0a5c-716a-4080-a23f-d34a1e5da12f','2024-05-25 18:22:21','2024-05-25 18:22:21','Omeprazole','A proton pump inhibitor used to treat and prevent heartburn, acid reflux ulcers. It works by reducing stomach acid production','1*2','False'),
('c42b049e-67d9-4adb-bd44-1a842a3a025c','2024-05-27 20:42:25','2024-05-27 20:42:25','Anti_Retro_Viral','Used_to_manage_HIV_','3*3','True'),
('db979a05-f977-4828-bb9c-30baba5242b7','2024-05-25 18:15:12','2024-05-25 18:15:12','Insulin','Used to treat type I diabetes. It helps regulate blood sugar levels by allowing glucose to enter cells for energy','1*1','True'),
('f9d0f097-d5f4-4529-8717-f103a6689890','2024-05-25 18:11:34','2024-05-25 18:11:34','Losartan','An angiotensin II receptor used to treat high blood pressure and heart failure. Relaxes blood vessel allowing blood to flow more ewaily','3*3','True');
/*!40000 ALTER TABLE `medication` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01 11:46:10
