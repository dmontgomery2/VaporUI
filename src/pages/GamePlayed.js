import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

export const GamePlayed = () => {

    //const [game, setGame] = useState({});
    const[loading, setLoading] = useState(true);
    const { title, minutes } = useParams();
    
    useEffect(
        () => {
            const contactBackend = async () => {
                setLoading(true);
                await axios.put(`http://localhost:5001/games/title/${title}/play?profileId=2&minutesPlayed=${minutes}`);
                setLoading(false);
            };
            contactBackend();
            
        }, []
    );

    if(loading){
        return <h1>playing . . .</h1>;
    }

  return (
    <h1>Thanks for playing!</h1>
  );
}