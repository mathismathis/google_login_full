import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie'; 

function LoginPage({ onLogin }) {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        credential: credentialResponse.credential,
      });

      if (response.data.success) {
        const userData = response.data.user;
        Cookies.set('authToken', JSON.stringify(userData.session_data));

        const sessionData = Cookies.get('authToken');
        if (sessionData) {
          console.log('Retrieved Session Data:', JSON.parse(sessionData));
        }
        

        console.log("Data to store:", userData.session_data);
        localStorage.setItem("sessionData", JSON.stringify(userData.session_data));

        const retrievedData = JSON.parse(localStorage.getItem('sessionData'));
        console.log("Retrieved data:", retrievedData);

        onLogin(userData);
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <div>
      <h2>Please log in with Google to continue.</h2>
      <GoogleOAuthProvider clientId="111384383770-av06vjnjgop0niagg3cchtqmu77asrlq.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default LoginPage;
