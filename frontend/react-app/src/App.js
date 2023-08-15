import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import { Link, Route, Switch } from 'wouter';
import axios from 'axios'; 

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      axios.get('http://your-api-url/user-data', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  const handleLogin = (userData) => {
    setUserData(userData);
    localStorage.setItem('authToken', 'your-auth-token-value');
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem('authToken');
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      
      <Switch>
        {!userData && <Route path="/" component={() => <LoginPage onLogin={handleLogin} />} />}
        {userData && <Route path="/main" component={() => <MainPage userData={userData} onLogout={handleLogout} />} />}
      </Switch>
    </div>
  );
}

export default App;
