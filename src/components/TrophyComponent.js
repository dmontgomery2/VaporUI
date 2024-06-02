import {Link} from 'react-router-dom'
import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import '../GamePage.css';
import axios from 'axios';

export const TrophyComponent = ({trophy, activeProfile}) => {

  const [gameData, setGameData] = useState();
  const [profileData, setProfileData] = useState();
  const [profileOwnsGameData, setProfileOwnsGameData] = useState();
  const [profileOwnsTrophyData, setProfileOwnsTrophyData] = useState();
  const[loading, setLoading] = useState(true);
  const earnRoute = `/earn_trophy/${trophy.id}`;

  

  useEffect(
    () => {
        const fetchData = async () => {
            setLoading(true);
            
            const gameData = (await axios.get(`http://localhost:5001/games/title/${trophy.gameTitle}`)).data;
            const profileData = (await axios.get("http://localhost:5001/profiles/username/DJgummy94")).data;
            const profileOwnsGameData = (await axios.get(`http://localhost:5001/profiles/username/${profileData.username}/owns_game?gameId=${gameData.id}`)).data;
            const profileOwnsTrophyData = (await axios.get(`http://localhost:5001/profiles/username/${profileData.username}/owns_trophy?trophyId=${trophy.id}`)).data;

            setGameData(gameData);
            setProfileData(profileData);
            setProfileOwnsGameData(profileOwnsGameData);
            setProfileOwnsTrophyData(profileOwnsTrophyData);

            setLoading(false);
        };
        fetchData();
    }, []
);



if(loading){
  return (
    <div className="Card">
        <div className="CardDetail">
            <p>loading . . .</p>
        </div>
    </div>
  );
}


  if(profileData){
    if(profileOwnsGameData){
      if(!profileOwnsTrophyData){
        return (
          <div className="Card">
              <div className="CardDetail">
                  <p>{trophy.title}</p>
                  <p>{trophy.description}</p>
                  {/* <p>percent achieved</p>
                  <p>{trophy.percentAchieved}</p> */}
                  <Link to= {earnRoute}>earn</Link>
              </div>
          </div>
        );
      }
      return (
        <div className="Card">
            <div className="CardDetail">
                <p>{trophy.title}</p>
                <p>{trophy.description}</p>
                {/* <p>percent achieved</p>
                <p>{trophy.percentAchieved}</p> */}
                <p>You have earned this trophy.</p>
            </div>
        </div>
      );
    }
    return (
      <div className="Card">
          <div className="CardDetail">
              <p>{trophy.title}</p>
              <p>{trophy.description}</p>
              {/* <p>percent achieved</p> */}
              {/* <p>{trophy.percentAchieved}</p> */}
              <p>Purchase the game to earn this trophy.</p>
          </div>
      </div>
    ); 
  }
  return (
    <div className="Card">
        <div className="CardDetail">
            <p>{trophy.title}</p>
            <p>{trophy.description}</p>
            {/* <p>percent achieved</p>
            <p>{trophy.percentAchieved}</p> */}
        </div>
    </div>
  );
}