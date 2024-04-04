const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');

// Configura CORS
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'proyectovue',
    user: 'root',
    password: '',
});

connection.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/assets/imagenes/'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Renombrar el archivo para evitar colisiones
    }

  });

  const upload = multer({ storage: storage });
  
  // Ruta para la carga de archivos
    app.post('/upload', upload.single('image'), (req, res) => {
    res.send('Archivo subido con éxito');
  });

// Maneja la solicitud POST desde el cliente
app.post('/consultaSesion', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    console.log(usuario);
    // Realiza la consulta a la base de datos
    const consulta = `SELECT * FROM usuarios WHERE nombre = '${usuario}' AND contrasena = '${contrasena}'`;
    connection.query(consulta, [usuario, contrasena], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error al realizar la consulta' });
        } else {
            if (results.length > 0) {
                // Usuario y contraseña válidos
                // Genera un token de acceso
                const token = jwt.sign({ usuario: usuario }, 'secreto');
                res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', token: token });
            } else {
                // Usuario o contraseña inválidos
                res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
            }
        }
    });
});

//rutas para obtener, crear, actualizar y eliminar usuarios
app.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
            res.json(results);
        }
    });
});


app.post('/usuarios', (req, res) => {
    const { nombre, email, pass } = req.body;
    connection.query('INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)', [nombre, email, pass], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Usuario creado', id: results.insertId });
    });
});

app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, email } = req.body;
    connection.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Usuario actualizado' });
    });
});

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Usuario eliminado' });
    });
});


app.get('/productos', (req, res) => {
    connection.query('SELECT * FROM productos', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener productos' });
        } else {
            res.json(results);
        }
    });
});

app.post('/productos', (req, res) => {
    const { nombre, precio,imagen } = req.body;
    connection.query('INSERT INTO productos (nombre, precio,imagen) VALUES (?, ? ,?)', [nombre, precio,imagen], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Producto creado', id: results.insertId });
    });
});

app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, precio } = req.body;
    connection.query('UPDATE productos SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio,id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Producto actualizado' });
    });
});

app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM productos WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'producto eliminado' });
    });
});





app.post('/pedidos', (req, res) => {
    const {usuarioId} = req.body;
    connection.query('INSERT INTO pedidos (usuario_id) VALUES (?)', [usuarioId], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Pedido creado', id: results.insertId });
    });
});

app.get('/pedidos', (req, res) => {
    connection.query('SELECT id FROM pedidos ORDER BY id DESC LIMIT 1', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener pedidos' });
        } else {
            res.json(results);
        }
    });
});

app.post('/idProductos', (req, res) => {
    const {nombre} = req.body;
    connection.query('SELECT id FROM productos where nombre=?',[nombre] ,(error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener el id' });
        } else {
            res.json(results);
        }
    });
});



app.post('/pedidoProducto', (req, res) => {
    const {pedidoId,idProductos,carrito} = req.body;

    for (let i = 0; i < carrito.length; i++) {
        connection.query('INSERT INTO pedido_productos (producto_id,pedido_id,cantidad) VALUES (?,?,?)', [idProductos[i],pedidoId,carrito[i].varNum], (error, results) => {
            if (error) throw error;
            res.json({ message: 'Pedido creado', id: results.insertId });
        });
      }
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
