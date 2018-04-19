var cacheDom = (function(){

    var $gifSection = $("#gifSection");
    var $btnSection = $("#btnSection");
    var $addCatBtn = $("#addCatBtn");
    var $addNewInput = $("#addNewInput");


    var prefetch = function(){

    };

    return {
        prefetch: prefetch,
        $addCatBtn : $addCatBtn,
        $btnSection : $btnSection,
        $gifSection : $gifSection,
        $addNewInput : $addNewInput
    }
})();