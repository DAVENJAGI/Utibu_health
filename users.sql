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
  `doctor_id` varchar(64) NOT NULL,
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
('292a4700-199f-443b-9e2b-a0489efc6cc2','2024-05-25 19:21:28','2024-05-25 19:21:28','johnkiama@gmail.com','60899jk','John','Kiama','1982-04-11','930c1580-0d59-4f54-bb62-c9e05162679f','dc51bbaf-9312-44c7-aed7-4cf6146a9efa'),
('36f5c732-0ba9-4ba5-97fe-49c67ec03aa9','2024-05-25 19:27:55','2024-05-25 19:27:55','willypaulo1@gmail.com','YYATyH','William','Paul','1979-02-28','49e6abd0-f7d4-45a4-97ba-7ce84b1727db','1d1aa496-0b66-4b25-8cdf-4977c01d9252'),
('444046a9-f248-4548-9e9d-6edb8463775d','2024-05-25 19:29:04','2024-05-25 19:29:04','wycliffeowino09@gmail.com','ddTyH','Wycliffe','Owino','1989-02-12','49e6abd0-f7d4-45a4-97ba-7ce84b1727db','58503a30-ddcc-4211-9ce0-902151ddaef9'),
('5ef26a35-ff0e-4188-a9c2-e6526e9e6302','2024-05-25 19:26:05','2024-05-25 19:26:05','frankoloo@gmail.com','olFk@ffa','Franklin','Omondi','19820-03-09','271ffc89-6c1e-4e60-8efe-9d92b6b81637','1d1aa496-0b66-4b25-8cdf-4977c01d9252'),
('73bdf402-c1de-4695-9fa1-0ab131492387','2024-05-25 19:23:23','2024-05-25 19:23:23','alfredkihik20@gmail.com','ak8hhl','Alfred','Kihika','1999-10-01','02f798d8-d85d-42b6-bd55-47bd55f12b54','da008408-2d4b-458b-8200-1db1e987b2b1'),
('73c09a97-83d6-4f11-8058-a550c20d5c53','2024-05-25 19:24:27','2024-05-25 19:24:27','alaijm@gmail.com','#2@ffa','Alai','Jamusi','1970-12-21','12a4cabb-75df-4e5f-84cc-87707b211ecc','acb376d1-76b6-48b6-b39b-0063508ba67b'),
('ed415efc-3fe1-4b16-8b16-f35e64cb6e9c','2024-05-25 17:53:19','2024-05-25 17:53:19','maryjenkin12@gmail.com','66639Dk*','Mary','Jenkins','2002-07-01','3e791884-1f9f-41a1-a3e0-8d97e7b0dfe0',NULL);
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

-- Dump completed on 2024-05-25 15:32:01
