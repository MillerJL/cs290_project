-- MySQL dump 10.13  Distrib 5.6.25, for osx10.10 (x86_64)
--
-- Host: localhost    Database: cs290_db
-- ------------------------------------------------------
-- Server version	5.6.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `test_pictures`
--

DROP TABLE IF EXISTS `test_pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_pictures` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `pic_name` varchar(255) NOT NULL,
  `fk_user_id` int(6) DEFAULT NULL,
  `thumb_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`fk_user_id`),
  CONSTRAINT `test_pictures_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `test_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_pictures`
--

LOCK TABLES `test_pictures` WRITE;
/*!40000 ALTER TABLE `test_pictures` DISABLE KEYS */;
INSERT INTO `test_pictures` VALUES (75,'mushrooms-0904fed00dd01a62b40287800147406d.jpg',17,'mushrooms-0904fed00dd01a62b40287800147406d-thumbnail.jpg'),(76,'tLFcIXG-44796e015902602cdcfe8ed99c1f51c1.jpg',17,'tLFcIXG-44796e015902602cdcfe8ed99c1f51c1-thumbnail.jpg'),(77,'playable_races-999201ce83d400777ee8e2c989b8dae9.jpg',17,'playable_races-999201ce83d400777ee8e2c989b8dae9-thumbnail.jpg'),(78,'bug-a329a81b2ce9ff66c842fe0598c34c9b.jpg',17,'bug-a329a81b2ce9ff66c842fe0598c34c9b-thumbnail.jpg'),(79,'plants-00c7161417f83afe5dc73f57465d65b4.jpg',17,'plants-00c7161417f83afe5dc73f57465d65b4-thumbnail.jpg'),(80,'tLFcIXG-7cd9cc2b603b46eb5bd582f81b57d070.jpg',17,'tLFcIXG-7cd9cc2b603b46eb5bd582f81b57d070-thumbnail.jpg'),(81,'tLFcIXG-ea39c8c498b4550a0edff58e56c0aa02.jpg',17,'tLFcIXG-ea39c8c498b4550a0edff58e56c0aa02-thumbnail.jpg'),(82,'mPiu1ba-a5a2f8abeb2e13d18eb01d4e4f37b008.jpg',17,'mPiu1ba-a5a2f8abeb2e13d18eb01d4e4f37b008-thumbnail.jpg'),(83,'playable_races-d142d4ccefd9d0315832d974315acbdd.jpg',17,'playable_races-d142d4ccefd9d0315832d974315acbdd-thumbnail.jpg'),(84,'shearing_day_1-6f3daf6da49ca787a1f045f9cb062dad.png',17,'shearing_day_1-6f3daf6da49ca787a1f045f9cb062dad-thumbnail.png'),(85,'bug-d09dc81807113f37b52cd1c0dacf0126.jpg',17,'bug-d09dc81807113f37b52cd1c0dacf0126-thumbnail.jpg'),(86,'plants-cab38a7d35da10b0797ef5e9980e53ed.jpg',17,'plants-cab38a7d35da10b0797ef5e9980e53ed-thumbnail.jpg'),(87,'shearing_day_1-53b60aa19bb935d5fa34f049e8c211df.png',17,'shearing_day_1-53b60aa19bb935d5fa34f049e8c211df-thumbnail.png'),(88,'bug-bdad8111303dde5796e7cb03221f725e.jpg',17,'bug-bdad8111303dde5796e7cb03221f725e-thumbnail.jpg'),(89,'UB9rTcS-9210bb4e0d03a8c091349e3a30ae21df.gif',17,'UB9rTcS-9210bb4e0d03a8c091349e3a30ae21df-thumbnail.gif'),(90,'IMG_20160215_195023762-6e2a3c9c485e83029ae33d916e03c105.jpg',17,'IMG_20160215_195023762-6e2a3c9c485e83029ae33d916e03c105-thumbnail.jpg'),(91,'IMG_20160215_195023762-3bafc9c4868699c84400411bb0c625e7.jpg',17,'IMG_20160215_195023762-3bafc9c4868699c84400411bb0c625e7-thumbnail.jpg'),(92,'UB9rTcS-78be476f30635f4f071b2ae23a40c2d9.gif',18,'UB9rTcS-78be476f30635f4f071b2ae23a40c2d9-thumbnail.gif'),(93,'IMG_20160215_195023762-3aed4abd1ce0522015d17e7c046db65f.jpg',18,'IMG_20160215_195023762-3aed4abd1ce0522015d17e7c046db65f-thumbnail.jpg');
/*!40000 ALTER TABLE `test_pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_quotes`
--

DROP TABLE IF EXISTS `test_quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_quotes` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `quote_text` text,
  `fk_user_id` int(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`fk_user_id`),
  CONSTRAINT `test_quotes_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `test_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_quotes`
--

LOCK TABLES `test_quotes` WRITE;
/*!40000 ALTER TABLE `test_quotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_quotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_user`
--

DROP TABLE IF EXISTS `test_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_user` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_user`
--

LOCK TABLES `test_user` WRITE;
/*!40000 ALTER TABLE `test_user` DISABLE KEYS */;
INSERT INTO `test_user` VALUES (17,'john','email1@gmail.com','$2a$10$Jk2Y0Lq4Z7inXgG42xMgrO7GiXsbU2kj8.c4Nakns9jBXyHMCNIrm'),(18,'john','email10@gmail.com','$2a$10$ZiKUVAavq5Q0dkUdEs6.IOYlwg6qvqhli2XCVzbUTQjX/Cb00kUk6');
/*!40000 ALTER TABLE `test_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-25 21:48:41
