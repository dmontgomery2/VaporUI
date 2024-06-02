import {React} from 'react'
import {Link} from 'react-router-dom'
import '../GameBrief.css'

export const GameBrief = ({game, profileUsername}) => {
    const gameRoute = `/games/${game.title}`;
    const boxArtHeight = 50;
    const boxArtWidth = 50;
  if(profileUsername){
    return(<div className="Card">
    <Link to= {gameRoute}>{game.title}</Link>
    <div className="BoxArtDiv">
    <img className="BoxArtBrief" src={require("../images/" + game.title + " Box Art.png")}/>
    </div>
    <p><Link to= {`/profiles/${profileUsername}/trophies/${game.title}`}>trophies</Link></p>
</div>)
  }
  else{
  return (
    <div className="Card">
        <Link to= {gameRoute}>{game.title}</Link>
        <div className="BoxArtDiv">
        <img className="BoxArtBrief" src={require("../images/" + game.title + " Box Art.png")}/>
        </div>
    </div>
  );
  } 
}