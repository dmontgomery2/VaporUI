import {React} from 'react'
import {Link} from 'react-router-dom'
import '../ProfileBrief.css'

export const FriendOnPrincipalPage = ({profile}) => {

    const profileRoute = `/profiles/${profile.username}`;
    const removeRoute = `/remove_friend/${profile.id}`;
    const profilePictureHeight=50;
    const profilePictureWidth=50;
  return (
    <div className="Card">
        <Link to= {profileRoute}>{profile.username}</Link>
        <div className="ProfilePictureDiv">
        <img className="ProfilePictureBrief" src={require("../images/" + profile.username + " Profile Picture.png")} />
        </div>
        <div className="CardDetail">
        <Link to= {removeRoute}>remove</Link>
        </div>
    </div>
  );
}