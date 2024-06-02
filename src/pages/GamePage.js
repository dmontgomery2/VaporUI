import {React, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom'
import '../GamePage.css';
import {TrophyComponent} from '../components/TrophyComponent';
import axios from 'axios';


export const GamePage = (activeProfile) => {

    const[profile, setProfile] = useState();
    const[profileOwnsGame, setProfileOwnsGame] = useState(false);
    const[profileHasRatedGame, setProfileHasRatedGame] = useState(false);
    const [rating, setRating] = useState();
    const [minutes, setMinutes] = useState();
    const [game, setGame] = useState({});
    const[loading, setLoading] = useState(true);
    const { title } = useParams();
    const boxArtHeight = 250;
    const boxArtWidth = 250;
    const purchaseRoute = `/purchase/${title}`;
    const rateRoute = `/rate/${title}/${rating}`;
    const playRoute = `/play/${title}/${minutes}`;

    
    
    useEffect(
        () => {
            const fetchData = async () => {
                setLoading(true);
                const response = await fetch(`http://localhost:5001/games/title/${title}`);
                const gameData = await response.json();
                const profileData = (await axios.get("http://localhost:5001/profiles/username/DJgummy94")).data;
                const profileOwnsGameData = (await axios.get(`http://localhost:5001/profiles/username/${profileData.username}/owns_game?gameId=${gameData.id}`)).data;
                const profileHasRatedGameData = (await axios.get(`http://localhost:5001/profiles/has_rated?profileId=${profileData.id}&gameId=${gameData.id}`)).data;
                setGame(gameData);
                setProfile(profileData);
                setProfileOwnsGame(profileOwnsGameData);
                setProfileHasRatedGame(profileHasRatedGameData);
                setLoading(false);
            };
            fetchData();
        }, [title, profileOwnsGame]

        
    );

    

    if(loading){
        return <h1>loading . . .</h1>;
    }
    
    if((!game || !title)){
        return (
            <div>
            <img src={require("../images/sad-face.png")} height={100} width={100}/>
        <h1>game not found</h1></div>
        );
    }

    const rateGame = async () => {
        setLoading(true);
        await axios.put(`http://localhost:5001/games/title/${title}/rate?rating=${rating}&profileId=2`);
        setProfileHasRatedGame(true);
    }


    if(profile){
        if(profileOwnsGame){
            if(profileHasRatedGame){
                return (
                    <div className="GamePage">
                        <p>You own this game.</p>
                        <p>You have already rated this game.</p>
                        <input className="TextBox" type="text" placeholder="Play for . . . minutes" onChange={event => {setMinutes(event.target.value)}}/>
                        <Link to= {playRoute}>submit</Link>
                        <div className="big">
                            <h1 className="title">{title}</h1>
                            <img className="BoxArt" src={require("../images/" + title + " Box Art.png")}/>
                        </div>
                        <div class="stats">
                            <div class="big">
                                <h3>Description</h3>
                                <p>{game.description}</p>
                            </div>

                            <div class="smalls">
                                <div class="small">
                                    <h3>Release Date</h3>
                                    <p>{new Date(game.released).toLocaleDateString("en-US")}</p>
                                </div>
                                <div class="small">
                                    <h3>Rating</h3>
                                    <p>{game.avgRating ? Math.round(10*game.avgRating)/10 : "no ratings yet"}</p>
                                </div>
                            </div>

                            <div class="smalls">
                                <div class="small">
                                    <h3>Developer</h3>
                                    <p>{game.developer}</p>
                                </div>
                                <div class="small">
                                    <h3>Publisher</h3>
                                    <p>{game.publisher}</p>
                                </div>
                            </div>
                            <div class="smalls">
                                <div class="small">
                                    <h3>Price</h3>
                                    <p>{game.price > 0 ? "$" + game.price/100 : "Free to Play"}</p>
                                </div>
                                <div class="small">
                                    <h3>File Size</h3>
                                    <p>{game.fileSize} GB</p>
                                </div>
                            </div>
                        </div>
                        <div class="big">
                            <h3>Genre</h3>
                            <p>{game.genre}</p>
                        </div>
                        <h3 class="all-trophies">All Trophies</h3>
                        {game.trophies.map(t => <TrophyComponent trophy={t} />)}
                
                    </div>
                  );
            }
            return (
                <div className="GamePage">
                    <p>You own this game.</p>
                    <div>
                        <input className="TextBox" type="text" placeholder="Rate . . ." onChange={event => {setRating(event.target.value)}}/>
                        <button className="linkButton" onClick = {() => rateGame()}>submit</button>
                    </div>
                    <div>
                        <input className="TextBox" type="text" placeholder="Play for . . . minutes" onChange={event => {setMinutes(event.target.value)}}/>
                        <Link to= {playRoute}>submit</Link>
                    </div>
                    <div className="big">
                            <h1 className="title">{title}</h1>
                            <img className="BoxArt" src={require("../images/" + title + " Box Art.png")}/>
                        </div>
                        <div class="stats">
                            <div class="big">
                                <h3>Description</h3>
                                <p>{game.description}</p>
                            </div>

                            <div class="smalls">
                                <div class="small">
                                    <h3>Release Date</h3>
                                    <p>{new Date(game.released).toLocaleDateString("en-US")}</p>
                                </div>
                                <div class="small">
                                    <h3>Rating</h3>
                                    <p>{game.avgRating ? Math.round(10*game.avgRating)/10 : "no ratings yet"}</p>
                                </div>
                            </div>

                            <div class="smalls">
                                <div class="small">
                                    <h3>Developer</h3>
                                    <p>{game.developer}</p>
                                </div>
                                <div class="small">
                                    <h3>Publisher</h3>
                                    <p>{game.publisher}</p>
                                </div>
                            </div>
                            <div class="smalls">
                                <div class="small">
                                    <h3>Price</h3>
                                    <p>{game.price > 0 ? "$" + game.price/100 : "Free to Play"}</p>
                                </div>
                                <div class="small">
                                    <h3>File Size</h3>
                                    <p>{game.fileSize} GB</p>
                                </div>
                            </div>
                        </div>
                        <div class="big">
                            <h3>Genre</h3>
                            <p>{game.genre}</p>
                        </div>
                        <h3 class="all-trophies">All Trophies</h3>
                        {game.trophies.map(t => <TrophyComponent trophy={t} />)}
                
                    </div>
            

              );
        }

        const purchaseGame = async () => {
            setLoading(true);
            await axios.post(`http://localhost:5001/game_stats/purchase?gameId=${game.id}&profileId=2`);
            setProfileOwnsGame(true);       
        };

        return (
            <div className="GamePage">
                {/* <Link to= {purchaseRoute}>purchase</Link> */}
                <button onClick = {() => purchaseGame()}>purchase</button>
                <div className="big">
                            <h1 className="title">{title}</h1>
                            <img className="BoxArt" src={require("../images/" + title + " Box Art.png")}/>
                        </div>
                        <div class="stats">
                            <div class="big">
                                <h3>Description</h3>
                                <p>{game.description}</p>
                            </div>

                            <div class="smalls">
                                <div class="small">
                                    <h3>Release Date</h3>
                                    <p>{new Date(game.released).toLocaleDateString("en-US")}</p>
                                </div>
                                <div class="small">
                                    <h3>Rating</h3>
                                    <p>{game.avgRating ? Math.round(10*game.avgRating)/10 : "no ratings yet"}</p>
                                </div>
                            </div>

                            <div class="smalls">
                                <div class="small">
                                    <h3>Developer</h3>
                                    <p>{game.developer}</p>
                                </div>
                                <div class="small">
                                    <h3>Publisher</h3>
                                    <p>{game.publisher}</p>
                                </div>
                            </div>
                            <div class="smalls">
                                <div class="small">
                                    <h3>Price</h3>
                                    <p>{game.price > 0 ? "$" + game.price/100 : "Free to Play"}</p>
                                </div>
                                <div class="small">
                                    <h3>File Size</h3>
                                    <p>{game.fileSize} GB</p>
                                </div>
                            </div>
                        </div>
                        <div class="big">
                            <h3>Genre</h3>
                            <p>{game.genre}</p>
                        </div>
                        <h3 class="all-trophies">All Trophies</h3>
                        {game.trophies.map(t => <TrophyComponent trophy={t} />)}
                
                    </div>
        

          );
    }

    

  return (
    <div className="GamePage">
        <div className="big">
                            <h1 className="title">{title}</h1>
                            <img className="BoxArt" src={require("../images/" + title + " Box Art.png")}/>
                        </div>
                        <div class="stats">
                            <div class="big">
                                <h3>Description</h3>
                                <p>{game.description}</p>
                            </div>

                            <div class="smalls">
                                <div class="small">
                                    <h3>Release Date</h3>
                                    <p>{new Date(game.released).toLocaleDateString("en-US")}</p>
                                </div>
                                <div class="small">
                                    <h3>Rating</h3>
                                    <p>{game.avgRating ? Math.round(10*game.avgRating)/10 : "no ratings yet"}</p>
                                </div>
                            </div>

                            <div class="smalls">
                                <div class="small">
                                    <h3>Developer</h3>
                                    <p>{game.developer}</p>
                                </div>
                                <div class="small">
                                    <h3>Publisher</h3>
                                    <p>{game.publisher}</p>
                                </div>
                            </div>
                            <div class="smalls">
                                <div class="small">
                                    <h3>Price</h3>
                                    <p>{game.price > 0 ? "$" + game.price/100 : "Free to Play"}</p>
                                </div>
                                <div class="small">
                                    <h3>File Size</h3>
                                    <p>{game.fileSize} GB</p>
                                </div>
                            </div>
                        </div>
                        <div class="big">
                            <h3>Genre</h3>
                            <p>{game.genre}</p>
                        </div>
                        <h3 class="all-trophies">All Trophies</h3>
                        {game.trophies.map(t => <TrophyComponent trophy={t} />)}
                
                    </div>

  );
}
