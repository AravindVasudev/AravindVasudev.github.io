var winHeight = $(window).innerHeight();
$(document).ready(function () {
  $(".panel").height(winHeight);
  $("body").height(winHeight * $(".panel").length);

  $("#auto").click(function () {
    $('body, html').animate({
      scrollTop: (winHeight * 5)
    }, 25000);
    return false;
  });
    $(".panelCon").keypress(function(event) {
    if(event.which == 32) {
      $('body, html').stop();
    }
  });
});

window.addEventListener('resize', function (event) {
  $(".panel").height($(window).innerHeight());
});
$(window).on('scroll', function () {
  $(".panelCon").css('bottom', $(window).scrollTop() * -1);

  if ($(window).scrollTop() >= (winHeight + (winHeight / 2)) - 400) {
    $("#about").css("visibility", "visible").addClass("animated zoomIn");
  }

  if ($(window).scrollTop() >= (2 * winHeight + (winHeight / 2)) - 400) {
    $("#a1").css("visibility", "visible").addClass("animated bounceInRight");
    $("#a2").css("visibility", "visible").addClass("animated bounceInLeft");
  }

  if ($(window).scrollTop() >= (3 * winHeight + (winHeight / 2)) - 400) {
    $("#a3").css("visibility", "visible").addClass("animated bounceInLeft");
    $("#a4").css("visibility", "visible").addClass("animated bounceInRight");
  }

  if ($(window).scrollTop() >= (4 * winHeight + (winHeight / 2)) - 400) {

    $("#a5").css("visibility", "visible").addClass("animated bounceInRight");
    $("#a6").css("visibility", "visible").addClass("animated bounceInLeft");
  }
  if ($(window).scrollTop() >= (5 * winHeight + (winHeight / 2)) - 400) {
    $(".moon-footer").css("display", "block").addClass("animated bounceIn");
    $(".moon-text").css("display", "block").addClass("animated fadeInDown");
  }
});