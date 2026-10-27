const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.use(express.static(path.join(__dirname, 'public')));
const players = {};
io.on('connection', socket => {
  socket.on('join', data => {
    players[socket.id] = { name: String(data?.name || 'Operador').slice(0,16), x: 0, z: 22, yaw: 0 };
    socket.emit('message', 'Conectado à sala. Compartilhe o endereço do servidor com seus amigos.');
  });
  socket.on('move', data => {
    if (!players[socket.id]) return;
    const x = Number(data?.x), z = Number(data?.z), yaw = Number(data?.yaw);
    if ([x,z,yaw].every(Number.isFinite)) {
      // Basic bounds validation; production games should use server-authoritative movement.
      players[socket.id].x = Math.max(-28, Math.min(28, x));
      players[socket.id].z = Math.max(-28, Math.min(28, z));
      players[socket.id].yaw = yaw;
    }
  });
  socket.on('shoot', () => {
    socket.broadcast.emit('message', `${players[socket.id]?.name || 'Um jogador'} disparou`);
  });
  socket.on('disconnect', () => { delete players[socket.id]; });
});
setInterval(() => io.emit('state', players), 50);
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`Tactical Strike disponível na porta ${PORT}`));
