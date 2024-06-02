import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

export const TrophyEarned = () => {

    //const [game, setGame] = useState({});
    const[loading, setLoading] = useState(true);
    const { trophyId } = useParams();
    
    useEffect(
        () => {
            const fetchData = async () => {
                setLoading(true);
                await axios.put(`http://localhost:5001/profiles/trophy_earn?playerId=2&trophyId=${trophyId}`);
                setLoading(false);
            };
            fetchData();
            
        }, []
    );

    if(loading){
        return <h1>earning . . .</h1>;
    }

  return (
    <h1>Trophy earned!</h1>
  );
}