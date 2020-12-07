import express from 'express';
import WebSocket from 'ws';
import http from 'http';
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('establish websocket connection');
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
});

// for json parsing

app.use(bodyParser.json());

app.post('/', (req,res) => {
  let data = Object.assign({}, req.body);
  let data1 = req.body;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
  res.sendStatus(200);
});

server.listen(port, () => console.log(`http server is listening on http://localhost:${port}`));