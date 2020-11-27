var timer;

$(document).ready(function () {
    
    var winwi = $(window).width();

    if ($('body').hasClass('pg1129') || $('body').hasClass('pg1130') || $('body').hasClass('pg1131'))
    {
        $("#contentbox").attr("style", "position:absolute;z-index:999999;background-color:white;margin-top:0px;padding-top:100px;width:" + winwi + "px");
        $("#footernavs").attr("style", "display:none;");
        $(".execlose").attr("style", "display:block;");
    }
    else
    {
        $("#body > .col > .row:first-child").attr('style', 'height:' + $(window).height() + 'px;');
    }
    

    if (winwi > 830) {
        //townhouses
        $("#ctl00_Header1_s_townhouses").mouseover(function ()
        {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxestownhouses.png)");
        });
        $("#ctl00_Header1_s_townhouses").mouseout(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxes.png)");
        });
        //register
        $("#ctl00_Header1_s_register").mouseover(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxesregister.png)");
        });
        $("#ctl00_Header1_s_register").mouseout(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxes.png)");
        });
        //Duplex
        $("#ctl00_Header1_s_duplex-penthouse").mouseover(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxesduplex.png)");
        });
        $("#ctl00_Header1_s_duplex-penthouse").mouseout(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxes.png)");
        });
        //Apartments
        $("#ctl00_Header1_s_apartments").mouseover(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxesapartments.png)");
        });
        $("#ctl00_Header1_s_apartments").mouseout(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxes.png)");
        });
        //Neightbour
        $("#ctl00_Header1_s_neighbourhood").mouseover(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxesneighbourhood.png)");
        });
        $("#ctl00_Header1_s_neighbourhood").mouseout(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxes.png)");
        });
        //Team
        $("#ctl00_Header1_s_team").mouseover(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxesteam.png)");
        });
        $("#ctl00_Header1_s_team").mouseout(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxes.png)");
        });
        //Currently
        $("#ctl00_Header1_s_currently-released").mouseover(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxescurrently.png)");
        });
        $("#ctl00_Header1_s_currently-released").mouseout(function () {
            $("#navigationbox nav").attr("style", "background-image:url(/gfx/navigationboxes.png)");
        });
    }

    if ($('body').hasClass('pg1111'))
    {
        ShowMenu();
    }


    $("#contactform div ul li input").keypress(function () {
        
        if ($(this).attr('name') != "finterested") {
            var aaa = $(this).val();
            var bbb = aaa.length;

            //alert(aaa + ' -- ' + bbb);
            if (bbb > 0) {
                if (!$(this).parent().hasClass('filled')) {
                    $(this).parent().attr('class', $(this).parent().attr('class') + ' filled');
                }
            }
            else {
                $(this).parent().attr('class', $(this).parent().attr('class'));
            }
        }
    
    });

    $("#contactform div ul li textarea").keypress(function () {
        var aaa = $(this).val();
        var bbb = aaa.length;
       // alert(aaa + ' -- ' + bbb);
        if (bbb > 0)
        {
            $(this).parent().attr('class', $(this).parent().attr('class') + ' filled');
        }
        else {
            $(this).parent().attr('class', $(this).parent().attr('class'));
        }
    });

    PreFilledLogin();

    $("#termscheckbox").click(function (event) {
        var prevval = $('#inputcheckterms').val();

        if (prevval == "yes") {
            $('#termscheckbox').attr('src', '/gfx/checkboxno.jpg');
            $('#inputcheckterms').val("no");
        }
        else {
            $('#termscheckbox').attr('src', '/gfx/checkboxyes.jpg');
            $('#inputcheckterms').val("yes");
        }
    });

  /*  $(".interested").click(function (event) {
        var interestedid = $(this).attr('id').substr(8);
        var prevval = $('input#' + interestedid).val();

        //alert(interestedid);

        if (prevval == "yes") {
            $(this).attr('src', '/gfx/checkboxno.jpg');
            $('input#' + interestedid).val("no");
        }
        else {
            $(this).attr('src', '/gfx/checkboxyes.jpg');
            $('input#' + interestedid).val("yes");
        }
    });*/

});

function LabelAnimationSelect(dropdownid)
{
    console.log("entraaa");

        var ccc = $("#" + dropdownid).val();
        var bbb = ccc.length;

        if (bbb > 0) {
            $("#" + dropdownid).parent().attr('class', $("#" + dropdownid).parent().attr('class') + ' filled');
        }
        else {
            $("#" + dropdownid).parent().attr('class', $("#" + dropdownid).parent().attr('class'));
        }
    
};

function closecookies() {

    $("#ctl00_cookiepolicyagreediv").fadeOut();

}

function PreFilledLogin() {
    $("#contactform div ul li input").change(function () {
        if ($(this).attr('name') != "finterested") {
            var aaa = $(this).val();
            var bbb = aaa.length;


            //    alert(aaa + ' -- ' + bbb);
            if (bbb > 0) {
                $(this).parent().attr('class', $(this).parent().attr('class') + ' filled');
            }
            else {
                $(this).parent().attr('class', $(this).parent().attr('class'));
            }
        } else {
            //alert($(this).attr("checked"));
            if ($(this).attr("checked") == "checked") {
                $(this).removeAttr('checked');
            } else {

                $(this).attr('checked', true);
            }


        }
    });

$("#contactform div ul li select").each(function () {
        var aaa = $(this).val();
        var bbb = aaa.length;


      //  alert(aaa + ' -- ' + bbb);
        if (bbb > 0) {
            $(this).parent().attr('class', $(this).parent().attr('class') + ' filled');
            
        }
        else {
            $(this).parent().attr('class', $(this).parent().attr('class'));
        }
       
    });

}

$(function ()
{
    var winWidth = $(window).width();
    var winHeight = $('#wrapper').height();

    $('#backtotop a').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });    

    $('.pageitem').click(function ()
    {
        window.location = $(this).attr('id');
    });

    $(window).on( 'scroll', function()
    {
        NavigationCheck();
    });

    NavigationCheck();

    //FooterNavDashes();
});




function HideMenu()
{
    $("#navigationbox").fadeOut();
    $("#showmenu").fadeIn()
    $("#logo2").fadeOut()
    $("#logo").fadeIn()
}

function ShowSearch()
{
    $('#searchfield').fadeIn();
    $('#searchbox > a').attr('href', 'javascript:HideSearch()');
}

function HideSearch()
{
    $('#searchfield').fadeOut();
    $('#searchbox > a').attr('href', 'javascript:ShowSearch()');
}

function ShowMenu() {
    if ($(window).width() > 1300)
    {
        // $("#navigationbox").attr('style', 'height:' + $(window).height() + 'px;');
        var heightnavigationhome = $("#slideshow").height;
        $('#slideshowbox').attr('style', 'height:' + heightnavigationhome);
        //$("#navigationbox").attr('style', 'height:' + $("#slideshowbox").height() + 'px;');
        
    } else {
        //$("#navigationbox").attr('style', 'height:' + $("#slideshow").height() + 'px;');
    }
    if ($('body').hasClass('pg1129') || $('body').hasClass('pg1130') || $('body').hasClass('pg1131')) {

        $("#navigationbox").attr('style', 'height:' + $(window).height() + 'px;');

    }



    /*$('#showmenu img').animate({
        height: "30px"
    }, 200);*/

    $("#navigationbox").attr('style', 'height:' + $(window).height() + 'px;');

    $("#navigationbox").fadeIn()
    $("#showmenu").fadeOut()
    $("#logo2").fadeIn()
    $("#logo").fadeOut()

}

function NavigationCheck()
{
        /*var headerstyletext = $('#logoandnav').attr('style');
        var topscrol = $(window).scrollTop();

        if (headerstyletext.length == 0 && topscrol > 0)
        {
            HeaderStyle("notolock");
        }
        else if (topscrol == 0)
        {
            HeaderStyle("tolock");
        }*/
}




function HeaderStyle(option)
{

    var responsivewidth = $(window).width();

    //$.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());

    if (option == "tolock")
    {
        $('#headerbg').fadeOut(200);
        /*$('#logoandnav').attr('style', '');
        $('#logo img').animate({ height: "67px" }, 200);
        $('#logo').animate({ padding: "29px 0px" }, 200);
        $('#showmenu img').animate({ height: "30px" }, 200);
        /*$('#registerlink2').attr('style', 'display:none;');*/

        /*if ($.browser.webkit)
        {
            $('#showmenu').animate({ marginTop: "20px" }, 200);
        }
        else
        {*/
        if ($(window).width() < 500) {
            //$('#showmenu').animate({ marginTop: "-12px" }, 200);
        }
        //}
        
    }
    else
    {
        $('#headerbg').fadeIn(200);
        /*$('#logoandnav').attr('style','height:auto;');
        $('#logo img').animate({ height: "30px" }, 200);

        if (responsivewidth > 500){

            $('#logo').animate({ padding: "10px 0px" }, 200);

        } else {
            $('#logo').animate({ padding: "20px 0px" }, 200);
        }
        $('#showmenu img').animate({ height: "20px" }, 200);

        /*if ($.browser.chrome) {
            $('#showmenu').animate({ marginTop: "20px" }, 200);
        }
        else {*/
        if ($(window).width() < 500) {
           // $('#showmenu').animate({ marginTop: "-2px" }, 200);
        }
        //}
   
       // $('#registerlink2').attr('style', 'display:block;margin-top:-17px;');

    }
}

function FooterNavDashes()
{

    var footernavcode = $('#footernav').html();
    //alert('aaaaa' + footernavcode);
    var res = footernavcode.split("li><li");

    var newcode = res[0] + "li><li><span>-</span></li><li" + res[1] + "li><li><span>-</span></li><li" + res[2];

    $('#footernav').html(newcode);
}

function SubmitContact()
{     
    $("#titleform2").fadeOut();

    var isOK, postData = 'fsubject=Contact';
    
    var isOK = CheckRequired('contactform', '');
   
    if ($('#ftitle').val() == "" && isOK == '') {
        alert("Please choose your Title. Thank you");
        $('#ftitle').attr("style", "border-bottom: 1px solid red;")
        $('#ftitle').focus();
        isOK = "no";
    }

    
    if ($('#fcountry').val() == "" && isOK == '') {
        alert("Please say your Country of Residence. Thank you");
        $('#fcountry').attr("style", "border-bottom: 1px solid red;")
        $('#fcountry').focus();
        isOK = "no";
    }

    if ($('input.interestedhidden:checked').length == 0) {

        alert("Please choose your Interest. Thank you");
        $('#fenquiry-source').attr("style", "border-bottom: 1px solid red;")
        $('#fenquiry-source').focus();
        isOK = "no";
    }

    if ($('#freason-for-purchase').val() == "" && isOK == '') {
        alert("Please choose Reason For Purchase. Thank you");
        $('#freason-for-purchase').attr("style", "border-bottom: 1px solid red;")
        $('#freason-for-purchase').focus();
        isOK = "no";
    }

    if ($('#fenquiry-source').val() == "" && isOK == '') {
        alert("Please say How Did You Hear About Lyons Place? Thank you");
        $('#fenquiry-source').attr("style", "border-bottom: 1px solid red;")
        $('#fenquiry-source').focus();
        isOK = "no";
    } 

    if ($('#inputcheckterms').prop("checked") != true) {
        alert("Please agree to our Terms and Conditions.");
        isOK = "no";
    }

    if (isOK == '') {
        $("#submitformhome").attr('href', '');

        $('#outcomemsg').html('<img src="/gfx/ajax-loader.gif" alt="processing .."/>');
        $('#outcomemsg').show();

        $('#contactform *').filter(':input').each(function () {
            fieldID = $(this).attr('id');

            if (fieldID != null && fieldID != '' && ($(this).attr('class') != "interestedhidden")) {
                postData += "&" + fieldID + "=" + $(this).val();
            }

        });

        postData += '&interested=';

        $('#rightcontactform input.interestedhidden').each(function () {
            if ($(this).attr('checked') == "checked"){
                postData += $(this).val() + ", ";
            }
        });
        
        var thename = $("#ffirst-name").val() + ' ' + $("#flast-name").val();

     /*   alert(postData);*/

        $.ajax({
            type: 'POST',
            url: '/ProcessForm.aspx',
            data: postData,
            error: function (msg) {
                $("#submitformhome").click(function (event) {
                    event.preventDefault();
                });
                $('#outcomemsg').html('Sorry not able to send your register request at present, please try again later.');
            },
            success: function (msg) {
                $("#submitformhome").click(function (event) {
                    event.preventDefault();
                });
                if (msg == 'OK' || msg == 'REG') {
                    $('#outcomemsg').html('');
                    $('#contactform').html('<div id="thankyoumsg"><h1>Thank you<br/>' + thename + '</h1><br/>Our Sales team will be in touch soon to arrange your viewing.<br/><hr><p>Dawid Dziegielewski<br/>Sales Manager<br/><a id="mailform" href="mailto:dawid.dziegielewski@almacantar.com">Dawid.dziegielewski@almacantar.com</a><br/><a id="phoneform" href="tel:004402075353948">+44 (0) 207 535 3948</a></div>');
                    /*<img src="/gfx/James-G-signature.jpg" style="text-align:center;height:100px;width:auto;margin:10px auto;">*/
                }
                else {
                    $('#outcomemsg').html('Sorry not able to send your register request at present, please try again later.');
                }
            }
        });
    }
    else {
        if (isOK != "no") {
            $('#outcomemsg').html("Please specify " + isOK + ".");
            $('#outcomemsg').show();
        }
        /*return false;*/
    }
}

function showeverything() {
    

    $("#contentbox").attr("style", "");
    $("#footernavs").attr("style", "");
    $(".execlose").attr("style", "display:none;");
}

function OpenCookie()
{
    var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;

    OpenFooter('cookie');

}

function FormTermsLink()
{
    /*alert('aaaa');*/
    $('html, body').animate({
        scrollTop: $(document).height() - $(window).height()
        },
        1400,
        "easeOutQuint"
    );
    OpenFooter('privacy');
}

function OpenFooter(divtoopen)
{
    if ($('#footerconcookie').attr('style').length > 0)
    { CloseFooter('cookie'); }

    if ($('#footercondisclaimer').attr('style').length > 0)
    { CloseFooter('disclaimer'); }

    if ($('#footerconprivacy').attr('style').length > 0)
    { CloseFooter('privacy'); }


    $('#footercon' + divtoopen).show();
    var newheight = $('#footercon' + divtoopen).height() + 100;
    var winheight = $(window).height();
    var headerheight = $('#logoandnav').height();
    var newheightcontent = $('#footercon' + divtoopen + ' div.footercontentbox').height() + 240;
    var visibleheight = winheight - headerheight;

    //alert('aa; ' + newheight + ' --- ' + newheightcontent);


    if (visibleheight > newheight) {
        //$('#footercon' + divtoopen).attr('style', 'position:fixed;display:block;top:' + winheight + 'px;');

        $('#footercon' + divtoopen).attr('style', 'display:block;margin-top:0px;');

        var margintop = winheight - newheight - 70;

        $('#footercon' + divtoopen).animate({
            marginTop: "-" + newheightcontent + "px"
        }, 500);

        
    }
    else
    {


        //if (winheight < newheight) {
            $('#footercon' + divtoopen + ' div.footercontentbox').attr('style', 'overflow-y:scroll;max-height:70vh;')
        //}

        //$('#footercon' + divtoopen).attr('style', 'position:fixed;display:block;top:' + winheight + 'px;');
            $('#footercon' + divtoopen).attr('style', 'display:block;margin-top:0px;');

        var margintop = winheight - ((winheight * 0.3) - 207);

        $('#footercon' + divtoopen).animate({
            marginTop: "-" + margintop + "px"
        }, 500);
    }

    /*else
    {
        $('#footercon' + divtoopen).attr('style', 'position:absolute;display:block;top:' + winheight + 'px;');

        var margintop = winheight - newheight;

        $('#footercon' + divtoopen).animate({
            top: "0px"
        }, 500);
    }*/

}

function CloseFooter(divtoopen) {
    //$('#footercon' + divtoopen).fadeOut();

    //var winheight = $(window).height();

    $('#footercon' + divtoopen).animate({
        marginTop: "0px",
        display: "none"
    }, 500);

    setTimeout("RemoveStyle('" + divtoopen + "');", 600);
}

function RemoveStyle(divtoopen)
{
    $('#footercon' + divtoopen).attr('style', '');
    $('#footercon' + divtoopen + ' div.footercontentbox').attr('style', '');
}

$(function () {
   

    var heightpage = $(window).height();
    
    if (heightpage > 1049)
    {
        $('.pg1121 .topfooterbar').attr('style', 'position:absolute;bottom:0px;');
    }


});