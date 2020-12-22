import express from "express";
import FB from "fb";
import mysql from "mysql";


const app = express();
const port = 8900;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// login register

const db = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "projektarbeitws2020bygo"
});


app.post("/user/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "INSERT INTO user (username, password) VALUES (?, ?)",
        [username, password],
        (err, result) => {
            console.log(err);
        }
    );
});

app.post("/user/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM user WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if(result.length > 0) {
                res.send(result);
            }
            else {
                res.send({message: "Wrong username/password!"});
            }
        }
    );
});

app.get("/", (req, res) => {
    res.send("<h1>HELLO WORLD</h1>");
});

// login register END

// facebook 

// login for API key
app.post("/fb/login", (req, res) => {
    const client_id = req.body.client_id;
    const client_secret = req.body.client_secret;
    console.log(req.body);

    FB.api('oauth/access_token', {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'client_credentials'
    }, function (fb_response) {
        if(!fb_response || fb_response.error) {
            console.log(!fb_response ? 'error occurred' : fb_response.error);
            const message = !fb_response ? 'error occurred' : fb_response.error
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

// login for API key
app.post("/fb/token", (req, res) => {
    const client_id = req.body.client_id;
    const client_secret = req.body.client_secret;
    console.log(req.body);

    FB.api('oauth/access_token', {
        grant_type: 'fb_exchange_token',
        client_id: client_id,
        client_secret: client_secret,
        fb_exchange_token: FB.getAccessToken()
    }, function (fb_response) {
        if(!fb_response || fb_response.error) {
            console.log(!fb_response ? 'error occurred' : fb_response.error);
            const message = !fb_response ? 'error occurred' : fb_response.error
            res.send({message: message});
        }
        else
        {
            console.log("FB login success! Response: " + fb_response.access_token);
            FB.setAccessToken(fb_response.access_token);
            res.send({accessToken: fb_response.access_token});
        }
    });
});

//get fb id
app.get("/fb/get/fb_id", (req, res) => {
    console.log(FB.getAccessToken());

    FB.api(FB.getAccessToken().substr(0, FB.getAccessToken().indexOf('|')), { 
        fields: ['id', 'name'],
    }, function (fb_response) {
        if(!fb_response || fb_response.error) {
            console.log(!fb_response ? 'error occurred' : fb_response.error);
            const message = !fb_response ? 'error occurred' : fb_response.error
            res.send({message: message});
        }
        else
        {
            console.log("FB get/fb_id success! Response: " + JSON.stringify(fb_response));
            res.send({message: fb_response});
        }
    });
});


// get posts
app.get("/fb/get/posts", (req, res) => {
    console.log(FB.getAccessToken());
    FB.setAccessToken('EAACXT1hub3UBADu23jSdbL62WBFGFXbBOWEnKoBfVSBU7jWo4NPYUnmkLDkwQQhgA9q8DtX1CPCKDlDTIlbJB0vi4oXZB8YF4DsK57lpEi6CeMVEvtQBQxWV3mXZBgUBWbZBrHC9xa02uE7mZCXedi7r00xhOLkirdg3xedT2BXjQRTXmZC57tALfl4ecdJDvCC9UmsHfytG4Se54aDyhIoxqp850cMXJgOXvi3OaF1gugZBjUnTHC61HUjDGUSBIZD');
    //FB.api(FB.getAccessToken().substr(0, FB.getAccessToken().indexOf('|')), { 
    FB.api('me', { 
        fields: ['id', 'name', 'posts'],
        //access_token: 'EAACXT1hub3UBAMCoEzIK0y1pd58HQwy8dNZBwFlSVZBbkwCPbZCUD3yzeEgSYQwM5qtGuGikZAiZCOuXMF8WB55GSTUUeMAjode0XhuSZA8NpnNZCxhMpLTRhzEZAP2i2ihknCgVX4CZBybNL4GcLl1adjYyHadjqCG1lL2eSCRJMpYhII6AeLISVZAuze6oGwJCKi3lI1bY9cGOW2nzeHmo1zZCMmb0Y82mtS5NO9kFwZCuuaH8xcQv45EggRiCwTxv5zcZD'
    }, function (fb_response) {
        if(!fb_response || fb_response.error) {
            console.log(!fb_response ? 'error occurred' : fb_response.error);
            const message = !fb_response ? 'error occurred' : fb_response.error
            res.send({message: message});
        }
        else
        {
            console.log("FB get/posts success! Response: " + JSON.stringify(fb_response));
            res.send({message: fb_response});
        }
    });
});


// facebook END



// below are some examples


// app.get("/fb/login", (req, res) => {
//     FB.api('oauth/access_token', {
//         client_id: '166367041843061',
//         client_secret: '1fe3b63fd36396474fe37f0ae7626c8f',
//         grant_type: 'client_credentials'
//     }, function (res) {
//         if(!res || res.error) {
//             console.log(!res ? 'error occurred' : res.error);
//             return;
//         }
     
//         var accessToken = res.access_token;
//         FB.setAccessToken(accessToken);
//         return JSON.stringify(accessToken);
//     });
// });

// app.get("/fb/posts", (req, res) => {
//     FB.api('109130191021929', { fields: ['id', 'name'] }, function (res) {
//         if(!res || res.error) {
//           console.log(!res ? 'error occurred' : res.error);
//           return;
//         }
        
//         return JSON.stringify(res);
//       });
// });






app.listen(port, () => console.log("Server started and listening on port " + port));