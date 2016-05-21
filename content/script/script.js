$(function () {
    $("#notify").click(function () {
        navigator.vibrate(1000);
        if (!("Notification" in window)) {
            $(".footer").html("<h3>Notification not available in your browser :(</h3>");
        } else if (Notification.permission === "granted") {
            var n = new Notification("Thanks!", {
                body: "You'll be notified as soon as the website is complete",
                icon: "http://lasvegastribune.net/wp-content/uploads/2016/02/donald-trump-thumbs-up.jpg",
            });
        }
        else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification("Thanks!", {
                body: "You'll be notified as soon as the website is complete",
                icon: "http://lasvegastribune.net/wp-content/uploads/2016/02/donald-trump-thumbs-up.jpg",
            });
      }
    });
  }    });
});