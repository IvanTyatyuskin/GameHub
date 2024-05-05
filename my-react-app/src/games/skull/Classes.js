export class ThisPlayerView {
    constructor(id, viewCards, active, winPoints) {
      this.Id = id;
      this.ViewCards = viewCards;
      this.Active = active;
      this.WinPoints = winPoints;
    }
  }
  
 export class PlayersView {
    constructor(id, playerView) {
      this.Id = id;
      this.PlayerView = playerView;
    }
  }

export  class CardView {
    constructor(type, onclick,active) {
      this.Type = type;
      this.Onclick = onclick;
      this.Active = active;
    }
  }
