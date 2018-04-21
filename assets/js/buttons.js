var buttons = (function () {

    var categories = ["cats", "tigers", "dogs", "lions", "pigs", "goats", "chickens"];


    var addButtons = function () {

        var categoriesInCache = localCache.getCategoryInCache("categories");

        if(categoriesInCache && categoriesInCache.length > 0) {
            var cats = categoriesInCache.split(",");
            for (var i = 0; i < cats.length; i++) {
                addNewButton(cats[i]);
            }
        } else {
            for (var i = 0; i < categories.length; i++) {
                addNewButton(categories[i]);
            }
        }
    };

    var addEventListeners = function () {
        cacheDom.$btnSection.on("click", "button.categories", function (event) {
            event.stopPropagation();
            gifSearcher.searchGif($(this).text());
        });

        cacheDom.$addCatBtn.on("click", function () {
            var userInp = cacheDom.$addNewInput.val().trim()
            if(!isDuplicate(userInp)) {
                cacheDom.$helpText.text("You can add new categories for GIFs that you would like to search");
                cacheDom.$helpText.css("color","");
                addNewButton(userInp);
            } else{
                cacheDom.$addNewInput.val("");
                cacheDom.$helpText.text(userInp +" is already present in the list of categories. Please enter new unique categories");
                cacheDom.$helpText.css("color","red");
            }
        });

        cacheDom.$addNewInput.on("keyup", function (event) {
            if (event.keyCode === 13) {
                cacheDom.$addCatBtn.click();
                cacheDom.$addNewInput.val("");
            }
        });

    };

    var addNewButton = function (btnText) {
        if (btnText && btnText.length > 0) {
            var btn = $("<button>");
            btn.addClass("btn btn-primary categories");
            btn.text(btnText);
            localCache.setCategoryInCache("categories", btnText);
            cacheDom.$btnSection.append(btn);
        }
    };

    var isDuplicate = function(category){
        return categories.includes(category.toLowerCase());
        return true;
    };

    return {
        addButtons: addButtons,
        addEventListeners: addEventListeners
    };
})();