import {React, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom'
import {ProfileBrief} from '../components/ProfileBrief';
import {GameBrief} from '../components/GameBrief';
import '../Home.css';



export const Home = (activeProfile) => {
    const logoHeight = 100;
    const logoWidth = 100;

  return (
  <div>
    <div className="HomeHeader">
      <h1>Welcome, {activeProfile.name}</h1>
      <div className="vapor-logo">
        <img src={require("../images/vapor-logo.png")} height={logoHeight} width={logoWidth}/>
      </div>
    </div>
  <div className="HomeCards">
    <div className="Card">
      <Link to= "/search_games">Search Games</Link>
      <div className="CardDetail">
      <p>Browse our huge library of games</p>
      </div>
    </div>
    <div className="Card">
      <Link to="/search_profiles">Search Profiles</Link>
      <div className="CardDetail">
        <p>Find other Vapor users from around the world</p>
      </div>
    </div>
      
      <div className="Card">
        <Link to="/profiles/DJgummy94"> My Profile </Link>
        <div className="CardDetail">
          <p>View your profile</p>
        </div>
      </div>
    </div>
  </div>
  );
}
