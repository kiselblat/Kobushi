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

var searchLimit = 5;
var newTitle = "";

var validSearches = [];
// console.log(validSearches);

database.ref().on('value', function (snapshot) {
  validSearches = snapshot.val().validTerms;
  $("#search").autocomplete({
    source: validSearches
  });
  // console.log(validSearches);
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
      validTerms: validSearches
    })
    // console.log(validSearches);
  };

  var youtubeSearch = function () {
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + newTitle + "&key=AIzaSyCHbM4yqSNt5FqVSFSFiMv4IaX7jxQxPJ0";
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
      $('#vidSpace').prepend(video);
    });
  };

  // displayResults() to the console
  var displayResults = function (result) {
    var imgURL = result.image_url;
    var image = $("<img>").attr("src", imgURL);
    var youtube = "Watch trailer on Youtube";
    var ebay = "Search eBay for DVD";
    var newDvd = result.title;
    var ebayURL = "https://www.google.com/search?q=ebay+" + newDvd + "+dvd&source=univ&tbm=shop&tbo=u&sa=X&ved=0ahUKEwieuOKmocviAhVQb60KHcYdCbgQsxgILQ&biw=1600&bih=757"
    var a = $("<a>").attr("href", ebayURL).text(ebay);
    console.log(image);
    // Create the new row
    var newRow = $("<div class='row'>").append(
      $("<div class='col-md-3'>")
        .append($("<div class='imgurl'>"))
        .append(result.title, "<br>", image),
      $("<div class='col-md-5'>").append($("<div class='textBox'>").text(result.synopsis)),
      $("<div class='col-md-2'>").append($("<div class='textBox'>").text(youtube))
        .attr("title", result.title)
        .click(function () {
          newTitle = this.title + " trailer";
          console.log(newTitle);
          youtubeSearch();
        }),
      $("<div class='col-md-2'>").append($("<div class='textBox'>").append(a)),
      );

    // Append the new row to the table
    $(".results-display").prepend(newRow);

  };

  $("#search-button").unbind().click(function (event) {
    event.preventDefault();
    newSearch = $("#search").val().trim();
    // console.log(newSearch);
    performSearch(newSearch, searchLimit);
  });

});