import axios from 'axios'

const PLAYER_PROFILE_REST_API_URL = "http://localhost:5001/profiles";

class PlayerProfileService{

    getProfiles(){
        return axios.get(PLAYER_PROFILE_REST_API_URL);
    }
    
    getProfileByUsername(username){
        return axios.get(PLAYER_PROFILE_REST_API_URL + "/" + username);
    }
}

export default new PlayerProfileService()