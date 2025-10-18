import React from "react";

const LogoutButton = () => {
  const logout = () => {
    const domain = "kacper-blahut.eu.auth0.com";
    const clientId = "tmT4BNcfk8fpvDr81DedZzpEdullhEkm";
    const returnTo = "http://localhost:3000";

    window.location.href =
      `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;
  };

  return (
    <button className="Login-button" onClick={logout}>
      Log out
    </button>
  );
};

export default LogoutButton;
