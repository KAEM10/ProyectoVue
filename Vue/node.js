const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'proyectovue',
    user: 'root',
    password: '',
});

connection.connect(function(error){
    if (error) {
        throw error;
    }else{
        console.log('Conexión exitosa a la base de datos');}
});

connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) throw error;

    results.forEach(results => {
        console.log(results);
    });
});

connection.end();
/*app.post('/usuarios', (req, res) => {
    const { nombre, email } = req.body;
    connection.query('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Usuario creado', id: results.insertId });
    });
});

// Implementar las rutas para actualizar y eliminar usuarios

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});*/
