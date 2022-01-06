create database lcon11111111111;
use lcon11111111111;

drop procedure SP_CrudLcoNume;
DELIMITER $$
CREATE PROCEDURE `SP_CrudLcoNume`(
	opcion int,
	cia VARCHAR(50),
    nl_subdia char(4),
    nl_anio char(4),
    nl_mes char(2),
    nl_nume int,
    nl_usrcrea  varchar(10),
    nl_feccrea date,
    nl_hracrea time,
    nl_usract varchar(10),
    nl_fecact date,
    nl_hraact time
     )
BEGIN

    CASE opcion

		WHEN '0' THEN
		    IF nl_subdia='' THEN
                SET @sql_text = concat('select nl_subdia, tl_descri as descri, nl_nume, nl_anio, nl_mes from lco',cia,'nume21 a
				inner join lco',cia,'tgen b on b.tl_codtabla=02 and b.tl_clave=nl_subdia ;');
            ELSE
                SET @sql_text = concat('select * from lco',cia,'nume21 where nl_subdia="',nl_subdia,'" and nl_anio="',nl_anio,'" and nl_mes="',nl_mes,'";');
            END IF;
        PREPARE stmt FROM @sql_text;
        EXECUTE stmt;

        WHEN '1' THEN
            SET @sql_text = concat('insert into lco',cia,'nume21 values("' ,nl_subdia,'","'
            ,nl_anio,'","'
            ,nl_mes,'",'
            ,nl_nume,',"'
            ,nl_usrcrea,'","'
            ,nl_feccrea,'","'
            ,nl_hracrea,'","'
            ,nl_usract,'","'
            ,nl_fecact,'","'
            ,nl_hraact,'");');
        PREPARE stmt1 FROM @sql_text;
        EXECUTE stmt1;

        WHEN '2' THEN
            SET @sql_text = concat('UPDATE lco',cia,'nume21 SET nl_subdia = "',nl_subdia,
                       '",nl_anio = "',nl_anio,
                       '",nl_mes ="',nl_mes,
                       '",nl_nume ="',nl_nume,
                       '",nl_usrcrea ="',nl_usrcrea,
                       '",nl_feccrea = "',nl_feccrea,
                       '",nl_hracrea = "',nl_hracrea,
                       '",nl_usract = "',nl_usract,
                       '",nl_fecact = "',nl_fecact,
                       '",nl_hraact ="',nl_hraact,
                       '"  where nl_anio ="',nl_anio,'" and nl_mes ="',nl_mes,'" and nl_subdia=',nl_subdia);
        PREPARE stmt1 FROM @sql_text;
        EXECUTE stmt1;

        WHEN '3' THEN
            SET @sql_text = concat('delete from lco',cia,'nume21 WHERE nl_anio = ',"'",nl_anio,"'",' AND nl_mes = ',"'",nl_mes,"'", 'AND nl_subdia=',"'",nl_subdia,"'");
        PREPARE stmt FROM @sql_text;
        EXECUTE stmt;

    END CASE;
END$$
DELIMITER ;



DROP TABLE IF EXISTS `lco0001nume21`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lco0001nume21` (
  `nl_subdia` char(4) NOT NULL,
  `nl_anio` char(4) NOT NULL,
  `nl_mes` char(2) NOT NULL DEFAULT '',
  `nl_nume` int NOT NULL,
  `nl_usrcrea` varchar(10) NOT NULL DEFAULT '',
  `nl_feccrea` date DEFAULT NULL,
  `nl_hracrea` time DEFAULT NULL,
  `nl_usract` varchar(10) NOT NULL DEFAULT '',
  `nl_fecact` date DEFAULT NULL,
  `nl_hraact` time DEFAULT NULL,
  PRIMARY KEY (`nl_nume`,`nl_anio`,`nl_mes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lco0001nume21`
--

LOCK TABLES `lco0001nume21` WRITE;
/*!40000 ALTER TABLE `lco0001nume21` DISABLE KEYS */;
INSERT INTO `lco0001nume21` VALUES ('05','2021','02',5,'',NULL,NULL,'',NULL,NULL),('05','2021','01',12,'',NULL,NULL,'',NULL,NULL),('06','2021','01',33,'',NULL,NULL,'',NULL,NULL);
/*!40000 ALTER TABLE `lco0001nume21` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;







drop procedure SP_CrudLcoNume;
DELIMITER $$
CREATE PROCEDURE `SP_CrudLcoNume`(
	opcion int,
	cia VARCHAR(50),
    nl_subdia char(4),
    nl_anio char(4),
    nl_mes char(2),
    nl_nume int,
    nl_usrcrea  varchar(10),
    nl_feccrea date,
    nl_hracrea time,
    nl_usract varchar(10),
    nl_fecact date,
    nl_hraact time
     )
BEGIN

    CASE opcion

		WHEN '0' THEN
		    IF nl_subdia='' THEN
                SET @sql_text = concat('select nl_subdia, tl_descri as descri, nl_nume, nl_anio, nl_mes from lco',cia,'nume21 a
				inner join lco',cia,'tgen b on b.tl_codtabla=02 and b.tl_clave=nl_subdia ;');
            ELSE
                SET @sql_text = concat('select * from lco',cia,'nume21 where nl_subdia="',nl_subdia,'" and nl_anio="',nl_anio,'" and nl_mes="',nl_mes,'";');
            END IF;
        PREPARE stmt FROM @sql_text;
        EXECUTE stmt;

        WHEN '1' THEN
            SET @sql_text = concat('insert into lco',cia,'nume21 values("' ,nl_subdia,'","'
            ,nl_anio,'","'
            ,nl_mes,'",'
            ,nl_nume,',"'
            ,nl_usrcrea,'","'
            ,nl_feccrea,'","'
            ,nl_hracrea,'","'
            ,nl_usract,'","'
            ,nl_fecact,'","'
            ,nl_hraact,'");');
        PREPARE stmt1 FROM @sql_text;
        EXECUTE stmt1;

        WHEN '2' THEN
            SET @sql_text = concat('UPDATE lco',cia,'nume21 SET nl_subdia = "',nl_subdia,
                       '",nl_anio = "',nl_anio,
                       '",nl_mes ="',nl_mes,
                       '",nl_nume ="',nl_nume,
                       '",nl_usrcrea ="',nl_usrcrea,
                       '",nl_feccrea = "',nl_feccrea,
                       '",nl_hracrea = "',nl_hracrea,
                       '",nl_usract = "',nl_usract,
                       '",nl_fecact = "',nl_fecact,
                       '",nl_hraact ="',nl_hraact,
                       '"  where nl_anio ="',nl_anio,'" and nl_mes ="',nl_mes,'" and nl_subdia=',nl_subdia);
        PREPARE stmt1 FROM @sql_text;
        EXECUTE stmt1;

        WHEN '3' THEN
            SET @sql_text = concat('delete from lco',cia,'nume21 WHERE nl_anio = ',"'",nl_anio,"'",' AND nl_mes = ',"'",nl_mes,"'", 'AND nl_subdia=',"'",nl_subdia,"'");
        PREPARE stmt FROM @sql_text;
        EXECUTE stmt;

    END CASE;
END$$
DELIMITER ;



DELIMITER $$
CREATE PROCEDURE SP_CrudLcoGen(
	opcion int, 
	cia VARCHAR(50),
    tl_codtabla char(5),
    tl_clave varchar(18),
    tl_descri varchar(100),
    tl_descri2 varchar(100),
    tl_usrcrea  varchar(10),
    tl_feccrea date,
    tl_hracrea time,
    tl_usract varchar(10),
    tl_fecact date,
    tl_hraact time
     )
BEGIN
    
	
    
    CASE opcion
    
		WHEN  '0' THEN	
		   if tl_clave like '' and tl_codtabla like '' then    
				SET @sql_text = concat('select * from lco',cia,'tgen order by tl_codtabla');
				
			else
				if tl_clave='' then
					SET @sql_text = concat('select * from lco',cia,'tgen where tl_codtabla like "',tl_codtabla,'" order by tl_clave');
				
				else
					SET @sql_text = concat('select * from lco',cia,'tgen where tl_codtabla like "',tl_codtabla,'" and tl_clave like "', tl_clave ,'" order by tl_clave'); 
			end if;
		end if;
		PREPARE stmt FROM @sql_text;
		EXECUTE stmt;
           
		WHEN '1' THEN
			SET @sql_text = concat('insert into lco',cia,'tgen values("' ,tl_codtabla,'","' 
            ,tl_clave,'","'
            ,tl_descri,'","' 
            ,tl_descri2,'","' 
            ,tl_usrcrea,'","' 
            ,tl_feccrea,'","' 
            ,tl_hracrea,'","' 
            ,tl_usract,'","'
            ,tl_fecact,'","'
            ,tl_hraact,'");');
		  PREPARE stmt1 FROM @sql_text;
          EXECUTE stmt1;
          
		WHEN '2' THEN
			SET @sql_text = concat('UPDATE lco',cia,'tgen SET tl_descri = "',tl_descri, 
            '",tl_descri2 = "',tl_descri2,
            
            '",tl_usract = "',tl_usract,
            '",tl_fecact = "',tl_fecact,
            '",tl_hraact ="',tl_hraact,
            '"  where tl_codtabla ="',tl_codtabla,'" and tl_clave ="',tl_clave,'"');
			PREPARE stmt1 FROM @sql_text;
			EXECUTE stmt1;
		WHEN '3' THEN
			SET @sql_text = concat('delete from lco',cia,'tgen WHERE tl_codtabla = ',"'",tl_codtabla,"'",' AND tl_clave = ',"'",tl_clave,"'");
			PREPARE stmt FROM @sql_text;
			EXECUTE stmt;
		
	END CASE;
END$$

DELIMITER ;