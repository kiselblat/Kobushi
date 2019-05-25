// function to search the jikan api for Naruto and log the object and title of the first hit
 var performSearch = function() {
  var queryURL = "https://api.jikan.moe/v3/search/anime?q=Naruto&limit=5";
   $.ajax({
    url : queryURL,
    method : "GET"
   }).then(function(response) {
    console.log(response);
    console.log(response.results[0].title);
   })
 };

 performSearch();