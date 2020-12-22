// client/app id: 166367041843061
// client code: 1fe3b63fd36396474fe37f0ae7626c8f
//curl -X GET "https://graph.facebook.com/oauth/access_token?client_id={166367041843061}&client_secret={1fe3b63fd36396474fe37f0ae7626c8f}&grant_type=client_credentials" 

var FB = require('fb').default;
const { timeStamp } = require('console');
var http = require('http');
Step = require('step');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);




function one() {
    Step(
        function getDeveloperAccessToken() {
            FB.napi('oauth/access_token', {
                client_id: '166367041843061',
                client_secret: '1fe3b63fd36396474fe37f0ae7626c8f',
                grant_type: 'client_credentials'
            }, this);
        },
        function (err, result) {
            if(err) {
                console.log(err);   
                return;
            } 
            var accessToken = result.access_token;
            console.log("accessToken:" + accessToken);
            FB.setAccessToken(accessToken);
        }
    );
    return;
}

function two() {
    
    Step(
        function checkPostsFromMe() {
            console.log("my current token: " + FB.getAccessToken());
            FB.napi('109130191021929', { 
                fields: ['id', 'name', 'posts{id,message}'],
                access_token: 'EAACXT1hub3UBALb2ZB6eZBSfDMtrZBr8HiT1vDcnFBFnsq7maC0s2lkkZAAh9na8zZBkmrCxIzLwmwsxz4zBZBrFTXfCkn6claliQsLZBimaB3QgVgrpPxrYzjK9jEWvSFnx37Qr57UeuhGnjrZAkxTZBDDxH1VmaFiXVy0DroWurZAK6LsplHML3L59tGZAXyrQRdCerZBbTe7ZCe5lcwqeiTG9mk3EsVtTNokKvtrajo7UngLqPVcZADmb4jZA5OT2bA5kxoZD'
            }, this);
        },
        function (err, result) {
            if(err) {
                console.log(err);   
                return;
            }
            console.log(JSON.stringify(result));
        }
    );
}
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

async function mine() {
    one();
    await sleep(1000);
    two();
}
mine();