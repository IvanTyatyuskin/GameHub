const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');

//Создание Express сервера
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const maxAge = 20 * 365 * 24 * 60 * 60;

app.get('/', (req, res) => {
    if (req.cookies.nickname && req.cookies.avatar && req.cookies.background) {
        res.redirect('/welcome');
    } else {
        res.render('nickname_page.ejs')
    }
});

app.post('/set-user-info', (req, res) => {
    const nickname = req.body.nickname;
    const avatar = req.body.avatar;
    const background = req.body.background;

    res.cookie('nickname', nickname, { maxAge: maxAge});
    res.cookie('avatar', avatar, { maxAge: maxAge});
    res.cookie('background', background, { maxAge: maxAge});

    res.redirect('/welcome');
});

app.get('/welcome', (req, res) => {
    const nickname = req.cookies.nickname;
    const avatar = req.cookies.avatar;
    const background = req.cookies.background;

    res.render('welcome_page.ejs', { nickname, avatar, background });
});

const lobbies = {};

io.on('connection', (socket) => {
    console.log('User connected');

    socket.emit('lobby list', Object.values(lobbies));

    let currentLobby = null;

    socket.on('create lobby', (data) => {
      if (!currentLobby) {
        const lobbyName = data.lobbyName;
  
        // Check if a lobby with the same name already exists
        if (lobbies.hasOwnProperty(lobbyName)) {
          socket.emit('error', 'A lobby with this name already exists');
          return;
        }
  
        const lobby = {
          name: lobbyName,
          players: [{
            nickname: data.nickname,
            avatar: data.avatar,
            background: data.background,
            socketId: socket.id
          }]
        };
        lobbies[lobbyName] = lobby;
        currentLobby = lobbyName;
        socket.join(lobbyName);
        io.to(lobbyName).emit('lobby created', lobby);
        io.emit('lobby list', Object.values(lobbies));
      } else {
        socket.emit('error', 'You are already in a lobby');
      }
    });

    socket.on('join lobby', (data) => {
      if (!currentLobby) {
        const lobbyName = data.lobbyName;
        if (lobbies[lobbyName]) {
          const lobby = lobbies[lobbyName];
          const existingPlayer = lobby.players.find(player => player.nickname === data.nickname);
          if (!existingPlayer) {
            lobby.players.push({
              nickname: data.nickname,
              avatar: data.avatar,
              background: data.background,
              socketId: socket.id
            });
            currentLobby = lobbyName;
            socket.join(lobbyName);
            io.to(lobbyName).emit('player joined', lobby);
            io.emit('lobby list', Object.values(lobbies));
          } else {
            socket.emit('error', 'You are already in this lobby');
          }
        } else {
          socket.emit('error', 'Lobby does not exist');
        }
      } else {
        socket.emit('error', 'You are already in a lobby');
      }
    });

    socket.on('leave lobby', () => {
      if (currentLobby) {
        const lobby = lobbies[currentLobby];
        const index = lobby.players.findIndex((player) => player.socketId === socket.id);
        if (index !== -1) {
          lobby.players.splice(index, 1);
          if (lobby.players.length === 0) {
            delete lobbies[currentLobby];
          }
          io.to(currentLobby).emit('player left', lobby);
          io.emit('lobby list', Object.values(lobbies));
        }
        currentLobby = null;
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
      if (currentLobby) {
        const lobby = lobbies[currentLobby];
        const index = lobby.players.findIndex((player) => player.socketId === socket.id);
        if (index !== -1) {
          lobby.players.splice(index, 1);
          if (lobby.players.length === 0) {
            delete lobbies[currentLobby];
          }
          io.to(currentLobby).emit('player left', lobby);
          io.emit('lobby list', Object.values(lobbies));
        }
      }
      currentLobby = null;
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
