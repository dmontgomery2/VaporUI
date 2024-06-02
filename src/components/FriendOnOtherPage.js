import {React} from 'react'
import {Link} from 'react-router-dom'
import '../ProfileBrief.css'

export const FriendOnOtherPage = ({profile}) => {

    const profileRoute = `/profiles/${profile.username}`;
    const profilePictureHeight=50;
    const profilePictureWidth=50;
  return (
    <div className="Card">
        <Link to= {profileRoute}>{profile.username}</Link>
        <div className="ProfilePictureDiv">
        <img className="ProfilePictureBrief" src={require("../images/" + profile.username + " Profile Picture.png")} />
        </div>
    </div>
  );
}