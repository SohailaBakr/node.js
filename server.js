
//create a server with node.js and express
//Express makes it very easy to create and run a web server with Node.


const express = require('express');   //requre express after installing in console ** npm install --save express 
const app = express()                //create an instance of express
const bodyParser = require('body-parser');//it require the body-pareser middleware function in express
                                          //the body-parse function can access the req-body(request body) object
                                          //in this case we will be able to access the city name 
                                          //since req has info about the http request
const request = require('request');
const apikey = '247f495dfec568ed657b36e50d798b54';

app.set('view engine', 'ejs')        //set a tempelate engine to use ejs files. //consider ejs files as html files 
app.use(express.static('public'));   //express won't allow to access the css file by default so we need to expose this                                          line that allows us to access all the static files in the public folder.
app.use(bodyParser.urlencoded({ extended: true }));

//what is req and res that will show up in the following lines? 
//req => request, res => responce and you can rename them in the code with name 
//req is an object containing information about the HTTP request that raised the event
//In response to req, you use res to send back the desired HTTP response.

app.get('/', function (req, res) {   //app.get gets the .ejs file and render it for us                                                                          localhost:3000 you will see a hello worls page
  //res.render('index');            //before api
    res.render('index', {weather: null, error: null});  //after api
})


app.post('/', function (req, res) {   //a post rout to send the client data(the form date) to the server
  let city = req.body.city;           //request the city and save it 
    console.log(apikey)
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}` //conn/acc to API
  //make the api call
  request(url, function (err, response, body) {
    if(err){
              res.render('index', {weather: null, error: 'Error, please try again'});
          } 
    else {
            let weather = JSON.parse(body)
            if(weather.main == undefined)
            {
		console.log(weather)
                res.render('index', {weather: null, error: 'Error, please try again'});
            } 
            else 
            {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
          }
});
})
 

app.listen(3000, function () {         //if we are in port 300, show the following message 
  console.log('Example app listening on port 3000!')
})

