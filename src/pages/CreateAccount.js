import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {GameBrief} from '../components/GameBrief';
import '../SignIn.css';



export const CreateAccount = () => {

    const logoHeight = 100;
    const logoWidth = 100;

    const [games, setGames] = useState([]);
    const[email, setEmail] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[retypedPassword, setRetypedPassword] = useState('');
    // const { title } = useParams();
    // useEffect(
    //      () => {
    //          const fetchGames = async () => {
    //              const response = await fetch(`http://localhost:5001/games/title_containing/${username}`);
    //              const data = await response.json();
    //              setGames(data);

    //          };
    //          fetchGames();



    //      }, [username]
    //  );
    
    // if(!game || !game.title){
    //     return (
    //         <div>
    //         <img src="sad-face2.png"></img>
    //     <h1>game not found</h1></div>
    //     );
    // }

  return (
    <div className="SignIn">
        <img src={require("../images/vapor-logo.png")} height={logoHeight} width={logoWidth}/>
        <div className="Input">
          <input type="text" placeholder="Email Address" onChange={event => {setEmail(event.target.value)}}/>
        </div>
        <div className="Input">
          <input type="text" placeholder="Username" onChange={event => {setUsername(event.target.value)}}/>
        </div>
        <div className="Input">
          <input type="text" placeholder="Password" onChange={event => {setPassword(event.target.value)}}/> 
        </div>
        <div className="Input">
          <input type="text" placeholder="Re-type password" onChange={event => {setRetypedPassword(event.target.value)}}/>
        </div>
        <div>
          submit
        </div>

    </div>
  );
}