export default class GameInfo{
    constructor(Name, Description, 
        Image, Path, 
        Rule, 
        maxPlayers, minPlayers, onlinePlayers){
        this.Name = Name;
        this.Description = Description;
        this.Image = Image;
        this.Path = Path ;
        this.Rule = Rule;
        this.maxPlayers = maxPlayers;
        this.minPlayers = minPlayers;
        this.onlinePlayers = onlinePlayers;
    }
}