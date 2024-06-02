import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {ProfileBrief} from '../components/ProfileBrief';
import '../ProfileSearch.css';
import {ProfileList} from '../components/ProfileList';
import {Pagination} from '../components/Pagination';



export const ProfileSearch = () => {

    const [profiles, setProfiles] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');
    const[loading, setLoading] = useState(false);
    const[currentPage, setCurrentPage] = useState(1);
    const[profilesPerPage] = useState(6);
    // const { title } = useParams();
    useEffect(
         () => {
             const fetchProfiles = async () => {
                 setLoading(true);
                 const response = await fetch(`http://localhost:5001/profiles/username_containing/${searchTerm}`);
                 const data = await response.json();
                 setProfiles(data);
                 setLoading(false);
             };
             fetchProfiles();



         }, [searchTerm]
     );
    
    // if(!game || !game.title){
    //     return (
    //         <div>
    //         <img src="sad-face2.png"></img>
    //     <h1>game not found</h1></div>
    //     );
    // }

//Get current profiles
const indexOfLastProfile = currentPage * profilesPerPage;
const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

//Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ProfileSearch">
        <div className="searchBar">
        <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
        </div>
        <Pagination itemsPerPage={profilesPerPage} totalItems={profiles.length} paginate={paginate} currentPage={currentPage}/>
        <div className="GamesSearched">
        <ProfileList profiles={currentProfiles} loading={loading}/>
        </div>
        
    </div>
  );
}