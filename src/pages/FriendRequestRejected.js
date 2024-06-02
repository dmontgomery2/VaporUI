import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

export const FriendRequestRejected = () => {

    //const [game, setGame] = useState({});
    const[loading, setLoading] = useState(true);
    const { requesterId } = useParams();
    
    useEffect(
        () => {
            const fetchData = async () => {
                setLoading(true);
                await axios.put(`http://localhost:5001/profiles/friend_request_cancel?requesterId=${requesterId}&accepterId=2`);
                setLoading(false);
            };
            fetchData();
            
        }, []
    );

    if(loading){
        return <h1>rejecting friend request . . .</h1>;
    }

  return (
    <h1>Friend request rejected!</h1>
  );
}