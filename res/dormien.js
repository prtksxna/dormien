
// Keeping the sizes in check!
$(document).ready(function(){
    $("body").css("font-size", ($(window).height()/100.0));
});


$(window).resize(function(){
    $("body").stop();
    $("body").animate({
	"font-size": ($(window).height()/100.0)
    });
});
