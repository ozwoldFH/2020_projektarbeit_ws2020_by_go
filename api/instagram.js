
import express from "express";
import axios from "axios";
import config from "./../ENVIRONMENT/config.json";
import querystring from "querystring";
import { subtract } from "mathjs"
import testData from "../src/instagramTestData.json";


const router = express.Router();
var apiKey = "";
var code = "";
var userId = "0";
router.use(express.json());


// api post -> get posts -> achtung bug! user_id immer -1 abziehen

// https://api.instagram.com/oauth/authorize
//   ?client_id={app-id}
//   &redirect_uri={redirect-uri}
//   &scope=user_profile,user_media
//   &response_type=code

router.get("/", (req, res) => {
    res.send("<h1>HELLO WORLD by instagram</h1>");
});

router.get("/get/authentificationURL", (req, res) => {
    const app_id = config.instagram_app_id;
    res.send("https://api.instagram.com/oauth/authorize?client_id="+app_id+"&redirect_uri=https://localhost:8900/instagram/post/access_token&scope=user_profile,user_media&response_type=code");
});

router.get("/post/access_token", (req, res) => {
    console.log("my code insta auth:", req.query.code);
    code = req.query.code;
    res.json({status: "App wurde erfolgreich authentifiziert. Bitte mit dem anderen Button die Posts laden."});
});

//curl -X POST \ https://api.instagram.com/oauth/access_token \ -F client_id={app-id} \ -F client_secret={app-secret} \ -F grant_type=authorization_code \ -F redirect_uri={redirect-uri} \ -F code={code}

router.get("/post/setKey", (req, res) => {
    const app_id = config.instagram_app_id;
    const secret_code = config.instagram_secret_code;
    const code = config.instagram_auth_code;
    //Make Object with params
    const data = {
        client_id: app_id, 
        client_secret: secret_code,
        grant_type: "authorization_code", 
        redirect_uri: "https://localhost:8900/instagram/post/access_token",
        code: code
    };

    axios.post("https://api.instagram.com/oauth/access_token", querystring.stringify(data))
        .then(response => {
            //console.log("response insta:", response.data);
            apiKey = response.data.access_token;
            var number = parseInt((+response.data.user_id), 10);
            var new_number = (parseInt(number,10)-parseInt(1,10))-1.9;
            var new_number2 = subtract(number, 1);
            userId = response.data.user_id;
            console.log("my user id:", userId);
            console.log("my user id:", new_number);
            console.log("my user id:", new_number2);
            console.log("el psy congro", (10-1));
            res.send("Access_token successfuly retrieved.");

            

        })
        .catch(console.error);
});

router.get("/get/posts", (req, res) => {
    axios.get("https://graph.instagram.com/"+userId+"/media?fields=id,username,media_type,media_url,timestamp,caption&access_token="+apiKey)
        .then(response => {
            console.log("insta posts:", response.data);
            res.send("some posts retrieved!");
        })
        .catch(console.error);
});

router.get("/get/postsDEV", (req, res) => {
    const apiKey_dev = config.instagram_access_token;
    const userId_dev = "17841444487498203";
    
    res.send(testData);
    // axios.get("https://graph.instagram.com/"+userId_dev+"/media?fields=id,username,media_type,media_url,timestamp,caption&access_token="+apiKey_dev)
    //     .then(response => {
    //         //console.log("insta posts:", response.data);
    //         res.send(response.data);
    //     })
    //     .catch(console.error);
});

// todo -> mit access_token und user_id -> posts holen -> eigener API
// auf App.js React Posts machen

export default router;

