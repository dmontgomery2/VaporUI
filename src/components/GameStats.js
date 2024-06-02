import {React} from 'react'
import {Link} from 'react-router-dom'
import '../GameBrief.css'

export const GameStats = ({gameStats}) => {
    const gameTitle = gameStats.game.title;
    const gameRoute = `/games/${gameTitle}`;
    const playTimeHours = Math.ceil(gameStats.playTimeMinutes / 60);
    const hoursText = playTimeHours === 1 ? " Hour" : " Hours";
    return(<div className="Card">
    <Link to= {gameRoute}>{gameTitle}</Link>
    <div className="BoxArtDiv">
    <img className="BoxArtBrief" src={require("../images/" + gameStats.game.title + " Box Art.png")}/>
    </div>
    <div className="CardDetail">
    <p>{"play time: " + playTimeHours + hoursText}</p>
    <p>{gameStats.lastPlayed === null ? "never played" : "last played: " +  new Date(gameStats.lastPlayed).toLocaleDateString("en-US")}</p>
    <Link to= {`/profiles/${gameStats.profile}/trophies/${gameStats.game.title}`}>trophies</Link>
    </div>
     
</div>)
  }