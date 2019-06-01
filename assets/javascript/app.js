var autoTest = ["ABC" , "DEF" , "GHI"]

var firebaseConfig = {
  apiKey: "AIzaSyAALSQ2KT7EvjWnvSkccuWLvEosnsMAbZs",
  authDomain: "kobushi-persistant-storage.firebaseapp.com",
  databaseURL: "https://kobushi-persistant-storage.firebaseio.com",
  projectId: "kobushi-persistant-storage",
  storageBucket: "kobushi-persistant-storage.appspot.com",
  messagingSenderId: "758341876715",
  appId: "1:758341876715:web:1790bc44f1647cfb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var validSearches = [];
// var validSearches = database.ref().val().validTerms;
console.log(validSearches);

database.ref().on('value' , function(snapshot){
  validSearches = snapshot.val().validTerms;
  $( "#search" ).autocomplete({
    source: validSearches
  });
  console.log(validSearches);
});

$(document).ready(function () {
  
  // var searchTerm = "";
  var searchLimit = 5;
  
  
  // function to search the jikan api for Naruto and log the object and title of the first hit
  var performSearch = function (term, limit) {
    var queryURL = "https://api.jikan.moe/v3/search/anime?q=" + term + "&limit=" + limit;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(getResults);
  };

  // Take in JSON response from performSearch() and parse out the searchResults
  var getResults = function (reply) {
    var searchResults = reply.results;
    console.log(searchResults);
    for (var i = 0; i < searchResults.length; i++) {
      if (!validSearches.includes(searchResults[i].title)) {
        validSearches.push(searchResults[i].title);    
      };
      displayResults(searchResults[i]);
    }
    database.ref().set({
      validTerms : validSearches
    })
    console.log(validSearches);
  };

  //column titles for the table
  var headerRow = $("<th>").append(
    // $("<td>").text("Poster"),
    // // $("<td>").text("Title"),
    // $("<td>").text("Synopsis"),
  );
  $("table").append(headerRow);

  // displayResults() to the console (needs to be to the document)
  var displayResults = function (result) {
    // console.log("------------------------");
    // console.log(result.title);
    // console.log(result.image_url);
    // console.log(result.synopsis);
    var imgURL = result.image_url;
    var image = $("<img>").attr("src", imgURL);
    console.log(image);
    // Create the new row
    var newRow = $("<div class='row'>").append(
      $("<div class='col-md-6'>").append($("<div class='imgurl'>").append(result.title, "<br>", image)),
      $("<div class='col-md-6'>").append($("<div class='textBox'>").text(result.synopsis)),
    );

    // Append the new row to the table
    $(".results-display").prepend(newRow);
    // $("table").prepend("<tr><td><br>");

  };

  $("button").unbind().click(function (event) {
    event.preventDefault();
    newSearch = $("#search").val().trim();
    console.log(newSearch);
    performSearch(newSearch, searchLimit);
  });


  // searchTerm = "Ghost in the Shell"
  // performSearch(searchTerm, searchLimit);
});