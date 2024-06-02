import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

export const GameRated = () => {

    //const [game, setGame] = useState({});
    const[loading, setLoading] = useState(true);
    const[valid, setValid] = useState(true);
    const { title, rating} = useParams();
    
    useEffect(
        () => {
            if(rating > 10 || rating < 0){
                setValid(false);
                setLoading(false);
            }
            const fetchData = async () => {
                await axios.put(`http://localhost:5001/games/title/${title}/rate?rating=${rating}&profileId=2`);
                setLoading(false);
            };
            if(valid){
                fetchData();
            }
            
        }, []
    );

    if(loading){
        return <h1>rating . . .</h1>;
    }

  return (
    <h1>{valid ? "Thanks for rating!" : "Your rating was invalid."}</h1>
  );
}