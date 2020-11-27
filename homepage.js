$(document).ready(function () {

});

$(window).load(function () {
    
});

$(function () {
    if ($('#rsvp').html() == '1')
    {
        $('#contactform').html('<div id="thankyoumsg"><h1>Thank you</h1><br/>A member of our team will be in touch with you shortly.<br/><hr><img src="/gfx/agent-logo.jpg" style="text-align:center;height:auto;width:100%;margin: 5px auto 40px auto;max-width: 435px;"></div><div id="tracydetails3"><p><a id="mailform" href="mailto:sales@thebryanston.co.uk">sales@thebryanston.co.uk</a><br/><a id="phoneform" href="tel:0044020275352826">+44 (0) 20 7535 2826</a><br/><br/><a id="homeid" href="/">Home</a>');
        location.hash = "#contactform";
    }
});

function LiClick(ddname, valueli)
{
    //alert('bbbbb');

    var valuelidis = valueli.substr(valueli.indexOf("|") + 1);

    //alert(valueli);

    $('#h' + ddname + 'd').val(valueli);
    $('#' + ddname).html(valuelidis);
    $("." + ddname + "d").attr('style', '');

    var oldclass = $('#h' + ddname + 'd').parent().attr('class');
    $('#h' + ddname + 'd').parent().attr('class', oldclass + " filled");

}