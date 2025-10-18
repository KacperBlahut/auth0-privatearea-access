const express = require('express');
const app = express();
const axios = require('axios');
const { auth } = require('express-oauth2-jwt-bearer');
const sec = require('express-jwt-permissions')();

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: 'https://www.privatearea-api.com',
  issuerBaseURL: 'https://kacper-blahut.eu.auth0.com/',
  tokenSigningAlg: 'RS256',
  authRequired: false
});

app.use(jwtCheck);

app.use((req, res, next) => {
  req.user = { permissions: req.auth?.payload?.permissions || [] };
  next();
});

app.get('/privatearea', sec.check(['read:privatearea']), async (req, res) => {
  try {
    const userInfo = await axios.get(
      'https://kacper-blahut.eu.auth0.com/userinfo',
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.json(userInfo.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.listen(port, () => {
  console.log('Running on port ', port);
});
