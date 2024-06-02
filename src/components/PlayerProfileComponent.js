import React from 'react';
import PlayerProfileService from '../services/PlayerProfileService';

class PlayerProfileComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            profiles:[]
        }
    }




    componentDidMount(){
        PlayerProfileService.getProfiles().then((response) => {
            this.setState({ profiles: response.data})
        });
    }

    getByUsername(username){
        PlayerProfileService.getProfileByUsername(username).then((response) => {
            this.setState({ profiles: response.data})
        });
    }

    back(){
        this.componentDidMount();
    }

    render (){
        return (
            <div>
                <h1 className = "text-center"> Profiles</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Username</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.profiles.map(
                                profile =>
                                <tr key = {profile.id}>
                                    <td>{profile.username}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        )
    }
}

export default PlayerProfileComponent