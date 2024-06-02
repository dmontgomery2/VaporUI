import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {GameBrief} from '../components/GameBrief';
import {GameList} from '../components/GameList';
import '../GameSearch.css';
import {Pagination} from '../components/Pagination';



export const GameSearch = () => {

    const [games, setGames] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');
    const[loading, setLoading] = useState(false);
    const[currentPage, setCurrentPage] = useState(1);
    const[gamesPerPage] = useState(6);
    // const { title } = useParams();
    useEffect(
         () => {
             setCurrentPage(1);
             const fetchGames = async () => {
                 setLoading(true);
                 const response = await fetch(`http://localhost:5001/games/title_containing/${searchTerm}`);
                 const data = await response.json();
                 setGames(data);
                 setLoading(false);
             };
             fetchGames();



         }, [searchTerm]
     );
    
    // if(!game || !game.title){
    //     return (
    //         <div>
    //         <img src="sad-face2.png"></img>
    //     <h1>game not found</h1></div>
    //     );
    // }


//Get current games
const indexOfLastGame = currentPage * gamesPerPage;
const indexOfFirstGame = indexOfLastGame - gamesPerPage;
const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

//Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="GameSearch">
        <div className="searchBar">
        <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
        </div>
        <Pagination itemsPerPage={gamesPerPage} totalItems={games.length} paginate={paginate} currentPage={currentPage}/>
        <div className="GamesSearched">
        <GameList games={currentGames} loading={loading}/>
        </div>  
    </div>
  );
}