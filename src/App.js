import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ProfilePage} from './pages/ProfilePage';
import {ProfileSearch} from './pages/ProfileSearch';
import {GamePage} from './pages/GamePage';
import{GameSearch} from './pages/GameSearch';
import{Home} from './pages/Home';
import{SignIn} from './pages/SignIn';
import{CreateAccount} from './pages/CreateAccount';
import { TrophyCollectionPage } from './pages/TrophyCollectionPage';
import { ThankYouForPurchase } from './pages/ThankYouForPurchase';
import {TrophyEarned} from './pages/TrophyEarned';
import {GamePlayed} from './pages/GamePlayed';
import {GameRated} from './pages/GameRated';
import {FriendRequestSent} from './pages/FriendRequestSent';
import {FriendRemoved} from './pages/FriendRemoved';
import {FriendRequestAccepted} from './pages/FriendRequestAccepted';
import {FriendRequestRejected} from './pages/FriendRequestRejected';
import {FriendRequestWithdrawn} from './pages/FriendRequestWithdrawn';



function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/purchase/:title" element={<ThankYouForPurchase/>}/>
        <Route path="/friend_request/:accepterId" element={<FriendRequestSent/>}/>
        <Route path="/remove_friend/:passiveRemoverId" element={<FriendRemoved/>}/>
        <Route path="/accept_friend_request/:requesterId" element={<FriendRequestAccepted/>}/>
        <Route path="/reject_friend_request/:requesterId" element={<FriendRequestRejected/>}/>
        <Route path="/withdraw_friend_request/:accepterId" element={<FriendRequestWithdrawn/>}/>
        <Route path="play/:title/:minutes" element={<GamePlayed/>}/>
        <Route path="rate/:title/:rating" element={<GameRated/>}/>
        <Route path="/earn_trophy/:trophyId" element={<TrophyEarned/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/search_games" element={<GameSearch />}/>
        <Route path="/search_profiles" element={<ProfileSearch />}/>
        <Route path="/profiles/:username" element={<ProfilePage />}/>     
        <Route path="/profiles/:username/trophies/:gameTitle" element={<TrophyCollectionPage />}/>
        <Route path="/games/:title" element={<GamePage />}/>
        <Route path="/sign_in" element={<SignIn />}/>
        <Route path="/create_account" element={<CreateAccount />}/>
        </Routes>   
      </Router>
    </div>
  );
}

export default App;
