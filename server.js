// server.js
import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    console.log("Pesan:", msg.toString());
    // broadcast ke semua client
    wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(msg.toString());
      }
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket server running on port", PORT);