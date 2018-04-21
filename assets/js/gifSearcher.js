var gifSearcher = (function(){

    var gifBaseURL = "https://api.giphy.com/v1/gifs/search?api_key=";
    var giphyKey = "Na04YVp5uWKzlI9xdisIrOKM3hKzEPoN";
    var queryParams = "&limit=25&offset=0&rating=G&lang=en";

    var searchGif = function(category){
        var gifURL = gifBaseURL + giphyKey + "&q=" + category + queryParams;
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
                still : urlResponse.data[i].images.original_still.url,
                rating : urlResponse.data[i].rating
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
            containerDiv.attr("id","ctnDiv")
            containerDiv.addClass("col-xs-3");

            var div = $("<div>");
            div.attr("id","boxId")
            div.addClass("thumbnail");


            var anchorTag = $("<a>");
            anchorTag.attr("target","_blank");

            var img = $("<img>");
            img.attr("id","overRide");
            img.addClass("tiles gifs-img");
            img.data("still", elem.still);
            img.data("original", elem.original);
            img.attr("src", "./assets/images/bars.gif");
            img.data("current-state", "original");

            var captionDiv = $("<div>");
            captionDiv.addClass("caption");

            var caption = $("<p>");
            caption.text("Rating - " + elem.rating);

            captionDiv.append(caption);

            anchorTag.append(img);
            anchorTag.append(captionDiv);

            div.append(anchorTag);
            containerDiv.append(div);

            cacheDom.$gifSection.append(containerDiv);
        });
    }

    var addEventListeners = function(){

        cacheDom.$gifSection.on("click", ".tiles", function(event){
            if($(this).data("current-state")=="original") {
                let still = $(this).data("still");
                $(this).attr("src",still);
                $(this).data("current-state","still");
            } else {
                let original = $(this).data("original");
                $(this).attr("src",original);
                $(this).data("current-state","original");
            }
        });
        
    };

    return {
        searchGif : searchGif,
        renderGifs : renderGifs,
        addEventListeners : addEventListeners
    }
})();