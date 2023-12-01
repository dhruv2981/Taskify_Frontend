import "./../assets/css/oauth.css";
import React from 'react';


const signinButton = (): void => {
    window.location.replace(
      "https://channeli.in/oauth/authorise/?client_id=vHvA7kB4GedavN5kSfWRIjvFg1geQQDkJss21yBv&redirect_uri=http://127.0.0.1:8000/taskify/oauth/callback/&state=success"
    );
    
    // redirect(f'http://localhost:3000/oauth/jump/?token={token.key}')
};

const Oauth: React.FC = () => {


  return (
    <div className="page">
      <div className="oauth_box">
        <img
          src={require("./../assets/images/taskify-low-resolution-logo-black-on-white-background (1).png" )}
          alt=''
          className="taskify"
        />
        <button className="button" onClick={signinButton} type="submit">
            <img src={require('./../assets/images/channeli_image.jpeg')} alt='' className="channeli"/>
            <p>Sign in with Channeli</p>
        </button>
      </div>
    </div>
  );
};
export default Oauth;
