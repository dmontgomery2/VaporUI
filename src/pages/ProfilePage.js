import {React, useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom'
import {GameStats} from '../components/GameStats';
import {ProfileList} from '../components/ProfileList';
import {ProfileBrief} from '../components/ProfileBrief';
import {GameBrief} from '../components/GameBrief';
import {FriendOnPrincipalPage} from '../components/FriendOnPrincipalPage';
import {FriendOnOtherPage} from '../components/FriendOnOtherPage';
import {ReceivedFriendRequest} from '../components/ReceivedFriendRequest';
import {SentFriendRequest} from '../components/SentFriendRequest';
import '../ProfilePage.css';
import axios from 'axios';




export const ProfilePage = () => {

    const [profile, setProfile] = useState();
    const[loading, setLoading] = useState(true);
    const[profileIsPrincipal, setProfileIsPrincipal] = useState(true);
    const[profileIsFriendsWithPrincipal, setProfileIsFriendsWithPrincipal] = useState(true);
    const[profileHasReceivedFriendRequestFromPrincipal, setProfileHasReceivedFriendRequestFromPrincipal] = useState(true);
    const[profileHasSentFriendRequestToPrincipal, setProfileHasSentFriendRequestToPrincipal] = useState(true);
    const[friends, setFriends] = useState([]);
    const[pendingFriendsReceived, setPendingFriendsReceived] = useState([]);
    const[pendingFriendsSent, setPendingFriendsSent] = useState([]);
    const { username } = useParams();
    useEffect(
        () => { 
            const fetchData = async () => {
                setLoading(true);
                const profileData = (await axios.get(`http://localhost:5001/profiles/username/${username}`)).data;
                const profileIsPrincipalData = await profileData.username === "DJgummy94";
                setProfileIsPrincipal(profileIsPrincipalData);
                const profileIsFriendsWithPrincipalData = (await axios.get(`http://localhost:5001/profiles/are_friends?profile_id_1=2&profile_id_2=${profileData.id}`)).data;
                setProfileIsFriendsWithPrincipal(profileIsFriendsWithPrincipalData);
                const profileHasReceivedFriendRequestFromPrincipleData = (await axios.get(`http://localhost:5001/profiles/has_received_friend_request_from?receiver_id=${profileData.id}&sender_id=2`)).data;
                setProfileHasReceivedFriendRequestFromPrincipal(profileHasReceivedFriendRequestFromPrincipleData);
                const profileHasSentFriendRequestToPrincipleData = (await axios.get(`http://localhost:5001/profiles/has_sent_friend_request_to?sender_id=${profileData.id}&receiver_id=2`)).data;
                setProfileHasSentFriendRequestToPrincipal(profileHasSentFriendRequestToPrincipleData);
                const friendsUsernameData = await profileData.friends;
                const pendingFriendsReceivedUsernameData = await profileData.pendingFriendsReceived;               
                const pendingFriendsSentUsernameData = await profileData.pendingFriendsSent;
                const friendsData = [];
                const pendingFriendsReceivedData = [];
                const pendingFriendsSentData = [];
                for(let i = 0; i < friendsUsernameData.length; i++){
                    const currentFriendUsername = friendsUsernameData[i];
                    const currentFriend = (await axios.get(`http://localhost:5001/profiles/username/${currentFriendUsername}`)).data;
                    friendsData.push(currentFriend);
                }               
                for(let i = 0; i < pendingFriendsReceivedUsernameData.length; i++){
                    const currentPendingFriendReceivedUsername = pendingFriendsReceivedUsernameData[i];
                    const currentPendingFriendReceived = (await axios.get(`http://localhost:5001/profiles/username/${currentPendingFriendReceivedUsername}`)).data;
                    pendingFriendsReceivedData.push(currentPendingFriendReceived);
                }
                for(let i = 0; i < pendingFriendsSentUsernameData.length; i++){
                    const currentPendingFriendSentUsername = pendingFriendsSentUsernameData[i];
                    const currentPendingFriendSent = (await axios.get(`http://localhost:5001/profiles/username/${currentPendingFriendSentUsername}`)).data;
                    pendingFriendsSentData.push(currentPendingFriendSent);
                }               
                setProfile(profileData);
                setFriends(friendsData);
                setPendingFriendsReceived(pendingFriendsReceivedData);
                setPendingFriendsSent(pendingFriendsSentData);
                
                setLoading(false);
            };
            fetchData();


        }, [username, profileHasReceivedFriendRequestFromPrincipal, profileIsFriendsWithPrincipal, 
        profileHasSentFriendRequestToPrincipal]
    );

    if(loading){
        return <h1>loading . . .</h1>;
    }
    
    if(!profile || !profile.username){
        return (
            <div>
            <img src={require("../images/sad-face.png")} height={100} width={100}/>
        <h1>profile not found</h1></div>
        );
    }

    if(profileIsPrincipal){
        return (
            <div className="ProfilePage">
                <div className="username">
                    <h1>{profile.username}</h1>
                </div>
                <img className="ProfilePicture" src={require("../images/" + profile.username + " Profile Picture.png")}/>
                <div className="section">                  
                <h3>Friends</h3>
                {friends.map(friend => <FriendOnPrincipalPage profile={friend}/>)}
                </div>
                <div className="section">
                <h3>Received Friend Requests</h3>
                {pendingFriendsReceived.map(friend => <ReceivedFriendRequest profile={friend}/>)}
                </div>
                <div className="section">
                <h3>Sent Friend Requests</h3>
                {pendingFriendsSent.map(friend => <SentFriendRequest profile={friend}/>)}
                </div>
                <div className="section">                 
                <h3>Games</h3>
                {profile.gameStatsData.map(gameStats => <GameStats gameStats={gameStats}/>)}
                </div>
            
            </div>
          );
    }

    if(profileIsFriendsWithPrincipal){
  return (
    <div className="ProfilePage">
        <p>You are friends with this profile.</p>
        <div className="username">
            <h1>{profile.username}</h1>
        </div>
        <img className="ProfilePicture" src={require("../images/" + profile.username + " Profile Picture.png")}/>
        <div className="section">
        <h3>Friends</h3>
        {friends.map(friend => <FriendOnOtherPage profile={friend}/>)}
        </div>
        <div className="section">
        <h3>Games</h3>
        {profile.gameStatsData.map(gameStats => <GameStats gameStats={gameStats}/>)}
        </div>
    </div>
  );
    }

    const friendRequestAcceptedRoute = `/accept_friend_request/${profile.id}`;
    const friendRequestRejectedRoute = `/reject_friend_request/${profile.id}`;

    if(profileHasSentFriendRequestToPrincipal){
        return (
          <div className="ProfilePage">
              <div className="FriendRequestReceived">
              <p>You have received a friend request from this user.</p>
              <Link className="SubmitButton" to= {friendRequestAcceptedRoute}>accept</Link>
              <Link className="SubmitButton" to= {friendRequestRejectedRoute}>reject</Link>
              </div>
              <div className="username">
                  <h1>{profile.username}</h1>
              </div>
              <img className="ProfilePicture" src={require("../images/" + profile.username + " Profile Picture.png")}/>
              <div className="section">
              <h3>Friends</h3>
              {friends.map(friend => <FriendOnOtherPage profile={friend}/>)}
              </div>
              <div className="section">
              <h3>Games</h3>
              {profile.gameStatsData.map(gameStats => <GameStats gameStats={gameStats}/>)}
              </div>
          </div>
        );
          }


    if(profileHasReceivedFriendRequestFromPrincipal){
    return (
        <div className="ProfilePage">
            <p>You have sent a friend request to this profile.</p>
            <div className="username">
                <h1>{profile.username}</h1>
            </div>
            <img className="ProfilePicture" src={require("../images/" + profile.username + " Profile Picture.png")}/>
            <div className="section">
            <h3>Friends</h3>
            {friends.map(friend => <FriendOnOtherPage profile={friend}/>)}
            </div>
            <div className="section">
            <h3>Games</h3>
            {profile.gameStatsData.map(gameStats => <GameStats gameStats={gameStats}/>)}
            </div>
        </div>
    );
        }


    const friendRequestRoute = `/friend_request/${profile.id}`;
    
    const sendFriendRequest = async () => {
        setLoading(true);
        await axios.put(`http://localhost:5001/profiles/friend_request_send?requesterId=2&accepterId=${profile.id}`);
        setProfileHasReceivedFriendRequestFromPrincipal(true);   
    };

    return(
        <div className="ProfilePage">
        <button onClick = {() => sendFriendRequest()}>send friend request</button>
        <div className="username">
            <h1>{profile.username}</h1>
        </div>
        <img className="ProfilePicture" src={require("../images/" + profile.username + " Profile Picture.png")}/>
        <div className="section">
        <h3>Friends</h3>
        {friends.map(friend => <FriendOnOtherPage profile={friend}/>)}
        </div>
        <div className="section">
        <h3>Games</h3>
        {profile.gameStatsData.map(gameStats => <GameStats gameStats={gameStats}/>)}
        </div>
    </div>

    )
}

