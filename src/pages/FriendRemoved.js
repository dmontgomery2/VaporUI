import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

export const FriendRemoved = () => {

    //const [game, setGame] = useState({});
    const[loading, setLoading] = useState(true);
    const { passiveRemoverId } = useParams();
    
    useEffect(
        () => {
            const fetchData = async () => {
                setLoading(true);
                await axios.put(`http://localhost:5001/profiles/friend_remove?activeRemoverId=2&passiveRemoverId=${passiveRemoverId}`);
                setLoading(false);
            };
            fetchData();
            
        }, []
    );

    if(loading){
        return <h1>removing friend . . .</h1>;
    }

  return (
    <h1>Friend successfully removed!</h1>
  );
}