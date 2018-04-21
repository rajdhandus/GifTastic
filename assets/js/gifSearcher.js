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

            var downloadingImage = new Image();
            downloadingImage.onload = function(){
                img.attr("src", this.src);
            };
            downloadingImage.src = elem.original;

            var containerDiv = $("<div>");
            var img = $("<img>");
            containerDiv.append(img);
            img.addClass("col-xs-3 tiles gifs-img img-thumbnail");
            img.data("still", elem.still);
            img.data("original", elem.original);
            img.attr("src", "./assets/images/bars.gif");
            img.data("current-state", "original");
            cacheDom.$gifSection.append(containerDiv);
        });
    }

    var addEventListeners = function(){

        cacheDom.$gifSection.on("click", ".tiles", function(event){
            console.log($(this).data("current-state"));

            if($(this).data("current-state")=="original") {
                let still = $(this).data("still");
                $(this).attr("src",still);
                console.log(still);
                $(this).data("current-state","still");
            } else {
                let original = $(this).data("original");
                $(this).attr("src",original);
                console.log(original);
                $(this).data("current-state","original");
            }
        })
        
    };

    return {
        searchGif : searchGif,
        renderGifs : renderGifs,
        addEventListeners : addEventListeners
    }
})();