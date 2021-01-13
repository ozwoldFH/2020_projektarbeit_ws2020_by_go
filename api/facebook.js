
import express from "express";
import FB from "fb";
import data from "../src/testData.json";

const router = express.Router();

router.get("/test", (req, res) => {
    res.send({ jsonPreview: data.jsonPreview });
});

router.get("/", (req, res) => {
    res.send("<h1>HELLO WORLD</h1>");
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
    FB.setAccessToken("EAACXT1hub3UBAHSFQeFI78tgIhmxE2NqcmuiWq4sjbPxVig8liQEvcwFEkzkFHw3lZByJnXZBotFuR5a4nvbtnwXoFluAcXqIFOXVyJSa12RSklyuHjSfvrQtozgUkdnfRQMvRZCCF6zaStyChovmuDOf01EeorzCA88KzbVtSzikIHqOM0rzswSXnQFGwChre02mI6sTSRlavUw6GbfZCRqKknmQLGbpX1vwXd1Ba3YTccOC0jXTq9S4SeZA4SYZD");
    //FB.api(FB.getAccessToken().substr(0, FB.getAccessToken().indexOf('|')), { 
    FB.api("me", { 
        fields: ["id", "name", "posts"],
        //access_token: 'EAACXT1hub3UBAMCoEzIK0y1pd58HQwy8dNZBwFlSVZBbkwCPbZCUD3yzeEgSYQwM5qtGuGikZAiZCOuXMF8WB55GSTUUeMAjode0XhuSZA8NpnNZCxhMpLTRhzEZAP2i2ihknCgVX4CZBybNL4GcLl1adjYyHadjqCG1lL2eSCRJMpYhII6AeLISVZAuze6oGwJCKi3lI1bY9cGOW2nzeHmo1zZCMmb0Y82mtS5NO9kFwZCuuaH8xcQv45EggRiCwTxv5zcZD'
    }, function (fb_response) {
        if(!fb_response || fb_response.error) {
            console.log(!fb_response ? "error occurred" : fb_response.error);
            const message = !fb_response ? "error occurred" : fb_response.error;
            res.send({message: message});
        }
        else
        {
            console.log("FB get/posts success! Response: " + JSON.stringify(fb_response));
            res.send({message: fb_response});
        }
    });
});



export default router;

