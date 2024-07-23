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
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requests` (
  `id` varchar(64) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES
('02c38688-6c37-4531-b503-3a0bc26d603f','2024-07-23 21:43:20','2024-07-23 21:43:20'),
('0a4d7a10-a52a-4127-a12e-c1d149ccc8fc','2024-07-23 21:42:20','2024-07-23 21:42:20'),
('0b504bcc-b28a-4283-9173-9d2425ceaa12','2024-07-23 21:42:31','2024-07-23 21:42:31'),
('0d7bf5d9-75a5-4107-ada8-a3eec176fc9c','2024-07-23 21:29:19','2024-07-23 21:29:19'),
('138d700f-63fe-4d95-9f1d-938adb5bd0fc','2024-07-23 21:45:11','2024-07-23 21:45:11'),
('169ee3c4-fb0c-4b4f-93d0-649c61cb56a5','2024-07-23 21:29:10','2024-07-23 21:29:10'),
('172e68db-e1d9-4c5b-be8a-a1b55a6f5bb9','2024-07-23 21:29:23','2024-07-23 21:29:23'),
('188475f2-0827-44c8-b8c4-b054429b6523','2024-07-23 21:29:33','2024-07-23 21:29:33'),
('1b69a047-8ec0-43ae-8776-ae10e2727cfc','2024-07-23 21:28:12','2024-07-23 21:28:12'),
('1bfb06d4-e114-4d13-a432-f3c4a728d054','2024-07-23 21:28:51','2024-07-23 21:28:51'),
('1ecd0c0e-d541-4180-8655-6883971797a8','2024-07-23 21:27:58','2024-07-23 21:27:58'),
('21a61ba8-08d3-47bf-9c5f-eb3d9551cf07','2024-07-23 21:28:12','2024-07-23 21:28:12'),
('2249f125-5b44-4037-98d6-43915d68d33f','2024-07-23 21:30:08','2024-07-23 21:30:08'),
('29e88e39-8f45-4384-b214-70e602396e48','2024-07-23 21:29:16','2024-07-23 21:29:16'),
('2b613a27-b6c8-4b51-a16f-67332d81ad88','2024-07-23 21:29:23','2024-07-23 21:29:23'),
('3130cb45-a586-427b-a767-b1e980447bde','2024-07-23 21:29:23','2024-07-23 21:29:23'),
('34d0be2b-b8b9-4742-9a00-97b7c64c4e9f','2024-07-23 21:29:09','2024-07-23 21:29:09'),
('35cc6aaa-48d2-4bf0-a3d9-3cd5a84f7801','2024-07-23 21:29:10','2024-07-23 21:29:10'),
('369ce481-bb52-455c-8369-1f19bfec0ad5','2024-07-23 21:29:23','2024-07-23 21:29:23'),
('3908d83f-05ab-4ce5-80be-6f5e2bdf26bc','2024-07-23 21:29:09','2024-07-23 21:29:09'),
('3996e62e-5753-4c24-b22a-512d851484a1','2024-07-23 21:28:52','2024-07-23 21:28:52'),
('3b42c4d6-689b-4bdd-aad1-c92b528ef62f','2024-07-23 21:42:53','2024-07-23 21:42:53'),
('3d3f324a-ff64-4daf-b30d-40673ab9e5d7','2024-07-23 21:28:52','2024-07-23 21:28:52'),
('3e63a107-40f0-4088-af7c-f1abcc0b2498','2024-07-23 21:29:12','2024-07-23 21:29:12'),
('401a6f79-da2e-4f4f-996e-da2eef34f48c','2024-07-23 21:39:08','2024-07-23 21:39:08'),
('4287aec8-1a7b-4301-ad09-d904c5ab25de','2024-07-23 21:28:12','2024-07-23 21:28:12'),
('45bed449-8d0f-4049-b022-4284a5a90d08','2024-07-23 21:29:16','2024-07-23 21:29:16'),
('4616d913-15a3-4ce9-b631-7ca92a082365','2024-07-23 21:29:10','2024-07-23 21:29:10'),
('524b3bf7-3d9d-4a4f-a9f5-7d3a1cd5bdc9','2024-07-23 21:28:52','2024-07-23 21:28:52'),
('524e848a-f56c-433f-ac04-7dddae43de83','2024-07-23 21:29:06','2024-07-23 21:29:06'),
('53e542d9-b8ae-4101-bfa8-a99841375528','2024-07-23 21:28:13','2024-07-23 21:28:13'),
('54250c74-7576-46db-9638-a2f6f5a5d6d5','2024-07-23 21:29:16','2024-07-23 21:29:16'),
('57625383-b78f-45bd-b60f-dd854af79616','2024-07-23 21:44:21','2024-07-23 21:44:21'),
('57d5211c-5e43-4b07-88c9-5b328f83d783','2024-07-23 21:28:51','2024-07-23 21:28:51'),
('59c10808-351d-4af5-a903-1704143cf734','2024-07-23 21:27:33','2024-07-23 21:27:33'),
('5baa9f7e-7e1a-497d-b9d5-a2245862164e','2024-07-23 21:29:10','2024-07-23 21:29:10'),
('60009c3d-5567-4b1f-a214-ddb48ce66cc2','2024-07-23 21:29:10','2024-07-23 21:29:10'),
('6457640e-f59e-460e-a0b6-8fc4144fa04d','2024-07-23 21:29:24','2024-07-23 21:29:24'),
('6598c1bb-f07a-4faf-960a-e32651b5b2c4','2024-07-23 21:29:09','2024-07-23 21:29:09'),
('70cb5098-a58d-4111-82d5-04469fb18fed','2024-07-23 21:28:51','2024-07-23 21:28:51'),
('7eb7ade1-d7a5-49a8-a3a7-c2175b7e33cd','2024-07-23 21:29:23','2024-07-23 21:29:23'),
('84150171-8162-49e5-ab42-356768451683','2024-07-23 21:28:51','2024-07-23 21:28:51'),
('84471c8a-271f-405e-b073-81d078b56dac','2024-07-23 21:28:49','2024-07-23 21:28:49'),
('84faeb73-93b0-469f-af72-a6ae69a04f8c','2024-07-23 21:29:32','2024-07-23 21:29:32'),
('8642169a-8adb-48cd-956c-a73d76522fd1','2024-07-23 21:29:24','2024-07-23 21:29:24'),
('8be3d8b0-7dcb-4cc6-88d7-0ee2741192d7','2024-07-23 21:29:16','2024-07-23 21:29:16'),
('8d75225a-e52d-4c87-8eb0-d2a90075ae2e','2024-07-23 21:28:52','2024-07-23 21:28:52'),
('8f29d9a4-08ae-4067-bc8b-10115b32374e','2024-07-23 21:44:22','2024-07-23 21:44:22'),
('a0fc1d43-a4a0-4a74-8200-f70eb08c2022','2024-07-23 21:28:51','2024-07-23 21:28:51'),
('a4127614-79f2-4c05-beea-7ccb9a0223c6','2024-07-23 21:28:51','2024-07-23 21:28:51'),
('a77a3df0-5c23-4bed-99a8-1b238f406bc9','2024-07-23 21:29:23','2024-07-23 21:29:23'),
('aa034afe-c51e-484f-8bac-4f428803e383','2024-07-23 21:28:52','2024-07-23 21:28:52'),
('ab20c9f6-9376-42bf-bca5-9f4bbdd85433','2024-07-23 21:28:13','2024-07-23 21:28:13'),
('ac7f1092-1d32-4a14-995d-a7f3ba17434f','2024-07-23 21:44:07','2024-07-23 21:44:07'),
('af26176f-b2cc-462e-9e1c-bff1255c19c8','2024-07-23 21:29:09','2024-07-23 21:29:09'),
('af6d55a7-47c8-465b-a3b4-d13ba8843362','2024-07-23 21:46:26','2024-07-23 21:46:26'),
('b476f2f0-b5c3-491c-8efe-cd1d98c94bd0','2024-07-23 21:29:10','2024-07-23 21:29:10'),
('b5994acd-510b-4849-b3a9-b2d5dc8899ff','2024-07-23 21:29:24','2024-07-23 21:29:24'),
('b7769d2a-58f1-4714-984d-6604ae4dbad7','2024-07-23 21:29:09','2024-07-23 21:29:09'),
('bbc09d96-bd42-4377-bb2a-57db79d817ce','2024-07-23 21:28:12','2024-07-23 21:28:12'),
('bf764de7-1ace-423e-8ac3-705a51a3b28a','2024-07-23 21:28:03','2024-07-23 21:28:03'),
('bfe6e7e1-6b0e-4d31-824f-9d2eab7f8d56','2024-07-23 21:38:02','2024-07-23 21:38:02'),
('c08f73a5-0e05-4e22-8e8c-5352f5b6cf3f','2024-07-23 21:29:23','2024-07-23 21:29:23'),
('c12688e1-475c-4b45-bdb1-0832c8ad0ddb','2024-07-23 21:28:12','2024-07-23 21:28:12'),
('c24d5be2-8071-44d1-b96b-5b9cad58d279','2024-07-23 21:29:16','2024-07-23 21:29:16'),
('c2987065-59af-4c17-85f2-d5ce87d30629','2024-07-23 21:29:09','2024-07-23 21:29:09'),
('c4b91891-8cbc-4dd7-a401-af770caec592','2024-07-23 21:30:06','2024-07-23 21:30:06'),
('ca4f6ecc-9694-4025-acb8-0489839447da','2024-07-23 21:29:16','2024-07-23 21:29:16'),
('d0e27a1c-cbfb-4912-b32e-532c0a6893a5','2024-07-23 21:29:23','2024-07-23 21:29:23'),
('d4dd0ed4-bad5-437f-b728-680e7e7dc726','2024-07-23 21:29:24','2024-07-23 21:29:24'),
('db1d28a0-7800-4025-98f1-247f7ba8d960','2024-07-23 21:29:23','2024-07-23 21:29:23'),
('de66dc56-2ef8-4544-94b8-e160bbb74142','2024-07-23 21:29:23','2024-07-23 21:29:23'),
('e1dc78cc-0e80-4067-9713-24c72e6ed874','2024-07-23 21:28:13','2024-07-23 21:28:13'),
('e50f5105-619e-4cfe-bfd0-8402598e285e','2024-07-23 21:29:10','2024-07-23 21:29:10'),
('e9a093c6-aedc-4299-8ddc-c4096b38ab1d','2024-07-23 21:28:12','2024-07-23 21:28:12'),
('ef3304b0-3538-4001-adae-76712103b414','2024-07-23 21:43:10','2024-07-23 21:43:10'),
('f09d0e43-8972-4dba-8eca-cd5f7d767cc4','2024-07-23 21:28:52','2024-07-23 21:28:52'),
('f2078f09-b6ac-4e50-8130-8db06a7c4eb5','2024-07-23 21:29:10','2024-07-23 21:29:10'),
('f6fcd666-cc88-4832-894c-43f0587a6eb9','2024-07-23 21:28:52','2024-07-23 21:28:52'),
('fbe689cc-d862-4146-a5c7-09b7d0830329','2024-07-23 21:28:52','2024-07-23 21:28:52'),
('ff83e9ff-79bf-474c-a8c7-67bf8c2f2a43','2024-07-23 21:28:13','2024-07-23 21:28:13');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-23 13:46:26
