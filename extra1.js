var isfirstvideo = 0;
var mainvideoshowing = 1;
var videotextleft = 15;
var videotextposition = 1;
var holdingsheight;
var smallphonefv = 1;

$(document).ready(function () {
    

    LoadHomeVideo();

    if ($(window).width() < 725)
    {
        FooterNavigationSpread();
    }
    else
    {
        $("#footernav li:nth-child(2)").attr('style', '');
        $("#footernav li:nth-child(4)").attr('style', '');
    }

    if ($(window).width() < 1330)
    {
        setTimeout("FooterLogoSpread();", 500);
    }
    else
    {
        $(".imgfooter a:nth-child(2) img").attr('style', '');
        $(".imgfooter a:nth-child(3) img").attr('style', '');
        $(".imgfooter a:nth-child(4) img").attr('style', '');
    }
});

$(window).load(function () {
    
});

$(function () {
    $(window).on('resize', function () {
        //LoadHomeVideo();

        HeightAndPositions();
        VideoClassResponsive();
        if ($(window).width() < 725)
        {
            FooterNavigationSpread();
        }
        else
        {
            $("#footernav li:nth-child(2)").attr('style', '');
            $("#footernav li:nth-child(4)").attr('style', '');
        }

        if ($(window).width() < 1330)
        {
            FooterLogoSpread();
        }
        else
        {
            $(".imgfooter a:nth-child(2) img").attr('style', '');
            $(".imgfooter a:nth-child(3) img").attr('style', '');
            $(".imgfooter a:nth-child(4) img").attr('style', '');
        }
    });

    $("#fcountry").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'Get',
                url: '/CountryJson.aspx?searchPhrase=' + request.term,
                dataType: 'json',
                error: function (xhr, textStatus, errorThrown) {
                },
                success: function (result) {
                    response(result);
                }
            });
        },
        minLength: 3,
        focus: function (event, ui) {
            this.value = ui.item.value;
            $('#hcountryId').val(ui.item.id + '|' + ui.item.value);
            return false;
        },
        select: function (event, ui) {
            this.value = ui.item.value;
            $('#hcountryId').val(ui.item.id + '|' + ui.item.value);

            return false;
        }
    });

    if ($(window).width() < 730)
    {
        setTimeout("RosseteAnimationHead()", 5000);
    }

    CountryCharacIds();

    VideoClassResponsive();
    
    $(window).keypress(function (keyp) {
        if ($('.countryd').is(":visible")) {
            var searchletter = String.fromCharCode(keyp.which).toUpperCase();;

            $('.countryd').animate({
                scrollTop: $('#' + searchletter).position().top - 35
            }, 500);
        }
    });

});

function VideoClassResponsive()
{
    if ($(window).width() < 765)
    {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
        {

        }
        else
        {
            $('#mainhomevideo1').attr('class', 'mobiledesktop');
            $('#mainhomevideo2').attr('class', 'mobiledesktop');
        }
    }
}

function LoadMobileVideo()
{
    $('#mainhomevideo1').html("<source src=\"/media/mobile.mp4\" type=\"video/mp4\">");
    $('#mainhomevideo1').attr("loop","true");

    $('#mainhomevideo1').show();
    $('#mainhomevideo2').hide();

    HeightAndPositions();
    LoadMobileVideoText(1);
}

function LoadMobileVideoText(opt)
{
    var videoname2 = "";

    switch (opt) {
        case 1: videoname2 = "nature"; break;
        case 2: videoname2 = "indulgence"; break;
        case 3: videoname2 = "creation"; break;
        case 4: videoname2 = "nature"; break;
        case 5: videoname2 = "indulgence"; break;
        case 6: videoname2 = "creation"; break;
        case 7: videoname2 = "nature"; break;
        case 8: videoname2 = "indulgence"; break;
        case 9: videoname2 = "creation"; break;
    }

    $('#overvideoby').html("by " + videoname2 + ".");

    var newopt = parseInt(opt);
    newopt++;
    if (newopt == 10) { newopt = 1; }

    setTimeout("LoadMobileVideoText(" + newopt + ")", 5200);
}

function LoadHomeVideo()
{
    //get sizes

    HeightAndPositions();

    // select random video
    var videoid = 2;
        //Math.floor((Math.random() * 9) + 1);

    isfirstvideo = 1;
    
    PlayVideo(videoid);
}

function HeightAndPositions()
{

    var heightwindow = $(window).height();
    var widthwindow = $(window).width();

    var winwid = $(window).width();
    var winhei = $(window).height();

    setTimeout("FooterLogosPosition();", 200);

    /*$('#mainhomevideo1').attr('width', winwid).attr('height', winhei);
    $('#mainhomevideo2').attr('width', winwid).attr('height', winhei);*/

    
    $('#videocontainer').attr('width', winwid).attr('height', winhei);

    /*** calculate video height to dont have spaces ****/

    var potencialvideowidth;
    if (winwid > 765) {
        potencialvideowidth = (winhei * 3840) / 2160;
    }
    else
    {
        potencialvideowidth = (winhei * 414) / 736;
    }
    var videowid;
    var videohei;

    if (winwid > 765)
    {
        if (potencialvideowidth > winwid)
        {
            videohei = winhei;
            videowid = potencialvideowidth;
        }
        else
        {
            videowid = winwid;
            videohei = (winwid * 2160) / 3840;
        }
    }
    else
    {
        if (potencialvideowidth > winwid) {
            videohei = winhei;
            videowid = potencialvideowidth;
        }
        else {
            videowid = winwid;
            videohei = (winwid * 736) / 414;
        }
    }

    $('#mainhomevideo1').attr('width', videowid).attr('height', videohei);
    $('#mainhomevideo2').attr('width', videowid).attr('height', videohei);

    /*************/



    var widthregister = $("#registerlink").width() + 34;
    var widthscreen = $(window).width();
    var resolutleft = (widthscreen / 2) - (widthregister / 2);

    $("#registerlink").attr('style', 'left:' + resolutleft + 'px');

    //alert(resolutleft);

    var headerheight = $("header").height();


    //alert(resolutleft);
    setTimeout("RegisterPosi('" + winwid + "','" + headerheight + "','" + winhei + "');", 100);

    //alert(holdingsheight);
}

function RegisterPosi(winwid, headerheight, winhei) {


    if (winwid > 768) {
        holdingsheight = (winhei - $('#logoandnav').height()) + 20;
        //$('#textovervideodiv').attr('style', 'padding-top:' + (holdingsheight * 0.25) + 'px;');
    }
    else {
        holdingsheight = winhei - headerheight;
        videotextposition = 8;
        
        if ($(window).height() < 485)
        {
            $('#textovervideodiv').attr('style', 'padding-top:20px;');
        }
        else
        {
            $('#textovervideodiv').attr('style', 'padding-top:' + (holdingsheight * 0.4) + 'px;');
            
        }

    }

    $('#holdingvideospace').attr('style', 'width: ' + winwid + 'px; height:' + holdingsheight + 'px;');
}

function FooterLogosPosition()
{

    var widthwindow = $(window).width();
    var imgwidth = $(".imgfooter").width();
    // alert(imgwidth);

    var testwidth = (widthwindow / 2) - (imgwidth / 2);

    $('.imgfooter').attr('style', 'margin-left:' + testwidth + 'px');
}

function ScrollAnimationBrywnston()
{
    var winhei = $(window).height() + 20;

    //alert(winwid);

    $('html, body').animate({
        scrollTop: winhei
    }, 1000);

}

function PlayVideo(opt) {
    /*if (isfirstvideo == 0) {
        $('#mainhomevideo').fadeOut(500);
    }*/

    //alert(opt);

    //opt = 4;

    var videoname1 = "";
    var videoname2 = "";

    switch (opt)
    {
        case 1:
            videoname1 = "City1.mp4";
            videoname2 = "indulgence";
            break;
        case 2:
            videoname1 = "Design1.mp4";
            videoname2 = "creation";
            break;
        case 3:
            videoname1 = "Park1.mp4";
            videoname2 = "nature";
            break;
        case 4:
            videoname1 = "City2.mp4";
            videoname2 = "indulgence";
            break;
        case 5:
            videoname1 = "Design2.mp4";
            videoname2 = "creation";
            break;
        case 6:
            videoname1 = "Park2.mp4";
            videoname2 = "nature";
            break;
        case 7:
            videoname1 = "City3.mp4";
            videoname2 = "indulgence";
            break;
        case 8:
            videoname1 = "Design3.mp4";
            videoname2 = "creation";
            break;
        case 9:
            videoname1 = "Park3.mp4";
            videoname2 = "nature";
            break;
    }

    var newvideoid;

    if (mainvideoshowing == 1) { newvideoid = 2; }
    else { newvideoid = 1; }

    if (($(window).width() < 765) && (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)))
    {
        videoname1 = "Mob" + videoname1;    
    }

    $('#mainhomevideo' + mainvideoshowing).html("<source src=\"/media/" + videoname1 + "\" type=\"video/mp4\">");
    if (isfirstvideo == 0)
    {
        $('#mainhomevideo' + mainvideoshowing).load();
        setTimeout("FedaInVideo(" + mainvideoshowing + ");", 100);
    }
    else
    {
        $('#mainhomevideo1').show();
        $('#mainhomevideo2').hide();
    }
    
    setTimeout("ChangeVideoSlogan('" + videoname2 + "');", 700);

    
    if (isfirstvideo == 0)
    {
        setTimeout("FedaOutVideo(" + newvideoid + ");", 500);
    }


    isfirstvideo = 0;
    if (mainvideoshowing == 1) { mainvideoshowing = 2; }
    else { mainvideoshowing = 1; }

    var newopt = parseInt(opt);
    newopt++;
    if (newopt == 10) { newopt = 1; }

    setTimeout("PlayVideo(" + newopt + ")", 4200);

}

function FedaOutVideo(newvideoid)
{
    $('#mainhomevideo' + newvideoid).fadeOut(700);
    //alert('fadeout');
}

function FedaInVideo(mainvideoshowing)
{
    $('#mainhomevideo' + mainvideoshowing).fadeIn(700);
    //alert('fadein');
}

function ChangeVideoSlogan(videoname2)
{
    $('#overvideoby').html("by " + videoname2 + ".");

    if ($(window).width() > 768)
    {
        $('#textovervideodiv').attr('style', 'padding-top:' + (holdingsheight * 0.25) + 'px; margin-left:15%;');
    }

    /*var texttop, textleft;

    switch (videotextposition) {
        case 1:
            texttop = holdingsheight * 0.25;
            textleft = 15;
            break;
        case 2:
            texttop = holdingsheight * 0.05;
            textleft = 55;
            break;
        case 3:
            texttop = holdingsheight * 0.55;
            textleft = 15;
            break;
        case 4:
            texttop = holdingsheight * 0.25;
            textleft = 55;
            break;
        case 5:
            texttop = holdingsheight * 0.05;
            textleft = 15;
            break;
        case 6:
            texttop = holdingsheight * 0.55;
            textleft = 55;
            break;
        default:
            texttop = holdingsheight * 0.4;
            textleft = 15;
            break;
    }

    if ($(window).width() > 768 && $(window).height() > 810)
    {
        $('#textovervideodiv').attr('style', 'padding-top:' + texttop + 'px; margin-left:' + textleft + '%;');

        videotextposition++;
    }
    else if ($(window).width() > 768)
    {
        $('#textovervideodiv').attr('style', 'padding-top:' + (holdingsheight * 0.25) + 'px; margin-left:15%;');
    }*/


    if (videotextposition == 7) { videotextposition = 1; }


}

function RosseteAnimationHead()
{
    var originalheight = $('#logo').height() + 10;
    var originalwidth = $('#logo').width();
    
    $('#logo').attr('style', 'overflow:hidden; width:' + originalwidth + 'px;margin-bottom:55px;opacity:1; filter:alpha(opacity=100);');

    var newholdingheight = $('#holdingvideospace').height() + 95;

    $('#logo').animate({
        opacity: '0',
        filter:"alpha(opacity=0)"
    }, 800);

    setTimeout("RosseteAnimationHead2();", 900);
}

function RosseteAnimationHead2()
{

    $('#logo').animate({
        width: '40px',
        marginBottom: '90px',
        marginTop: '-60px',
        marginLeft: '15px',
        height: '70px'
    }, 100);

    $('#logo img').animate({
        marginLeft: '-95px'
    }, 100);

    if ($(window).height() < 485)
    {
        $('#textovervideodiv').animate({
            paddingTop: '20px',
            opacity: '1',
            filter: 'alpha(opacity=100)'
        }, 100);
    }

    setTimeout("RosseteAnimationHead3();", 100);
}

function RosseteAnimationHead3()
{
    $('#logo').animate({
        opacity: '1',
        filter: "alpha(opacity=100)"
    }, 800);
}

function FooterNavigationSpread()
{


    var totalliwidth = 0;

    $("#footernav li").each(function ()
    {
        totalliwidth += $(this).width();
    });

    totalliwidth = ((($(window).width() * 0.84) - totalliwidth) / 4);

    totalliwidth = totalliwidth - 0.5;

    $("#footernav li:nth-child(2)").attr('style', 'margin:0px ' + totalliwidth + 'px !important;');
    $("#footernav li:nth-child(4)").attr('style', 'margin:0px ' + totalliwidth + 'px !important;');
}

function FooterLogoSpread()
{
    var winwidthlogo = $(window).width() * 0.84;
    var iscorrect = 0;
    var imgheight = 52;
    var midimgspace = 0;

    //alert('inicio: ' + winwidthlogo);

    while (iscorrect == 0)
    {
        imgheight = imgheight - 1;

        $(".imgfooter a:nth-child(2) img").attr('style', 'height:' + imgheight + 'px;');
        $(".imgfooter a:nth-child(3) img").attr('style', 'height:' + imgheight + 'px;');
        $(".imgfooter a:nth-child(4) img").attr('style', 'height:' + imgheight + 'px;');

        var totalimgwidth = $(".imgfooter a:nth-child(2) img").width() + $(".imgfooter a:nth-child(3) img").width() +
        $(".imgfooter a:nth-child(4) img").width() + 60;



        if (totalimgwidth <= winwidthlogo)
        {
            midimgspace = (winwidthlogo - (totalimgwidth - 60)) / 2;
            iscorrect = 1;
        }
    }

    //alert('comprob - h:' + imgheight + ' - wind: ' + winwidthlogo + ' - imgs: ' + totalimgwidth);

    var previousstyle = $(".imgfooter a:nth-child(3) img").attr('style');

    $(".imgfooter a:nth-child(3) img").attr('style', previousstyle + "margin-left:" + midimgspace + "px; margin-right:" + midimgspace + "px;");

}

function CountryCharacIds() {
    var myletter = "1";
    var counter = 1;

    $("#countrycontent ul li").each(function () {
        var checking = $(this).children("a").html().substring(0, 1);
        if (myletter != checking) {
            $(this).attr("id", checking);
            myletter = checking;
            $(this).attr("class", counter);
        }
        counter++;

    });
}
