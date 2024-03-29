CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

INSERT INTO usuarios (nombre, email) VALUES ('Juan Pérez', 'juan@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('María López', 'maria@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Pedro García', 'pedro@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Ana Martínez', 'ana@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Luis Rodríguez', 'luis@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Laura Gómez', 'laura@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Carlos Sánchez', 'carlos@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Elena Vargas', 'elena@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Sofía Ramírez', 'sofia@example.com');
INSERT INTO usuarios (nombre, email) VALUES ('Javier Ruiz', 'javier@example.com');

INSERT INTO productos (nombre, precio) VALUES ('Producto 1', 10.99);
INSERT INTO productos (nombre, precio) VALUES ('Producto 2', 20.49);
INSERT INTO productos (nombre, precio) VALUES ('Producto 3', 15.99);
INSERT INTO productos (nombre, precio) VALUES ('Producto 4', 8.75);
INSERT INTO productos (nombre, precio) VALUES ('Producto 5', 12.00);
INSERT INTO productos (nombre, precio) VALUES ('Producto 6', 30.25);
INSERT INTO productos (nombre, precio) VALUES ('Producto 7', 18.99);
INSERT INTO productos (nombre, precio) VALUES ('Producto 8', 5.50);
INSERT INTO productos (nombre, precio) VALUES ('Producto 9', 24.75);
INSERT INTO productos (nombre, precio) VALUES ('Producto 10', 14.99);

INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (1, 1, 2);
INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (2, 3, 1);
INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (3, 2, 3);
INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (1, 5, 2);
INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (4, 4, 1);
INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (5, 7, 4);
INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (2, 9, 2);
INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (3, 6, 1);
INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (4, 8, 3);
INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (5, 10, 2);