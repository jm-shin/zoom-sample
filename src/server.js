import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/*', (req, res) =>
    res.redirect('/')
);

const handleListen = () => console.log('Listening on http://localhost:3000');

// app.listen(3000, handleListen);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on('connection', (socket) => {
    sockets.push(socket);
    console.log("브라우저 연결 완료");
    socket.on('close', () => console.log('서버 연결끊김'));

    // socket.on('message', (message, isBinary)=> {
    //     const messageString = isBinary? message : message.toString();
    //     socket.send(messageString);
    // });

    socket.on('message', (message, isBinary)=> {
        const messageString = isBinary? message : message.toString();
        sockets.forEach((aSocket) => {
            aSocket.send(messageString);
        });
    });
    socket.send("hello!!");
});

server.listen(3000, handleListen);