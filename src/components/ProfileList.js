import {React} from 'react'
import {Link} from 'react-router-dom'
import {ProfileBrief} from './ProfileBrief'

export const ProfileList = ({profiles, loading}) => {
    if(loading){
        return <h2>loading . . .</h2>
    }
    return profiles.map(profile => <ProfileBrief profile={profile}/>);
}