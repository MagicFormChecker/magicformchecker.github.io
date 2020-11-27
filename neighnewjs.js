var mapopened = "educa";
var counterspark;

$(function () {


    var heightnav = $("#slideshow").height;
    $('#slideshowbox').attr('style', 'height:' + heightnav);

    $('#maplistitems').attr('style', 'height:' + $('#maplistitems').height() + 'px;');

    VideoWidth();

    $(window).on('resize', function () {
        VideoWidth();
    });
});

function MapInteract(maptoopen)
{
    $('#map' + mapopened).attr('class', '');
    $('#maplist' + mapopened).attr('class', '');
    $('#menuitem' + mapopened).attr('class', '');

    $('#map' + maptoopen).attr('class', 'selected');    
    $('#map' + maptoopen).attr('style', 'opacity: 0;filter: alpha(opacity = 0);');

    $('#maplist' + maptoopen).attr('class', 'selected');
    $('#maplist' + maptoopen + ' li').each(function () {
        $(this).attr('style', 'display:none');
    });

    $('#menuitem' + maptoopen).attr('class', 'activemap');


    $('#map' + maptoopen).delay(400).animate({
        opacity: "1",
        filter: "alpha(opacity = 100)"
    }, 500);

    var counter = 1;
    $('#maplist' + maptoopen + ' li').each(function () {
        var timeextra = counter * 200;
        $(this).delay(timeextra).fadeIn();
        counter++;
    });

    mapopened = maptoopen;
}

function VideoWidth()
{
    var videow = $(window).width();
    var videoh = (videow * 1080) / 1920;

    $('#neighvideo').attr('width', videow).attr('height', videoh);
}

function MapClick(itemclick)
{
    var desktop, deskleft;
    var mobleft;
    
    switch(itemclick)
    {
        case "Edu1": desktop = "11.6"; deskleft = "13.95"; mobleft = "-10vh"; break;
        case "Edu2": desktop = "9.6"; deskleft = "26.35"; mobleft = "-43vh"; break;
        case "Edu3": desktop = "14"; deskleft = "35.15"; mobleft = "-70vh"; break;
        case "Edu4": desktop = "22.2"; deskleft = "41.95"; mobleft = "-88vh"; break;
        case "Edu5": desktop = "22.6"; deskleft = "50.9"; mobleft = "-110vh"; break;
        case "Edu6": desktop = "32.1"; deskleft = "37"; mobleft = "-75vh"; break;
        case "Edu7": desktop = "32.5"; deskleft = "13.65"; mobleft = "-9vh"; break;
        case "Edu8": desktop = "28.8"; deskleft = "13.45"; mobleft = "-9vh"; break;
        case "Edu9": desktop = "25.8"; deskleft = "17.3";  mobleft = "-17vh"; break;
        case "Edu10": desktop = "23.85"; deskleft = "14.2"; mobleft = "-10vh"; break;

        case "Cul1": desktop = "8.1"; deskleft = "21.1"; mobleft = "-29vh"; break;
        case "Cul2": desktop = "13.2"; deskleft = "25.2"; mobleft = "-40vh"; break;
        case "Cul3": desktop = "18.5"; deskleft = "31.25"; mobleft = "-59vh"; break;
        case "Cul4": desktop = "20.2"; deskleft = "39.7"; mobleft = "-84vh"; break;
        case "Cul5": desktop = "26.25"; deskleft = "39.55"; mobleft = "-84vh"; break;
        case "Cul6": desktop = "26.75"; deskleft = "44.15"; mobleft = "-96vh"; break;
        case "Cul7": desktop = "28.75"; deskleft = "51.86"; mobleft = "-116vh"; break;
        case "Cul8": desktop = "28.75"; deskleft = "56"; mobleft = "-129vh"; break;

        case "Rec1": desktop = "14.95"; deskleft = "10.4"; mobleft = "0vh"; break;
        case "Rec2": desktop = "12.89"; deskleft = "21.67"; mobleft = "-33vh"; break;
        case "Rec3": desktop = "14.3"; deskleft = "33.55"; mobleft = "-65vh"; break;
        case "Rec4": desktop = "1.7"; deskleft = "45.95"; mobleft = "-99vh"; break;
        case "Rec5": desktop = "13.36"; deskleft = "39.78"; mobleft = "-83vh"; break;
        case "Rec6": desktop = "11.05"; deskleft = "51.8"; mobleft = "-116vh"; break;
        case "Rec7": desktop = "27.65"; deskleft = "27.85"; mobleft = "-49vh"; break;
        case "Rec8": desktop = "30.95"; deskleft = "24.62"; mobleft = "-39vh"; break;
        case "Rec9": desktop = "30.05"; deskleft = "22.21"; mobleft = "-33vh"; break;
        case "Rec10": desktop = "31.55"; deskleft = "16.7"; mobleft = "-15vh"; break;

        case "Del1": desktop = "9.63"; deskleft = "24.65"; mobleft = "-39vh"; break;
        case "Del2": desktop = "8.15"; deskleft = "34.84"; mobleft = "-69vh"; break;
        case "Del3": desktop = "10"; deskleft = "32.97"; mobleft = "-66vh"; break;
        case "Del4": desktop = "10.65"; deskleft = "31.83"; mobleft = "-61vh"; break;
        case "Del5": desktop = "11.62"; deskleft = "30.93"; mobleft = "-59vh"; break;
        case "Del6": desktop = "11.3"; deskleft = "32.5"; mobleft = "-63vh"; break;
        case "Del7": desktop = "11.95"; deskleft = "33.12"; mobleft = "-65vh"; break;
        case "Del8": desktop = "12.6"; deskleft = "33.75"; mobleft = "-66vh"; break;
        case "Del9": desktop = "25.4"; deskleft = "29.2"; mobleft = "-52vh"; break;
        case "Del10": desktop = "23.9"; deskleft = "26.19"; mobleft = "-43vh"; break;
        case "Del11": desktop = "23.7"; deskleft = "25.1"; mobleft = "-39vh"; break;
        case "Del12": desktop = "22.15"; deskleft = "14.4"; mobleft = "-10vh"; break;
            
        case "Sho1": desktop = "10.6"; deskleft = "31.95"; mobleft = "-63vh"; break;
        case "Sho2": desktop = "11.8"; deskleft = "33.2"; mobleft = "-65vh"; break;
        case "Sho3": desktop = "13.2"; deskleft = "34.65"; mobleft = "-69vh"; break;
        case "Sho4": desktop = "26.1"; deskleft = "36.3"; mobleft = "-73vh"; break;
        case "Sho5": desktop = "26.85"; deskleft = "37.05"; mobleft = "-74vh"; break;
        case "Sho6": desktop = "31.25"; deskleft = "37.9"; mobleft = "-77vh"; break;
        case "Sho7": desktop = "28.25"; deskleft = "35.63"; mobleft = "-72vh"; break;
        case "Sho8": desktop = "27.85"; deskleft = "32.7"; mobleft = "-62vh"; break;
        case "Sho9": desktop = "27.1"; deskleft = "29.6"; mobleft = "-51vh"; break;
        case "Sho10": desktop = "27.7"; deskleft = "19.95"; mobleft = "-26vh"; break; 

        case "Res1": desktop = "8.95"; deskleft = "31.1"; mobleft = "-58vh"; break;
        case "Res2": desktop = "10.8"; deskleft = "33.75"; mobleft = "-68vh"; break;
        case "Res3": desktop = "11.9"; deskleft = "34.75"; mobleft = "-69vh"; break;
        case "Res4": desktop = "18.7"; deskleft = "31.25"; mobleft = "-58vh"; break;
        case "Res5": desktop = "26"; deskleft = "36.45"; mobleft = "-73vh"; break;
        case "Res6": desktop = "22.9"; deskleft = "29.95"; mobleft = "-54vh"; break;
        case "Res7": desktop = "26.7"; deskleft = "28.8"; mobleft = "-50vh"; break;
        case "Res8": desktop = "24.05"; deskleft = "26.15"; mobleft = "-44vh"; break;
        case "Res9": desktop = "29.8"; deskleft = "22.1"; mobleft = "-32vh"; break;
        case "Res10": desktop = "31.85"; deskleft = "20.8"; mobleft = "-30vh"; break;
        case "Res11": desktop = "29.3"; deskleft = "21"; mobleft = "-30vh"; break;
        case "Res12": desktop = "27.25"; deskleft = "18.85"; mobleft = "-24vh"; break;
        case "Res13": desktop = "25"; deskleft = "19.8"; mobleft = "-26vh"; break;

        case "Hot1": desktop = "6.95"; deskleft = "11.05"; mobleft = "-1vh"; break;
        case "Hot2": desktop = "17.05"; deskleft = "34.45"; mobleft = "-67vh"; break;
        case "Hot3": desktop = "25.2"; deskleft = "41.75"; mobleft = "-87vh"; break;
        case "Hot4": desktop = "27.3"; deskleft = "42.2"; mobleft = "-87vh"; break;
        case "Hot5": desktop = "29.7"; deskleft = "41.55"; mobleft = "-87vh"; break;
        case "Hot6": desktop = "25.1"; deskleft = "19.65"; mobleft = "-24vh"; break;
        case "Hot7": desktop = "21.25"; deskleft = "21.3"; mobleft = "-29vh"; break;
    }

    if ($(window).width() > 1070) {


        $('#dothighlightmap').attr('style', 'margin-top:calc(' + desktop + '% - 11px);margin-left:calc(' + deskleft + '% - 11px);display:block;');

        counterspark = 0;

        setTimeout("HighLigtSpark1();", 100);
    }
    else
    {
        $('#interactivemapmap').fadeIn();
        $('#interactivemapmap img.selected').attr('style', 'left:' + mobleft + ';position:relative;');
        $('#interactivemapmap img').draggable();
        $('#closemapmob').fadeIn();
    }
}

function CloseMapMobile()
{
    $('#interactivemapmap').fadeOut();
    $('#closemapmob').fadeOut();
}

function HighLigtSpark1()
{
    $('#dothighlightmap').animate({
        opacity: "0.8",
        filter: "alpha(opacity=80)"
    }, 200);

    setTimeout("HighLigtSpark2();", 500);
}

function HighLigtSpark2() {
    $('#dothighlightmap').animate({
        opacity: "0.1",
        filter: "alpha(opacity=10)"
    }, 300);

    counterspark++;

    if (counterspark < 3)
    {
        setTimeout("HighLigtSpark1();", 300);
    }
    else
    {
        setTimeout("HighLigtSparkEnd();", 300);
    }
}

function HighLigtSparkEnd() {
    $('#dothighlightmap').animate({
        opacity: "0",
        filter: "alpha(opacity=0)"
    }, 500);
}