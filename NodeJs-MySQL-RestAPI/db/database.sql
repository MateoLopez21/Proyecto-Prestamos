CREATE DATABASE IF NOT EXISTS negociodb;

USE negociodb;

CREATE TABLE Clientes (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(45) NOT NULL,
  apellido VARCHAR(45) NOT NULL,
  telefono VARCHAR(20) DEFAULT NULL
);

INSERT INTO clientes (nombre, apellido) VALUES
  ('Jhon', 'Universidad'),
  ('Diana', 'Giraldo'),
  ('Dalton', 'Universidad');