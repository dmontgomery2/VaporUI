import React from 'react';
import GameService from '../services/GameService';

class GameComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            games:[]
        }
    }

    componentDidMount(){
        GameService.getGames().then((response) => {
            this.setState({ games: response.data})
        });
    }

    render (){
        return (
            <div>
                <h1 className = "text-center"> Games</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Title</td>
                            <td> Developer</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.games.map(
                                game =>
                                <tr key = {game.id}>
                                    <td>{game.title}</td>
                                    <td>{game.developer}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        )
    }
}

export default GameComponent