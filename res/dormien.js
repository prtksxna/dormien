function initFirst(){ 
    $(".state").slideUp();
    $("#first").stop().slideDown();
    window.localStorage["state"] = "first";

    // TODO get rid of all alarms
    // TODO get rid of localstorage stuff that is irrelevant now
    delete window.localStorage["alarm_time"];
}

function initSleeping(at){
    if(at === undefined && window.localStorage["alarm_time"] === undefined){ // if someone reaches here by accident/error
	initFirst();
	return false;
    }

    if(at !== undefined){
	window.localStorage["alarm_time"] = at;
    }

    $(".state").slideUp();
    $("#sleeping").stop().slideDown();
    window.localStorage["state"] = "sleeping";

    $("#sleeping h2:first").text("").append(formatTime(window.localStorage["alarm_time"]));
}

function initSecond(d){ // all we need to know if what durtion it was initiated for
    $(".state").slideUp();
    $("#second").stop().slideDown();

    $("#second h2").text("").append(d[0] + "<span>hr</span> " + d[1] + "<span>min</span>");
    // TODO figure out swipe and change the time, also update the localstorage, but how do we know which one?
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
    $("#okie_dokie").click(function(e){
	var d = $("#second h2").text().replace("hr","").replace("min","").split(" "); // use the data in the DOM to get duration
	d = [parseInt(d[0]), parseInt(d[1])]; // convert to string
	
	// get the actual time of the alarm
	var now = new Date();
	var alarm_time = new Date(now.getTime() + (d[0] * 60 * 60000) + (d[1] * 60000) )

	// setup the alarm using mozAlarms
/*	var request = navigator.mozAlarms.add(alarm_time, "honorTimezone", {
	    app: "dormien",
	    snooze: 0
	});

	request.onsuccess = function () {
	    console.log("The alarm has been scheduled");
	    initSleeping(alarm_time);
	};

	request.onerror = function () { 
	    console.log("An error occurred: " + this.error.name);
	    initFirst();
	};	*/
	initSleeping(alarm_time);
    });
    $("#up_already").click(function(e){
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


    if(state === "sleeping") initSleeping(); // some screens need setting up y'know?
    if(state === "wakeup") initWakeUp(); // TODO find out if there is a better way to do this
}

function updateTime(){ // Update the time in the top bar
    var d = new Date();
    $("#now h1").text("").append(formatTime(d));
    var tick = setTimeout(updateTime, 1000); // rinse & repeat

    if(window.localStorage["state"] === "sleeping"){
	var d = new Date(window.localStorage["alarm_time"]) - new Date();
	$("#sleeping h2:last").text("").append(formatDuration(d));
    }
}

function formatDuration(d){
    var h = Math.floor(d/(1000 * 60 * 60));
    d = d - (h * 1000 * 60 * 60);
    var m = Math.floor(d/(1000 * 60));
    return h + "<span>hr</span> " + m + "<span>min</span>";
}

function formatTime(d){
    d = new Date(d);
    var h = d.getHours();
    var m = d.getMinutes();
    var t = ""; // There needs to be a better variable name for this

    t = (h < 12) ? "AM" : "PM"; // setting AM/PM
    h = (h > 12) ? (h-12) : h; // converting to normal time
    h = (h === 0) ? 12 : h; // showing 0 as 12
    m = (m.toString().length === 1) ? "0"+m : m; // make 0 - 00 and 1 - 01

    return h + ":" + m + "<span>" + t + "</span>";
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
