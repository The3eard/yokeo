SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `yoquedo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `yoquedo`;

DROP TABLE IF EXISTS `evento`;
CREATE TABLE `evento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `evento` (`id`, `nombre`) VALUES
(1129, 'Cumpleaños'),
(1130, 'Cena trabajo'),
(1131, 'Cumpleaños sobrino'),
(1132, 'Evento de prueba'),
(1133, 'Evento de prueba');

DROP TABLE IF EXISTS `fechapropuesta`;
CREATE TABLE `fechapropuesta` (
  `idFecha` int(11) NOT NULL,
  `idEvento` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `mostrar` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `fechapropuesta` (`idFecha`, `idEvento`, `fecha`, `mostrar`) VALUES
(9153, 1129, '2020-06-02 12:00:00', 'Martes, 02 de Junio de 2020, a las 12:00 horas'),
(9154, 1130, '2020-07-09 12:00:00', 'Jueves, 09 de Julio de 2020, a las 12:00 horas'),
(9155, 1131, '2020-07-10 12:00:00', 'Viernes, 10 de Julio de 2020, a las 12:00 horas'),
(9156, 1133, '2020-07-05 12:00:00', 'Domingo, 05 de Julio de 2020, a las 12:00 horas');

DROP TABLE IF EXISTS `fechavotada`;
CREATE TABLE `fechavotada` (
  `idFechaVotada` int(11) NOT NULL,
  `idFechaPropuesta` int(11) NOT NULL,
  `emailUsuario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `fechavotada` (`idFechaVotada`, `idFechaPropuesta`, `emailUsuario`) VALUES
(22, 9153, 'adolfo@mail.com'),
(23, 9154, 'adolfo@mail.com'),
(24, 9155, 'adolfo@mail.com'),
(25, 9156, 'adolfo@mail.com');

DROP TABLE IF EXISTS `lugarpropuesto`;
CREATE TABLE `lugarpropuesto` (
  `idLugar` int(11) NOT NULL,
  `idEvento` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `lugarpropuesto` (`idLugar`, `idEvento`, `nombre`, `lat`, `lng`) VALUES
(11, 1129, 'Parque de María Luisa, Paseo de las Delicias, s/n, 41013 Sevilla, España', 37.3746674, -5.988678699999999),
(12, 1130, 'Glorieta Fernando Quiñones, s/n, Edificio Centris - Local 1, 41940 Tomares, Sevilla, España', 37.3679722, -6.0412139),
(13, 1131, 'Calle Las Mineras, 1, 1º derecha Frente a guardería infantil de la, Autobús 21. Fácil aparcamiento, Av. de la Solea, 41007 Sevilla, España', 37.39244, -5.966313),
(14, 1133, 'Av. de las Ciencias, 41019 Sevilla, España', 37.3973313, -5.9237471);

DROP TABLE IF EXISTS `lugarvotado`;
CREATE TABLE `lugarvotado` (
  `idLugarVotado` int(11) NOT NULL,
  `idLugarPropuesto` int(11) NOT NULL,
  `emailUsuario` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `lugarvotado` (`idLugarVotado`, `idLugarPropuesto`, `emailUsuario`) VALUES
(4, 11, 'adolfo@mail.com'),
(5, 12, 'adolfo@mail.com'),
(6, 13, 'adolfo@mail.com'),
(7, 14, 'adolfo@mail.com');

DROP TABLE IF EXISTS `objetopropuesto`;
CREATE TABLE `objetopropuesto` (
  `idObjeto` int(11) NOT NULL,
  `idEvento` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `objetopropuesto` (`idObjeto`, `idEvento`, `nombre`) VALUES
(45, 1129, 'Tarta'),
(46, 1131, 'Regalo (Adolfo)'),
(47, 1133, 'Tarta');

DROP TABLE IF EXISTS `objetousuario`;
CREATE TABLE `objetousuario` (
  `idObjetoVotado` int(11) NOT NULL,
  `idObjetoPropuesto` int(11) NOT NULL,
  `emailUsuario` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `objetousuario` (`idObjetoVotado`, `idObjetoPropuesto`, `emailUsuario`) VALUES
(5, 45, 'adolfo@mail.com'),
(6, 46, 'adolfo@mail.com'),
(7, 47, 'adolfo@mail.com');

DROP TABLE IF EXISTS `participa`;
CREATE TABLE `participa` (
  `idEvento` int(11) NOT NULL,
  `emailUsuario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `participa` (`idEvento`, `emailUsuario`) VALUES
(1129, 'adolfo@mail.com'),
(1130, 'adolfo@mail.com'),
(1131, 'adolfo@mail.com'),
(1132, 'adolfo@mail.com'),
(1133, 'adolfo@mail.com');

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `email` varchar(255) NOT NULL,
  `nick` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `usuario` (`email`, `nick`) VALUES
('adolfo@mail.com', 'adolfo'),
('usuario@mail.com', 'usuario');


ALTER TABLE `evento`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `fechapropuesta`
  ADD PRIMARY KEY (`idFecha`),
  ADD KEY `idEvento` (`idEvento`);

ALTER TABLE `fechavotada`
  ADD PRIMARY KEY (`idFechaVotada`),
  ADD KEY `idFechaPropuesta` (`idFechaPropuesta`),
  ADD KEY `emailUsuario` (`emailUsuario`);

ALTER TABLE `lugarpropuesto`
  ADD PRIMARY KEY (`idLugar`),
  ADD KEY `idEvento` (`idEvento`);

ALTER TABLE `lugarvotado`
  ADD PRIMARY KEY (`idLugarVotado`),
  ADD KEY `idLugarPropuesto` (`idLugarPropuesto`);

ALTER TABLE `objetopropuesto`
  ADD PRIMARY KEY (`idObjeto`),
  ADD KEY `idEvento` (`idEvento`);

ALTER TABLE `objetousuario`
  ADD PRIMARY KEY (`idObjetoVotado`),
  ADD KEY `idObjetoPropuesto` (`idObjetoPropuesto`);

ALTER TABLE `participa`
  ADD KEY `idEvento` (`idEvento`),
  ADD KEY `emailUsuario` (`emailUsuario`);

ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`);


ALTER TABLE `evento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1134;

ALTER TABLE `fechapropuesta`
  MODIFY `idFecha` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9157;

ALTER TABLE `fechavotada`
  MODIFY `idFechaVotada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

ALTER TABLE `lugarpropuesto`
  MODIFY `idLugar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `lugarvotado`
  MODIFY `idLugarVotado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `objetopropuesto`
  MODIFY `idObjeto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

ALTER TABLE `objetousuario`
  MODIFY `idObjetoVotado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;


ALTER TABLE `fechapropuesta`
  ADD CONSTRAINT `fechapropuesta_ibfk_1` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`id`);

ALTER TABLE `fechavotada`
  ADD CONSTRAINT `fechavotada_ibfk_1` FOREIGN KEY (`idFechaPropuesta`) REFERENCES `fechapropuesta` (`idFecha`),
  ADD CONSTRAINT `fechavotada_ibfk_2` FOREIGN KEY (`emailUsuario`) REFERENCES `usuario` (`email`);

ALTER TABLE `lugarpropuesto`
  ADD CONSTRAINT `lugarpropuesto_ibfk_1` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`id`);

ALTER TABLE `lugarvotado`
  ADD CONSTRAINT `lugarvotado_ibfk_1` FOREIGN KEY (`idLugarPropuesto`) REFERENCES `lugarpropuesto` (`idLugar`);

ALTER TABLE `objetopropuesto`
  ADD CONSTRAINT `objetopropuesto_ibfk_1` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`id`);

ALTER TABLE `objetousuario`
  ADD CONSTRAINT `objetousuario_ibfk_1` FOREIGN KEY (`idObjetoPropuesto`) REFERENCES `objetopropuesto` (`idObjeto`);

ALTER TABLE `participa`
  ADD CONSTRAINT `participa_ibfk_1` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`id`),
  ADD CONSTRAINT `participa_ibfk_2` FOREIGN KEY (`emailUsuario`) REFERENCES `usuario` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
