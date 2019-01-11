const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/pricecheck", function(req, res){
    var symbol = req.body.crypto;
    var currency = req.body.currency;
    var baseurl = 'https://apiv2.bitcoinaverage.com/indices/';
    var symbolurl = 'global/ticker/' + symbol;
    var finalurl = baseurl+symbolurl+currency;

    request(finalurl, function (error, response, body) {

    var pricecheck = JSON.parse(body);

     res.send('<h1> Current price of ' + symbol + ' is ' + pricecheck.ask + currency + '  </h1>');

    });
});

app.post("/historicalprice", function (req, res){
    
    console.log(req.body);
    var symbol = req.body.cryptoHistorical;
    var currency = req.body.currencyHistorical;
    var finalurl = `https://apiv2.bitcoinaverage.com/indices/global/history/${symbol+currency}?period=daily&format=csv`
    request(finalurl, function(error, response, body){
        var historicalprice = body;
        console.log(historicalprice);
        res.send('Historical prices were</br>:' + historicalprice);
    });
});


app.listen(3000, function(req, res){
    console.log("Server running on port 3000.");
});
