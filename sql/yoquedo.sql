-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-03-2020 a las 20:53:17
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `yoquedo`
--
CREATE DATABASE IF NOT EXISTS `yoquedo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `yoquedo`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--
-- Creación: 31-03-2020 a las 18:04:47
--

CREATE TABLE `evento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `evento`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fechapropuesta`
--
-- Creación: 31-03-2020 a las 18:19:09
--

CREATE TABLE `fechapropuesta` (
  `idFecha` int(11) NOT NULL,
  `idEvento` int(11) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `fechapropuesta`:
--   `idEvento`
--       `evento` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fechavotada`
--
-- Creación: 31-03-2020 a las 18:32:51
--

CREATE TABLE `fechavotada` (
  `idFechaVotada` int(11) NOT NULL,
  `idFechaPropuesta` int(11) NOT NULL,
  `emailUsuario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `fechavotada`:
--   `idFechaPropuesta`
--       `fechapropuesta` -> `idFecha`
--   `emailUsuario`
--       `usuario` -> `email`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugarpropuesto`
--
-- Creación: 31-03-2020 a las 18:28:40
--

CREATE TABLE `lugarpropuesto` (
  `idLugar` int(11) NOT NULL,
  `idEvento` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `urlMap` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `lugarpropuesto`:
--   `idEvento`
--       `evento` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugarvotado`
--
-- Creación: 31-03-2020 a las 18:41:11
--

CREATE TABLE `lugarvotado` (
  `idLugarVotado` int(11) NOT NULL,
  `idLugarPropuesto` int(11) NOT NULL,
  `emailUsuario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `lugarvotado`:
--   `idLugarVotado`
--       `lugarpropuesto` -> `idLugar`
--   `emailUsuario`
--       `usuario` -> `email`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetopropuesto`
--
-- Creación: 31-03-2020 a las 18:29:15
--

CREATE TABLE `objetopropuesto` (
  `idObjeto` int(11) NOT NULL,
  `idEvento` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `objetopropuesto`:
--   `idEvento`
--       `evento` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetousuario`
--
-- Creación: 31-03-2020 a las 18:42:04
--

CREATE TABLE `objetousuario` (
  `idObjetoUsuario` int(11) NOT NULL,
  `idLugarPropuesto` int(11) NOT NULL,
  `emailUsuario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `objetousuario`:
--   `idObjetoUsuario`
--       `objetopropuesto` -> `idObjeto`
--   `emailUsuario`
--       `usuario` -> `email`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participa`
--
-- Creación: 31-03-2020 a las 18:06:27
--

CREATE TABLE `participa` (
  `idEvento` int(11) NOT NULL,
  `emailUsuario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `participa`:
--   `idEvento`
--       `evento` -> `id`
--   `emailUsuario`
--       `usuario` -> `email`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--
-- Creación: 31-03-2020 a las 17:59:47
--

CREATE TABLE `usuario` (
  `email` varchar(255) NOT NULL,
  `nick` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `usuario`:
--

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fechapropuesta`
--
ALTER TABLE `fechapropuesta`
  ADD PRIMARY KEY (`idFecha`),
  ADD KEY `idEvento` (`idEvento`);

--
-- Indices de la tabla `fechavotada`
--
ALTER TABLE `fechavotada`
  ADD PRIMARY KEY (`idFechaVotada`),
  ADD KEY `idFechaPropuesta` (`idFechaPropuesta`),
  ADD KEY `emailUsuario` (`emailUsuario`);

--
-- Indices de la tabla `lugarpropuesto`
--
ALTER TABLE `lugarpropuesto`
  ADD PRIMARY KEY (`idLugar`),
  ADD KEY `idEvento` (`idEvento`);

--
-- Indices de la tabla `lugarvotado`
--
ALTER TABLE `lugarvotado`
  ADD PRIMARY KEY (`idLugarVotado`),
  ADD KEY `emailUsuario` (`emailUsuario`);

--
-- Indices de la tabla `objetopropuesto`
--
ALTER TABLE `objetopropuesto`
  ADD PRIMARY KEY (`idObjeto`),
  ADD KEY `idEvento` (`idEvento`);

--
-- Indices de la tabla `objetousuario`
--
ALTER TABLE `objetousuario`
  ADD PRIMARY KEY (`idObjetoUsuario`),
  ADD KEY `emailUsuario` (`emailUsuario`);

--
-- Indices de la tabla `participa`
--
ALTER TABLE `participa`
  ADD KEY `idEvento` (`idEvento`),
  ADD KEY `emailUsuario` (`emailUsuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000;

--
-- AUTO_INCREMENT de la tabla `fechapropuesta`
--
ALTER TABLE `fechapropuesta`
  MODIFY `idFecha` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fechavotada`
--
ALTER TABLE `fechavotada`
  MODIFY `idFechaVotada` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lugarpropuesto`
--
ALTER TABLE `lugarpropuesto`
  MODIFY `idLugar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lugarvotado`
--
ALTER TABLE `lugarvotado`
  MODIFY `idLugarVotado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `objetopropuesto`
--
ALTER TABLE `objetopropuesto`
  MODIFY `idObjeto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `objetousuario`
--
ALTER TABLE `objetousuario`
  MODIFY `idObjetoUsuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fechapropuesta`
--
ALTER TABLE `fechapropuesta`
  ADD CONSTRAINT `fechapropuesta_ibfk_1` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`id`);

--
-- Filtros para la tabla `fechavotada`
--
ALTER TABLE `fechavotada`
  ADD CONSTRAINT `fechavotada_ibfk_1` FOREIGN KEY (`idFechaPropuesta`) REFERENCES `fechapropuesta` (`idFecha`),
  ADD CONSTRAINT `fechavotada_ibfk_2` FOREIGN KEY (`emailUsuario`) REFERENCES `usuario` (`email`);

--
-- Filtros para la tabla `lugarpropuesto`
--
ALTER TABLE `lugarpropuesto`
  ADD CONSTRAINT `lugarpropuesto_ibfk_1` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`id`);

--
-- Filtros para la tabla `lugarvotado`
--
ALTER TABLE `lugarvotado`
  ADD CONSTRAINT `lugarvotado_ibfk_1` FOREIGN KEY (`idLugarVotado`) REFERENCES `lugarpropuesto` (`idLugar`),
  ADD CONSTRAINT `lugarvotado_ibfk_2` FOREIGN KEY (`emailUsuario`) REFERENCES `usuario` (`email`);

--
-- Filtros para la tabla `objetopropuesto`
--
ALTER TABLE `objetopropuesto`
  ADD CONSTRAINT `objetopropuesto_ibfk_1` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`id`);

--
-- Filtros para la tabla `objetousuario`
--
ALTER TABLE `objetousuario`
  ADD CONSTRAINT `objetousuario_ibfk_1` FOREIGN KEY (`idObjetoUsuario`) REFERENCES `objetopropuesto` (`idObjeto`),
  ADD CONSTRAINT `objetousuario_ibfk_2` FOREIGN KEY (`emailUsuario`) REFERENCES `usuario` (`email`);

--
-- Filtros para la tabla `participa`
--
ALTER TABLE `participa`
  ADD CONSTRAINT `participa_ibfk_1` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`id`),
  ADD CONSTRAINT `participa_ibfk_2` FOREIGN KEY (`emailUsuario`) REFERENCES `usuario` (`email`);


--
-- Metadatos
--
USE `phpmyadmin`;

--
-- Metadatos para la tabla evento
--

--
-- Metadatos para la tabla fechapropuesta
--

--
-- Metadatos para la tabla fechavotada
--

--
-- Metadatos para la tabla lugarpropuesto
--

--
-- Metadatos para la tabla lugarvotado
--

--
-- Metadatos para la tabla objetopropuesto
--

--
-- Metadatos para la tabla objetousuario
--

--
-- Metadatos para la tabla participa
--

--
-- Metadatos para la tabla usuario
--

--
-- Metadatos para la base de datos yoquedo
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
