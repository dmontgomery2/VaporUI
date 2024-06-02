import {React} from 'react'
import {Link} from 'react-router-dom'
import {GameBrief} from './GameBrief'

export const GameList = ({games, loading}) => {
    if(loading){
        return <h2>loading . . .</h2>
    }
    return games.map(game => <GameBrief game={game}/>);
}
