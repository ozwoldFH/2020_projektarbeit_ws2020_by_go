
import express from "express";
import FB from "fb";
import data from "../src/testData.json";
import axios from "axios";
import config from "./../ENVIRONMENT/config.json";

const router = express.Router();
var apiKey = "";
router.use(express.json());



router.get("/test", (req, res) => {
    res.send({ jsonPreview: data.jsonPreview });
});

router.get("/", (req, res) => {
    res.send("<h1>HELLO WORLD</h1>");
});

router.post("/post/setKey", (req, res) => {
    // console.log("req:" + JSON.stringify(req.body));
    // console.log("res:" + res);
    //console.log("req:" + JSON.stringify(req));
    var message = "New key was set successfully.";
    if (apiKey == null || apiKey == "" ) {
        console.log("Key was not set - added new key: " + req.body.data.accessToken);
        apiKey =  req.body.data.accessToken;
    } 
    else {
        // todo - just overwrite key
        if(apiKey == req.body.data.accessToken) {
            message = "Key is still valid.";
        }
        apiKey =  req.body.data.accessToken;
    }
    res.json({status: message});
});

//  check if valid
// get posts
router.get("/get/checkKey", (req, res) => {
    if (apiKey == null || apiKey == "" ) {
        res.send({message: "Key is not valid anymore.", is_valid : false});
        return;
    } 
    const app_id = config.app_id;
    const app_secret = config.app_secret;
    axios.get("https://graph.facebook.com/debug_token?input_token="+apiKey+"&access_token="+app_id+"|"+app_secret)
        .then(response => {
            //console.log("/get/checkKey response: " + JSON.stringify(response.data));
            if(response.data.data.is_valid == true) {
                res.send({message: "Key is still valid.", is_valid : true});
            }
            else {
                res.send({message: "Key is not valid anymore.", is_valid : false});
            }
        })
        .catch(console.error);
});

// facebook 

// login for API key
router.post("/login", (req, res) => {
    const client_id = req.body.client_id;
    const client_secret = req.body.client_secret;
    console.log(req.body);

    FB.api("oauth/access_token", {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: "client_credentials"
    }, function (fb_response) {
        if(!fb_response || fb_response.error) {
            console.log(!fb_response ? "error occurred" : fb_response.error);
            const message = !fb_response ? "error occurred" : fb_response.error;
            res.send({message: message});
        }
        else
        {
            console.log("FB login success! Response: " + fb_response.access_token);
        }
        FB.setAccessToken(fb_response.access_token);
        res.send({accessToken: fb_response.access_token});
    });
});

// get posts
router.get("/get/posts", (req, res) => {
    console.log(FB.getAccessToken());
    //FB.setAccessToken("EAACXT1hub3UBADf7ZBSj2uiiisCBS7ISb1xmZAdnZCv171kQw1a3i1nZBln2wC64sZCSHVOye9LhTdl9dbTmC6GVM1zLbbONp1sTZC98fPgZAzPrZBBIB76ZBpbRJjKFkpzqJNgYKgcMQ8M07EzL4OJGO5kPSjJhQwTMFzm5FZBiGvw7rdKhkzoreH89bqej06RH3HB8EbSlk5iiYtvjFYD7LQ");
    FB.setAccessToken(apiKey);
    //FB.api(FB.getAccessToken().substr(0, FB.getAccessToken().indexOf('|')), { 
    FB.api("me", { 
        //fields: ["id", "name", "posts", "created_time", "picture", "reactions", "description", "message", "comments"],
        fields: "id,name,posts{created_time,full_picture,reactions,description,message,comments{id,message,comments,created_time,reactions},picture}",
        //access_token: 'EAACXT1hub3UBAMCoEzIK0y1pd58HQwy8dNZBwFlSVZBbkwCPbZCUD3yzeEgSYQwM5qtGuGikZAiZCOuXMF8WB55GSTUUeMAjode0XhuSZA8NpnNZCxhMpLTRhzEZAP2i2ihknCgVX4CZBybNL4GcLl1adjYyHadjqCG1lL2eSCRJMpYhII6AeLISVZAuze6oGwJCKi3lI1bY9cGOW2nzeHmo1zZCMmb0Y82mtS5NO9kFwZCuuaH8xcQv45EggRiCwTxv5zcZD'
    }, function (fb_response) {
        if(!fb_response || fb_response.error) {
            //console.log(!fb_response ? "error occurred" : fb_response.error);
            const message = !fb_response ? "error occurred" : fb_response.error;
            res.send({message: message});
        }
        else
        {
            //console.log("FB get/posts success! Response: " + JSON.stringify(fb_response));
            res.send({message: fb_response});
        }
    });
});



export default router;

