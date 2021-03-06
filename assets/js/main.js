var latitude;
var longitude;
var shortCountry;
var longCountry;
var zip;
var placeType = "restaurant";

//-----Gets Users Location Data and stores in variables to be used be other API Calls------
navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
  console.log("position", position);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  reverseGeoCoding(latitude, longitude);
  initMap();
}
//-----Uses latitude and logitude to search for additional location
function reverseGeoCoding(latitude, longitude) {
  var reverseGeocodingQueryURL =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    latitude +
    "," +
    longitude +
    "&result_type=postal_code&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA";
  $.ajax({
    url: reverseGeocodingQueryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    zip = response.results[0].address_components[0].long_name;
    shortCountry = response.results[0].address_components[3].short_name;
    currentAddress = response.results[0].formatted_address;
    $("#currentAddress").text(currentAddress);
    getWeather(zip);
  });
}
  //-----------Weather API----------
  function getWeather(zip) {
    var weatherGEOqueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?zip=" +
      zip +
      "&appid=bdb30d5ce61beafda3576d082caf2f75";
    // var weatherCITYqueryURL = "api.openweathermap.org/data/2.5/forecast?=" + city +"," + country + "&appid=bdb30d5ce61beafda3576d082caf2f75";
    $.ajax({
      url: weatherGEOqueryURL,
      method: "GET"
    }).then(function(response) {
      $("#weatherbody").empty();
      for (i = 0; i < 40; i += 8) {
        //appended the weather app to display in the table, should display description, time, and day
        var weatherDate = moment.unix(response.list[i].dt).format("ddd, MMM D");
        var tempMax = Math.trunc(
          (response.list[i].main.temp_max - 273.15) * 1.8 + 32
        );
        var tempMin = Math.trunc(
          (response.list[i].main.temp_min - 273.15) * 1.8 + 32
        );

        console.log(response);
        $("#weatherbody").append(
          "<div class='col-2 text-center p-0'>" +
            weatherDate +
            "<br>" +
            "<img src='http://openweathermap.org/img/wn/" +
            response.list[i].weather[0].icon +
            "@2x.png' class='w-50'><br>" +
            response.list[i].weather[0].description +
            "<br>High: " +
            tempMax +
            " <br>Low: " +
            tempMin +
            "</div>"
        );
      }
    });
  }

$("#submitSearch").on("click", function() {
  event.preventDefault();
  var searchArea = $("#newSearch").val();
  var geocodingQueryURL =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    searchArea +
    "&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA";
  $.ajax({
    url: geocodingQueryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    latitude = response.results[0].geometry.location.lat;
    longitude = response.results[0].geometry.location.lng;
    reverseGeoCoding(latitude, longitude);
    initMap();
  });
});

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 14
  });


  //----------Events API---------
  //----Status: WORKING----------
  //----Comments: Used Public API Key, May want to include option to set dates of events listed
  var showEvents = false;
  //function to click on events button
  $("#currentEventsButton").on("click", function() {
    if (showEvents) {
      $("#eventsDisplay").empty();
      $("#eventsDisplay").removeAttr("style");
      showEvents = false;
    } else {
      //Clear the content display div
      $("#eventsDisplay").empty();
      $("#eventsDisplay").css("height", "480px");
      //EventBrite API information
      var eventsQueryURL = "https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search/";
      $.ajax({
        url: eventsQueryURL,
        data: {
          token: "7YTUMTV5GWZSSATPVJM7",
          sort_by: "best",
          "location.latitude": latitude,
          "location.longitude": longitude,
          expand: "venue"
        },
        crossDomain: true,
        method: "GET"
      }).then(function(response) {
        //create variable to store events database response

        var events = response.events;

        //for loop to create the cards in the content display div with the events info
        for (i = 0; i < 8; i++) {
          //create a div eventsDiv with a class of card
          var eventsDiv = $("<li>");
          eventsDiv.addClass("list-group-item d-flex");
          var eventsImageDiv = $("<div>");
          eventsImageDiv.addClass("col-md-4 p-0");
          
          //create img tag for top card image with a class of card-img-top and id of cardImage
          var eventsImage = $("<img>");
          eventsImage.attr("src", events[i].logo.url);
          eventsImage.addClass("w-100");
          eventsImageDiv.append(eventsImage);
          eventsDiv.append(eventsImageDiv);

          var eventsBodyDiv = $("<div>");
          eventsBodyDiv.addClass("col-md-8");
          var eventsCardBody = $("<div>");
          eventsCardBody.addClass("card-body p-0");
          //append event name to the body div with the class card-title
          eventsCardBody.append(
            "<h5 class='card-title'>" + events[i].name.text + "</h5>"
          );

          //create a second div for the body with a class of card-body

          //create paragraph to hold date of event with the class of card-subtitle
          var date = moment(response.events[i].start.local).format('ll');

          var dateOfEvent = $("<p>").text(date);
          dateOfEvent.addClass("card-subtitle");
          eventsCardBody.append(dateOfEvent);

          //create variables to hold start time, end time, venue name, address and the event brite link.
          var start = moment(events[i].start.local).format('LT');
          var end = moment(events[i].end.local).format('LT');
          var venue = events[i].venue.name;
          var address = events[i].venue.address.address_1;

          var link = events[i].url;

          //create variable to hold all above info and create paragraph with that info
          var eventTime = $("<small>").html(
              start + 
              " - " +
              end)
          var eventVenue =$("<div>").html(venue)
          var eventLocation =$("<div>").html(address)
          var eventLink = $("<a>").html("More Info");
          eventLink.attr("href", link);
          eventLink.addClass("card-text");
          eventVenue.addClass("card-text");
          eventLocation.addClass("card-text");
          eventTime.addClass("card-text");
          eventsCardBody.append(eventTime);
          eventsCardBody.append(eventVenue);
          eventsCardBody.append(eventLocation);
          eventsCardBody.append(eventLink);

          //append restaurantbodyDiv to actual div
          eventsDiv.append(eventsCardBody);

          //prepend all information to content display div
          $("#eventsDisplay").prepend(eventsDiv);
          showEvents = true;
        }
      });
    }
  });
  var showHotels = false;
  //on click function will show you local hot spots
  $("#placesToStayButton").on("click", function() {
    if (showHotels) {
      $("#hotelsDisplay").empty();
      $("#hotelsDisplay").removeAttr("style");
      showHotels = false;
    } else {
      //Clear the content display div
      $("#hotelsDisplay").empty();
      $("#hotelsDisplay").css("height", "480px");
      var placesQueryURL =
        "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        latitude +
        "," +
        longitude +
        "&radius=16000&types=hotels&rankby=prominence&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA";
      $.ajax({
        url: placesQueryURL,
        method: "GET"
      }).then(function(response) {
        //create variable to store restaurants database reponse
        var hotel = response.results;
        console.log(hotel);
        // on click function to redirect to another page for "Places to Stay"
        for (i = 1; i < 9; i++) {
          new google.maps.Marker({
            position: {
              lat: hotel[i].geometry.location.lat,
              lng: hotel[i].geometry.location.lng
            },
            map: map,
            label: hotel[i].name
          });
          //create a div hotelDiv
          var hotelDiv = $("<li>");
          hotelDiv.addClass("list-group-item d-flex");
          var hotelImageDiv = $("<div>")
          hotelImageDiv.addClass("col-md-4 p-0");

          //create img tag for top card image with a class of card-img-top and id of cardImage
          var hotelImage = $("<img>");
          hotelImage.attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=" + hotel[i].photos[0].photo_reference + "&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA");
          hotelImage.addClass("w-100");
          // hotelImage.attr("id", "cardImage");
          hotelImageDiv.append(hotelImage);
          hotelDiv.append(hotelImageDiv)

          //create a second div for the body. with a class of card-body
          var hotelBodyDiv = $("<div>");
          hotelBodyDiv.addClass("col-md-8");
          var hotelCardBody = $("<div>");
          hotelCardBody.addClass("card-body p-0");
          //append hotel name to the body div with the class card-title
          hotelCardBody.append(
            "<h5 class='card-title d-inline'>" + hotel[i].name + "</h5>"
          );
          //create paragraph to hold the open status with the class of card-subtitle

          //create variables to hold hotel name, hotel photo, vicinity, and ratings
          var rating = parseInt(response.results[i].rating)
          var ratingDiv = $("<div>").text("Rating: ")
          for (x = 0; x < rating; x++) {
            var star = $("<i>").addClass("fas fa-star");
            ratingDiv.append(star);
          };
          hotelCardBody.append(ratingDiv);

          var vicinity = response.results[i].vicinity;
          var vicinityDiv =$("<div>").text(vicinity);
          hotelCardBody.append(vicinityDiv)

          //create variable to hold all above info and create paragraph with that info
          hotelBodyDiv.append(hotelCardBody)
          //append hotelbodyDiv to actual div
          hotelDiv.append(hotelBodyDiv);
          //prepend all information to content display div
          $("#hotelsDisplay").prepend(hotelDiv);
          showHotels = true;
        }
      });
    }
  });

  // on click function to redirect to another page for "Places to Stay"
  $("#localButton").on("click", function() {
    console.warn("You clicked this button");
    //Clear the content display div
    $("#contentDisplay").empty();
    var queryURL =
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e00b92eba88f4067ae9c597f113f0670";
    $.ajax({
      url: queryURL,
      method: "Get"
    }).then(function(response) {
      for (i = 1; i < 9; i++) {
        //create a div for the news to create a card
        var newsdiv = $("<div>");
        newsdiv.addClass("card");
        newsdiv.addClass("col-sm-3");
        //create a second div for the body with a class of card-body
        var newsbodydiv = $("<div>");
        newsbodydiv.addClass("card-body");

        //append news name to the body div with the class card-title
        newsbodydiv.append(
          "<h5 class='card-title'>" + response.articles[i].source.name + "</h5>"
        );

        //create text to show the author
        var newstitle = $("<h5>").text(
          "Source: " + response.articles[i].author
        );
        newstitle.addClass("card-title");
        newsbodydiv.append(newstitle);
        //create text that shows the title of the article
        var newsArticle = $("<p>").text("Title: " + response.articles[i].title);
        newsArticle.addClass("card-subtitle");
        newsbodydiv.append(newsArticle);
        //providing the link to the website of the article
        var newsLink = response.articles[i].url;

        var newsInfo = $("<a>").html("Link to Article");
        newsInfo.attr("href", newsLink);
        newsInfo.addClass("card-text");
        newsbodydiv.append(newsInfo);

        newsdiv.append(newsbodydiv);
        //prepend all information to content display div
        $("#contentDisplay").prepend(newsdiv);
      }
    });
  });
  var showRestaurants = false;
  // On click button that allows the user to find resturants they may like
  $("#restaurantsButton").on("click", function() {
    if (showRestaurants) {
      $("#restaurantsDisplay").empty();
      $("#restaurantsDisplay").removeAttr("style");
      showRestaurants = false;
    } else {
      //Clear the content display div
      $("#restaurantsDisplay").empty();
      $("#restaurantsDisplay").css("height", "480px");
      //Google Places API
      var placesQueryURL =
        "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        latitude +
        "," +
        longitude +
        "&radius=16000&types=" +
        placeType +
        "&rankby=prominence&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA";
      $.ajax({
        url: placesQueryURL,
        method: "GET"
      }).then(function(response) {
        //create variable to store restaurants database reponse
        var restaurants = response.results;
        console.log(restaurants)
        //for loop to create the cards in the content display div with the restaurants info
        for (i = 0; i < 8; i++) {
            new google.maps.Marker({
              position: {
                lat: restaurants[i].geometry.location.lat,
                lng: restaurants[i].geometry.location.lng
              },
              map: map,
              label: restaurants[i].name
            });
          //create a div restaurantDiv
          var restaurantDiv = $("<li>");
          restaurantDiv.addClass("list-group-item d-flex");
          var restaurantImageDiv = $("<div>")
          restaurantImageDiv.addClass("col-md-4 p-0");

          //create img tag for top card image with a class of card-img-top and id of cardImage
          var restaurantImage = $("<img>");
          restaurantImage.attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=" + restaurants[i].photos[0].photo_reference + "&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA");
          restaurantImage.addClass("w-100");
          // restaurantImage.attr("id", "cardImage");
          restaurantImageDiv.append(restaurantImage);
          restaurantDiv.append(restaurantImageDiv);

          //create a second div for the body. with a class of card-body
          var restaurantBodyDiv = $("<div>");
          restaurantBodyDiv.addClass("col-md-8");
          var restaurantCardBody = $("<div>");
          restaurantCardBody.addClass("card-body p-0");
          //append restaurant name to the body div with the class card-title
          restaurantCardBody.append(
            "<h5 class='card-title'>" + restaurants[i].name + "</h5>"
          );

          //create paragraph to hold the open status with the class of card-subtitle
          var open = restaurants[i].opening_hours.open_now;
          if (open) {
            var restaurantOpen = $("<strong>").text("Open Now").addClass("text-success");
          } else {
            var restaurantOpen = $("<strong>").text("Closed").addClass("text-danger");
          }
          
          restaurantOpen.addClass("card-subtitle");
          restaurantCardBody.append(restaurantOpen);

          //create variables to hold rating, price level, type, and google maps link
          var rating = parseInt(response.results[i].rating)
          var ratingDiv = $("<div>").text("Rating: ")
          for (x = 0; x < rating; x++) {
            var star = $("<i>").addClass("fas fa-star");
            ratingDiv.append(star);
          };
          restaurantCardBody.append(ratingDiv);

          var price = parseInt(restaurants[i].price_level);
          var priceDiv = $("<div>").text("Price: ")
          for (x = 0; x < price; x++) {
            var dollar = $("<i>").addClass("fas fa-dollar-sign");
            priceDiv.append(dollar);
          };
          restaurantCardBody.append(priceDiv);

          var type = restaurants[i].types[0];
          var mapLink = restaurants[i].photos[0].html_attributions[0];
       
          restaurantBodyDiv.append(restaurantCardBody);

          //append restaurantbodyDiv to actual div
          restaurantDiv.append(restaurantBodyDiv);

          //prepend all information to content display div
          $("#restaurantsDisplay").prepend(restaurantDiv);
          showRestaurants = true;
        }
      });
    }
  });
  //Get Location by using Geolocation
  var x = document.getElementById("demo");
  function getLocation() {
    //   x.innerHTML = "Latitude: " + position.coords.latitude +
    //   "<br>Longitude: " + position.coords.longitude;
  }
  //function for continous clock
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("txt").innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }
}
