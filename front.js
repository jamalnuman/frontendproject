//these variables are kept here (globally) cause jquery doesnt save the "state" of variables.
let firstChoiceSelected = false; //these two variables were created to make sure that only one selection was chosen from the movie 
//section and the food section...check below and notice how the value of these variables are turned to true when a selection is made..this 
//with the if statement allows only one selection to be choosen. the same is true for line 4.
let secondChoiceSelected = false;
let base_url;
$(document).ready(function() {
  //this ajax call is made to get the 'base_url' which is needed to get the images for the movies. i could have hardcoded
  //this url into the code below, but if the databases ever changes, then this call is needed to the base_url to get the images. this 
  //is added to the code below on line 186
  queryUrl = 
    "https://api.themoviedb.org/3/configuration?api_key=1fb7c97d7054a80e571ed5b28d7761c6";
  $.ajax({
    url: queryUrl,
    method: "get"
  }).then(function(response) {
    //console.log(response);
    //the base_url is saved in the response of the ajax call with the following address below. 
    base_url = response.images.base_url;

    //console.log(base_url)
  });

  $(".movie").on("click", function(e) {//the listener is on the pictures with the appropriate class. the listerener is not on the submit button. 
    // when the appropriate image button is clicked, it will be to populate the "first choice" box. Below, the const of "picture" 
    //and "alt" will assist with this process.
    e.preventDefault();

    const picture = $(this)
      .children()//this is extremely important to include..this allows us to go into the movie class and select the children elements of 
      //the movie class. without "children()" the 'src' attribute will not be read. 
      .attr("src"); //storing the value of the source so the appropriate image can be shown the first choice box
    //console.log(picture);
    const alt = $(this)
      .children()//this is extremely important to include..this allows us to go into the movie class and select the children elements of 
      //the movie class. without "children()" the 'alt' attribute will not be read. 
      .attr("alt"); //storing the value of the second property in the image tag, which is 'alt'. this will later be used in the ajax call.
    //console.log(alt);

    const $image = $("<img>")//again, the image tag is needed to populate the first choice box. without the image tag, the picture that was
    //clicked on will not be displayed to the page.
      .attr("src", `${picture}`)
      .attr("alt", `${alt}`); //appending the source and alt of the picture which was clicked

    const $h3 = $("<h3>").text("First Choice");//this is the function that only allows one selection to be made from the movie category 
    //and food category.
    if (firstChoiceSelected === false) {//this was set to false at the top of the code
      $("#firstChoice").append($image);
      $("#firstChoice").append($h3);
      firstChoiceSelected = true;
      //console.log(firstChoiceSelected);
    } else {
      alert("First Choice Selected!");
    }
  });

  $(".food").on("click", function(e) {//the listener is on the pictures with the appropriate class. the listerener is not on the submit button. 
    // when the appropriate image button is clicked, it will be to populate the "second choice" box. Below, the const of "picture" 
    //and "alt" will assist with this process.
    e.preventDefault();
    const picture = $(this)
      .children()
      .attr("src"); //storing the value of the source
    //console.log(picture);
    const alt = $(this)
      .children()
      .attr("alt"); //storing the value of the second property in the image tag, which is 'alt'
    //console.log(alt);

    const $image = $("<img>")
      .attr("src", `${picture}`)
      .attr("alt", `${alt}`); //appending the source and alt of the picture which was clicked

    const $h3 = $("<h3>").text("Second Choice");
    if (secondChoiceSelected === false) {
      $("#secondChoice").append($image);
      $("#secondChoice").append($h3);
      secondChoiceSelected = true;
    } else {
      alert("Second Choice Selected!");
    }
  });




  //THIS IS THE BEGINNING OF THE CODE FOR THE AJAX CALLS FOR THE FOOD AND MOVIE CATEGORIES.
  
  $("#button").on("click", function(e) { //with this listener, the alt attributes of the 'firstChoice' and 'secondChoice' will be saved and
  //the getFood() & getMovie() function will be called. 
    e.preventDefault();
    const firstChoice = $("#firstChoice")//Now again, we are saving the value of the alt attribute with the use of the "children()" method.
      .children()
      .attr("alt");//remember this is read mode, not write mode 
    //console.log(firstChoice);
    const secondChoice = $("#secondChoice")//Now again, we are saving the value of the alt attribute with the use of the "children()" method.
      .children()
      .attr("alt");//remember this is read mode, not write mode. 
    //console.log(secondChoice);

    function getFood() {
      //let urls = `https://api.yelp.com/v3/categories/${secondChoice}`
      let data = { category: secondChoice };
      let local = `http://localhost:4000/categories${encodeQueryString(data)}`;

      fetch(local, { //the 'url' property is being replaced by "local" and an additional 'headers' section with an 'Authorization' section is 
      //added because some api's request it..like Yelp. 
        method: "GET",
        headers: {
          Authorization:
            "Bearer T2S9xJAKSGfEgadGzQkZ-GQBH5mbo9H5fL8B18wkFt2LuOn62xC2z27nQh0xeCPUj45yMlKQ1ryzkrp9YDYo93bCQ0-VAt2KfcZO5h_fnwWStG-IuKcuBKQaFzmpXXYx"
          //"Access-Control-Allow-Origin": "*"
        }
      })
        .then(function(response) {
          return response.json();//the information going back and forth on the internet is a string..not a JS object..this turns it into 
          //a JS object
        })
        .then(function(jsonresult) {//this is the 'then' block that you would create the const(s) and html objects and then append 
        //them to the page
        //remember the creating buttons, adding attributes and classes, appending and so forth, occurs with the 
        //'then' block of the ajax call. 
          for (let i = 0; i < 10; i++) {//the for-loop doesn't need to be tied to anything..it can loop by itself without being connected
          //to anything.
            const name = jsonresult.businesses[i].name;//notice how the first index in the value matches the argument for the function in the 
            //'then' portion of the ajax call
            //console.log(name);
            const image = jsonresult.businesses[i].image_url;
            const location = jsonresult.businesses[i].location.address1;
            //console.log(location);
            const city = jsonresult.businesses[i].location.city;
            //console.log(city);
            const phone = jsonresult.businesses[i].phone;
            //console.log(phone);
            const rating = jsonresult.businesses[i].rating;
            //console.log(rating);

            const $title = $("<h4>").text(`${i + 1})${name}`);
            const $image = $("<img>").attr("src", image);
            const $address = $("<p>").text(location);
            const $city = $("<p>").text(city);
            const $phone = $("<p>").text(phone);
            const $rating = $("<p>").text(`Rating: ${rating}`);

            $(".resultsTwo").append(
              $title,
              $image,
              $address,
              $city,
              $phone,
              $rating
            );
          }
          //console.log(jsonresult);
        })
        .catch(function(error) {//this is to catch any errors that may occur
          console.error(error);
        });
    }

    function encodeQueryString(params) {
      const keys = Object.keys(params);
      return keys.length
        ? "?" +
            keys
              .map(
                key =>
                  encodeURIComponent(key) +
                  "=" +
                  encodeURIComponent(params[key])
              )
              .join("&")
        : "";
    }

    getFood();

    function getMovie() {
      queryUrl = `https://api.themoviedb.org/3/search/movie?api_key=1fb7c97d7054a80e571ed5b28d7761c6&language=en-US&query=${firstChoice}&page=1&include_adult=false`;
      //https://api.themoviedb.org/3/configuration?api_key=1fb7c97d7054a80e571ed5b28d7761c6
      $.ajax({
        url: queryUrl,
        method: "get"
      }).then(function(response) {//remember the creating buttons, adding attributes and classes, appending and so forth, occurs with the 
        //'then' block of the ajax call. 
        //console.log(response);
       
        for (let i = 0; i < 10; i++) {
          
          const title = response.results[i].title;//notice how the first index in the value matches the argument for the function in the 
          //'then' portion of the ajax call
          //console.log(title);
          const year = response.results[i].release_date;
          //console.log(year);
          const plot = response.results[i].overview;
          //console.log(plot);
          let poster = response.results[i].poster_path;
          
          //this is when the movie doesnt have a poster and the default image of "image not found" is selected
          poster = poster == null ? "./images/No-image-found.jpg" : (poster = base_url + "w154" + poster);//the w154 is the smallest width 
          //the movie database supports. that was found by the tutor ..so we have the base_url + the width parameters and then the poster 
            //variable to get the images from the database. 

          //console.log(poster);
          // if (poster == "null") {
          //   poster = "/images/No-image-found.jpg";
          // } else {
          //   poster = base_url + "w154" + poster;
          // }

          const $image = $("<img>").attr("src", poster);
          //const $number = $('<h3>').text(numberCounter)
          const $title = $("<h4>").text(`${i + 1})${title}`);
          const $year = $("<p>").text(year);
          const $plot = $("<p>").text(plot);

          $(".resultsOne").append($title, $image, $year, $plot);
        }
      });
    }

    getMovie();
  });
});
