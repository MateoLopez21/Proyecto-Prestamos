CREATE DATABASE IF NOT EXISTS negociodb;

USE negociodb;

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `prestamos` (
  `prestamo_id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_id` int(11) DEFAULT NULL,
  `monto` int(10) DEFAULT NULL,
  `total_pagar` int(10) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `proximo_pago` date NOT NULL,
  `monto_cuota` int(10) DEFAULT NULL,
  `cuotas` int(11) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `resta` int(10) DEFAULT NULL,
  PRIMARY KEY (`prestamo_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `prestamos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
);
CREATE TABLE `finanzas` (
  `finanzas_id` int(11) NOT NULL AUTO_INCREMENT,
  `capital_inicial` int(10) DEFAULT NULL,
  `ganancias_intereses` int(10) DEFAULT NULL,
  `total_disponible_prestar` int(10) DEFAULT NULL,
  `gastos` int(10) DEFAULT NULL,
  PRIMARY KEY (`finanzas_id`)
);
CREATE TABLE `pagos` (
  `pago_id` int(11) NOT NULL AUTO_INCREMENT,
  `prestamo_id` int(11) DEFAULT NULL,
  `fecha_pago` date NOT NULL,
  `monto_pago` int(10) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`pago_id`),
  KEY `prestamo_id` (`prestamo_id`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`prestamo_id`) REFERENCES `prestamos` (`prestamo_id`)
);
