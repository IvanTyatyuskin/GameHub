class SkullCard {
    constructor(isSkull, isDown, isDisabled) {
      this.IsSkull = isSkull;
      this.IsDown = isDown;
      this.IsDisabled=isDisabled;
    }
  
  }
  
  class SkullPlayer {
    constructor(id,name,vP, cardsDown,bet,image,isActive,havePassed,openCards,gameMode,onClick,winWindow) {
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
    }
    
  }
  class SkullPlayerData {
    constructor(id,cards) {
    this.Id=id;
    this.PlayedCards=cards;
    
    }
    
  }

exports.SkullCard = SkullCard;
exports.SkullPlayer = SkullPlayer;
exports.SkullPlayerData = SkullPlayerData;