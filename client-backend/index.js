var express = require("express");
var axios = require("axios");
var cors = require("cors"); 
var port = process.env.PORT || 3001;
var oAuth = require("./middleware/oAuth");
var app = express();

const privateareaAPIEndpoint = "http://localhost:8080/privatearea";

app.use(cors()); 
app.use(oAuth);

app.get("/privatearea", async (req, res) => {  
  try {
    const { access_token } = req.oauth;

    const response = await axios({
      method: "get",
      url: privateareaAPIEndpoint,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    res.json(response.data);
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      res.status(401).json("Unauthorized — access denied");
    } else if (error.response.status === 403) {
      res.status(403).json("Forbidden — insufficient permissions");
    } else {
      res.status(500).json("Internal Server Error");
    }
  }
});
//dodane
app.get("/userinfo-full", async (req, res) => {
  try {
    const { access_token } = req.oauth;

    const response = await axios.get(
      "https://kacper-blahut.eu.auth0.com/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error fetching user info from Auth0");
  }
});


app.listen(port, () => console.log("Started"));


