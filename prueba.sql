CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    imagen VARCHAR(255) null
);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    
);

CREATE TABLE pedido_productos
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id int not null,
    pedido_id int not null,
    cantidad int not null,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);





INSERT INTO usuarios (nombre, email, contrasena) VALUES ('Juan Pérez', 'juan@example.com', 'contrasena1');
INSERT INTO usuarios (nombre, email, contrasena) VALUES ('María López', 'maria@example.com', 'contrasena2');
INSERT INTO usuarios (nombre, email, contrasena) VALUES ('Pedro García', 'pedro@example.com', 'contrasena3');
INSERT INTO usuarios (nombre, email, contrasena) VALUES ('Ana Martínez', 'ana@example.com', 'contrasena4');
INSERT INTO usuarios (nombre, email, contrasena) VALUES ('Luis Rodríguez', 'luis@example.com', 'contrasena5');
INSERT INTO usuarios (nombre, email, contrasena) VALUES ('Laura Gómez', 'laura@example.com', 'contrasena6');
INSERT INTO usuarios (nombre, email, contrasena) VALUES ('Carlos Sánchez', 'carlos@example.com', 'contrasena7');
INSERT INTO usuarios (nombre, email, contrasena) VALUES ('Elena Vargas', 'elena@example.com', 'contrasena8');
INSERT INTO usuarios (nombre, email, contrasena) VALUES ('Sofía Ramírez', 'sofia@example.com', 'contrasena9');
INSERT INTO usuarios (nombre, email, contrasena) VALUES ('Javier Ruiz', 'javier@example.com', 'contrasena10');

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

INSERT INTO pedidos (usuario_id) VALUES (1);
INSERT INTO pedidos (usuario_id) VALUES (2);
INSERT INTO pedidos (usuario_id) VALUES (3);
INSERT INTO pedidos (usuario_id) VALUES (1);
INSERT INTO pedidos (usuario_id) VALUES (4);
INSERT INTO pedidos (usuario_id) VALUES (5);
INSERT INTO pedidos (usuario_id) VALUES (2);
INSERT INTO pedidos (usuario_id) VALUES (3);
INSERT INTO pedidos (usuario_id) VALUES (4);
INSERT INTO pedidos (usuario_id) VALUES (5);


INSERT INTO pedido_productos (producto_id,pedido_id,cantidad) VALUES (1,2,3);
INSERT INTO pedido_productos (producto_id,pedido_id,cantidad) VALUES (3,2,2);