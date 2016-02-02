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
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`fk_user_id`),
  CONSTRAINT `test_pictures_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `test_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_pictures`
--

LOCK TABLES `test_pictures` WRITE;
/*!40000 ALTER TABLE `test_pictures` DISABLE KEYS */;
INSERT INTO `test_pictures` VALUES (1,'testpic1',1),(2,'testpic2',1),(3,'testpic3',1),(4,'testpic4',2),(5,'testpic5',4),(6,'testpic6',4),(7,'testpic7',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_quotes`
--

LOCK TABLES `test_quotes` WRITE;
/*!40000 ALTER TABLE `test_quotes` DISABLE KEYS */;
INSERT INTO `test_quotes` VALUES (1,'This is test qutoe 1',2),(2,'This is test qutoe 2asdfsaadfssadfasdf',3),(4,'This is test qutoe 2asdfsaadfssadfasdfasdfadsdsfasadfads',4),(5,'This is test qutoe 2asdfsaadfssadfasdfasdfadsdsfasadfads',1);
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
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_user`
--

LOCK TABLES `test_user` WRITE;
/*!40000 ALTER TABLE `test_user` DISABLE KEYS */;
INSERT INTO `test_user` VALUES (1,'john','miller','test@gmail.com'),(2,'testfn1','testfn2','testem1'),(3,'testfn2','testln2','testem2'),(4,'testfn3','testln3','testem3');
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

-- Dump completed on 2016-02-01 18:30:53
