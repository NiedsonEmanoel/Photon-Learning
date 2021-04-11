const express = require('express');
const path = require('path'); 
const baseDir = path.resolve('./', 'Views', 'build');
const app = express.Router();

app.use('/webhooks', require('./webhooks/webhooks'));
app.use('/api', require('./Apis/apis'));

app.use(express.static(`${baseDir}`)); //Servidor estático
app.get('/*', (req, res) => res.sendFile('index.html', { root: baseDir })); //Web

app.use((req, res, next) => { //404
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => { // Erro qualquer
    res.status(error.status || 500);
    return res.send({
        "error": {
            message: error.message
        }
    });
});

module.exports = app;