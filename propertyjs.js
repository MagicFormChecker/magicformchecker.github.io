var responsivecheckermasterplan = 0;

$(function () {
   /* $('.imagemap').maphilight();

    $(window).on('resize', function () {
        $('.imagemap').maphilight();
    });*/

    ShowMasterPlan();

    /*$(window).on('resize', function ()
    {
        //alert('w: ' + $(window).width() + '---' + responsivecheckermasterplan);

        if ($(window).width() > 1315 && responsivecheckermasterplan == 2)
        {
            MasterPlanResponAmmend('todesktop');
        }
        else if($(window).width() < 1315 && responsivecheckermasterplan == 1)
        {
            MasterPlanResponAmmend('tomobile');
        }

    });*/

});


function OpenAcordeon(numberdiv)
{
    var newheight = $('#acordeon' + numberdiv + ' div').height() + 30;
    $('#acordeon' + numberdiv).animate({
        height: newheight + "px"
    }, 500);

    $('#tacordeon' + numberdiv).attr('href', 'javascript:CloseAcordeon(' + numberdiv + ');');

    $('#tacordeon' + numberdiv).attr("style", "background-image:url(/gfx/goldold.png);");
    
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
        $('#tacordeon' + numberdiv + ' span:last-child').attr("style", "background-image:url(/gfx/goldold.png);");

    } else {
        $('#tacordeon' + numberdiv + ' span:last-child').attr("style", "background-image:url(/gfx/goldold.png);");

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

function ShowMasterPlan()
{
    if ($(window).width() > 985)
    {
        //responsivecheckermasterplan = 1;

        setTimeout("$('#gardenbox').fadeIn();", 300);
        setTimeout("$('#gardeninside').fadeIn();", 350);
        setTimeout("$('#masterplanpink').fadeIn();", 900);
        setTimeout("$('#apartmentbox').fadeIn();", 1200);
        setTimeout("$('#apartmentboxcontent').fadeIn();", 1500);
        setTimeout("$('#masterplanblue').fadeIn();", 1800);
        setTimeout("$('#townhousebox').fadeIn();", 2100);
        setTimeout("$('#townhouseinside').fadeIn();", 2150);
        setTimeout("$('#parkingbox').fadeIn();", 2700);
        setTimeout("$('#parkinginside').fadeIn();", 3000);

        setTimeout("$('#masterplan').attr('class','mastercomplete');", 3001);
    }
    else
    {
        //responsivecheckermasterplan = 2;
        MasterPlanMobile();
        setTimeout("$('#masterplan').attr('class','mastercomplete')", 300);
    }
}

function MasterPlanMobile()
{
    var section = $('#body > div.col div.ptypemain.property > h1').html();

    $('#masterplanpink').fadeIn();
    $('#masterplanblue').fadeIn();
    
    switch(section)
    {
        case "Townhouses":
            $('#townhousebox').attr('class', 'musttoshow');
            $('#townhouseinside').attr('class', 'musttoshow');
            break;
        case "Duplex Penthouses":
            $('#apartmentboxcontent').attr('class', 'musttoshow');
            break;
        case "Apartments":
            $('#apartmentboxcontent').attr('class', 'musttoshow');
            break;
    }

}
