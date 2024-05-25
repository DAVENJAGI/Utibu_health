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
-- Table structure for table `wards`
--

DROP TABLE IF EXISTS `wards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wards` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `county_id` varchar(60) NOT NULL,
  `constituency_id` varchar(60) NOT NULL,
  `town_name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `county_id` (`county_id`),
  KEY `constituency_id` (`constituency_id`),
  CONSTRAINT `wards_ibfk_1` FOREIGN KEY (`county_id`) REFERENCES `counties` (`id`) ON DELETE CASCADE,
  CONSTRAINT `wards_ibfk_2` FOREIGN KEY (`constituency_id`) REFERENCES `constituencies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wards`
--

LOCK TABLES `wards` WRITE;
/*!40000 ALTER TABLE `wards` DISABLE KEYS */;
INSERT INTO `wards` VALUES
('016be7f0-32b0-4470-9e0b-d1c4dc693409','2024-05-24 12:31:30','2024-05-24 12:31:30','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','b0fa55b8-c279-4b12-8f4b-d930617c7340','Laini Saba'),
('06ee101d-80f0-44b8-9345-5e7a5fe38eea','2024-05-24 12:24:32','2024-05-24 12:24:32','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','8bd42ea3-4d75-4e03-ab30-32feee30615b','Parklands'),
('06fab9ca-edbd-476b-9d72-3a7e5fd807e0','2024-05-24 12:49:54','2024-05-24 12:49:54','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','650485c1-27af-4f35-8a36-2dafea664f70','Ngei'),
('0a2fa403-ed86-47a3-86a6-c3e3db7d282c','2024-05-24 12:31:46','2024-05-24 12:31:46','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','b0fa55b8-c279-4b12-8f4b-d930617c7340','Makina'),
('0b62ac4b-ea83-4e21-b5d1-12ec73118c7d','2024-05-24 12:49:39','2024-05-24 12:49:39','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','650485c1-27af-4f35-8a36-2dafea664f70','Mabatini'),
('0ff794b5-513c-44dd-9613-250f5c776fc9','2024-05-24 12:43:23','2024-05-24 12:43:23','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','51cf94b8-5b2a-4219-8f06-70fb7d86a6df','Lower Savannah'),
('103f3244-a481-4c30-ac38-5744d4554a18','2024-05-24 12:33:03','2024-05-24 12:33:03','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','ae2bafe1-26c8-48b6-a5f3-e41b121c0bf9','Githurai'),
('11902428-4b0b-43dd-809c-9a4e8ed85e1b','2024-05-24 12:48:24','2024-05-24 12:48:24','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','d44d07be-d116-4d44-8697-8be438328a88','Kariokor'),
('22853f73-194b-45df-859c-ae58972cf050','2024-05-24 12:47:30','2024-05-24 12:47:30','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','70434583-0464-4395-bad4-85f0b49f3686','Ngara'),
('2285d0bf-b474-418d-bb80-9a203792b25c','2024-05-24 12:42:04','2024-05-24 12:42:04','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','54ec8031-9150-4862-ab9c-f0d4cbe845a6','Komarock'),
('28fcc153-66ac-45c1-bce0-83aba827ae4f','2024-05-24 12:42:15','2024-05-24 12:42:15','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','54ec8031-9150-4862-ab9c-f0d4cbe845a6','Spring Valley'),
('2c89834c-6b8d-4ad6-94c2-e16a2640ac37','2024-05-24 12:34:37','2024-05-24 12:34:37','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','d14a0d61-d6c7-4a2d-8ee6-6c2c750682f5','Mwiki'),
('2e678321-1b6d-4ac7-bc4e-61dc9b452419','2024-05-24 12:28:45','2024-05-24 12:28:45','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','611c853e-063c-4928-aec0-3eb5d9d6c4aa','Riruta'),
('34e69cc1-2e4c-4bf1-b98e-3116b9d8292c','2024-05-24 12:44:33','2024-05-24 12:44:33','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','766d7f8f-1e5e-4f82-92bc-e30a98f6ea40','Umoja II'),
('378a1712-c227-4593-ba16-7756f46c10c5','2024-05-24 12:43:43','2024-05-24 12:43:43','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','51cf94b8-5b2a-4219-8f06-70fb7d86a6df','Utawala'),
('3df1413f-4dca-4cca-a551-da750152f960','2024-05-24 12:37:27','2024-05-24 12:37:27','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','288bfdfa-5e72-4a7c-997c-88e140f2748d','Kwa Rueben'),
('3f7eecad-2b64-45f0-947a-a2ac18b85f58','2024-05-24 12:33:48','2024-05-24 12:33:48','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','ae2bafe1-26c8-48b6-a5f3-e41b121c0bf9','Kahawa'),
('40e32b8c-9f25-4f01-8fa0-dbf9bd31ca47','2024-05-24 12:48:35','2024-05-24 12:48:35','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','d44d07be-d116-4d44-8697-8be438328a88','Landimawe'),
('451bbe3b-bb87-41a6-af4a-437ce6e8ec82','2024-05-24 12:25:01','2024-05-24 12:25:01','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','8bd42ea3-4d75-4e03-ab30-32feee30615b','Mountain View'),
('4604befd-87da-48fc-8f2f-569d6bf5c481','2024-05-24 12:27:37','2024-05-24 12:27:37','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','c93da50a-52e1-4173-b20f-21e5c2773041','Kabiro'),
('4816110d-90c5-4cac-93ec-1168ad4aab0b','2024-05-24 12:44:53','2024-05-24 12:44:53','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','766d7f8f-1e5e-4f82-92bc-e30a98f6ea40','Kariobangi South'),
('4d2ca418-86fd-4095-b339-9bc9305030cf','2024-05-24 12:33:16','2024-05-24 12:33:16','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','ae2bafe1-26c8-48b6-a5f3-e41b121c0bf9','Kahawa West'),
('4daf8f15-7f25-455c-8cb9-0ee39444fc29','2024-05-24 12:35:54','2024-05-24 12:35:54','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','9fab01d5-15ce-4ed7-9306-17306745fb68','Utalii'),
('4dee6f23-4c22-483b-894a-f7b493b9fbd7','2024-05-24 12:34:30','2024-05-24 12:34:30','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','d14a0d61-d6c7-4a2d-8ee6-6c2c750682f5','Clay City'),
('4f04c0f2-0177-4092-9155-d4e0355ce9f7','2024-05-24 12:39:43','2024-05-24 12:39:43','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','1a34b623-0d39-477a-9389-15eae6a27ca2','Dandora Area IV'),
('5148aede-54c9-4e7b-b426-046c0a5052c8','2024-05-24 12:27:30','2024-05-24 12:27:30','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','c93da50a-52e1-4173-b20f-21e5c2773041','Kileleshwa'),
('577a0e72-3771-4d5c-a2a6-05f911d3774c','2024-05-24 12:45:58','2024-05-24 12:45:58','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','586c5e08-f08f-45cd-b79f-364b858d2e51','Pumwani'),
('5db9c432-ce75-40c0-ab18-30e79f9f806b','2024-05-24 12:50:06','2024-05-24 12:50:06','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','650485c1-27af-4f35-8a36-2dafea664f70','Mlango Kubwa'),
('5ded3332-76bc-40b6-8424-ea83db177926','2024-05-24 12:34:53','2024-05-24 12:34:53','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','d14a0d61-d6c7-4a2d-8ee6-6c2c750682f5','Njiru'),
('5fdbd366-9818-4851-8288-a1f075ee715a','2024-05-24 12:49:46','2024-05-24 12:49:46','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','650485c1-27af-4f35-8a36-2dafea664f70','Huruma'),
('62f37b10-3d28-4bf0-b78e-940f1ccf285d','2024-05-24 12:43:51','2024-05-24 12:43:51','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','51cf94b8-5b2a-4219-8f06-70fb7d86a6df','Mihango'),
('654dadfa-9ff3-4617-bf6a-b75b73f210cd','2024-05-24 12:32:26','2024-05-24 12:32:26','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','b0fa55b8-c279-4b12-8f4b-d930617c7340','Sarangombe'),
('69d38d41-4a68-443d-8e07-d0b4c58f29c4','2024-05-24 12:29:15','2024-05-24 12:29:15','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','611c853e-063c-4928-aec0-3eb5d9d6c4aa','Waithaka'),
('6bc86e23-c7c7-406d-8c8e-228511356586','2024-05-24 12:27:21','2024-05-24 12:27:21','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','c93da50a-52e1-4173-b20f-21e5c2773041','Gatina'),
('71d0d0a3-79ed-4877-a607-e0c8c096ae19','2024-05-24 12:36:20','2024-05-24 12:36:20','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','9fab01d5-15ce-4ed7-9306-17306745fb68','Korogocho'),
('75b71677-521e-4512-92e9-a9f85407c86d','2024-05-24 12:45:50','2024-05-24 12:45:50','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','586c5e08-f08f-45cd-b79f-364b858d2e51','Makongeni'),
('7a5c8f85-24c4-4ed1-adb6-5fa28a1501d9','2024-05-24 12:46:09','2024-05-24 12:46:09','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','586c5e08-f08f-45cd-b79f-364b858d2e51','Eastleigh North'),
('7cc130a7-7946-4849-ae2f-cc2d35878198','2024-05-24 12:47:45','2024-05-24 12:47:45','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','70434583-0464-4395-bad4-85f0b49f3686','Nairobi Central'),
('7cee14b9-5bbb-4e56-b59a-32da945177c6','2024-05-24 12:45:41','2024-05-24 12:45:41','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','586c5e08-f08f-45cd-b79f-364b858d2e51','Harambee'),
('7df6feb5-9d1d-4379-bc43-e268d00e6267','2024-05-24 12:30:00','2024-05-24 12:30:00','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','c5aa8465-cb34-4ad3-8c4f-6e6564948dfd','Nairobi West'),
('7f7b1ed7-826c-46f1-bff9-69a0ea196546','2024-05-24 12:39:19','2024-05-24 12:39:19','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','1a34b623-0d39-477a-9389-15eae6a27ca2','Dandora Area I'),
('80e3d114-d466-4f73-9244-ce687c1462bd','2024-05-24 12:36:03','2024-05-24 12:36:03','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','9fab01d5-15ce-4ed7-9306-17306745fb68','Mathare North'),
('85dedcce-9c9e-4cb6-b03e-5f6a3b4ba2b5','2024-05-24 12:48:15','2024-05-24 12:48:15','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','d44d07be-d116-4d44-8697-8be438328a88','Pangani'),
('894100c8-a9e0-4396-baf1-100def204a8d','2024-05-24 12:31:54','2024-05-24 12:31:54','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','b0fa55b8-c279-4b12-8f4b-d930617c7340','Woodley'),
('89bc039d-2b11-4587-be3d-66acd72b1c36','2024-05-24 12:28:36','2024-05-24 12:28:36','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','611c853e-063c-4928-aec0-3eb5d9d6c4aa','Ngando'),
('8a2eb520-1fcf-4a53-9516-8e5dd8b0bbaf','2024-05-24 12:45:30','2024-05-24 12:45:30','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','586c5e08-f08f-45cd-b79f-364b858d2e51','Viwandani'),
('8e997f36-ab4e-4e4b-9f8e-b18302d2350f','2024-05-24 12:50:16','2024-05-24 12:50:16','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','650485c1-27af-4f35-8a36-2dafea664f70','Klamaiko'),
('90522365-1f79-489d-ad80-f82245d6c64c','2024-05-24 12:43:36','2024-05-24 12:43:36','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','51cf94b8-5b2a-4219-8f06-70fb7d86a6df','Embakasi'),
('915a0b51-d311-4bb4-8071-eeb799e20aba','2024-05-24 12:24:41','2024-05-24 12:24:41','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','8bd42ea3-4d75-4e03-ab30-32feee30615b','Karura'),
('923fd00a-61d4-4fe5-b720-cc2142263a45','2024-05-24 12:34:46','2024-05-24 12:34:46','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','d14a0d61-d6c7-4a2d-8ee6-6c2c750682f5','Kasarani'),
('94c78eef-c422-4069-862d-cd9f788eb27d','2024-05-24 12:31:39','2024-05-24 12:31:39','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','b0fa55b8-c279-4b12-8f4b-d930617c7340','Lindi'),
('94eff7e4-6bcf-4f29-a1f0-f19a3e7f47ca','2024-05-24 12:43:10','2024-05-24 12:43:10','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','51cf94b8-5b2a-4219-8f06-70fb7d86a6df','Upper Savannah'),
('999d4677-6a5f-44c4-901e-be68cefa1fd3','2024-05-24 12:49:10','2024-05-24 12:49:10','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','d44d07be-d116-4d44-8697-8be438328a88','Hospital'),
('9e5d677c-b1bd-49fa-a6a5-d790fe60b715','2024-05-24 12:24:50','2024-05-24 12:24:50','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','8bd42ea3-4d75-4e03-ab30-32feee30615b','Kangemi'),
('9faabe89-6f0a-4c0d-86e0-1f7bac6a0460','2024-05-24 12:37:01','2024-05-24 12:37:01','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','288bfdfa-5e72-4a7c-997c-88e140f2748d','Imara Daima'),
('a020251d-13a4-419f-95a5-83d875a1a1aa','2024-05-24 12:29:47','2024-05-24 12:29:47','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','c5aa8465-cb34-4ad3-8c4f-6e6564948dfd','Karen'),
('a0722ea0-c478-47f9-ac56-db37044d9091','2024-05-24 12:28:24','2024-05-24 12:28:24','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','611c853e-063c-4928-aec0-3eb5d9d6c4aa','Mutu-Ini'),
('a088eecd-ca20-47e3-815a-c3f9210e58ea','2024-05-24 12:26:59','2024-05-24 12:26:59','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','c93da50a-52e1-4173-b20f-21e5c2773041','Kilimani'),
('a5eb0455-4dd6-4eb2-86bb-5e79e9271ad8','2024-05-24 12:30:30','2024-05-24 12:30:30','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','c5aa8465-cb34-4ad3-8c4f-6e6564948dfd','South C'),
('a9aa7fe9-bf3d-4538-b408-503aeaf12569','2024-05-24 12:37:45','2024-05-24 12:37:45','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','288bfdfa-5e72-4a7c-997c-88e140f2748d','Kware'),
('add90bdc-ab77-4876-a09c-e2340473d3cc','2024-05-24 12:33:36','2024-05-24 12:33:36','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','ae2bafe1-26c8-48b6-a5f3-e41b121c0bf9','Roysambu'),
('b0a2bc5f-b51c-44cd-9c6d-87ac2e46e999','2024-05-24 12:45:01','2024-05-24 12:45:01','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','766d7f8f-1e5e-4f82-92bc-e30a98f6ea40','Hamza'),
('b0fa867d-e99a-4fc4-bb98-c87e30d784f3','2024-05-24 12:47:01','2024-05-24 12:47:01','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','70434583-0464-4395-bad4-85f0b49f3686','Eastleigh South'),
('b17030e6-b918-40b2-9ba3-4f127b75523d','2024-05-24 12:36:13','2024-05-24 12:36:13','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','9fab01d5-15ce-4ed7-9306-17306745fb68','Lucky Summer'),
('b3bfc161-01e5-4087-94f5-52ed07f32313','2024-05-24 12:47:12','2024-05-24 12:47:12','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','70434583-0464-4395-bad4-85f0b49f3686','Airbase'),
('bbe1bc16-0e90-443f-84b1-064863ca1b58','2024-05-24 12:27:08','2024-05-24 12:27:08','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','c93da50a-52e1-4173-b20f-21e5c2773041','Kawangware'),
('bcd1cbea-8dcb-41a0-9afa-ff8238bfe701','2024-05-24 12:41:41','2024-05-24 12:41:41','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','54ec8031-9150-4862-ab9c-f0d4cbe845a6','Kayole Central'),
('be926661-ac2b-4339-9a56-7334a24e5e70','2024-05-24 12:30:17','2024-05-24 12:30:17','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','c5aa8465-cb34-4ad3-8c4f-6e6564948dfd','Mugumu-Ini'),
('bf1e6924-e5a7-4e7e-8cc0-9feaad702ebe','2024-05-24 12:30:41','2024-05-24 12:30:41','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','c5aa8465-cb34-4ad3-8c4f-6e6564948dfd','Nyayo Highrise'),
('bf40c7f7-4485-4b69-a451-729d69a5f6af','2024-05-24 12:48:49','2024-05-24 12:48:49','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','d44d07be-d116-4d44-8697-8be438328a88','Nairobi South'),
('c8fdc033-12ee-44e3-be9e-9d9154064166','2024-05-24 12:39:27','2024-05-24 12:39:27','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','1a34b623-0d39-477a-9389-15eae6a27ca2','Dandora Area II'),
('caa7b4d7-e964-4ace-8c78-86d3b968b2db','2024-05-24 12:24:11','2024-05-24 12:24:11','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','8bd42ea3-4d75-4e03-ab30-32feee30615b','Kitisuru'),
('cff0b2fb-dd87-4fbb-89b8-4ec558f6d784','2024-05-24 12:39:35','2024-05-24 12:39:35','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','1a34b623-0d39-477a-9389-15eae6a27ca2','Dandora Area III'),
('d2ef48cc-1c8e-494c-9fad-5f569f8c98d5','2024-05-24 12:44:23','2024-05-24 12:44:23','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','766d7f8f-1e5e-4f82-92bc-e30a98f6ea40','Umoja I'),
('da9b613b-1fa7-434f-a04c-d2ad4a5b5eba','2024-05-24 12:41:53','2024-05-24 12:41:53','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','54ec8031-9150-4862-ab9c-f0d4cbe845a6','Kayole South'),
('dab0935c-ee5b-47fb-b035-bc680385f5a2','2024-05-24 12:41:29','2024-05-24 12:41:29','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','54ec8031-9150-4862-ab9c-f0d4cbe845a6','Kayole North'),
('e02aea2e-d9d0-4740-a52b-d5148b780386','2024-05-24 12:44:40','2024-05-24 12:44:40','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','766d7f8f-1e5e-4f82-92bc-e30a98f6ea40','Mowlem'),
('e3ad9b3a-f041-49f9-8e42-088bbdddedb7','2024-05-24 12:33:24','2024-05-24 12:33:24','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','ae2bafe1-26c8-48b6-a5f3-e41b121c0bf9','Zimmerman'),
('e5fdde1d-7ef1-4fae-8f6b-df9f3821ac13','2024-05-24 12:35:45','2024-05-24 12:35:45','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','9fab01d5-15ce-4ed7-9306-17306745fb68','Baba Dogo'),
('e6ffa492-3665-4e2b-b175-0d1d2c36fd1d','2024-05-24 12:47:20','2024-05-24 12:47:20','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','70434583-0464-4395-bad4-85f0b49f3686','California'),
('eae3b4ce-4af1-416c-bb4b-372ca8b1949d','2024-05-24 12:37:12','2024-05-24 12:37:12','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','288bfdfa-5e72-4a7c-997c-88e140f2748d','Kwa Njenga'),
('f33c632e-4d81-44a6-8439-0556cefa8864','2024-05-24 12:38:30','2024-05-24 12:38:30','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','1a34b623-0d39-477a-9389-15eae6a27ca2','Kariobangi North'),
('fae33150-1883-4339-8fa8-43b7e98242a8','2024-05-24 12:37:36','2024-05-24 12:37:36','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','288bfdfa-5e72-4a7c-997c-88e140f2748d','Pipeline'),
('fe0de79b-d429-483f-84e5-1f100ca9ed95','2024-05-24 12:35:01','2024-05-24 12:35:01','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','d14a0d61-d6c7-4a2d-8ee6-6c2c750682f5','Ruai'),
('fe4e5174-5ee9-49de-9033-3b4f7e4ee931','2024-05-24 12:28:57','2024-05-24 12:28:57','ad818876-1c8a-4ae0-a6f5-2c0b0862ecde','611c853e-063c-4928-aec0-3eb5d9d6c4aa','Uthiru');
/*!40000 ALTER TABLE `wards` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-25 15:32:13
