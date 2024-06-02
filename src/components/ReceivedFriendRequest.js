import {React} from 'react'
import {Link} from 'react-router-dom'
import '../ProfileBrief.css'

export const ReceivedFriendRequest = ({profile}) => {

    const profileRoute = `/profiles/${profile.username}`;
    const acceptRoute = `/accept_friend_request/${profile.id}`;
    const rejectRoute = `/reject_friend_request/${profile.id}`;
    const profilePictureHeight=50;
    const profilePictureWidth=50;
  return (
    <div className="Card">
        <Link to= {profileRoute}>{profile.username}</Link>
        <div className="ProfilePictureDiv">
        <img className="ProfilePictureBrief" src={require("../images/" + profile.username + " Profile Picture.png")} />
        </div>
        <div className="CardDetail">
          <div>
            <Link to= {acceptRoute}>accept</Link>
          </div>
          <div>
            <Link to= {rejectRoute}>reject</Link>
          </div>
        </div>
    </div>
  );
}