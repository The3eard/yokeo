-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 01-06-2020 a las 12:13:54
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.31

START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `yoquedo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fechapropuesta`
--

DROP TABLE IF EXISTS `fechapropuesta`;
CREATE TABLE `fechapropuesta` (
  `idFecha` int(11) NOT NULL,
  `idEvento` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `mostrar` varchar(150) DEFAULT NULL
) ;

--
-- RELACIONES PARA LA TABLA `fechapropuesta`:
--   `idEvento`
--       `evento` -> `id`
--

--
-- Volcado de datos para la tabla `fechapropuesta`
--

INSERT INTO `fechapropuesta` (`idFecha`, `idEvento`, `fecha`, `mostrar`) VALUES
(9153, 1129, '2020-06-02 12:00:00', 'Martes, 02 de Junio de 2020, a las 12:00 horas'),
(9154, 1130, '2020-07-09 12:00:00', 'Jueves, 09 de Julio de 2020, a las 12:00 horas'),
(9155, 1131, '2020-07-10 12:00:00', 'Viernes, 10 de Julio de 2020, a las 12:00 horas'),
(9156, 1133, '2020-07-05 12:00:00', 'Domingo, 05 de Julio de 2020, a las 12:00 horas');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fechapropuesta`
--
ALTER TABLE `fechapropuesta`
  ADD PRIMARY KEY (`idFecha`),
  ADD KEY `idEvento` (`idEvento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fechapropuesta`
--
ALTER TABLE `fechapropuesta`
  MODIFY `idFecha` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fechapropuesta`
--
ALTER TABLE `fechapropuesta`
  ADD CONSTRAINT `fechapropuesta_ibfk_1` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
