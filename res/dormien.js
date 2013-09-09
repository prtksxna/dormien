function updateTime(){ // Update the time in the top bar
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var t = ""; // There needs to be a better variable name for this

    t = (h < 12) ? "AM" : "PM"; // setting AM/PM
    h = (h > 12) ? (h-12) : h; // converting to normal time
    h = (h === 0) ? 12 : h; // showing 0 as 12

    $("#now h1").text("").append(h + ":" + m + "<span>" + t + "</span>");
    var tick = setTimeout(updateTime, 1000); // rinse & repeat
}

// Keeping the sizes in check!
$(document).ready(function(){
    updateTime();
    $("body").css("font-size", ($(window).height()/100.0));
});


$(window).resize(function(){
    $("body").stop(); // stop all other animations
    $("body").animate({
	"font-size": ($(window).height()/100.0)
    });
});
