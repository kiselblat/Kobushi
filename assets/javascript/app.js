var searchTerm = "";
var searchLimit = 5;

// function to search the jikan api for Naruto and log the object and title of the first hit
var performSearch = function(term , limit) {
var queryURL = "https://api.jikan.moe/v3/search/anime?q=" + term + "&limit=" + limit;
  $.ajax({
  url : queryURL,
  method : "GET"
  }).then(getResults);
};

// Take in JSON response from performSearch() and parse out the searchResults
var getResults = function(reply) {
  var searchResults = reply.results;
  console.log(searchResults);
  for (var i = 0 ; i < searchResults.length ; i++) {
    displayResults(searchResults[i]);
  }
};

// displayResults() to the console (needs to be to the document)
var displayResults = function(result) {
  console.log("------------------------");
  console.log(result.title);
  console.log(result.image_url);
  console.log(result.synopsis);
};

$(document).ready(function() {
  searchTerm = "Naruto"
  performSearch(searchTerm , searchLimit);
});