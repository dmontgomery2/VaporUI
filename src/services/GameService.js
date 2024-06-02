import axios from 'axios'

const GAME_REST_API_URL = "http://localhost:5001/game";

class GameService{

    getGames(){
        return axios.get(GAME_REST_API_URL);
    }
}

export default new GameService()