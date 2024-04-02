const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');


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

/*app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, email, pass } = req.body;
    connection.query('UPDATE usuarios SET nombre = ?, email = ?, contrasena = ? WHERE id = ?', [nombre, email, pass, id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Usuario actualizado' });
    });
});*/

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Usuario eliminado' });
    });
});


app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
