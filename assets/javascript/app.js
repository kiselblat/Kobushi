$(document).ready(function () {

var searchLimit = 5;
var newTitle = "";

  // function to search the jikan api for Naruto and log the object and title of the first hit
  var performSearch = function (term, limit) {
  var queryURL = "https://api.jikan.moe/v3/search/anime?q=" + term + "&limit=" + limit;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(getResults);
};

var youtubeSearch = function () {
  var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q="+newTitle+"&key=AIzaSyCHbM4yqSNt5FqVSFSFiMv4IaX7jxQxPJ0";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (vidResponse) {
    console.log(vidResponse)
    var data = vidResponse.items[5];
    var video = $("<iframe>");
    video.attr('src', 'https://www.youtube.com/embed/' + data.id.videoId)
    video.attr('height', "506")
    video.attr('width', "2900")
    $('table').prepend(video);
  });
};

// Take in JSON response from performSearch() and parse out the searchResults
var getResults = function (reply) {
  var searchResults = reply.results;
  console.log(searchResults);
  for (var i = 0; i < searchResults.length; i++) {
    displayResults(searchResults[i]);
  }
};

// displayResults() to the page
var displayResults = function (result) {
  var imgURL = result.image_url;
  var image = $("<img>").attr("src", imgURL);
  var youtube = "Watch trailer on Youtube";
  var ebay = "Search eBay for DVD";

  $(document).unbind().on('click', 'td', function(event){
    if(event.target.title){
      newTitle = this.title + " trailer";
      console.log(newTitle);
      youtubeSearch();
    }
  })

  // Create the new row
  var newRow = $("<tr>").append(
    $('<td>').append(image),
    $("<td>").text(result.title),
    $("<td>").text(result.synopsis),
    $("<td>").text(youtube).attr("title", result.title),
    $("<td>").text(ebay).click(ebaySearch),
  );

  

  var ebaySearch=function() {
    console.log("ebay");
  }

  // Append the new row to the table
  $("table").prepend(newRow);
  $("table").prepend("<tr><td><br>");
};

  $("button").unbind().click(function (event) {
    event.preventDefault();
    newSearch = $("#search").val().trim();
    // console.log(newSearch);
    performSearch(newSearch, searchLimit);
  });

});