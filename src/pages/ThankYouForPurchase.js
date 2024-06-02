import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

export const ThankYouForPurchase = () => {

    //const [game, setGame] = useState({});
    const[loading, setLoading] = useState(true);
    const { title } = useParams();
    
    useEffect(
        () => {
            const callBackend = async () => {
                setLoading(true);
                const gameData = (await axios.get(`http://localhost:5001/games/title/${title}`)).data;
                await axios.post(`http://localhost:5001/game_stats/purchase?gameId=${gameData.id}&profileId=2`);
                setLoading(false);
            };
            callBackend();
            
        }, []
    );

    if(loading){
        return <h1>purchasing . . .</h1>;
    }

  return (
    <h1>Thank you for your purchase!</h1>
  );
}