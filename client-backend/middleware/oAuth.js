const axios = require("axios");

const tokenEndpoint = "https://kacper-blahut.eu.auth0.com/oauth/token";

const oAuth = async (req, res, next) => {
  const code = req.query.code;

  if (!code) {
    return res.status(401).send("Authorization Code is Missing");
  }

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", "");
    params.append("client_secret", "");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/privatearea");


    const response = await axios.post(tokenEndpoint, params);

    req.oauth = response.data;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json(`Reason: ${err.message}`);
  }
};

module.exports = oAuth;
