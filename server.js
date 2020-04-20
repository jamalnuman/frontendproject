//remember the methods need "()" at the end of them for the methods to work. 

require('es6-promise').polyfill();//this was downloaded to use "fetch"
require('isomorphic-fetch');//this was downloaded to use 'fetch'
const express = require('express');//create a variable called express and require express
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();///returns an object which returns an app object
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
const PORT = process.env.PORT || 4000; //you can have many servers but can only have one PORT at a time

const myFavHobbies = ['football', 'workingout', 'sleeping']

app.get('/', (req, res)=>{
    console.log('hello world');
    res.json(myFavHobbies)
})


const number = ['388']
app.get('/contactus', (req, res) => {
    res.json(number)
})

const goals = [
    {first: 'married'},{second: 'job'}, {third: 'house'}
]

app.get('/goals', (req, res) => {
    res.send(goals)
})

app.post('/goals', (req, res) => {
    console.log(req);
    res.send(goals)
})

app.get('/categories', (req, res) => {
    //console.log(req.query);
    const searchTerm = req.query.category//this is the "alt" of the image when clicked...this is how that attribute is saved on the backend
    //then the variable of "searchTerm" is passed into the variable of 'urls'(see line 46), which is then passed in the ajax call line 47.
    //so at the end of line 46..it actually looks like "category: 'vegan'" 
    let urls = `https://api.yelp.com/v3/businesses/search?location=san+francisco&term=food,${searchTerm}`
    //after the "search?" everything else is a key:value pair seperated by "&"..'searchTerm' also equals 'category=vegan' for example
    fetch(urls,{
      method: "GET",
      headers: {
        "Authorization": "Bearer T2S9xJAKSGfEgadGzQkZ-GQBH5mbo9H5fL8B18wkFt2LuOn62xC2z27nQh0xeCPUj45yMlKQ1ryzkrp9YDYo93bCQ0-VAt2KfcZO5h_fnwWStG-IuKcuBKQaFzmpXXYx",
        //"Access-Control-Allow-Origin": "*"
      }
    }).then(function(response) {
      return response.json();//without 'response.json()', the info we get back would be a string. we use this method, to get our 
      //data back in an object, so it can be properly used. 
    }).then(function(jsonresult) {
        res.json(jsonresult);//this is sending the data to the frontend. If the 'json' is before the '.' then it's capitalized
        //if its after the '.', then it is lowercased. 
    }).catch(function(error) {//if an error occurs in the above '.then' statements, then this block of code will console.log the error
        console.error(error);//this console is specifically designed to console the errors that may occur. 
    });
})


app.listen(PORT)