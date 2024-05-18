export class ThisPlayerView {
    constructor(id, viewCards, active, 
        winPoints, bet, updateBet, 
        updateIsFlipping, pass, inputValue, 
        setInputValue, winWindow, phase) {
      this.Id = id;
      this.ViewCards = viewCards;
      this.Active = active;
      this.WinPoints = winPoints;
      this.Bet = bet;               /*label*/
      this.UpdateBet = updateBet;   /*onClick*/
      this.UpdateIsFlipping = updateIsFlipping; /*???*/
      this.Pass = pass;             /*onClick*/
      this.InputValue = inputValue;
      this.SetInputValue = setInputValue; /*onChanged*/
      this.WinWindow = winWindow;   /*bool*/
      this.Phase = phase;
    }
  }
  
 export class PlayerView {
    constructor(id, name, img, vP, cardsDown, 
        openCards, isActive,onclick) {
      this.Id = id;
      this.Name = name;
      this.Img = img;
      this.VP = vP;
      this.CardsDown = cardsDown;
      this.OpenCards = openCards;
      this.IsActive = isActive;
      this.Onclick = onclick;
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
