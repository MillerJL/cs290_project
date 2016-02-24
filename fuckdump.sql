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
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_pictures`
--

LOCK TABLES `test_pictures` WRITE;
/*!40000 ALTER TABLE `test_pictures` DISABLE KEYS */;
INSERT INTO `test_pictures` VALUES (16,'testpic1',17),(17,'testpic2',17),(18,'testpic3',17),(19,'testpic4',17),(52,'test-148b569ff188b38fce0dd54e8da538f7.png',17),(53,'cs290_table_data-be7d61e5fa442e1050f070aecc04bcd6.png',17),(54,'cs290_site_progress-f0f1cb8fa660200f08955f3d1534de81.png',17),(55,'test-813819cf01dd06077d70c4df6c984eae.png',17),(56,'test-61d2f46ca4b92118185904d22a39f534.png',17),(57,'UB9rTcS-65e237cd1c35bf59c09fe2676699e960.gif',17),(58,'UB9rTcS-41556e9333e88c335e663d0c80f66a7f.gif',17),(59,'Boruvka\'s_algorithm_(Sollin\'s_algorithm)_Anim-95b3c031b60d418c91d69533b1b7e55d.gif',17),(60,'UB9rTcS-6ad37000bbda51de2fac5ab92e475e35.gif',17),(61,'test copy-5b39cf93908395f15634cff869071e1e.gif',17),(62,'cs290_site_progress-aff798460a33e32c61c389871ae7d6f8.png',17),(63,'test-940dfde2f4e46a8f3c3a87e84ad4052b.png',17),(64,'Boruvka\'s_algorithm_(Sollin\'s_algorithm)_Anim-250079259b21bd9726a87431960f2bfb.gif',17),(65,'Boruvka\'s_algorithm_(Sollin\'s_algorithm)_Anim-2ff7e9ea23a4130938e3967ec3a85b28.gif',17),(66,'Boruvka\'s_algorithm_(Sollin\'s_algorithm)_Anim-2f9652427e5619b124d6dd506f826b95.gif',17),(67,'UB9rTcS-37199d642760826286e41d9f4b474259.gif',17),(68,'UB9rTcS-a4024153f0c74fd43e21ba34b009e8c6.gif',17),(69,'UB9rTcS-94599aca872f1634ee19b03aafeb3e22.gif',17),(70,'UB9rTcS-bb7078fdcfb3f3ee16cea7047ae7208a.gif',17);
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_user`
--

LOCK TABLES `test_user` WRITE;
/*!40000 ALTER TABLE `test_user` DISABLE KEYS */;
INSERT INTO `test_user` VALUES (17,'john','email1@gmail.com','$2a$10$Jk2Y0Lq4Z7inXgG42xMgrO7GiXsbU2kj8.c4Nakns9jBXyHMCNIrm');
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

-- Dump completed on 2016-02-23 16:02:56
