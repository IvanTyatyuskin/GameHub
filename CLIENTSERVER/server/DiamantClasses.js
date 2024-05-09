 class Card {
    constructor(cardType, points) {
        this.cardType = cardType;
        this.points = points;
    }

    getСardType() {
        return this.cardType;
    }

    getPoints() {
        return this.points;
    }
    
}
 class Player {
    constructor(id, roundPoints, allPoints, relics, nickName,exit) {
        this.id = id;
        this.roundPoints = roundPoints;
        this.allPoints = allPoints;
        this.relics = relics;
        this.nickName = nickName;
        this.exit=exit
    }
    getExit() {
        return this.exit;
    }
    setExit(exitValue) {
        this.exit=exitValue;
    }
    getNickName() {
        return this.nickName;
    }
    addRelic(newRelic){
        this.relics.push(newRelic);
    }
    getRelic(){
        return this.relics;
    }
    getPlayerId() {
        return this.id;
    }
    getRoundPoints() {
        return this.roundPoints;
    }
    getallPoints() {
        return this.allPoints;
    }
    addAllPoints(plusPoints)
    {
        this.allPoints+=plusPoints;
    }
    addRoundPoints(plusPoints)
    {
        this.roundPoints+=plusPoints;
    }
    setRoundPointsToZero()
    {
        this.roundPoints=0;
    }
}

exports.Card = Card;
exports.Player = Player;
