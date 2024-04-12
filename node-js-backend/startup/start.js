const app = require('../application');
const debug = require('debug')('server:server');
const http = require('http');
const https = require('https');
const fs = require('fs');

const CONFIG = require('../config/config');

app.set('port', CONFIG.port);

/**
 * Create HTTP/HTTPS server.
 */
let server;
if (CONFIG.enable_https) {
    console.log("https enabled");
    server = https.createServer({
        key: fs.readFileSync('../sslcert/key_ring.com'),
        cert: fs.readFileSync('../sslcert/cert_ring.com')
    }, app);
} else {
    server = http.createServer(app);
}

server.listen(CONFIG.port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(CONFIG.port + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(CONFIG.port + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    debug('Listening on ' + addr.port);

    console.log('Server listenning on port:', addr.port);

}