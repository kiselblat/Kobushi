$(document).ready(function () {

  var searchLimit = 5;
  var title = "";

  // function to search the jikan api for Naruto and log the object and title of the first hit
  var performSearch = function (term, limit) {
    var queryURL = "https://api.jikan.moe/v3/search/anime?q=" + term + "&limit=" + limit;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(getResults);
  };

  var youtubeSearch = function () {
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=Australia&key=AIzaSyCHbM4yqSNt5FqVSFSFiMv4IaX7jxQxPJ0";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (vidResponse) {
      var data = vidResponse.items[0];
      var video = $("<iframe>");
      // video.attr('src', 'https://www.youtube.com/embed/' + data.id.videoId)
      // video.attr('height', "506")
      // video.attr('width', "900")
      var promiseArr = [];
      // YOUTUBE API

      vidResponse.items.forEach(function(item){
        // MORE  LOGIC HERE

        promiseArr.push($.ajax({
          url: 'ebayURL',
          method: 'GET'
        }))
      });

      return Promise.all(promiseArr)
    }).then(function(result){

      // EBAY API
    }).then(function(response){

    })
  };
  youtubeSearch();

  // Take in JSON response from performSearch() and parse out the searchResults
  var getResults = function (reply) {
    var searchResults = reply.results;
    console.log(searchResults);
    for (var i = 0; i < searchResults.length; i++) {
      displayResults(searchResults[i]);
    }
  };

  //column titles for the table
  var headerRow = $("<th>").append(
    $("<td>").text("Poster"),
    $("<td>").text("Title"),
    $("<td>").text("Synopsis"),
  );
  $("table").append(headerRow);

  // displayResults() to the page
  var displayResults = function (result) {
    var imgURL = result.image_url;
    var image = $("<img>").attr("src", imgURL);
    image.attr("title", result.title);
    var foo = $('<a>');
    foo.attr('href', '#');
    foo.append(image);
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").append(foo),
      $("<td>").text(result.title),
      $("<td>").text(result.synopsis),
    );

    // Append the new row to the table
    $("table").prepend(newRow);
    $("table").prepend("<tr><td><br>");
  };

  var myFunction = function () {
    console.log("function");
  }


  $("button").unbind().click(function (event) {
    event.preventDefault();
    newSearch = $("#search").val().trim();
    console.log(newSearch);
    performSearch(newSearch, searchLimit);
  });

});