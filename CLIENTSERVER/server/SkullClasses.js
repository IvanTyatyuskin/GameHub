class SkullCard {
    constructor(isSkull, isDown, isDisabled) {
      this.IsSkull = isSkull;
      this.IsDown = isDown;
      this.IsDisabled=isDisabled;
    }
  
  }
  
  class SkullPlayer {
    constructor(id,name,vP, cardsDown,bet,image,isActive,havePassed,openCards,gameMode,onClick,winWindow,lobbyId,cards) {
    this.Id=id;
    this.Name=name;
    this.VP = vP;
    this.CardsDown = cardsDown;
    this.Bet = bet;
    this.Image = image;
    this.IsActive=isActive;
    this.HavePassed=havePassed;
    this.OpenCards=openCards;
    this.GameMode=gameMode;
    this.onClick=onClick;
    this.WinWindow=winWindow;
    this.LobbyId=lobbyId;
    this.Cards=cards;
    }
    
  }
  class SkullPlayerData {
    constructor(id,cards) {
    this.Id=id;
    this.PlayedCards=cards;
    
    }
    
  }

  class SkullLobby {
    constructor(id,name,players, playersData,gameMode,bet,currPlayerInd) {
    this.Id=id;
    this.Name=name;
    this.Players=players;
    this.PlayersData=playersData;
    this.GameMode=gameMode;
    this.Bet=bet;
    this.CurrPlayerInd=currPlayerInd;
    }
    
  }

exports.SkullCard = SkullCard;
exports.SkullPlayer = SkullPlayer;
exports.SkullPlayerData = SkullPlayerData;
exports.SkullLobby = SkullLobby;