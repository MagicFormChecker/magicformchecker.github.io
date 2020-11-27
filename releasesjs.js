$(function () {
   /* $('.imagemap').maphilight();

    $(window).on('resize', function () {
        $('.imagemap').maphilight();
    });*/

    CheckResponsiveTable();

    $(window).resize(function () {
        CheckResponsiveTable();
    });
});


function OpenAcordeon(numberdiv)
{
    var newheight = $('#acordeon' + numberdiv + ' div').height() + 30;
    $('#acordeon' + numberdiv).animate({
        height: newheight + "px"
    }, 500);

    $('#tacordeon' + numberdiv).attr('href', 'javascript:CloseAcordeon(' + numberdiv + ');');

    $('#tacordeon' + numberdiv).attr("style", "background-image:url(/gfx/gold.png);");
    
}

function CloseAcordeon(numberdiv)
{
    $('#acordeon' + numberdiv).animate({
        height: "0px"
    }, 500);

    $('#tacordeon' + numberdiv).attr('href', 'javascript:OpenAcordeon(' + numberdiv + ');');
    $('#tacordeon' + numberdiv).attr("style", "background-image:url(/gfx/arrowdownwhite.png);");
    
}

function OpenSubAcordeon(numberdiv, parentdiv) {

    var urlreleases = window.location.pathname;


    var newheight = $('#acordeon' + numberdiv + ' div').height() + 30;
    
    $('#acordeon' + numberdiv).attr('style', 'height:' + newheight + 'px;');
    var newnumber = numberdiv.toString().split('').pop();
    // alert(newnumber);

    if (urlreleases == "/currently-released") {
        $('#tacordeon' + numberdiv + ' span:last-child').attr("style", "background-image:url(/gfx/gold.png);");

    } else {
        $('#tacordeon' + numberdiv + ' span:last-child').attr("style", "background-image:url(/gfx/gold.png);");

    }
    
   

    /*$('#acordeon' + numberdiv).animate({
        height: newheight + "px"
    }, 500);*/

    var newparentheight = $('#acordeon' + parentdiv + ' div').height() + 30;
    $('#acordeon' + parentdiv).animate({
        height: newparentheight + "px"
    }, 500);


    $('#tacordeon' + numberdiv).attr('href', 'javascript:CloseSubAcordeon(' + numberdiv + ',' + parentdiv + ');');
}

function CloseSubAcordeon(numberdiv, parentdiv)
{
    var urlreleases = window.location.pathname;

    $('#acordeon' + numberdiv).attr('style', '');

    var newheight = $('#acordeon' + parentdiv + ' div').height() + 30;
    $('#acordeon' + parentdiv).animate({
        height: newheight + "px"
    }, 500);

    $('#tacordeon' + numberdiv + ' span:last-child').attr("style", "background-image:url(/gfx/arrowdown.png);");
    
    $('#tacordeon' + numberdiv).attr('href', 'javascript:OpenSubAcordeon(' + numberdiv + ',' + parentdiv + ');');

    if (urlreleases == "/currently-released")
    {
        $('#tacordeon' + numberdiv + ' span:last-child').attr("style", "background-image:url(/gfx/arrowdownwhite.png);");
    }
}

function OverFloorplan(areaid)
{
    $('#area' + areaid).fadeIn();
    $('#mapzone' + areaid).attr('style','display:block;background-color:red');
}

function OutFloorplan(areaid)
{
    $('#area' + areaid).fadeOut();
    $('#mapzone' + areaid).attr('style', '');
}

function CheckResponsiveTable()
{
    var mywidth = $(window).width();

    if (mywidth < 830)
    {
        $('.tableheadings span:first-child').html('apt');
        $('.tableheadings span:nth-child(4)').html('int Area');
    }
    else
    {
        $('.tableheadings span:first-child').html('apartment');
        $('.tableheadings span:nth-child(4)').html('internal Area');
    }

    if (mywidth < 500)
    {
        //console.log('menor de 500');
        $('.subtitleacordeon2 span:nth-child(4)').each(function () {
            var myhtml = $(this).html();
            console.log('each: ' + myhtml);

            if (myhtml.indexOf('sq') > -1)
            {
                myhtml = myhtml.replace('sq ft', '');
                //console.log('cambio: ' + myhtml);
                $(this).html(myhtml);
            }
        });
    }
    else
    {
        //console.log('mayor de 500');
        $('.subtitleacordeon2 span:nth-child(4)').each(function () {
            var myhtml = $(this).html();
            console.log('each: ' + myhtml);
            if (myhtml.indexOf('sq') == -1) {
                myhtml += 'sq ft';
                //console.log('cambio: ' + myhtml);
                $(this).html(myhtml);
            }
        });
    }

}