import React from 'react';
import CreateRoomForm from './CreateRoomForm';
import { Link, Route, Switch } from 'wouter';
import ChatRoomPage from './ChatRoomPage';

function MainPage({ userData, onLogout }) {
  return (
    <div>
      <h2>Welcome, {userData?.name || 'User'}!</h2>
      <img src={userData?.photo_url} alt="User" />
      <p>Email: {userData?.email}</p>
      <button onClick={onLogout}>Logout</button>

     
      <Link href="/create-room">Create Room</Link>

     
      <Switch>
       
        <Route path="/create-room">
      
         
          <CreateRoomForm />
        </Route>
        <Route path="/chat/:roomName" component={ChatRoomPage} />
        
        
        
      </Switch>
    </div>
  );
}

export default MainPage;
