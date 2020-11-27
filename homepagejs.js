$(document).ready(function () {


    //coming soon
    
    /* $("#body > .col > .row:nth-child(5) .linksproper .col:nth-child(2) .iconbox a").mouseover(function () {

        
        $("#body > .col > .row:nth-child(5) .linksproper .col:nth-child(2) .iconbox a").attr("style", "display:none !important;");

        $("#body > .col > .row:nth-child(5) .linksproper .col:nth-child(2) .iconbox .comingsoon").attr("style", "display:block !important;");
     });*/


   $("#body > .col > .row:nth-child(6) .linksproper .col:nth-child(2) .iconbox a").mouseover(function () {

        
        $("#body > .col > .row:nth-child(6) .linksproper .col:nth-child(2) .iconbox a").attr("style", "display:none !important;");
        $("#body > .col > .row:nth-child(6) .linksproper .col:nth-child(2) .iconbox .comingsoon").attr("style", "display:block !important;");
    });
   

  $("#body > .col > .row:nth-child(5) .linksproper .col:nth-child(1) .iconbox a").mouseover(function () {

        $("#body > .col > .row:nth-child(5) .linksproper .col:nth-child(1) .iconbox a").fadeOut();
        $("#body > .col > .row:nth-child(5) .linksproper .col:nth-child(1) .iconbox a").attr("style", "display:none !important;");
        $("#body > .col > .row:nth-child(5) .linksproper .col:nth-child(1) .iconbox .comingsoon").attr("style", "display:block !important;");
    });


   



    if ($(window).width() < 1200)
    {
        $('#featpropul').attr('data-cycle-carousel-visible', '1');
        $('#featpropul').cycle();
    }
});



$(function () {
    $(".project").click(function () {
        document.location.href = '/project/' + $(this).attr('id');
    });
    $(".news").click(function () {
        document.location.href = '/news/' + $(this).attr('id');
    });
});

(function ($) {

    $.fn.visible = function (partial) {

        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };


})(jQuery);


$(window).scroll(function (event) {

    $(".sectiontextbox").each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("come-in");
        }
    });
    HomepageNavigationCheck();
});

var win = $(window);
var allMods = $(".sectiontextbox");

// Already visible modules
allMods.each(function (i, el) {
    var el = $(el);
    if (el.visible(true)) {
        el.addClass("already-visible");
    }
});

win.scroll(function (event) {

    allMods.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("come-in");
        }
    });

});

function HomepageNavigationCheck() {
    
    var topscrol = $(window).scrollTop();
    var winheight = $(window).height();

    if (topscrol > winheight) {
        var navigationstyle = $('#navigationbox').attr('style');
        if (navigationstyle.indexOf('block') > -1)
        {
            HideMenu();
        }
        $('header').attr('style', 'position:fixed !important;');


    }
    else if (topscrol == 0) {
        $('header').attr('style', '');
    }
}

