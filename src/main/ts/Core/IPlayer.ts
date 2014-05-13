interface IPlayer {

    score:string;
    addPoints: (number) => void
    displayScore: (selector:String)=> void
}