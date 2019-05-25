// function to search the jikan api for Naruto and log the object and title of the first hit
 var performSearch = function() {
  var queryURL = "https://api.jikan.moe/v3/search/anime?q=Naruto&limit=5";
   $.ajax({
    url : queryURL,
    method : "GET"
   }).then(getResults);
 };

 var getResults = function(reply) {
   var searchResults = reply.results;
   console.log(searchResults);
   for (var i = 0 ; i < searchResults.length ; i++) {
     displayResults(searchResults[i]);
   }
 }

 var displayResults = function(result) {
   console.log("------------------------");
   console.log(result.title);
   console.log(result.image_url);
   console.log(result.synopsis);
   console.log("------------------------");
 }

 performSearch();