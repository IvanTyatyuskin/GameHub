const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const {Card,Player}  =  require('./DiamantClasses');
const {SkullCard,SkullPlayer,SkullPlayerData,SkullLobby}  =  require('./SkullClasses');

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

/*let SkullPlayers=[];
let SkullPlayersData=[];
let GameMode='';         
let Bet=0;
let CurrPlayerInd=0;
*/
let SkullLobbies=[];
let SkullCurrId=0;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const clientSockets = new Map();

let lobbies = {};
let users = [];
let TicTacToeGames = [];

function addUser(socketID, nickname, lobbyName, isCreator, actualSocketID,isReady,diamantAction,dataReadyDiamant) {
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
    isReady,
    diamantAction,
    dataReadyDiamant
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

  if (!socket.id) {
    socket.id = socket.client.id;
  }
  clientSockets.set(socket.id, socket);

  socket.on('get_lobbies_list', (gameName) => {
    io.emit('lobbies_list', Object.values(lobbies).filter(lobby => lobby.game === gameName));
  })

  socket.on('get_lobby_info', () => {
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    const lobbyName = user.lobbyName;
    lobby = lobbies[lobbyName];
    io.emit('lobby_name', lobbyName);
    io.emit('isCreator', user.isCreator);
    io.emit('gameName', lobby.game);
    io.emit('users', lobby.users);
    io.emit('chat_history', lobby.chatHistory);
    console.log(users);
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

  socket.on('setNickname', (nicknameData) => {
    if (!existingUser){
      addUser(socketID, nicknameData, '', false, socketID, false, null, false);
    }
    else {
      const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
      user.nickname = nicknameData;
    }
})
   
//Skull
function FindSkullLobbyById(id)   
{
  for (let i = 0; i < SkullLobbies.length; i++) {
      
    if(SkullLobbies[i].Id==id) 
    {  
      return i;
    }    
  }
}    
  function FindSkullPlayerById(id,lobbyID)   
  {
    let ind=FindSkullLobbyById(lobbyID);   
    let SkullPlayers=SkullLobbies[ind].Players;
    for (let i = 0; i < SkullPlayers.length; i++) {
        
      if(SkullPlayers[i].Id==id) 
      {
        return i;
      }    
    }
  }
 
  function MoveToNextPlayer(lobbyID)
  {
    let ind=FindSkullLobbyById(lobbyID); 
    SkullLobbies[ind].CurrPlayerInd++;
    if(SkullLobbies[ind].CurrPlayerInd==SkullLobbies[ind].Players.length)
    {
      SkullLobbies[ind].CurrPlayerInd=SkullLobbies[ind].CurrPlayerInd-SkullLobbies[ind].Players.length;
    } 
  }
  function MoveToNextRound(lobbyID,socket)   
  {  
    let ind=FindSkullLobbyById(lobbyID);   
    //let SkullPlayers=SkullLobbies[ind].Players;
    for (let i = 0; i < SkullLobbies[ind].Players.length; i++) 
    {  
      SkullLobbies[ind].Players[i].OpenCards=[];
      SkullLobbies[ind].Players[i].GameMode='play';
      SkullLobbies[ind].Players[i].Bet=0;
      SkullLobbies[ind].Players[i].CardsDown=0;
      SkullLobbies[ind].Players[i].HavePassed=false;  
      SkullLobbies[ind].Players[i].PlayedCards=[];
    } 
    SkullLobbies[ind].Bet=0; 
    SkullLobbies[ind].GameMode='play';              
   // io.sockets.in('Skull').emit('Reset');
   const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
   if (user) 
     {
       const lobby = lobbies[user.lobbyName];
       if (lobby) 
       {
         lobby.users.forEach((user) => {
           io.to(user.actualSocketID).emit('Reset');
         }); 
     }
   }
  } 
   
  socket.on('Skull_start', () => {  
    
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    if (user) 
      {
    
      const lobby = lobbies[user.lobbyName];
      if (lobby) {
       
      let id=SkullCurrId;
      SkullLobbies.push(new SkullLobby(SkullCurrId,user.lobbyName,[],[],0,0,0));
      let ind=FindSkullLobbyById(id);
      SkullCurrId++;
      const initialDeck = [
        new SkullCard(false, false, false),
        new SkullCard(false, false, false),
        new SkullCard(false, false, false),
        new SkullCard(true, false,  false)
      ];  
        lobby.users.forEach((user) => {
          if(user.nickname!==undefined) 
          {
          SkullLobbies[ind].Players.push(new SkullPlayer(user.actualSocketID,user.nickname,0,0,0,null,false,false,[],'setup',null,false,id,initialDeck));
          }
          else  
          {
            SkullLobbies[ind].Players.push(new SkullPlayer(user.actualSocketID,'player',0,0,0,null,false,false,[],'setup',null,false,id,initialDeck));
          }
         
          SkullLobbies[ind].PlayersData.push(new SkullPlayerData(user.actualSocketID,[]));
          if(SkullLobbies[ind].Players.length==1){
            SkullLobbies[ind].Players[0].IsActive=true;    
          }
          //console.log(user.actualSocketID);
          io.to(user.actualSocketID).emit("SkullGetPlayerId",user.actualSocketID);
          io.to(user.actualSocketID).emit('SkullPLayersUpdate', SkullLobbies[ind].Players);
          //console.log(SkullLobbies[ind].Players);
          
          io.to(user.actualSocketID).emit('Skull_started', () => {
            console.log('Client confirmed receipt of start_game event');
          });
           
        });  
        lobby.users.forEach((user) => {
          io.to(user.actualSocketID).emit("SkullGetPlayerId",user.actualSocketID);
          io.to(user.actualSocketID).emit('SkullPLayersUpdate', SkullLobbies[ind].Players);  
        });  
      }
    }
  });
/*
socket.on('AddSkullPlayer', () => {                            

  console.log(socket.id);
    SkullPlayers.push(new SkullPlayer(socket.id,'player',0,0,0,null,false,false,[],'setup',null,false));
    SkullPlayersData.push(new SkullPlayerData(socket.id,[]));
    if(SkullPlayers.length==1){
      SkullPlayers[0].IsActive=true;  
    } 
    socket.emit("SkullGetPlayerId",socket.id);                  
    console.log(SkullPlayers);
    socket.join('Skull'); 
    io.sockets.in('Skull').emit('SkullPLayersUpdate', SkullPlayers);
          
                
});  */        
socket.on('SkullUpdate', (lobbyId) => {                                    
  const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
  if (user) 
    {
      let ind=FindSkullLobbyById(lobbyId);   
    //  console.log(SkullLobbies[ind]) ;
    io.to(user.actualSocketID).emit("SkullGetPlayerId",user.actualSocketID);
      io.to(user.actualSocketID).emit("SkullPLayersUpdate",SkullLobbies[ind].Players); 
      
    }
  //console.log(socket.id);                   
  
});                 

socket.on('EndTurn', (data) => {   
  console.log(`End Turn`);
  console.log(data);
  let ActivePlayers=0; 

 let ind=FindSkullLobbyById(data.lobbyId);
 /*
  let GameMode=SkullLobbies[ind].GameMode;
  let Bet=SkullLobbies[ind].Bet;
  let SkullPlayers=SkullLobbies[ind].Players;
  let SkullPlayersData=SkullLobbies[ind].PlayersData;
  let CurrPlayerInd=SkullLobbies[ind].CurrPlayerInd;*/

SkullLobbies[ind].GameMode=data.gameMode;     
SkullLobbies[ind].Bet=data.Bet;     
  console.log(SkullLobbies[ind].GameMode);  
  for (let i = 0; i < SkullLobbies[ind].Players.length; i++) {  
if(SkullLobbies[ind].Players[i].Id==data.id)    
  {
    SkullLobbies[ind].Players[i].Cards=data.deck;
    SkullLobbies[ind].Players[i].IsActive=data.active;
    SkullLobbies[ind].Players[i].CardsDown=data.downCount;  
    SkullLobbies[ind].PlayersData[i].PlayedCards=data.playedDeck; 
    SkullLobbies[ind].Players[i].HavePassed=data.pass;     
    console.log(`Updated player ${data.id}`);
    
  }                           

  if (!SkullLobbies[ind].Players[i].HavePassed){
    ActivePlayers++;
  }
  SkullLobbies[ind].Players[i].Bet=SkullLobbies[ind].Bet;                
  if (SkullLobbies[ind].Bet>0&&SkullLobbies[ind].GameMode=='play'){  
   
    SkullLobbies[ind].Players[i].GameMode='betting';   
  }         
  //console.log(SkullPlayers[i].Id);
  }       
    
        

  MoveToNextPlayer(data.lobbyId);
while(SkullLobbies[ind].Players[SkullLobbies[ind].CurrPlayerInd].HavePassed==true)
{
  MoveToNextPlayer(data.lobbyId);
}
SkullLobbies[ind].Players[SkullLobbies[ind].CurrPlayerInd].IsActive=true;

let PlayersSetuped=0;
   
if(ActivePlayers==1) 
{                      
  SkullLobbies[ind].GameMode="flippingChips";
  for (let i = 0; i < SkullLobbies[ind].Players.length; i++) 
    {
      SkullLobbies[ind].Players[i].GameMode=SkullLobbies[ind].GameMode;  
    }
 
              
  if(SkullLobbies[ind].PlayersData[SkullLobbies[ind].CurrPlayerInd].PlayedCards?.length>0)
  {
    let skull=false;
    SkullLobbies[ind].Players[SkullLobbies[ind].CurrPlayerInd].OpenCards=SkullLobbies[ind].PlayersData[SkullLobbies[ind].CurrPlayerInd].PlayedCards;
  for (let i = 0; i < SkullLobbies[ind].PlayersData[SkullLobbies[ind].CurrPlayerInd].PlayedCards.length; i++) 
    {
      
    if(SkullLobbies[ind].PlayersData[SkullLobbies[ind].CurrPlayerInd].PlayedCards[i].IsSkull)    
    {          
      
      skull=true;
    }               
    }
    if (skull==false)        
    {
      SkullLobbies[ind].Bet=SkullLobbies[ind].Bet-SkullLobbies[ind].PlayersData[SkullLobbies[ind].CurrPlayerInd].PlayedCards.length;
     
      if(SkullLobbies[ind].Bet==0)
        {
          SkullLobbies[ind].Players[SkullLobbies[ind].CurrPlayerInd].VP++;
         
          if(SkullLobbies[ind].Players[SkullLobbies[ind].CurrPlayerInd].VP==2)   
            {
             
              for (let k = 0; k < SkullLobbies[ind].Players.length; k++) 
              {
                SkullLobbies[ind].Players[k].WinWindow=true;
              }
            }     
            else           
            {
              MoveToNextRound(data.lobbyId,socket);
            }
            
        }     
        else
        {
          
          for (let k = 0; k < SkullLobbies[ind].Players.length; k++) 
            {
              SkullLobbies[ind].Players[k].Bet=SkullLobbies[ind].Bet;
            }
        }
    }
    else
    {             
      io.to(SkullLobbies[ind].Players[SkullLobbies[ind].CurrPlayerInd].Id).emit('BetFail'); 
      console.log("failHere");        
      SkullLobbies[ind].Players[SkullLobbies[ind].CurrPlayerInd].IsActive=false;   
      MoveToNextPlayer(data.lobbyId);
      SkullLobbies[ind].Players[SkullLobbies[ind].CurrPlayerInd].IsActive=true;
      MoveToNextRound(data.lobbyId,socket);
    }   
  }
}      
 
  if(SkullLobbies[ind].GameMode=="setup")  
  {
      
  for (let i = 0; i < SkullLobbies[ind].PlayersData.length; i++) 
    {
      
      if(SkullLobbies[ind].PlayersData[i].PlayedCards?.length>0) 
      {
                    
          PlayersSetuped++;

      }
    }
  

    
}

if(SkullLobbies[ind].GameMode=="setup" && SkullLobbies[ind].Players.length==PlayersSetuped)  
  {
  for (let i = 0; i < SkullLobbies[ind].Players.length; i++) 
  {
    SkullLobbies[ind].Players[i].GameMode='play';  
  }
  SkullLobbies[ind].GameMode='play'; 
}
/*SkullLobbies[ind].GameMode=GameMode;
SkullLobbies[ind].Bet=Bet;
SkullLobbies[ind].Players=SkullPlayers;
SkullLobbies[ind].PlayersData=SkullPlayersData;
SkullLobbies[ind].CurrPlayerInd=CurrPlayerInd;*/ 
  
const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
  if (user) 
    {
      const lobby = lobbies[user.lobbyName];
      if (lobby) 
      {
        lobby.users.forEach((user) => {
          io.to(user.actualSocketID).emit('SkullPLayersUpdate', SkullLobbies[ind].Players);
        }); 
    }
  }
 // io.sockets.in('Skull').emit('SkullPLayersUpdate', SkullPlayers);
  console.log(SkullLobbies[ind].Players);  
  console.log(SkullLobbies[ind].PlayersData[0].PlayedCards);     
        
});

socket.on('OpenChip', (data) => {                 
  console.log(data.targetId);  
  let ind=FindSkullLobbyById(data.lobbyId);       
  let i=FindSkullPlayerById(data.targetId,data.lobbyId);   
  let j=FindSkullPlayerById(socket.id,data.lobbyId);    
  
  if(SkullLobbies[ind].PlayersData[SkullLobbies[ind].CurrPlayerInd].PlayedCards?.length>0)
    {
      SkullLobbies[ind].Players[i].OpenCards.push(SkullLobbies[ind].PlayersData[i].PlayedCards[SkullLobbies[ind].PlayersData[i].PlayedCards.length-1]);
  if(SkullLobbies[ind].PlayersData[i].PlayedCards[SkullLobbies[ind].PlayersData[i].PlayedCards.length-1].IsSkull)
    {  
      io.to(socket.id).emit('BetFail');      
      SkullLobbies[ind].Players[j].IsActive=false;             
      console.log(SkullLobbies[ind].Players[j]);    
      SkullLobbies[ind].Players[i].IsActive=true;   
      SkullLobbies[ind].CurrPlayerInd=i;
      MoveToNextRound(data.lobbyId,socket); 
    }          
    else   
    {       
     
      SkullLobbies[ind].Bet=SkullLobbies[ind].Bet-1;
      SkullLobbies[ind].Players[j].IsActive=true;
     
      if(SkullLobbies[ind].Bet==0)
      {
        SkullLobbies[ind].Players[j].VP++;
        if(SkullLobbies[ind].Players[j].VP==2)   
          {
            for (let k = 0; k < SkullLobbies[ind].Players.length; k++) 
            {
              SkullLobbies[ind].Players[k].WinWindow=true;
            }
          }     
          else           
          {   
            MoveToNextRound(data.lobbyId,socket);
          }
          
      }
       else
       {
        for (let k = 0; k < SkullLobbies[ind].Players.length; k++) 
          {
            SkullLobbies[ind].Players[k].Bet=SkullLobbies[ind].Bet;
          }
        }

    }
  }
    console.log(SkullLobbies[ind].Players);   
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
  if (user) 
    {
      const lobby = lobbies[user.lobbyName];
      if (lobby) 
      {
        lobby.users.forEach((user) => {
          io.to(user.actualSocketID).emit('SkullPLayersUpdate', SkullLobbies[ind].Players);
        }); 
    }
  }
//io.sockets.in('Skull').emit('SkullPLayersUpdate', SkullPlayers);
});

//Skull



  socket.on('Diamant_start', () => {
    
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    if (user && user.isCreator) {
     
      const lobby = lobbies[user.lobbyName];
      if (lobby) {
      
        lobby.users.forEach((user) => {
          
          io.to(user.actualSocketID).emit('Diamant_started', () => {
            console.log('Client confirmed receipt of start_game event');
          });
        });
      }
    }
  });

  let Deck = [];
  let RelicDeck = [];
  for (let i = 0; i < 5; i++) {
    Deck.push(new Card('Treasure',i+1))
 }
 Deck.push(new Card('Treasure',5))
 Deck.push(new Card('Treasure',7))
 Deck.push(new Card('Treasure',7))
 Deck.push(new Card('Treasure',9))
 Deck.push(new Card('Treasure',9))
 Deck.push(new Card('Treasure',11))
 Deck.push(new Card('Treasure',11))
 Deck.push(new Card('Treasure',13))
 Deck.push(new Card('Treasure',14))
 Deck.push(new Card('Treasure',15))
 Deck.push(new Card('Treasure',17))
 RelicDeck.push(new Card('relic',5))
 RelicDeck.push(new Card('relic',7))
 RelicDeck.push(new Card('relic',8))
 RelicDeck.push(new Card('relic',10))
 RelicDeck.push(new Card('relic',12))
 for (let i = 0; i < 3; i++) {
    Deck.push(new Card('Trap Spider',null))
 }
 for (let i = 0; i < 3; i++) {
    Deck.push(new Card('Trap Snake',null))
 }
 for (let i = 0; i < 3; i++) {
    Deck.push(new Card('Trap Stone',null))
 }
 for (let i = 0; i < 3; i++) {
    Deck.push(new Card('Trap Wood',null))
 }
 for (let i = 0; i < 3; i++) {
    Deck.push(new Card('Trap Magma',null))
 }
  socket.on('Diamant_begin', () => {
    
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    if (user && user.isCreator) {
     
      const lobby = lobbies[user.lobbyName];
      if (lobby) {
        
        console.log("sd")
        // Собираем данные игроков и колоды     
      shuffle(Deck,RelicDeck,1)
      console.log(Deck)
        var i = 0;
        const playersData = lobby.users.map(player => { return new Player(player.socketID,i++, 0, 0, [], player.nickname, false) });
        console.log(playersData)
        lobby.users.forEach((u) => {
          const currentUserData = playersData.find(player => player.socketID === u.socketID);

          io.to(u.actualSocketID).emit('start_Diamant', {Players:playersData, Deck: Deck,User:currentUserData});
        });
      }
    }
  });
  function shuffle(array,RelicDeck,roundNum) {
    array.push(RelicDeck[roundNum-1])
    //console.log(RelicDeck[roundNum-1].points)
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
socket.on("shuffle_Diamant",(roundNum)=>{
  const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    if (user) {
      const lobby = lobbies[user.lobbyName];
      if (lobby) {
        shuffle(Deck,RelicDeck,roundNum)
        lobby.users.forEach((u) => {
          io.to(u.actualSocketID).emit('Diamant_shuffled', {Deck: Deck});
        })
      }}
})

socket.on('player_ready_Diamant', (data) => {
  const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
  if (user) {
    user.isReady = true;
    user.action = data.Move || null; 

    const lobby = lobbies[user.lobbyName];
    if (lobby) {
      let activeUsers = null;
      console.log("ldsl " + JSON.stringify(data));

      if (data.ExitPlayers) {
        const exitSocketIDs = data.ExitPlayers.map(player => player.socketID);
        activeUsers = lobby.users.filter(user => !exitSocketIDs.includes(user.socketID));
      }

      let allPlayersReady = false;
      if (activeUsers != null) {
        console.log("bb " + JSON.stringify(activeUsers));
        allPlayersReady = activeUsers.every((user) => user.isReady);
        console.log("Zzzz");
      } else {
        allPlayersReady = lobby.users.every((user) => user.isReady);
      }

      console.log(allPlayersReady);

      if (allPlayersReady) {
        const actionsSet = new Set();
        let leaveCount = 0;

        lobby.users.forEach((user) => {
          if (user.action) {
            actionsSet.add(user.action);
            if (user.action === 'Leave') {
              leaveCount++;
            }
          }
        });

        const uniqueActions = Array.from(actionsSet);
        console.log(uniqueActions);
        console.log(`Number of players with 'Leave' action: ${leaveCount}`);

        lobby.users.forEach((u) => {
          let actionsToSend;
          if (u.action === 'Leave') {
            actionsToSend = uniqueActions;
          } else if(u.action === null){
            
            actionsToSend = uniqueActions.filter(action => action !== 'Leave');
            actionsToSend.push("Exit")
          }
           else{
            actionsToSend = [u.action];
          }
          console.log(actionsToSend);
          io.to(u.actualSocketID).emit('all_players_ready_Diamant', { 
            action: actionsToSend,
            leaveCount: leaveCount 
          });
          u.isReady = false;
          u.action = null;
        });
      }
    }
  }
});




  socket.on("Update_Players_Data_Diamant", (data) => {
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    if (user) {
      const lobby = lobbies[user.lobbyName];
      if (lobby) {
        const updatedPlayer = data.currentPlayer;
       console.log("uniquePlayer "+JSON.stringify(data))
        lobby.users.forEach((user) => {
          io.to(user.actualSocketID).emit('PlayersDataDiamantUpdated', {
            uniquePlayer: updatedPlayer
          });
        });
      }
    } 
  });

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

  socket.on('join_private_lobby', ({ roomName, password }) => {
    const lobby = lobbies[roomName];
    if (lobby.currentCount < lobby.maxCount) {
      const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
      if (password === lobby.password) {
        user.lobbyName = roomName;
        lobby.users.push(user);
        lobby.currentCount++;
        console.log('User: ', user.nickname, 'joined to lobby', roomName);
        io.to(user.actualSocketID).emit('password_checked');
      }
    }
  });

  //TicTacToe------------------------------------------------------------------------------
  socket.on('TicTacToe_start', () => {
    const user = users.find((user) => user.socketID === socket.handshake.query.socketID);
    if (user && user.isCreator) {
      const lobby = lobbies[user.lobbyName];
      if (lobby) {
        lobby.users.forEach((user) => {
          io.to(user.actualSocketID).emit('TicTacToe_started');
        });
      }
    }
  });


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

  socket.on('start_TicTacToe_game', () => {
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
      console.log('Winner is: X');
    } else if (checkWinner(game.cells) === "O") {
      game.winner = game.Oplayer;
      console.log('Winner is: O');
    } else if (game.cells.every((cell) => cell !== "")) {
      game.isDraw = true;
      console.log("It's a draw");
    } else {
      game.currentTurn = game.currentTurn === "X" ? "O" : "X";
    }

    const Cells = game.cells;
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
