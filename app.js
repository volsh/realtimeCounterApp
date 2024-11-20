import { createServer } from "http";
import { WebSocketServer } from "ws";

const server = createServer();
const port = process.env.PORT || 8080;

server.listen(port, console.log(`Server started at port ${port}`));

const wss = new WebSocketServer({ server });

wss.on("connection", function (ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received %s", data);
  });
});

const interval = setInterval(function interval() {
  wss.clients.forEach(function each(ws) {
    ws.send("counter");
  });
}, 1000);

wss.on("close", function close() {
  clearInterval(interval);
});
