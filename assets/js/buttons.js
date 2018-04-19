var buttons = (function () {

    var categories = ["cats", "tigers", "dogs", "lions", "pigs", "goats", "chickens"];


    var addButtons = function () {

        for (var i = 0; i < categories.length; i++) {
            addNewButton(categories[i]);
        }

    };

    var addEventListeners = function () {
        cacheDom.$btnSection.on("click", "button.categories", function (event) {
            event.stopPropagation();
            console.log($(this).text());
            gifSearcher.searchGif($(this).text());
        });

        cacheDom.$addCatBtn.on("click", function(){
            addNewButton(cacheDom.$addNewInput.val().trim());
        });

    };

    var addNewButton = function (btnText) {
        console.log("addNewButton - " + btnText);
        
        if (btnText && btnText.length > 0) {
            var btn = $("<button>");
            btn.addClass("btn btn-primary categories");
            btn.text(btnText);
            cacheDom.$btnSection.append(btn);
        }
    }

    return {
        addButtons: addButtons,
        addEventListeners: addEventListeners
    };
})();