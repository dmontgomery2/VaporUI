import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

export const FriendRequestWithdrawn = () => {

    //const [game, setGame] = useState({});
    const[loading, setLoading] = useState(true);
    const { accepterId } = useParams();
    
    useEffect(
        () => {
            const fetchData = async () => {
                setLoading(true);
                await axios.put(`http://localhost:5001/profiles/friend_request_cancel?requesterId=2&accepterId=${accepterId}`);
                setLoading(false);
            };
            fetchData();
            
        }, []
    );

    if(loading){
        return <h1>withdrawing friend request . . .</h1>;
    }

  return (
    <h1>Friend request withdrawn!</h1>
  );
}