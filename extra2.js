

$(document).ready(function () {

    var heightwindow = $(window).height();
    var widthwindow = $(window).width();
    var imgwidth = $(".imgfooter").width();
 //   alert(imgwidth);

    var testwidth = (widthwindow / 2) - (imgwidth / 2);

   // $('.imgfooter').attr('style', 'margin-left:' + testwidth + 'px');
    
    //alert(heightwindow);
   // $(".content2").attr('style', 'min-height:' + heightwindow + 'px');


    var heightform = $("#formbigdiv").height();
    
    $("#contactform div ul li input").keypress(function () {
        var aaa = $(this).val();
        var bbb = aaa.length;
        
        if (bbb > 0) {
            if (!$(this).parent().hasClass('filled')) {


                $(this).parent().attr('class', $(this).parent().attr('class') + ' filled');
            }
        }
        else {
            $(this).parent().attr('class', $(this).parent().attr('class').replace("filled", ""));
        }
    });

    $("#contactform div ul li input").keyup(function (e) {
        var vallength = $(this).val().length;

        //alert('length: ' + vallength);

        if (e.keyCode == 8 && vallength == 0)
        {
            $(this).parent().attr('class', $(this).parent().attr('class').replace("filled", ""));
        }
    });

    $("#contactform div ul li textarea").keypress(function () {
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

    });

    $(".spaceinputdiv input").focus(function () {
        CloseDropDowns();
    });
    

    PreFilledLogin();


    $(".titled").mouseleave(function () {
        $('.titled').attr('style', '');
        $('#title').blur();
    });

    $(".hearaboutd").mouseleave(function () {
        $('.hearaboutd').attr('style', '');
        $('#hearabout').blur();
    });

    $(".reasond").mouseleave(function () {
        $('.reasond').attr('style', '');
        $('#reason').blur();
    });

    

    

});

function LabelAnimationSelect(dropdownid) {
    var ccc = $("#" + dropdownid).val();
    var bbb = ccc.length;

    if (bbb > 0) {
        $("#" + dropdownid).parent().attr('class', $("#" + dropdownid).parent().attr('class') + ' filled');
    }
    else {
        $("#" + dropdownid).parent().attr('class', $("#" + dropdownid).parent().attr('class'));
    }
    
};

function PreFilledLogin() {
    $("#contactform div ul li input").change(function () {
        var aaa = $(this).val();
        var bbb = aaa.length;


        //alert(aaa + ' -- ' + bbb);
        if (bbb > 0) {
            $(this).parent().attr('class', $(this).parent().attr('class') + ' filled');
        }
        else {
            $(this).parent().attr('class', $(this).parent().attr('class'));
        }
    });

    $("#contactform div ul li select").each(function () {
        var aaa = $(this).val();
        var bbb = aaa.length;


        //alert(aaa + ' -- ' + bbb);
        if (bbb > 0) {
            $(this).parent().attr('class', $(this).parent().attr('class') + ' filled');
            
        }
        else {
            $(this).parent().attr('class', $(this).parent().attr('class'));
        }
       
    });

};

$(function () {

    $("#termscheckbox").click(function (event) {
        var prevval = $('#inputcheckterms').val();

        if (prevval == "yes")
        {
            $('#termscheckbox').attr('src','/gfx/checkboxno.jpg');
            $('#inputcheckterms').val("no");
        }
        else
        {
            $('#termscheckbox').attr('src', '/gfx/checkboxyes.jpg');
            $('#inputcheckterms').val("yes");
        }
    });

    
});

function titleshow()
{
    $(".titled").attr('style', 'display:block');
    $(".reasond").attr('style', '');
    $(".hearaboutd").attr('style', '');
    $(".countryd").attr('style', '');
}

function countryshow() {
    $(".countryd").attr('style', 'display:block');
    $(".reasond").attr('style', '');
    $(".hearaboutd").attr('style', '');
    $(".titled").attr('style', '');
}

function reasonshow()
{
    $(".reasond").attr('style', 'display:block');
    $(".hearaboutd").attr('style', '');
    $(".titled").attr('style', '');
    $(".countryd").attr('style', '');
}

function hearaboutshow() {
    $(".hearaboutd").attr('style', 'display:block');
    $(".titled").attr('style', '');
    $(".reasond").attr('style', '');
    $(".countryd").attr('style', '');
}

function SubmitContact1()
{
    $(".tracydetails").fadeOut();

    //alert('aaaaaa');
    $(".tracydetails2").fadeOut();

    $("#titleform2").fadeOut();

    var isOK, postData = 'fsubject=Contact';

    var isOK = CheckRequired('contactform', '');

    if (isOK == '')
    {
        if ($('#htitled').val() == '')
        {
            isOK = "Title";
        }

        if (isOK == '' && $('#hreasond').val() == '') {
            isOK = "Reason for purchase";
        }

        if (isOK == '' && $('#hhearaboutd').val() == '') {
            isOK = "How did you hear about The Bryanston";
        }

        if (isOK == '' && $('#hcountryd').val() == '') {
            isOK = "Country of Residence";
        }
    }

    if ($('#inputcheckterms').val() != "yes")
    {
        alert("Please agree to our Terms and Conditions to continue. Thank you.");
        isOK = "no";
        $('#termscheckbox').click();
    }
       
    if (isOK == '') {
        $("#submitformhome").attr('href', '');

        $('#outcomemsg').html('<img src="/gfx/loading.gif" alt="processing .."/>');
        $('#outcomemsg').show();

        $('#contactform *').filter(':input').each(function () {
            fieldID = $(this).attr('id');

            if (fieldID != null && fieldID != '') {
                postData += "&" + fieldID + "=" + $(this).val();
            }

        });

        //alert(postData);

        var thename = $("#title").html() + ' ' + $("#flast-name").val();

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
                    $('#contactform').html('<div id="thankyoumsg"><h1>Thank you</br>' + thename + '</h1><br/>A member of our team will be in touch with you shortly.<br/><hr><img src="/gfx/agent-logo.jpg" style="text-align:center;height:auto;width:100%;margin: 5px auto 40px auto;max-width: 435px;"></div><div id="tracydetails3"><p><a id="mailform" href="mailto:sales@thebryanston.co.uk">sales@thebryanston.co.uk</a><br/><a id="phoneform" href="tel:0044020275352826">+44 (0) 20 7535 2826</a><br/><br/><a id="homeid" href="/">Home</a>');
                }
                else {                    
                    $('#outcomemsg').html('Sorry not able to send your register request at present, please try again later.');
                }
            }
        });
    }
    else
    {
        if (isOK != "no")
        {
            $('#outcomemsg').html("Please specify " + isOK + ".");
            $('#outcomemsg').show();
        }
    }
    
    

    /*
    $('#outcomemsg').html('');
    $('#contactform').html('<div id="thankyoumsg"><h1>Thank you</br>' + thename + '</h1><br/>Our Sales team will be in touch soon to arrange your viewing.<br/><img src="/gfx/tracysignature.png" style="text-align:center;height:100px;width:auto;margin:10px auto;"><hr></div><div id="tracydetails3"><p>Tracy Hughes<br/>Residential Sales Director<br/><a id="phoneform" href="tel:0044020275352826">+44 (0) 20 7535 2826</a><br/><a id="mailform" href="mailto:tracy.hughes@almacantar.com">Tracy.Hughes@almacantar.com</a><br/><a href="https://almacantar.com/">www.almacantar.com</a><br/><br/><a id="homeid" href="/">Home</a>');
    */
}

function CloseDropDowns()
{
    $(".hearaboutd").attr('style', '');
    $(".titled").attr('style', '');
    $(".reasond").attr('style', '');
}