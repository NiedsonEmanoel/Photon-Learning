require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const restApi = express();
const app = require('./Routes/app');

(function () {
    serverRest = require('http').createServer(restApi);
    io = require('socket.io')(serverRest);
    serverRest.listen(process.env.PORT, process.env.HOST, () => { });
    console.info(`Servidor HTTP rodando em: http://${process.env.HOST}:${process.env.PORT}/`);

    restApi.use(cors({
        origin: '*',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        methods: 'PUT, POST, PATCH, DELETE, GET'
    }));

    restApi.use(app);

    restApi.use(morgan('tiny'));

    restApi.use(express.urlencoded({ limit: '300mb' }));

    restApi.use(express.json({ limit: '300mb' }));

    restApi.use(cookieParser());

    io.on('connection', socket => {
        console.log(`Socket conectado: ${socket.id}`);
    })

}());

exports.emit = function (event, data) {
    return (io.emit(event, data));
}