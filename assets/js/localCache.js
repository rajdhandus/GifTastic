var localCache = (function(){

    var categories = [];

    var setCategoryInCache = function(key, obj){
        categories.push(obj);
        localStorage.setItem(key,categories);
    };

    var getCategoryInCache = function(key){
        return localStorage.getItem("categories");
    };

    return {
        setCategoryInCache : setCategoryInCache,
        getCategoryInCache : getCategoryInCache
    }
})();