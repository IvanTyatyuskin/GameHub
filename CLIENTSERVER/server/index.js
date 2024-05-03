const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let lobbies = { publicLobbies: [], privateLobbies: [] };

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('set-user-info', (userInfo) => {
    console.log(`User info received: ${JSON.stringify(userInfo)}`);
    socket.nickname = userInfo.nickname;
  });

  socket.on('get lobby list', () => {
    io.emit('lobby list', lobbies);
  });

  socket.on('create lobby', (data) => {
    const lobby = {
      name: data.lobbyName,
      players: [{ nickname: data.nickname, avatar: data.avatar, background: data.background }],
      isPrivate: data.isPrivate,
      password: data.isPrivate ? data.password : null,
    };

    if (data.isPrivate) {
      lobbies.privateLobbies.push(lobby);
    } else {
      lobbies.publicLobbies.push(lobby);
    }

    socket.join(lobby.name);
    socket.emit('join lobby', lobby);
    io.emit('lobby list', lobbies);
  });

  socket.on('join lobby', (data) => {
    let lobby;

    if (data.isPrivate) {
      lobby = lobbies.privateLobbies.find((lobby) => lobby.name === data.lobbyName);
    } else {
      lobby = lobbies.publicLobbies.find((lobby) => lobby.name === data.lobbyName);
    }

    if (!lobby) {
      return;
    }

    if (lobby.isPrivate && lobby.password !== data.password) {
      return;
    }

    // Leave current lobby if user is already in one
    const currentLobby = Object.values(socket.rooms).find((room) => room !== socket.id);
    if (currentLobby) {
      socket.leave(currentLobby);
      const currentLobbyIndex = lobbies.publicLobbies.findIndex((lobby) => lobby.name === currentLobby);
      const playerIndex = lobbies.publicLobbies[currentLobbyIndex].players.findIndex(
        (player) => player.nickname === data.nickname
      );
      if (playerIndex !== -1) {
        lobbies.publicLobbies[currentLobbyIndex].players.splice(playerIndex, 1);
      }
      if (lobbies.publicLobbies[currentLobbyIndex].players.length === 0) {
        lobbies.publicLobbies.splice(currentLobbyIndex, 1);
      }
    }

    lobby.players.push({ nickname: data.nickname, avatar: data.avatar, background: data.background });
    socket.join(lobby.name);
    socket.emit('join lobby', lobby);
    io.emit('lobby list', lobbies);
  });

  socket.on('leave lobby', (data) => {
    let lobbyIndex;
    let lobby;
    let playerIndex;

    // Ищем лобби в publicLobbies
    lobbyIndex = lobbies.publicLobbies.findIndex((l) => l.name === data.lobbyName);
    lobby = lobbies.publicLobbies[lobbyIndex];
    playerIndex = lobby?.players?.findIndex((player) => player.nickname === data.nickname);

    if (lobby && playerIndex !== -1) {
      lobby.players.splice(playerIndex, 1);
    }

    // Удаляем лобби из массива, только если в нем не осталось игроков
    if (lobby && lobby.players.length === 0) {
      lobbies.publicLobbies.splice(lobbyIndex, 1);
    }

    // Если лобби не найдено в publicLobbies, ищем в privateLobbies
    if (lobbyIndex === -1) {
      lobbyIndex = lobbies.privateLobbies.findIndex((l) => l.name === data.lobbyName);
      lobby = lobbies.privateLobbies[lobbyIndex];
      playerIndex = lobby?.players?.findIndex((player) => player.nickname === data.nickname);

      if (lobby && playerIndex !== -1) {
        lobby.players.splice(playerIndex, 1);
      }

      // Удаляем лобби из массива, только если в нем не осталось игроков
      if (lobby && lobby.players.length === 0) {
        lobbies.privateLobbies.splice(lobbyIndex, 1);
      }
    }

    socket.leave(data.lobbyName);
    io.emit('lobby list', lobbies);
    socket.emit('leave lobby');
  });

  socket.on('chat message', (data) => {
    io.to(data.lobbyName).emit('chat message', `${data.nickname}: ${data.message}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

server.listen(4000, () => console.log('Server is running on port 4000'));
