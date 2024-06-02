import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

export const FriendRequestAccepted = () => {

    //const [game, setGame] = useState({});
    const[loading, setLoading] = useState(true);
    const { requesterId } = useParams();
    
    useEffect(
        () => {
            const fetchData = async () => {
                setLoading(true);
                await axios.put(`http://localhost:5001/profiles/friend_add?requesterId=${requesterId}&accepterId=2`);
                setLoading(false);
            };
            fetchData();
            
        }, []
    );

    if(loading){
        return <h1>accepting friend request . . .</h1>;
    }

  return (
    <h1>Friend request accepted!</h1>
  );
}