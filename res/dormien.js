function initFirst(){ // all we need to know if what durtion it was initiated for
    $(".state").slideUp();
    $("#first").stop().slideDown();
    window.localStorage["state"] = "first";
}

function initSecond(d){ // all we need to know if what durtion it was initiated for
    $(".state").slideUp();
    $("#second").stop().slideDown();

    $("#second h2").text("").append(d[0] + "<span>hr</span> " + d[1] + "<span>min</span>");
}

function setupObservers(){
    $("#take_a_nap").click(function(e){
	initSecond(window.localStorage["nap"].split(","));
    });
    $("#go_to_sleep").click(function(e){
	initSecond(window.localStorage["sleep"].split(","));
    });
    $("#nope").click(function(e){
	initFirst();
    });
}

function setup(){
    setupObservers(); // for the links and stuff

    // setup defaults
    window.localStorage["state"] = window.localStorage["state"] || "first";
    window.localStorage["sleep"] = window.localStorage["sleep"] || "8,0";
    window.localStorage["nap"] = window.localStorage["nap"] || "2,30";
    var state = window.localStorage["state"];

    //check state and load accordingly
    $(".state").hide();
    $("#"+state).show();


    if(state === "sleeping") setupSleeping(); // some screens need setting up y'know?
    if(state === "wakeup") setupWakeUp(); // TODO find out if there is a better way to do this
}

function updateTime(){ // Update the time in the top bar
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var t = ""; // There needs to be a better variable name for this

    t = (h < 12) ? "AM" : "PM"; // setting AM/PM
    h = (h > 12) ? (h-12) : h; // converting to normal time
    h = (h === 0) ? 12 : h; // showing 0 as 12
    m = (m.toString().length === 1) ? "0"+m : m; // make 0 - 00 and 1 - 01

    $("#now h1").text("").append(h + ":" + m + "<span>" + t + "</span>");
    var tick = setTimeout(updateTime, 1000); // rinse & repeat
}

// Keeping the sizes in check!
$(document).ready(function(){
    setup();
    updateTime();
    $("body").css("font-size", ($(window).height()/100.0));
});


$(window).resize(function(){
    $("body").stop(); // stop all other animations
    $("body").animate({
	"font-size": ($(window).height()/100.0)
    });
});
