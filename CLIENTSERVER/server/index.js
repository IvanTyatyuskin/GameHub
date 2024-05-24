const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const socketID = req.cookies.socketID;
  if (socketID) {
    req.headers['X-Socket-ID'] = socketID;
  }
  next();
})

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const clientSockets = new Map();

let lobbies = {};
let users = [];
let TicTacToeGames = [];

function addUser(socketID, nickname, lobbyName, isCreator, actualSocketID) {
  const existingUser = users.find((user) => user.socketID === socketID);

  if (existingUser) {
    return;
  }

  const user = {
    socketID,
    nickname,
    lobbyName,
    isCreator,
    actualSocketID,
  };
  
  users.push(user);
}

function addTicTacToeGame(Xplayer, Oplayer) {
  const tictactoegame = {
    cells: Array(9).fill(""),
    winner: null,
    isDraw: false,
    currentTurn: "X",
    Xplayer,
    Oplayer,
  }

  TicTacToeGames.push(tictactoegame);
}

io.on('connection', (socket) => {
  const socketID = (socket.handshake.query.socketID !== 'undefined')
  ? socket.handshake.query.socketID
  : socket.id;

  const existingUser = users.find((user) => user.socketID === socketID);
  if (existingUser) {
    existingUser.actualSocketID = socket.id;
    console.log('actualSocketID for user', existingUser.nickname, 'changed to', existingUser.actualSocketID);
  }

  addUser(socketID, '', '', false, socketID);

  if (!socket.id) {
    socket.id = socket.client.id;
  }
  clientSockets.set(socket.id, socket);

  socket.on('get_lobbies_list', (game) => {
    const currentLobbyList = Object.values(lobbies).filter(lobby => lobby.game === game);
    io.emit('lobbies_list', currentLobbyList);
  })

  socket.on('get_lobby_info', () => {
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    const lobbyName = user.lobbyName;
    lobby = lobbies[lobbyName];
    if (lobby) {
      lobby.users.forEach((user) => {
        io.to(user.actualSocketID).emit('lobby_name', lobbyName);
        io.to(user.actualSocketID).emit('isCreator', user.isCreator);
        io.to(user.actualSocketID).emit('gameName', lobby.game);
        io.to(user.actualSocketID).emit('users', lobby.users);
        io.to(user.actualSocketID).emit('chat_history', lobby.chatHistory);
      })
    }
  })

  socket.on('send_chat_message', (message) => {
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    const lobbyName = user.lobbyName;
    const Message = { sender: user.nickname, text: message }
    lobby = lobbies[lobbyName]
    lobby.chatHistory.push(Message);
    if (lobby) {
      lobby.users.forEach((user) => {
        io.to(user.actualSocketID).emit('chat_history', lobby.chatHistory);
      });
    }
  })

  socket.on('setNickname', (data) => {
    const { nickname } = data;
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    user.nickname = nickname;
  })

  socket.on('create_lobby', ({ roomName, isLocked, maxCount, game }) => {
    const newLobby = { roomName, isLocked, currentCount: 1, maxCount, game, users: [], chatHistory: [] };
    lobbies[roomName] = newLobby;
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    user.isCreator = true;
    user.lobbyName = roomName;
    lobbies[roomName].users.push(user);
    console.log('Lobby: ', roomName, ' created by ', user.nickname);
    console.log(lobbies[roomName]);
  });

  socket.on('join_lobby', ({ roomName }) => {
    const lobby = lobbies[roomName];
    if (lobby.currentCount < lobby.maxCount) {
      const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
      user.lobbyName = roomName;
      lobby.users.push(user);
      lobby.currentCount++;
      console.log('User: ', user.nickname, 'joined to lobby', roomName);
    }
  });

  //TicTacToe------------------------------------------------------------------------------
  function checkWinner(board) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
  
      if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
  
    return null;
  }

  socket.on('tictactoe_start', () => {
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    if (user && user.isCreator) {
      const lobby = lobbies[user.lobbyName];
      if (lobby) {
        lobby.users.forEach((user) => {
          io.to(user.actualSocketID).emit('tictactoe_started');
        });
      }
    }
  });

  socket.on('start_tictactoe_game', () => {
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    if(user.isCreator) {
      const lobby = lobbies[user.lobbyName];
      if (lobby) {
        Xuser = lobby.users[0];
        Ouser = lobby.users[1];
        const Xplayer = Xuser.socketID;
        const Oplayer = Ouser.socketID;

        io.to(Xuser.actualSocketID).emit('set_symbol', "X");
        io.to(Ouser.actualSocketID).emit('set_symbol', "O");

        addTicTacToeGame(Xplayer, Oplayer);
      }
    }
  });

  socket.on('make_move', ({ num }) => {
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    const game = TicTacToeGames.find(
      (tictactoegame) =>
        tictactoegame.Xplayer === user.socketID || tictactoegame.Oplayer === user.socketID
    );

    if (game.cells[num] !== "" || game.winner || game.isDraw) {
      console.log("Invalid move");
      return;
    }

    game.cells[num] = game.currentTurn;
    if (checkWinner(game.cells) === "X") {
      game.winner = game.Xplayer;
    } else if (checkWinner(game.cells) === "O") {
      game.winner = game.Oplayer;
    } else if (game.cells.every((cell) => cell !== "")) {
      game.isDraw = true;
    } else {
      game.currentTurn = game.currentTurn === "X" ? "O" : "X";
    }

    const Cells = game.cells;
    winnerUser = users.find((user) => user.socketID === game.winner);
    const Winner = game.winner;
    const IsDraw = game.isDraw;
    const CurrentTurn = game.currentTurn;

    io.emit('update_game', { Cells, Winner, IsDraw, CurrentTurn });
  });

  socket.on('reset_game', () => {
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    const game = TicTacToeGames.find(
      (tictactoegame) =>
        tictactoegame.Xplayer === user.socketID || tictactoegame.Oplayer === user.socketID
    );

    game.cells = Array(9).fill("");
    game.winner = null;
    game.isDraw = false;
    game.currentTurn = "X";

    io.emit('reset_game');
  });



  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
    clientSockets.delete(socket.id);
    const user = users[socket.id];

    if (user) {
      const lobby = lobbies[user.roomName];
      if (lobby) {
        lobby.currentCount--;
        const index = lobby.users.indexOf(socket.id);
        if (index !== -1) {
          lobby.users.splice(index, 1);
        }

        if (user.isCreator && lobby.currentCount === 0) {
          delete lobbies[user.roomName];
        }

        delete users[socket.id];
        io.emit('lobbies_list', Object.values(lobbies));
      }
    }
  });
});

server.listen(4000, () => console.log('Server is running on port 4000'));
