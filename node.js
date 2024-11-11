const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Asegúrate de que esta contraseña sea correcta
    database: 'operaciones'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

app.post('/registrar-operacion', (req, res) => {
    const { fecha, monedaOrigen, importeOrigen, monedaDestino, importeDestino } = req.body;
    const query = 'INSERT INTO operaciones (fecha, monedaOrigen, importeOrigen, monedaDestino, importeDestino) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [fecha, monedaOrigen, importeOrigen, monedaDestino, importeDestino], (err, result) => {
        if (err) {
            res.status(500).send('Error al registrar la operación');
        } else {
            res.status(200).send('Operación registrada con éxito');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});