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

CREATE TABLE Prestamos (
  prestamo_id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  monto DECIMAL(10, 2) NOT NULL,
  total_pagar DECIMAL(10, 2) NOT NULL,
  fecha_inicio DATE NOT NULL,
  proximo_pago DATE NOT NULL,
  monto_cuota DECIMAL(10, 2) NOT NULL,
  cuotas INT NOT NULL,
  activo BOOLEAN DEFAULT TRUE
  FOREIGN KEY (id) REFERENCES clientes(id)
);
CREATE TABLE Finanzas (
  finanzas_id INT AUTO_INCREMENT PRIMARY KEY,
  capital_inicial DECIMAL(10, 2) NOT NULL,
  ganancias_intereses DECIMAL(10, 2) NOT NULL,
  total_disponible_prestar DECIMAL(10, 2) NOT NULL
);
CREATE TABLE Pagos (
  pago_id INT AUTO_INCREMENT PRIMARY KEY,
  prestamo_id INT,
  fecha_pago DATE NOT NULL,
  monto_pago DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (prestamo_id) REFERENCES Prestamos(prestamo_id)
);

-- Listar los pagos 
SELECT pagos.fecha_pago, pagos.monto_pago, clientes.nombre, clientes.apellido FROM pagos 
INNER JOIN prestamos ON pagos.prestamo_id = prestamos.prestamo_id
INNER JOIN clientes ON prestamos.cliente_id = clientes.id
WHERE prestamos.prestamo_id = 9;

-- Registrar un nuevo pago
-- Supongamos que el ID del préstamo al que se aplica el pago es 1 y el monto del préstamo es de $1000
-- Comenzar una transacción
START TRANSACTION;

-- Supongamos que el ID del préstamo al que se aplica el pago es 1
-- Insertar un nuevo pago de $200 para el préstamo con ID 1
INSERT INTO Pagos (prestamo_id, fecha_pago, monto_pago)
VALUES (1, '2023-10-26', 300.00);


-- Actualizar el valor de total_disponible_prestar en la tabla de Finanzas
UPDATE Finanzas
SET total_disponible_prestar = total_disponible_prestar + 300.00
WHERE finanzas_id = 1;

UPDATE prestamos
SET total_pagar = total_pagar - 300.00, cuotas = cuotas - 1
WHERE prestamo_id = 1;

-- Confirmar la transacción
COMMIT;


-- Insertar un nuevo prestamos 
-- Supongamos que el ID del préstamo al que se aplica el pago es 1 y el monto del préstamo es de $1000
-- Comenzar una transacción
START TRANSACTION;

-- Insertar un nuevo préstamo en la tabla de Prestamos
INSERT INTO Prestamos (cliente_id, monto, total_pagar, fecha_inicio, cuotas)
VALUES (4, 1000.00, 1000.00, '2023-10-30', 6);

-- Actualizar el valor de total_disponible_prestar en la tabla de Finanzas
UPDATE Finanzas
SET total_disponible_prestar = total_disponible_prestar - 1000.00, ganancias_intereses = ganancias_intereses + 250
WHERE finanzas_id = 1;

-- Confirmar la transacción
COMMIT;