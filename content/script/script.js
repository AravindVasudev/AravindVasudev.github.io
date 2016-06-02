$(function () {
    var i = 0
    $(".box").draggable();
    $("body").delegate(".box","mousedown",function() {
       $(this).clone().css({top: Math.floor(Math.random() * 1000), left: Math.floor(Math.random() * 1000)}).appendTo("body");
            $(".box").draggable();
    });
});