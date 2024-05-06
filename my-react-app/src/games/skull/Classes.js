export class ThisPlayerView {
    constructor(id, viewCards, active, winPoints, bet, updateBet, updateIsFlipping, pass, setInput, winWindow) {
      this.Id = id;
      this.ViewCards = viewCards;
      this.Active = active;
      this.WinPoints = winPoints;
      this.Bet = bet;
      this.UpdateBet = updateBet;
      this.UpdateIsFlipping = updateIsFlipping;
      this.Pass = pass;
      this.SetInput = setInput;
      this.WinWindow = winWindow;
    }
  }
  
 export class PlayerView {
    constructor(id, name, img, vP, cardsDown, openCards, isActive,onclick) {
      this.Id = id;
      this.Name = name;
      this.Img = img;
      this.VP = vP;
      this.CardsDown = cardsDown;
      this.OpenCards = openCards;
      this.Onclick = onclick;
      this.IsActive = isActive;
    }
  }

export  class CardView {
    constructor(type, onclick,active,disabled) {
      this.Type = type;
      this.Onclick = onclick;
      this.Active = active;
      this.Disabled=disabled;
    }
  }
