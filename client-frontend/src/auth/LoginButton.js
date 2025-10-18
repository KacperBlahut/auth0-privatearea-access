import React from "react";

const LoginButton = () => {
  const login = () => {
    const domain = "kacper-blahut.eu.auth0.com";
    const audience = "https://www.privatearea-api.com";
    const scope = "openid profile email read:privatearea write:privatearea";
    const clientId = "tmT4BNcfk8fpvDr81DedZzpEdullhEkm";
    const responseType = "code";
    const redirectUri = "http://localhost:3000/privatearea";


    const authUrl = `https://${domain}/authorize?` +
      `audience=${audience}&` +
      `scope=${scope}&` +
      `response_type=${responseType}&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}`

    window.location.href = authUrl;
  };

  return (
    <button className="Login-button" onClick={login}>
      Log In
    </button>
  );
};

export default LoginButton;
