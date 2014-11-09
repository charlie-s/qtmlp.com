//
// Full height.
//
var height = window.innerHeight - $('#small-logo-wrap').outerHeight();
var width = window.innerWidth;

$('#hero').css('height', height + 'px');


//
// Down arrow.
//
var dW = $('#dwn-arrow').width();
var dH = $('#dwn-arrow').height();
$('#dwn-arrow').css({
    width: dW + 'px',
    height: dH + 'px',
    left: ( (width / 2) - (dW / 2) ) + 'px',
    top: (window.innerHeight - dH) + 'px'
}).click(function() {
    $('html, body').animate({
        scrollTop: $('#dwn-arrow').offset().top + $('#dwn-arrow').height()
    }, 500);
});
