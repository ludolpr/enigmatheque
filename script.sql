-- MySQL Script generated by MySQL Workbench
-- mar. 30 août 2022 10:55:40
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dataenigme
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dataenigme
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dataenigme` ;
USE `dataenigme` ;

-- -----------------------------------------------------
-- Table `dataenigme`.`membres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dataenigme`.`membres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `isVerified` TINYINT NOT NULL,
  `isAdmin` TINYINT NOT NULL,
  `isBan` TINYINT NOT NULL,
  `avatar` VARCHAR(150) NOT NULL,
  `bio` VARCHAR(300) NULL,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dataenigme`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dataenigme`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(200) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `sujet` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`message` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dataenigme`.`enigme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dataenigme`.`enigme` (
  `id_enigme` INT NOT NULL AUTO_INCREMENT,
  `titre` VARCHAR(45) NOT NULL,
  `difficulty` INT NOT NULL,
  `content` TEXT NOT NULL,
  `solus` TEXT NOT NULL,
  `is_Verified` TINYINT NOT NULL DEFAULT 0,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_enigme`),
  INDEX `fk_Enigme_1_idx` (`id_user` ASC) VISIBLE,
  UNIQUE INDEX `id_enigme_UNIQUE` (`id_enigme` ASC) VISIBLE,
  CONSTRAINT `fk_Enigme_1`
    FOREIGN KEY (`id_user`)
    REFERENCES `dataenigme`.`membres` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dataenigme`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dataenigme`.`images` (
  `name_image` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `path` VARCHAR(45) NOT NULL,
  `url` VARCHAR(150) NOT NULL,
  `id_enigme` INT NOT NULL,
  UNIQUE INDEX `id_enigme_UNIQUE` (`id_enigme` ASC),
  CONSTRAINT `fk_images_1`
    FOREIGN KEY (`id_enigme`)
    REFERENCES `dataenigme`.`enigme` (`id_enigme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dataenigme`.`timestamps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dataenigme`.`timestamps` (
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL DEFAULT NULL);


-- -----------------------------------------------------
-- Table `dataenigme`.`enigme_reponse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dataenigme`.`enigme_reponse` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_enigme` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `index2` (`id` ASC) VISIBLE,
  INDEX `fk_enigme_reponse_1_idx` (`id_enigme` ASC) VISIBLE,
  CONSTRAINT `fk_enigme_reponse_1`
    FOREIGN KEY (`id_enigme`)
    REFERENCES `dataenigme`.`enigme` (`id_enigme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



INSERT INTO `membres` (`id`,`name`,`password`,`email`,`isVerified`,`isAdmin`,`isBan`,`avatar`) VALUES (1,'Admin','$2b$10$3xZYGlHNX0XSn/D28.9e.Od608tlJ3ip2W2SqWKQEzrZJfwJ5i56e','ludolpr@gmail.com',0,1,0,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ms_ni44c-_TBsdHzF0W5awHaHa%26pid%3DApi&f=1');
INSERT INTO `message` (`message`,`name`,`sujet`,`email`) VALUES ('test Admin','Admin','test','ludolpr@gmail.com');

INSERT INTO `enigme` (`titre`,`difficulty`,`content`,`solus`,`id_user`,`is_Verified`)
  VALUES 
    ("le verre d'eau",1,"Combien peut t'on mettre de gouttes d'eau dans un verre vide ?",'1',1,0),
    ("le verre d'huile",2,"Combien peut t'on mettre de gouttes d'eau dans un verre vide ?",'1',1,1),
    ("le verre devin",3,"Combien peut t'on mettre de gouttes d'eau dans un verre vide ?",'1',1,0);