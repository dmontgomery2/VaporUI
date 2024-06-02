import {React, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { TrophyComponent } from '../components/TrophyComponent';
import '../GameBrief.css';
import {useParams} from 'react-router-dom';

export const TrophyCollectionPage = () => {
    const [trophies, setTrophies] = useState([]);
    const[loading, setLoading] = useState(true);
    const { username, gameTitle } = useParams();
    useEffect(
        () => {
            const callBackend = async () => {
                setLoading(true);
                const response = await fetch(`http://localhost:5001/profiles/username/${username}/trophies/${gameTitle}`);
                const data = await response.json();
                setTrophies(data);
                setLoading(false);
            };
            callBackend();

        }, []
    );

    if(loading){
        return <h1>loading . . .</h1>
    }

    if(trophies.length == 0){
        return <h1>{username} has not earned any trophies for {gameTitle}.</h1>
    }
  return (
    <div>
        <h1>{username}'s trophies for {gameTitle}</h1>
        {trophies.map(t => <TrophyComponent trophy={t}/>)}
    </div>
  );
}