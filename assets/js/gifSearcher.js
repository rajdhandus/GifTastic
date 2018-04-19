var gifSearcher = (function(){

    var gifBaseURL = "https://api.giphy.com/v1/gifs/search?api_key=";
    var giphyKey = "Na04YVp5uWKzlI9xdisIrOKM3hKzEPoN";
    var queryParams = "&q=cats&limit=25&offset=0&rating=G&lang=en";

    var searchGif = function(category){
        var gifURL = gifBaseURL + giphyKey + "&q=" + category + "&limit=20&offset=0&rating=G&lang=en";

        console.log(gifURL);

        $.ajax({
            url : gifURL,
            method : "GET"
        }).then(function(response){
            renderGifs(parseResponse(response));
        });

    };

    var parseResponse = function(urlResponse) {

        var filteresRespObj = [];

        for(var i=0;i<urlResponse.data.length;i++) {

            filteresRespObj.push({
                original : urlResponse.data[i].images.original.url,
                still : urlResponse.data[i].images.original_still.url
            })
        }

        return filteresRespObj;

    };

    var renderGifs = function(inputData){

        cacheDom.$gifSection.empty();

        inputData.forEach(function(elem){
            var containerDiv = $("<div>");
            var img = $("<img>");
            containerDiv.append(img);
            img.addClass("col-xs-3");
            img.attr("still", elem.still);
            img.attr("original", elem.original);
            img.attr("src", elem.original);
            cacheDom.$gifSection.append(containerDiv);
        });
    }

    var addEventListeners = function(){
        
    };

    return {
        searchGif : searchGif,
        renderGifs : renderGifs
    }
})();