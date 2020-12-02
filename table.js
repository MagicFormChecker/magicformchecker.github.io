var isFinished = true;


$(function () {
    // for small screensif too many columns are visible then hide the extra columns
    var winWidth = $(window).width();

    if (winWidth < 800) {
        var columnCount = $('.datalist tr:first-child th').length;
        var totalColumnWidth = 52 + (161 * (columnCount - 1));
        var showColumns = parseInt((totalColumnWidth - winWidth) / 161);

        if (showColumns > 0) {
            for (var x = 1; x <= showColumns; x++) {
                $('.datalist tr th:nth-child(' + (2 + x) + ')').hide();
                $('.datalist tr td:nth-child(' + (2 + x) + ')').hide();
            }
        }
    }

    $("#searchterm").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'Get',
                url: '/MemberJson.aspx',
                data: { searchPhrase: $("#searchterm").val() },
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
            $("#searchterm").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            $("#searchterm").val(ui.item.label);
            
            var theForm = document.forms['searchform'];
            theForm.action = "/Table.aspx";
            theForm.submit();
        }
    });

    // add onclick to delete buttons
    $('.datalist a.dellink').click(function() {
        var dataValues = $(this).attr('data').split('|');

        DeleteItem(dataValues[0], dataValues[1], dataValues[2]);
    });


    $('span.taskstatuscta').click(function () {
        //console.log('aaaaa');
        var dataValues = $(this).parent().attr('id').split('-');
        CompleteTask(dataValues[1]);
    });

    //make clickable the whole row
    $('#ctl00_contentPL_mydatalist tr').each(function() {         
        var linkTo = $(this).children('.actions').children('.editlink').attr('href');

        if ($('#hndJoin').val() == 'allviewings') //viewings
        {            
            if ($(this).attr('id') != undefined)
            {
                var dataValues = $(this).attr('id').split('-');
                //$(this).children('.actions').children('.editlink').attr('href', 'javascript:GetViewingDetails(' + dataValues[1] + ')');

                $(this).children('.actions').children('.editlink').attr('href', '/viewing/' + dataValues[1]);
                $(this).children('.actions').append('<a class="btn btn-black editlink" href="javascript:GetViewingDetails(' + dataValues[1] + ')">'
                    + '<i class="fas fa-chevron-down"></i></a>');
            }
        }

        var myapplicant = $(this).children('td:nth-child(3)').html();
        var myagentid = $.trim($(this).children('td:nth-child(7)').html());

        $(this).children('.datafield').click(function () {
            if ($(this).children('span').attr('class') == "taskstatuscta") {
                //console.log($(this).parent().parent().attr('id') + "--" + $(this).parent().attr('id') + "--" + $(this).parent().parent().parent().attr('id'));
                var dataValues = $(this).parent().attr('id').split('-');
                CompleteTask(dataValues[1]);
            }
            else if ($('#hndJoin').val() == 'allviewings') //viewings
            {
                //console.log("-" + myapplicant + "-");
                if (myapplicant == null || myapplicant == "undefined" || myapplicant == " ")
                {
                    window.location = '/agent-profile/' + myagentid;
                }
                else
                {
                    window.location = '/applicant-profile/' + linkTo;    
                }            
            }
            else if (
                    $('#hndJoin').val() == 'screenshots' || $('#hndJoin').val() == 'slidesviewed'
                    ) // screenshots
            {
                
            }
            else {
                window.location = linkTo;
            }
        });
    });

    if ($('#hndListOrder').length > 0 && $('#hndListOrder').val().charAt(0) == 'y') // allow drag/drop for list ordering
    {
        $("#ctl00_contentPL_mydatalist tbody").sortable({
            revert: true,
            containment: "parent",
            items: "tr.sort",
            start: StartListOrder,
            stop: EndListOrder
        });

        $("#ctl00_contentPL_mydatalist tbody").disableSelection();
    }

    if ($('.panel-heading').html() == "Applicants")
    {
        $('#ctl00_contentPL_mydatalist').attr('class', 'table applicants');
        $('.applicants tr th:nth-child(3)').html('Country');
    }

    if ($('#hndJoin').val() == "allapplicants")
    {
        ApplicantLeadColoring();
        $('#addnewtj').html("<i class=\"fas fa-user-plus\"></i>");
        ApplicantResponsiveTitle();
    }
    else if ($('#hndJoin').val() == "alltasks") {        
        TaskColoring();
        //TaskFirstView();
        TaskResponsiveTitle();
    }
    else if ($('#hndJoin').val() == "allproperties") {
        PropertyCounter();
        PropertiesIcons();
    }
    else if ($('#hndJoin').val() == "allleadsnegotiator") {
        //LeadNegotiatorIcon(); no display the icons
        HideDevMenu();
       
    }
    else if ($('#hndJoin').val() == "allagents") {
        ShortFields();
        HideDevMenu();
    }
    else if ($('#hndJoin').val() == "allproducts") {
        CleanDevelopmentTitle();
        HideDevMenu();
    }
    else if ($('#hndJoin').val() == "allproductscompany") {
        //ShortFields();
        HideDevMenu();
    }
    else if ($('#hndJoin').val() == "allviewings") {
        ViewingColoring();
        SetUpFilterDevelopment();
        $('#addnewtj').html("<i class=\"far fa-calendar-plus\"></i>");
    }

    //console.log($('#hndJoin').val());

    //if its /applicants page and not /viewings page
    /*if ($('#applicantfiltercontent input').length > 0 && $('div.allviewings').length == 0) 
    {        
        var fCookie, fieldID;

        $('#applicantfiltercontent *').filter(':input').each(function ()
        {
            fCookie = $.cookie(this.name);

            if (fCookie != '' && fCookie != null)
            {
                if ($(this).attr('type') == 'checkbox')
                {                
                    if (fCookie.indexOf(',' + $(this).val() + ',') != -1)
                    {                        
                        $(this).attr('checked', true);
                    }
                }
                else
                {
                    fieldID = $(this).attr('id');

                    $.each(fCookie.split(','), function (i, e) {
                        $("#" + fieldID + " option[value='" + e + "']").prop("selected", true);
                    });
                }
            }
        });
    }*/

    if ($('#applicantcounterfilter #applicantfiltercontent input').length > 0) {    
        var fCookie, fieldID;

        $('#applicantfiltercontent *').filter(':input').each(function () {
            fCookie = $.cookie(this.name);

            if (fCookie != '' && fCookie != null) {
                if ($(this).attr('type') == 'checkbox') {
                    if (fCookie.indexOf(',' + $(this).val() + ',') != -1) {
                        $(this).attr('checked', true);
                    }
                }
                else {
                    fieldID = $(this).attr('id');

                    //console.log(fCookie);

                    $.each(fCookie.split(','), function (i, e) {
                        $("#" + fieldID + " option[value='" + e + "']").prop("selected", true);
                    });
                }
            }
        });
    }


    //if ($('#taskcounterfilter #taskfiltercontent input').length > 0) {
    if($('#hndJoin').val() == "alltasks") {
        var fCookie, fieldID;

        $('#taskfiltercontent *').filter(':input').each(function () {
            fCookie = $.cookie(this.name);

            if (fCookie != '' && fCookie != null) {
                if ($(this).attr('type') == 'checkbox') {
                    if (fCookie.indexOf(',' + $(this).val() + ',') != -1) {
                        $(this).attr('checked', true);
                    }
                }
                else {
                    fieldID = $(this).attr('id');

                    $.each(fCookie.split(','), function (i, e) {
                        $("#" + fieldID + " option[value='" + e + "']").prop("selected", true);
                    });
                }
            }
        });
    }

    if ($('#hndJoin').val() == "allviewings") {
        var fCookie, fieldID;

        $('#applicantfiltercontent *').filter(':input').each(function () {
            fCookie = $.cookie(this.name);

            if (fCookie != '' && fCookie != null) {

                //console.log('aaaa: ' + $(this).attr('type') + ' -- ' + $(this).attr('id'));

                if ($(this).attr('type') == 'checkbox') {
                    if (fCookie.indexOf(',' + $(this).val() + ',') != -1) {
                        $(this).attr('checked', true);
                    }
                }
                else if ($(this).attr('type') == 'text')
                {

                    fieldID = $(this).attr('id');
                    $("#" + fieldID).val(fCookie);
                }
                else {
                    fieldID = $(this).attr('id');

                    $.each(fCookie.split(','), function (i, e) {
                        //console.log(fieldID + " -- " + e)
                        $("#" + fieldID + " option[value='" + e + "']").prop("selected", true);
                    });
                }
            }
        });
    }

    $(window).on('scroll', function () {
        var joinName = $('#hndJoin').val();
        
        if (joinName == 'allapplicants' || joinName == 'allviewings' || joinName == 'alltasks')
        {
            var maxScrollPos = 0, scrollMovement = 0, scrollBottom;

            currentScrollPos = $(window).scrollTop();
            lastScrollPos = currentScrollPos;
            scrollBottom = $(document).height() - currentScrollPos;

            if (maxScrollPos < lastScrollPos) {
                if (scrollBottom < 1500) {
                    if (isFinished) {
                        switch (joinName)
                        {
                            case 'allapplicants':
                                GetMoreApplicant(true);
                                break;
                            case 'allviewings':
                                GetMoreViewings(true);                                
                                break;
                            case 'alltasks':
                                GetMoreTasks(true);
                                break;
                        }
                    }
                }

                maxScrollPos = lastScrollPos;
            }
        }        
    });
    
    $(window).on('resize', function () {
        if ($('#hndJoin').val() == "allapplicants")
        {
            ApplicantResponsiveTitle();
        }
        else if ($('#hndJoin').val() == "alltasks") {
            TaskResponsiveTitle();
        }
    });
});

function ApplicantResponsiveTitle()
{
    if ($('.allapplicants .table > tbody > tr > th').length > 0)
    {
        if ($(window).width() < 1500 && $('.allapplicants .table > tbody > tr > th:nth-child(5) a').html().indexOf("qui") >= 0) {
            /*status*/
            $('.allapplicants .table > tbody > tr > th:nth-child(5) a').html("Status <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.allapplicants #fixedtableheading > div:nth-child(5) a').html("Status <i class=\"fas fa-arrows-alt-v\"></i>");
            /*Lead Negotiator*/
            $('.allapplicants .table > tbody > tr > th:nth-child(6) a').html("Lead N. <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.allapplicants #fixedtableheading > div:nth-child(6) a').html("Lead N. <i class=\"fas fa-arrows-alt-v\"></i>");
            /*Date*/
            $('.allapplicants .table > tbody > tr > th:nth-child(7) a').html("Date <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.allapplicants #fixedtableheading > div:nth-child(7) a').html("Date <i class=\"fas fa-arrows-alt-v\"></i>");
            /*Agent Company*/
            $('.allapplicants .table > tbody > tr > th:nth-child(9) a').html("Company <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.allapplicants #fixedtableheading > div:nth-child(9) a').html("Company <i class=\"fas fa-arrows-alt-v\"></i>");
        }
        else if ($(window).width() > 1500 && $('.allapplicants .table > tbody > tr > th:nth-child(5) a').html().indexOf("qui") == -1) {
            /*status*/
            $('.allapplicants .table > tbody > tr > th:nth-child(5) a').html("Enquiry Status <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.allapplicants #fixedtableheading > div:nth-child(5) a').html("Enquiry Status <i class=\"fas fa-arrows-alt-v\"></i>");
            /*Lead Negotiator*/
            $('.allapplicants .table > tbody > tr > th:nth-child(6) a').html("Lead Negotiator <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.allapplicants #fixedtableheading > div:nth-child(6) a').html("Lead Negotiator <i class=\"fas fa-arrows-alt-v\"></i>");
            /*date*/
            $('.allapplicants .table > tbody > tr > th:nth-child(7) a').html("Enquiry Date <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.allapplicants #fixedtableheading > div:nth-child(7) a').html("Enquiry Date <i class=\"fas fa-arrows-alt-v\"></i>");
            /*Agent Company*/
            $('.allapplicants .table > tbody > tr > th:nth-child(9) a').html("A. Company <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.allapplicants #fixedtableheading > div:nth-child(9) a').html("A. Company <i class=\"fas fa-arrows-alt-v\"></i>");
        }
    }
}

function TaskResponsiveTitle()
{
    if ($('#ctl00_contentPL_mydatalist tbody tr').length > 1)
    {
        if ($(window).width() < 1500 && $('.alltasks .table > tbody > tr > th:nth-child(7) a').html().indexOf("ask") >= 0) {
            /*Date Created*/
            $('.alltasks .table > tbody > tr > th:nth-child(7) a').html("Created <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.alltasks #fixedtableheading > div:nth-child(7) a').html("Created <i class=\"fas fa-arrows-alt-v\"></i>");
            /*Date Reminder*/
            $('.alltasks .table > tbody > tr > th:nth-child(8) a').html("Reminder <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.alltasks #fixedtableheading > div:nth-child(8) a').html("Reminder <i class=\"fas fa-arrows-alt-v\"></i>");
            /*Task Status*/
            $('.alltasks .table > tbody > tr > th:nth-child(10) a').html("Status <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.alltasks #fixedtableheading > div:nth-child(10) a').html("Status <i class=\"fas fa-arrows-alt-v\"></i>");
        }
        else if ($(window).width() > 1500 && $('.alltasks .table > tbody > tr > th:nth-child(7) a').html().indexOf("ask") == -1) {
            /*Date Created*/
            $('.alltasks .table > tbody > tr > th:nth-child(7) a').html("Task Created Date <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.alltasks #fixedtableheading > div:nth-child(7) a').html("Task Created Date <i class=\"fas fa-arrows-alt-v\"></i>");
            /*Date Reminder*/
            $('.alltasks .table > tbody > tr > th:nth-child(8) a').html("Task Reminder Date <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.alltasks #fixedtableheading > div:nth-child(8) a').html("Task Reminder Date <i class=\"fas fa-arrows-alt-v\"></i>");
            /*Task Status*/
            $('.alltasks .table > tbody > tr > th:nth-child(10) a').html("Task Status <i class=\"fas fa-arrows-alt-v\"></i>");
            $('.alltasks #fixedtableheading > div:nth-child(10) a').html("Task Status <i class=\"fas fa-arrows-alt-v\"></i>");
        }
    }
}

function WantToOption(dd) {
    if (dd.selectedIndex < 3) {
        alert("Feature under development");
    } else {
        document.location.href = "AddEdit.aspx?table=" + $('#hndTable').val() + "&id=0";
    }
}

function CheckBoxStatus(item) {
    var properties, postData, value;

    value = (item.checked) ? 1 : 0;
    properties = item.id.split('|');

    postData = "&table=" + properties[1]
		+ "&" + properties[2] + "=" + value + "&itemid=" + properties[3];
    
    $.ajax({
        type: "POST",
        url: "/DatabaseManagement/UpdateTableAjax.aspx",
        data: postData,
        cache: false,
        timeout: 50000,
        error: function() { alert('Sorry there was a problem'); },

        success: function(msg) {
            if (msg == 'T') {
                alert('Session timed out, please log in again');
            }
            else {
                $('#' + item.id).attr('disabled', 'disabled');
            }
        }
    });
}

var listStartIndex;

StartListOrder = function(e, ui) {
    listStartIndex = ui.item.index();
};

EndListOrder = function(e, ui) {
    var postData, sortDir, start, end, IDs = '';

    if (ui.originalPosition.top - ui.position.top > 0) {
        start = ui.item.index();
        end = listStartIndex;
    }
    else {
        start = listStartIndex;
        end = ui.item.index();
    }
    
    if ($('#hndListOrderDir').val() != '') {
        sortDir = $('#hndListOrderDir').val().charAt(0);
    }

    $('#ctl00_contentPL_mydatalist tr').each(function() {
        if ($(this).index() == start) {
            IDs += ',' + $(this).attr('id');
        } else if ($(this).index() == end) {
            IDs += ',' + $(this).attr('id');
            return false;
        } else {
            IDs += ',' + $(this).attr('id');
        }
    });

    postData = "table=" + $('#hndTable').val() + "&ids=" + IDs.replace('undefined,', '') + "&d=" + sortDir;
    
    $.ajax({
        type: "GET",
        url: "ReorderAjax.aspx",
        data: postData,
        cache: false,
        timeout: 50000,
        error: function() { alert('Sorry there was a problem'); },
        success: function(msg) {
            if (msg == 'T') {
                alert('Session timed out, please log in again');
            }
        }
    });
};

function getPage(url) {
    document.location.href = url.options[url.selectedIndex].value;
}

function AlmaSearchKeyPress(e)
{
    //console.log('aaa');

    var orderbytext = "";

    if ($('#hndJoin').val() == "allproperties")
    {
        orderbytext = "apartment";
    }
    else if ($('#hndJoin').val() == "allapplicants" || $('#hndJoin').val() == "allagents")
    {
        orderbytext = "a.date_created&dir=desc"
    }    

    if (e.which == 13)
    {
        e.preventDefault();
        //console.log('aaaa');
        var newloca = "/TableJoinView.aspx?search=" + $('#almasearch').val() + "&join=" + $('#hndJoin').val() + "&table=&orderby=" + orderbytext;
        window.location = newloca;
    }
}

function ShortFields()
{


    $('#ctl00_contentPL_mydatalist tbody tr').each(function () {

        

        var email = $(this).children('td:nth-child(6)').html();
        var communication = $(this).children('td:nth-child(2)').html();

        if (email != undefined && email != "") {
            if (email.length > 20) {
                $(this).children('td:nth-child(6)').html(email.substr(0, 20) + "...");
            }
        }

        switch (communication) {
            case " 1"://email
                $(this).children('td:nth-child(2)').html("<span><i class=\"fas fa-envelope\"></i></span>");
                break;
            case " 2"://phone
                $(this).children('td:nth-child(2)').html("<span><i class=\"fas fa-phone\"></i></span>");
                break;
            case " 3"://whatsapp
                $(this).children('td:nth-child(2)').html("<span><i class=\"fab fa-whatsapp\"></i></span>");
                break;
            case " 4"://sms
                $(this).children('td:nth-child(2)').html("<span><i class=\"fas fa-file-alt\"></i></span>");
                break;
            default:
                $(this).children('td:nth-child(2)').html("<span>&nbsp;</span>");
                break;
        }

    });


}

function ApplicantLeadColoring()
{
   // console.log('hay:' + $('#ctl00_contentPL_mydatalist tbody tr').length);
    var counter = 1;


    $('#filtersbigappli').show();
    $('#exportappli').show();

    var titlecounter = 1;

    $('#ctl00_contentPL_mydatalist tbody tr th a').each(function () {
        if (titlecounter != 2)
        {
            $(this).html($(this).html() + "<i class=\"fas fa-arrows-alt-v\"></i>");
        }
        titlecounter++;
    });

    $('#ctl00_contentPL_mydatalist tbody tr').each(function () {

        //console.log($(this).children('td:nth-child(3)').html())

        var statusid = "";
        var qualified = "";
        var communication = "";
        var futviewings = "";
        var lastViewingStatus = "";        
        var companystring = "";

        if (counter == 1)
        {
            statusid = "";
            qualified = "";
        }
        else
        {
            statusid = $(this).children('td:nth-child(5)').html();
            
            //qualified = $(this).children('td:nth-child(8)').html();
            communication = $(this).children('td:nth-child(2)').html();
            lastViewingStatus = $(this).children('td:nth-child(17)').html();            
            companystring = $(this).children('td:nth-child(9)').html();
        }

        var nameitem = $(this).children('td:nth-child(3)').html();
        var surnameitem = $(this).children('td:nth-child(4)').html();

        if (nameitem != undefined)
        {
            if (nameitem.length > 16)
            {
                $(this).children('td:nth-child(3)').html(nameitem.substr(0,16) + "...");
            }
        }


        if (surnameitem != undefined)
        {
            if (surnameitem.length > 20)
            {
                $(this).children('td:nth-child(4)').html(surnameitem.substr(0,20) + "...");
            }
        }

       //console.log('-' + statusid + '-');

       counter++;

        var newcolor = "";

        if (statusid == " In Progress") { newcolor = "orange"; }
        else if (statusid == " Cold") { newcolor = "blue"; }
        else if (statusid == " Dead") { newcolor = "red"; }
        else if (statusid == " Hot") { newcolor = "green"; }
        else if (statusid == " Reserved") { newcolor = "purple"; }
        else if (statusid == " Under Offer") { newcolor = "purple"; }
        else if (statusid == " Exchanged") { newcolor = "purple"; }
        else if (statusid == " Completed") { newcolor = "purple"; }
        else { newcolor = ""; }

        //console.log("-" + qualified + "-");

        /*if (qualified == " 1")
        {
            $(this).children('td:nth-child(8)').html("<span><i class=\"fas fa-check\"></i></span>");
        }
        else if (qualified == " 2")
        {
            $(this).children('td:nth-child(8)').html("<span><i class=\"fas fa-times\"></i></span>");
        }
        else
        {
            $(this).children('td:nth-child(8)').html("<span><i class=\"fas fa-question\"></i></span>");
        }*/
        
        //console.log("-" + communication + "-");

        if (statusid == " New")
        {
            $(this).children('td:nth-child(2)').html("<span><i class=\"fas fa-circle\"></i></span>");
        }
        else
        {
            switch(communication)
            {
                case " 1"://email
                    $(this).children('td:nth-child(2)').html("<span><i class=\"fas fa-envelope\"></i></span>");
                    break;
                case " 2"://phone
                    $(this).children('td:nth-child(2)').html("<span><i class=\"fas fa-phone\"></i></span>");
                    break;
                case " 3"://whatsapp
                    $(this).children('td:nth-child(2)').html("<span><i class=\"fab fa-whatsapp\"></i></span>");
                    break;
                case " 4"://sms
                    $(this).children('td:nth-child(2)').html("<span><i class=\"far fa-comment\"></i></span>");
                    break;
                case " 5"://meeting with buyer
                case " 6"://meeting with agent
                    $(this).children('td:nth-child(2)').html("<span><i class=\"far fa-handshake\"></i></span>");
                    break;
                default:
                    $(this).children('td:nth-child(2)').html("<span>&nbsp;</span>");
                    break;
            }
        }

        //console.log("-" + futviewings + "-----" + pastviewings + "-");
        
        if (lastViewingStatus == ' C') {
            $(this).children('td:nth-child(12)').html("<span><i class=\"fas fa-times\"></i></span>");
        }
        else if (lastViewingStatus == ' F')
        {
            $(this).children('td:nth-child(12)').html("<span><i class=\"fas fa-flag\"></i></span>");
        }
        else if (lastViewingStatus == ' P')
        {
            $(this).children('td:nth-child(12)').html("<span><i class=\"fas fa-check\"></i></span>");
        }
        else
        {
            $(this).children('td:nth-child(12)').html("<span></span>");
        }


        // Agent Company character limit

        //console.log("sale: " + companystring + " -- count: " + companystring.length);

         if (companystring.length > 20) {
             $(this).children('td:nth-child(9)').html(companystring.substr(0, 22) + "...");
        }



        $(this).attr('class', newcolor);/**/
    });

    ApplicantGetCounter();
}

function TaskFirstView()
{
    if ($('#hndOrderBy').val() == '')
    {
        var totalshows = 1;
        $('#ctl00_contentPL_mydatalist tbody tr').each(function () {
            if ($(this).hasClass('tcompleted')) {
                $(this).hide();
            }
            else {
                $(this).show();
                totalshows++;
            }
        });
        TaskMaxTableHeight(totalshows);
    }
}

function TaskColoring() {
    //console.log('taskcoloring');

    $('#ctl00_contentPL_mydatalist').attr('class', $('#ctl00_contentPL_mydatalist').attr('class') + ' tasktable');
    $('#taskcounter').show();
    $('#filtersbig').show();
    

    var counter = 1;
    var taskcompletedcount = 0, taskinprogresscount = 0, taskoutstandingcount = 0, totalcount = 0, tduecount = 0;
    var taskinthefuture = 0;

    /**** todaydate **/

    var today = $.datepicker.formatDate('dd-mm-yy', new Date());
    today = new Date(today.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

    $('#ctl00_contentPL_mydatalist tbody tr').each(function ()
    {
        //1 join applicant name and surname
        //2 join lead reminder name and surname
        //3 add status class for coloring to the row 
        //4 replace status text for icon

        var statusTask = "";
        var tomergenames = 0;

        if (counter > 1)
        {
            statusTask = $(this).children('td:nth-child(9)').html();            
            //1
            $(this).children('td:nth-child(3)').html($(this).children('td:nth-child(3)').html() + " " + $(this).children('td:nth-child(4)').html());
            //2
            $(this).children('td:nth-child(5)').html($(this).children('td:nth-child(5)').html() + " " + $(this).children('td:nth-child(6)').html());

            totalcount++;

            var taskdate = $(this).children('td:nth-child(8)').html();
            taskdate = new Date(taskdate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

            if (taskdate > today) { taskinthefuture = 1; }
            else { taskinthefuture = 0; }
        }

        var newcolor = "";


        if (statusTask == " Completed") { newcolor = "tcompleted"; }
        else if (statusTask == " Outstanding") { if (taskinthefuture == 1) { newcolor = "tdue"; } else { newcolor = "toutstanding"; } }
        else if (statusTask == " In Progress") { newcolor = "tinprogress"; }
        else { newcolor = ""; }

        if (statusTask == " Completed") {
            $(this).children('td:nth-child(9)').html("<span class=\"taskstatuscta\" style=\"\"><i class=\"fas fa-check\"></i></span>");
            taskcompletedcount++;
        }
        else if (statusTask == " Outstanding")
        {
            $(this).children('td:nth-child(9)').html("<span class=\"taskstatuscta\" style=\"\"><i class=\"fas fa-flag\"></i></span>");
            taskoutstandingcount++;
        }
        else if (statusTask == " In Progress")
        {
            $(this).children('td:nth-child(9)').html("<span class=\"taskstatuscta\" style=\"\"><i class=\"far fa-clock\"></i></span>");
            taskinprogresscount++;
        }

        $(this).attr('class', newcolor);

        counter++;
    });

    /*var countercode = ""
    + "<span class=\"toutscount\" data=\"outstanding\"><i class=\"fas fa-flag\"></i> Outstanding: " + taskoutstandingcount + "</span>"
    + "<span class=\"tcomplcount\" data=\"completed\"><i class=\"fas fa-check\"></i> Completed: " + taskcompletedcount + "</span>"
    //+ "<span class=\"tinprogcount\" data=\"inprogress\"><i class=\"far fa-clock\"></i> In Progress: " + taskinprogresscount + "</span>"
    + "<span class=\"ttotalcount\" data=\"all\"> Total: " + totalcount + "</span>";

    $('#taskcounter').html(countercode);*/

    $('#ctl00_contentPL_mydatalist tbody tr th a').each(function ()
    {
        $(this).html($(this).html() + "<i class=\"fas fa-arrows-alt-v\"></i>");
    });

    TaskGetCounter();

    $('#taskcounter span').click(function () {
        var op = $(this).attr('data');
        var totalshows = 1;

        if (op == "outstanding")
        {
            window.location = "/TableJoinView.aspx?join=alltasks&extrafilter=t.task_status_id in (1) AND t.date_reminder <= date(now())&orderby=date_reminder, task_status";
        }
        else if (op == "completed")
        {
            window.location = "/TableJoinView.aspx?join=alltasks&extrafilter=t.task_status_id in (3)&orderby=date_reminder, task_status";
        }
        else if (op == "due") {
            window.location = "/TableJoinView.aspx?join=alltasks&extrafilter=t.task_status_id in (1) AND t.date_reminder > date(now())&orderby=date_reminder, task_status";
        }
        else
        {
            window.location = "/task-reminder";
        }
    });
}

function TaskMaxTableHeight(numberrows)
{
    var winhei = $(window).height() * 0.8;
    var rowsheight = numberrows * 40;

    if (rowsheight < winhei)
    {
        $('#ctl00_contentPL_mydatalist').attr('style', 'height:' + rowsheight + 'px;');
    }
    else
    {
        $('#ctl00_contentPL_mydatalist').attr('style', '');
    }


}

function FilterHeight()
{
    var maxheight = 0;

    /*$('#taskfiltercontent > div').each(function () {
        if ($(this).height() > maxheight) {
            maxheight = $(this).height();
        }
    });

    $('#taskfiltercontent > div').each(function () {
        $(this).attr('style','height:' + maxheight + 'px');
    });*/
}

function TaskFiltered()
{
    var tempte = "", newsearch = "";
    var counter = 0;
    $.each($("input[name='tasklead']:checked"), function () {
        if (counter > 0) { tempte += "," }
        tempte += $(this).val();
        counter++;
    });

    if (tempte.length > 0)
    {
        newsearch = "%20taskcustomer_id%20in%20(" + tempte + ")";

        $.cookie('tasklead', ',' + tempte + ',', { path: '/' });
    }
    else
    {
        $.removeCookie('tasklead');
    }

    tempte = ""
    var selectouts = 0;
    var selectdue = 0;
    /*counter = 0;
    $.each($("input[name='taskstatus']:checked"), function () {
        if ($(this).val() != 0) {
            if (counter > 0) { tempte += "," }
            tempte += $(this).val();
            if ($(this).val() == 1) { selectouts = 1;}
            counter++;
        }
        else
        {
            selectdue = 1;
        }
    });

    //console.log("aaaa: " + tempte + " count: " + tempte.length +  " selectdue: " + selectdue + " bbb: " + newsearch + " count: " + newsearch.length);

    if (tempte.length > 0) {
        if (newsearch.length > 0)
        {
            newsearch += "%20and%20";
        }
        if (selectdue == 1 && selectouts == 0) { tempte += ",1"; }
        newsearch += "t.task_status_id%20in%20(" + tempte + ")";

        if (selectdue == 0 && selectouts == 1)
        {
            newsearch += "%20AND%20t.date_reminder%20<=%20date(now())%20";
        }
    }
    else
    {
        //only due
        newsearch += "%20AND%20t.task_status_id%20in%20(1)%20AND%20t.date_reminder%20>%20date(now())%20";
    }*/

    /*console.log(newsearch + " -- " + newsearch.length);*/
    if (newsearch.length > 3)
    {
        newsearch += "%20AND";
    }

    newsearch += "%20t.task_status_id%20in%20(1)";

    $.each($("input[name='taskstatus']:checked"), function () {
        if ($(this).val() != 0) {
            selectouts = 1;
        }
        else {
            selectdue = 1;
        }
    
    });



    if (selectouts == 1 && selectdue == 0)
    {
        newsearch += "%20AND%20t.date_reminder%20<=%20date(now())%20";
        $.cookie('taskstatus', ',1,', { path: '/' });
    }
    else if (selectouts == 0 && selectdue == 1)
    {
        newsearch += "%20AND%20t.date_reminder%20>%20date(now())%20";
        $.cookie('taskstatus', ',0,', { path: '/' });
    }
    



    tempte = "";
    counter = 0;
    $.each($("input[name='tasktype']:checked"), function () {
        if (counter > 0) { tempte += "," }
        tempte += $(this).val();
        counter++;
    });

    if (tempte.length > 0) {
        if (newsearch.length > 0) {
            newsearch += "%20and%20";
        }
        newsearch += "t.task_type_id%20in%20(" + tempte + ")";
        
        $.cookie('tasktype', ',' + tempte + ',', { path: '/' });
    }
    else
    {
        $.removeCookie('tasktype');
    }


    //console.log(newsearch);

    window.location.href = "/TableJoinView.aspx?join=alltasks&extrafilter=" + newsearch + "&orderby=date_reminder, task_status";
}

function ShowTaskFilters()
{
    $('#taskfiltercontent').fadeIn();
    FilterHeight();
}

function HideTaskFilters()
{
    $('#taskfiltercontent').fadeOut();
}

function ShowTaskCompleted()
{
    $('.tcompleted').each(function () {
        $(this).attr('class', 'tcompleteds');
    });

    $('#showcomplelink').attr('href', 'javascript:HideTaskCompleted();');

    $('#showcomplelink').html('Hide Completed');
}

function HideTaskCompleted() {
    $('.tcompleteds').each(function () {
        $(this).attr('class', 'tcompleted');
    });

    $('#showcomplelink').attr('href', 'javascript:ShowTaskCompleted();');

    $('#showcomplelink').html('Show Completed');
}

function GetMoreApplicant(isScrolling) {

    if ($('#ctl00_contentPL_paging2 li.next a').length > 0) {
        var postData, pageId;

        isFinished = false;
        postData = "";

        var newpostData = $('#ctl00_contentPL_paging2 li.next a').attr('href');
        //console.log('np:' + newpostData);

        if (newpostData.indexOf('?') == -1) {
            isFinished = true;
        }
        else {
            postData = newpostData.substr(newpostData.indexOf('?') + 1);
            //console.log('p:' + postData);

            $.ajax({
                type: "GET",
                url: "/TableJoinViewAjax.aspx",
                data: postData,
                async: false,
                cache: false,
                timeout: 50000,
                error: function () { /*$("#ctl00_textPL_ctl00_noresults").html('');*/ },
                success: function (msg) {

                    if (isScrolling) {
                        $("#ctl00_contentPL_mydatalist tbody").append(msg);
                        isFinished = true;

                        var extranewpostData = $('#ctl00_contentPL_paging2 li.next a').attr('href');
                        var extranewpostDatasub = extranewpostData.substr(extranewpostData.indexOf("page_id") + 8);


                        extranewpostDatasub++;

                        var newnexthref = extranewpostData.substr(0, extranewpostData.indexOf("page_id") + 8) + extranewpostDatasub;
                        $('#ctl00_contentPL_paging2 li.next a').attr('href', newnexthref);

                        ApplicantAjaxLeadColoring();

                        $('#ctl00_contentPL_mydatalist tr').each(function () {
                            var linkTo = $(this).children('.actions').children('.editlink').attr('href');

                            $(this).children('.datafield').click(function () {
                                window.location = linkTo;
                            });
                        });
                    }
                    else {
                    }
                }
            });
        }
    }
}

function ApplicantAjaxLeadColoring() {

    var counter = 1;

    $('#ctl00_contentPL_mydatalist tbody tr.newajax').each(function ()
    {
                

        var statusid = "";
        var qualified = "";
        var communication = "";
        var lastViewingStatus = "";
        var companystring = "";

        /*if (counter == 1) {
            statusid = "";
            qualified = "";
        }
        else {*/
            statusid = $(this).children('td:nth-child(5)').html();
            //qualified = $(this).children('td:nth-child(8)').html();
            communication = $(this).children('td:nth-child(2)').html();
            lastViewingStatus = $(this).children('td:nth-child(17)').html();
            companystring = $(this).children('td:nth-child(9)').html();
        //}

        var nameitem = $(this).children('td:nth-child(3)').html();
        var surnameitem = $(this).children('td:nth-child(4)').html();

        if (nameitem != undefined) {
            if (nameitem.length > 20) {
                $(this).children('td:nth-child(3)').html(nameitem.substr(0, 20) + "...");
            }
        }


        if (surnameitem != undefined) {
            if (surnameitem.length > 20) {
                $(this).children('td:nth-child(4)').html(surnameitem.substr(0, 20) + "...");
            }
        }

        //console.log('-' + statusid + '-');

        counter++;

        var newcolor = "";

        if (statusid == " In Progress") { newcolor = "orange"; }
        else if (statusid == " Cold") { newcolor = "blue"; }
        else if (statusid == " Dead") { newcolor = "red"; }
        else if (statusid == " Hot") { newcolor = "green"; }
        else { newcolor = ""; }

        //console.log("-" + qualified + "-");
        /*
        if (qualified == " 1") {
            $(this).children('td:nth-child(8)').html("<span><i class=\"fas fa-check\"></i></span>");
        }
        else if (qualified == " 2") {
            $(this).children('td:nth-child(8)').html("<span><i class=\"fas fa-times\"></i></span>");
        }
        else {
            $(this).children('td:nth-child(8)').html("<span><i class=\"fas fa-question\"></i></span>");
        }
        */
        //console.log("-" + communication + "-");

        if (statusid == " New") {
            $(this).children('td:nth-child(2)').html("<span><i class=\"fas fa-circle\"></i></span>");
        }
        else {
            switch (communication) {
                case " 1"://email
                    $(this).children('td:nth-child(2)').html("<span><i class=\"fas fa-envelope\"></i></span>");
                    break;
                case " 2"://phone
                    $(this).children('td:nth-child(2)').html("<span><i class=\"fas fa-phone\"></i></span>");
                    break;
                case " 3"://whatsapp
                    $(this).children('td:nth-child(2)').html("<span><i class=\"fab fa-whatsapp\"></i></span>");
                    break;
                case " 4"://sms
                    $(this).children('td:nth-child(2)').html("<span><i class=\"fas fa-sms\"></i></span>");
                    break;
                default:
                    $(this).children('td:nth-child(2)').html("<span>&nbsp;</span>");
                    break;
            }
        }

        //console.log("-" + futviewings + "-----" + pastviewings + "-");

        if (lastViewingStatus == ' C') {
            $(this).children('td:nth-child(12)').html("<span><i class=\"fas fa-times\"></i></span>");
        }
        else if (lastViewingStatus == ' F') {
            $(this).children('td:nth-child(12)').html("<span><i class=\"fas fa-flag\"></i></span>");
        }
        else if (lastViewingStatus == ' P') {
            $(this).children('td:nth-child(12)').html("<span><i class=\"fas fa-check\"></i></span>");
        }
        else {
            $(this).children('td:nth-child(12)').html("<span></span>");
        }


        // Agent Company character limit

        //console.log("sale: " + $(this).children('td:nth-child(9)').html() + " -- count: " + $(this).children('td:nth-child(9)').html().length);


        if (companystring.length > 20) {
            $(this).children('td:nth-child(9)').html(companystring.substr(0, 22) + "...");
        }


        $(this).attr('class', newcolor);/**/

    });
}

function CounterApplicant(sourceDD, PopulateDD, sourceTable)
{
    //console.log('counter applicant plain');

    var postData, table, selectedValue;

    selectedValue = $('#' + sourceDD).val();

    if (selectedValue != '') {
        postData = "table=" + sourceTable + '&filter=' + $('#' + sourceDD).attr('id') + '&filtervalue=' + selectedValue;

        $.ajax({
            type: "GET",
            url: "/CounterApplicantAjax.aspx",
            data: postData,

            timeout: 50000,
            error: function () { alert('GDD-Sorry there was a problem'); },
            success: function (msg) {
                if (msg == 'T') {
                    $('#outcome').html('Session timed out, please log in again');
                }
                else if (msg == 'F') {
                    $('#outcome').html('No Data Supplied');
                }
                else {
                    $('#' + PopulateDD).html(msg);
                }
            }
        });
    }
}

function ShowApplicantFilters() {
    //console.log('aaaaa');
    $('#applicantfiltercontent').attr('style', 'left:-210px; display:block; opacity:0; filter:alpha(opacity=80);');

    $('#applicantfiltercontent').animate({
        left: "1px",
        opacity: "1",
        filter: "alpha(opacity=100)"
    }, 500);


    //$('#applicantfiltercontent').fadeIn();
    /*var appliwidth = $('#applicantfiltercontent').width() + 30;

    $('#applicantfiltercontent').width(appliwidth);*/
    //FilterHeight();
}

function HideApplicantFilters()
{
    $('#applicantfiltercontent').fadeOut();
}

function ApplicantFiltered() {
    var tempte = "", newsearch = "";
    var counter = 0;
    $.each($("input[name='applilead']:checked"), function () {
        if (counter > 0) { tempte += "," }
        tempte += $(this).val();
        counter++;
    });
    if (tempte.length > 0) {
        newsearch = "a.leadnegotiator_id=(" + tempte + ")";
        $.cookie('applilead', ',' + tempte + ',', { path: '/' });
    }
    else
    {
        $.removeCookie('applilead');
    }

    //console.log('agent: ' + tempte);

    if ($('#filtercountry').val() != 0 && $('#filtercountry').val() != null)
    {
        if (newsearch.length > 0) 
        {
            newsearch += "|";
        }

        newsearch += "a.country_id=(" + $('#filtercountry').val() + ")";

        $.cookie('filtercountry', ',' + $('#filtercountry').val() + ',', { path: '/' });
    }
    else
    {
        $.removeCookie('filtercountry');
    }


    if ($('#filteragent').val() != 0 && $('#filteragent').val() != null) {
        if (newsearch.length > 0) {
            newsearch += "|";
        }

        newsearch += "a.agent_introducer=(" + $('#filteragent').val() + ")";

        $.cookie('filteragent', ',' + $('#filteragent').val() + ',', { path: '/' });
    }
    else {
        $.removeCookie('filteragent');
    }
    //console.log('counrty: ' + $('#filtercountry').val());

    if ($("input[name='qualified']:checked").length > 0) {
        if (newsearch.length > 0) {
            newsearch += "|";
        }
        newsearch += "a.qualified=(1)";

        $.cookie('qualified', '1', { path: '/' });
    }
    else
    {
        $.removeCookie('qualified');
    }

    tempte = "";
    counter = 0;

    $.each($("input[name='visit']:checked"), function () {
        if (counter > 0) { tempte += "," }
        tempte += $(this).val();
        counter++;
    });

    if (tempte.length > 0) {
        if (newsearch.length > 0) {
            newsearch += "|";
        }
        newsearch += "visit=(" + tempte + ")";

        $.cookie('visit', ',' + tempte + ',', { path: '/' });
    }
    else
    {
        $.removeCookie('visit');
    }

    tempte = "";
    counter = 0;

    $.each($("input[name='contacted']:checked"), function () {
        if (counter > 0) { tempte += "," }
        tempte += $(this).val();
        counter++;
    });

    if (tempte.length > 0) {
        if (newsearch.length > 0) {
            newsearch += "|";
        }
        newsearch += "contacted=(" + tempte + ")";

        $.cookie('contacted', ',' + tempte + ',', { path: '/' });
    }
    else
    {
        $.removeCookie('contacted');
    }

    tempte = "";
    counter = 0;
    $.each($("input[name='applistatus']:checked"), function () {
        if (counter > 0) { tempte += "," }
        tempte += $(this).val();
        counter++;
    });

    if (tempte.length > 0) {
        if (newsearch.length > 0) {
            newsearch += "|";
        }
        newsearch += "a.enquiry_status_id=(" + tempte + ")";

        $.cookie('applistatus', ',' + tempte + ',', { path: '/' });
    }
    else
    {
        $.removeCookie('applistatus');
    }

    //console.log(newsearch);

    window.location.href = "/TableJoinView.aspx?join=allapplicants&search=applicantmastersearch&extrafilter=" + newsearch + "|&orderby=applicant_id desc";
}

function ApplicantGetCounter()
{
    //console.log('applicant get counter');
    var postData = window.location.href;

    if (postData.indexOf("?") == -1)
    {
        postData = 'join=allapplicants';
    }
    else
    {
        postData = postData.substr(postData.indexOf("?") + 1);
    }

    //console.log(postData);

    if (postData.indexOf("|") > -1)
    {
        var sectiontocheck = "";
        var newextrafilter = "";
        var variabletocheck = "";
        var extrafilter = postData.substr(postData.indexOf("extrafilter") + 12);
        postData = postData.substr(0, postData.indexOf("extrafilter") + 12);
        extrafilter = extrafilter.substr(0,extrafilter.indexOf("&"));


        while (extrafilter.length > 1)
        {

            if (newextrafilter.length > 1)
            {
                newextrafilter += " AND ";
            }

            if (extrafilter.indexOf("|") > 0)
            {
                sectiontocheck = extrafilter.substr(0, extrafilter.indexOf("|"));
                extrafilter = extrafilter.substr(extrafilter.indexOf("|") + 1);
            }
            else
            {
                sectiontocheck = extrafilter;
                extrafilter = "";
            }

            variabletocheck = sectiontocheck.substr(0, sectiontocheck.indexOf("="));

           // console.log("VARII -" + variabletocheck + "----" + sectiontocheck + "-");

            switch (variabletocheck)
            {
                case "a.leadnegotiator_id":
                    if (sectiontocheck.indexOf("999") > -1)
                    {
                        newextrafilter += "a.leadnegotiator_id not in (3, 2, 1, 68)";
                    }
                    else
                    {
                        newextrafilter += "a.leadnegotiator_id in " + sectiontocheck.substr(sectiontocheck.indexOf("=") + 1);
                    }
                    break;
                case "a.country_id":
                    newextrafilter += "a.country_id in " + sectiontocheck.substr(sectiontocheck.indexOf("=") + 1);
                    break;
                case "a.enquiry_status_id":
                    newextrafilter += "a.enquiry_status_id in " + sectiontocheck.substr(sectiontocheck.indexOf("=") + 1);
                    break;
                case "a.qualified":
                    newextrafilter += "a.qualified in " + sectiontocheck.substr(sectiontocheck.indexOf("=") + 1);
                    break;
                case "contacted":
                    newextrafilter += "(SELECT communication_type_id FROM communication ct WHERE ct.applicant_id = a.applicant_id ORDER BY date_created DESC LIMIT 1) is ";
                    if (sectiontocheck.indexOf("yes") == -1)
                    { newextrafilter += "not "; }									
                    newextrafilter += "null";
                    break;
                case "visit":
                    if (sectiontocheck.indexOf(",") > 0)
                    { newextrafilter += "("; }

                    var addedvisit = 0;

                    if (sectiontocheck.indexOf("planned") > 0)
                    {
                        newextrafilter += "(SELECT COUNT(*) FROM viewing v WHERE v.applicant_id = a.applicant_id AND v.viewing_date > NOW() AND v.cancelled = 0) > 0";
                        addedvisit++;
                    }


                    if (sectiontocheck.indexOf("completed") > 0)
                    {
                        if (sectiontocheck.indexOf(",") > 0 && addedvisit > 0) { newextrafilter += " OR "; }
                        newextrafilter += "(SELECT COUNT(*) FROM viewing v WHERE v.applicant_id = a.applicant_id AND v.viewing_date < NOW() AND v.cancelled = 0) > 0";
                        addedvisit++;
                    }


                    if (sectiontocheck.indexOf("cancelled") > 0)
                    {
                        if (sectiontocheck.indexOf(",") > 0 && addedvisit > 0) { newextrafilter += " OR "; }
                        newextrafilter += "(SELECT COUNT(*) FROM viewing v WHERE v.applicant_id = a.applicant_id AND v.cancelled = 1) > 0";
                        addedvisit++;
                    }

                    if (sectiontocheck.indexOf(",") > 0)
                    { newextrafilter += ")"; }

                    break;
                case "a.agent_introducer":
                    newextrafilter += "a.agent_introducer in " + sectiontocheck.substr(sectiontocheck.indexOf("=") + 1);
                    break;
            }

        }
        postData += newextrafilter;
        postData = postData.replace("&search=applicantmastersearch", "");
        
    }


    //console.log(postData);
     
    $.ajax({
        type: "GET",
        url: "/CounterApplicantAjax.aspx",
        data: postData,
        async: false,
        cache: false,
        timeout: 50000,
        error: function () { /*$("#ctl00_textPL_ctl00_noresults").html('');*/ },
        success: function (msg)
        {
            var totalcounter = msg.substr(0, msg.indexOf("-"));

            //$('#applicantcounter').html("<i class=\"fas fa-users\"></i><span>" + totalcounter + "</span>");
            //$('#applicantcounter').show();

            FilterApplicantCounters(msg);

        }
    });

    //FilterApplicantCounters();
}

function FilterApplicantCounters(msg)
{
    var totalcount = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var hotcount = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var inprogresscount = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var newcounter = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var nostatuscounter = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var purchasecounter = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var futviewcount = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var pastviewcount = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var cancviewcount = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var contactcount = msg;
    //msg = msg.substr(msg.indexOf("-"));

    var optselectedco = 0;
    var hotselected = "", inprogselected = "", newselected = "", unknowselecte = "";

    var uncontactedcount = totalcount - contactcount;

    if (hotcount == "0") { hotcount = ""; } else { hotcount = ": " + hotcount; optselectedco++; hotselected = "appqfselected"}
    if (inprogresscount == "0") { inprogresscount = ""; } else { inprogresscount = ": " + inprogresscount; optselectedco++; inprogselected = "appqfselected" }
    if (newcounter == "0") { newcounter = ""; } else { newcounter = ": " + newcounter; optselectedco++; newselected = "appqfselected" }
    if (purchasecounter == "0") { purchasecounter = ""; } else { purchasecounter = ": " + purchasecounter; }
    if (nostatuscounter == "0") { nostatuscounter = ""; } else { nostatuscounter = ": " + nostatuscounter; optselectedco++; unknowselecte = "appqfselected" }
    if (totalcount == "0") { totalcount = ""; } else { totalcount = ": " + totalcount; }

    if (optselectedco > 1) {
        hotselected = "";
        inprogselected = "";
        newselected = "";
        unknowselecte = "";
    }
    

    var countercode = ""
    + "<a href=\"javascript:ApplicantHeaderFilter('status','apphot');\" class=\"apphot " + hotselected + "\"><i class=\"fab fa-hotjar\"></i> <span class=\"appcountresp\">Hot</span>" + hotcount + "</a>"
    + "<a href=\"javascript:ApplicantHeaderFilter('status','appprog');\" class=\"appprog " + inprogselected + "\"><i class=\"fas fa-sync\"></i> <span class=\"appcountresp\">In Progress</span>" + inprogresscount + "</a>"
    + "<a href=\"javascript:ApplicantHeaderFilter('status','appnew');\" class=\"appnew " + newselected + "\"><i class=\"fas fa-circle\"></i> <span class=\"appcountresp\">New</span>" + newcounter + "</a>"
    + "<a href=\"javascript:ApplicantHeaderFilter('status','apppurcha');\" class=\"apppurcha\"><i class=\"fas fa-shopping-cart\"></i> <span class=\"appcountresp\">Sales</span>" + purchasecounter + "</a>"
    + "<a href=\"javascript:ApplicantHeaderFilter('status','appnosta');\" class=\"appnosta " + unknowselecte + "\"><i class=\"fas fa-question\"></i> <span class=\"appcountresp\">Unknown</span>" + nostatuscounter + "</a>"
    + "<a href=\"javascript:ApplicantHeaderFilter('status','apptotal');\" class=\"apptotal\" style=\"\">Total" + totalcount + "</a>";
    $('#applicantcounterbuttons').html(countercode);
    $('#applicantcounterbuttons').show();

    var countercode2 = ""
    + "<a href=\"javascript:ApplicantHeaderFilter('viewing','planned');\" class=\"appfutview\"><i class=\"fas fa-flag\"></i> <span class=\"appcountresp\">Planned: </span>" + futviewcount + "</a>"
    + "<a href=\"javascript:ApplicantHeaderFilter('viewing','completed');\" class=\"apppastview\"><i class=\"fas fa-check\"></i> <span class=\"appcountresp\">Completed: </span>" + pastviewcount + "</a>"
    + "<a href=\"javascript:ApplicantHeaderFilter('viewing','cancelled');\" class=\"appcancview\"><i class=\"fas fa-times\"></i> <span class=\"appcountresp\">Cancelled: </span>" + cancviewcount + "</a>";
    $('#applicantcounterviewing').html(countercode2);
    $('#applicantcounterviewing').show();

    
    if (contactcount == "0") { contactcount = ""; } else { contactcount = ": " + contactcount; }
    if (uncontactedcount == "0") { uncontactedcount = ""; } else { uncontactedcount = ": " + uncontactedcount; }

    var countercode3 = ""
    + "<a href=\"javascript:ApplicantHeaderFilter('contact','contacted');\" class=\"appcontact\"><i class=\"fas fa-envelope-open\"></i> <span class=\"appcountresp\">Contacted</span>" + contactcount + "</a>"
    + "<a href=\"javascript:ApplicantHeaderFilter('contact','uncontacted');\" class=\"appcontact\"><i class=\"fas fa-envelope\"></i> <span class=\"appcountresp\">Uncontacted</span>" + uncontactedcount + "</a>";
    $('#applicantcountercontact').html(countercode3);
    $('#applicantcountercontact').show();


}

function ExportApplicants()
{
    var postData, fieldIds, fromDate, toDate, iframe;

    var extrapostData = window.location.href;
    
    if (extrapostData.indexOf("?") == -1)
    {
        extrapostData = 'join=allapplicants';
    }
    else
    {
        extrapostData = extrapostData.substr(extrapostData.indexOf("?") + 1);
        extrapostData = extrapostData.replace('search=', 'searchterm=');
    }
       
    postData = "/TableJoinCSV.aspx?" + extrapostData;

    var wOpen = window.open(postData, 'csv', 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=yes,width=500,height=500');
    wOpen.focus();
}

function PropertyCounter() {
    //console.log('taskcoloring');

    $('#propertycounter').show();
    $('#propertytotalcounter').show();
            
    var counter = 0;
    var propavailable = 0, propexchanged = 0, propreserved = 0, propunderoffer = 0, propcompleted = 0;

    $('#ctl00_contentPL_mydatalist tbody tr').each(function () {
        //1 join applicant name and surname
        //2 join lead reminder name and surname
        //3 add status class for coloring to the row 
        //4 replace status text for icon
        
        var propStatus = "", propclass = "";
        propStatus = $(this).children('td:nth-child(4)').html();
    
        if (propStatus == " Available") {
            propavailable++;
            propclass = "pavailable";
            counter++;
        }
        else if (propStatus == " Exchanged") {
            propexchanged++;
            propclass = "pexchange";
            counter++;
        }
        else if (propStatus == " Reserved") {
            propreserved++;
            propclass = "preserved";
            counter++;
        }
        else if (propStatus == " Under Offer") {
            propunderoffer++;
            propclass = "punderoffer";
            counter++;
        }
        else if (propStatus == " Completed") {
            propcompleted++;
            propclass = "pcompleted";
            counter++;
        }
        

        $(this).attr('class', propclass);
    });

    if (propavailable == "0") { propavailable = ""; } else { propavailable = ": " + propavailable; }
    if (propreserved == "0") { propreserved = ""; } else { propreserved = ": " + propreserved; }
    if (propunderoffer == "0") { propunderoffer = ""; } else { propunderoffer = ": " + propunderoffer; }
    if (propexchanged == "0") { propexchanged = ""; } else { propexchanged = ": " + propexchanged; }
    if (propcompleted == "0") { propcompleted = ""; } else { propcompleted = ": " + propcompleted; }
    if (counter == "0") { counter = ""; } else { counter = ": " + counter; }

    var countercode = ""
    + "<a href=\"javascript:PropertyFilter('pavailable');\" class=\"pavailable\"><i class=\"fas fa-home\"></i> Available" + propavailable + "</a>"
    + "<a href=\"javascript:PropertyFilter('punderoffer');\" class=\"punderoffer\"><i class=\"fas fa-hand-holding-usd\"></i> Offer Received" + propunderoffer + "</a>"
    + "<a href=\"javascript:PropertyFilter('preserved');\" class=\"preserved\"><i class=\"fas fa-hourglass-start\"></i> Reserved" + propreserved + "</a>"
    + "<a href=\"javascript:PropertyFilter('pexchange');\" class=\"pexchange\"><i class=\"fas fa-sync\"></i> Exchanged" + propexchanged + "</a>"
    + "<a href=\"javascript:PropertyFilter('pcompleted');\" class=\"pcompleted\"><i class=\"fas fa-check\"></i> Completed" + propcompleted + "</a>"
    + "<a href=\"javascript:PropertyFilter('ptotal');\" class=\"ptotal\" style=\"\">Total" + counter + "</a>";

    var totalcountercode = "<i class=\"fas fa-home\"></i><span>" + counter + "</span>";
    
    $('#propertytotalcounter').html(totalcountercode);
    $('#propertycounter').html(countercode);

}

function PropertyFilter(classtoshow)
{
    var counter = 1;

    $('#ctl00_contentPL_mydatalist tbody tr').each(function ()
    {
        if (counter > 1)
        {
            var rowclass = $(this).attr('class');
            
            if (classtoshow != "ptotal")
            {

                if (rowclass == classtoshow) {
                    $(this).attr('style', '');
                }
                else {
                    $(this).attr('style', 'display:none;');
                }
            }
            else
            {
                $(this).attr('style', '');
            }
        }
        counter++;
    });

    //titles
    
    $('#propertycounter > a').each(function () {
        var aclass = $(this).attr('class');

        if (aclass == classtoshow)
        {
            $(this).attr('style', 'border:1px solid black; color:black;');
        }
        else {
            $(this).attr('style', '');
        }
    });

    /*var oldclassselected = $('.tcounterselected').attr('class');
    oldclassselected = oldclassselected.replace('tcounterselected', ' ');
    $('.tcounterselected').attr('class', oldclassselected);


    $('.' + classtoshow).attr('class', classtoshow + ' tcounterselected');*/
}

function PropertiesIcons()
{

    $('#ctl00_contentPL_mydatalist tbody tr').each(function () {


        var price = $(this).children('td:nth-child(3)').html();

        if (price == "£0")
        {
            $(this).children('td:nth-child(3)').html("&nbsp;");
        }

        var statusid = $(this).children('td:nth-child(4)').html();

        var statusicon = "";

        switch (statusid)
        {
            case " Available":
                statusicon = "<i class=\"fas fa-home\"></i>";
                break;
            case " Exchanged":
                statusicon = "<i class=\"fas fa-sync\"></i>";
                break;
            case " Reserved":
                statusicon = "<i class=\"fas fa-hourglass-start\"></i>";
                break;
            case " Under Offer":
                statusicon = "<i class=\"fas fa-hand-holding-usd\"></i>";
                break;
            case " Offer Received":
                statusicon = "<i class=\"fas fa-hand-holding-usd\"></i>";
                break;
            case " Offer Rejected":
                statusicon = "<i class=\"fas fa-user-times\"></i>";
                break;
            case " Completed":
                statusicon = "<i class=\"fas fa-check\"></i>";
                break;
            default:
                statusicon = statusid;
                break;
        }

        $(this).children('td:nth-child(4)').html(statusicon);


    });
}

function LeadNegotiatorIcon()
{
    $('#ctl00_contentPL_mydatalist tbody tr').each(function ()
    {
        var almanego = $(this).children('td:nth-child(2)').html();

        if (almanego == " 1")
        {
            $(this).children('td:nth-child(2)').html("<span><i class=\"fas fa-check\"></i></span>");
        }
        else
        {
            $(this).children('td:nth-child(2)').html("<span><i class=\"fas fa-times\"></i></span>");
        }


    });

}

function HideDevMenu()
{
    $('#developmentmenu').hide();
}

function ApplicantHeaderFilter(sectiona, statusclick)
{
    var finallink;
    var newstatusid;
    var fulllink = $('#ctl00_contentPL_mydatalist > tbody > tr:first-child > th:first-child > a').attr('href');
    var extrafpos = fulllink.indexOf("extrafil") + 12;

    fulllink = fulllink.replace("=+", "=");

    if (sectiona == "status") {
        switch (statusclick) {
            case "apptotal": newstatusid = 999; break;
            case "apphot": newstatusid = 5; break;
            case "appprog": newstatusid = 1; break;
            case "appnew": newstatusid = 6; break;
            case "appnosta": newstatusid = 0; break;
            case "apppurcha": newstatusid = 888; break;
        }

        //console.log($('#ctl00_contentPL_mydatalist > tbody > tr:first-child > th:first-child > a').attr('href'));


        //TableJoinView.aspx?join=allapplicants&table=applicant&search=&orderby=applicant_id&dir=DESC&extrafilter= a.leadnegotiator_id in (1) and a.enquiry_status_id in (1)
        //TableJoinView.aspx?join=allapplicants&table=applicant&search=&orderby=applicant_id&dir=DESC&extrafilter= a.leadnegotiator_id in (1)

        if (fulllink.indexOf("a.enquiry_status_id") > -1) {
            if (newstatusid == 999) {
                finallink = "/applicants";//fulllink;
            }
            else {
                var prelink = fulllink.substr(0, fulllink.indexOf("a.enquiry_status_id in (") + 24);

                var tempstat = fulllink.substr(fulllink.indexOf("a.enquiry_status_id in (") + 24);
                tempstat = tempstat.substr(tempstat.indexOf(")"));

                finallink = prelink + "" + newstatusid + "" + tempstat;
            }
        }
        else {
            if (newstatusid == 999) {
                finallink = "/applicants";//fulllink;
            }
            else {
                var tempstat = fulllink.substr(fulllink.indexOf("extrafil") + 12);

                var newstatustext = "";
                if (newstatusid == 0) {
                    newstatustext = "0,7";
                }
                else if (newstatusid == 888) {
                    newstatustext = "11,12,13,14";
                }
                else {
                    newstatustext = newstatusid;
                }

                if (tempstat.length > 5) {
                    finallink = fulllink + " and a.enquiry_status_id in (" + newstatustext + ")";
                }
                else {
                    finallink = fulllink + " a.enquiry_status_id in (" + newstatustext + ")";
                }

            }
        }
    }

    if (sectiona == "contact")
    {
        if (fulllink.indexOf("communication_type_id") > -1) {
            //console.log("1");
            fulllink = fulllink.substr(0, fulllink.indexOf(" (SELECT commu"));
        }
        
        if (fulllink.indexOf("communication_type_id") > -1) {
            //console.log("2");
            fulllink = fulllink.substr(0,fulllink.indexOf("%20(SELECT%20commu"));
        }

            //console.log("2");
        var tempstat = fulllink.substr(fulllink.indexOf("extrafil") + 12);

        //console.log(fulllink);

        if (statusclick == "contacted")
        {
            if (tempstat.length > 5) {
                finallink = fulllink + " and (SELECT communication_type_id FROM communication ct WHERE ct.applicant_id = a.applicant_id AND ct.deleted = 0 ORDER BY date_created DESC LIMIT 1) is not null";
            }
            else {
                finallink = fulllink + " a.enquiry_status_id in (0,1,5,6,7) AND (SELECT communication_type_id FROM communication ct WHERE ct.applicant_id = a.applicant_id AND ct.deleted = 0 ORDER BY date_created DESC LIMIT 1) is not null";
            }
        }
        else
        {
            if (tempstat.length > 5) {
                finallink = fulllink + " and (SELECT communication_type_id FROM communication ct WHERE ct.applicant_id = a.applicant_id AND ct.deleted = 0 ORDER BY date_created DESC LIMIT 1) is null";
            }
            else {
                finallink = fulllink + " a.enquiry_status_id in (0,1,5,6,7) AND (SELECT communication_type_id FROM communication ct WHERE ct.applicant_id = a.applicant_id AND ct.deleted = 0 ORDER BY date_created DESC LIMIT 1) is null";
            }
        }
                
    }

    if (sectiona == "viewing")
    {

        if (fulllink.indexOf("COUNT(*)") > -1) {
            fulllink = fulllink.substr(0, fulllink.indexOf("(SELECT COUNT(*)"));
        }

        
        var tempstat = fulllink.substr(fulllink.indexOf("extrafil") + 12);
        if (tempstat.length > 5) {
            finallink = " and ";
        }
        else
        {
            finallink = "";
        }

        switch (statusclick) {
            case "planned":
                finallink += "(SELECT COUNT(*) FROM viewing v WHERE v.applicant_id = a.applicant_id AND v.viewing_date > NOW() AND v.cancelled = 0) > 0"
                break;
            case "completed": 
                finallink += "(SELECT COUNT(*) FROM viewing v WHERE v.applicant_id = a.applicant_id AND v.viewing_date < NOW() AND v.cancelled = 0) > 0"
                break;
            case "cancelled": 
                finallink += "(SELECT COUNT(*) FROM viewing v WHERE v.applicant_id = a.applicant_id AND v.cancelled = 1) > 0"
                break;
        }


        finallink = fulllink + "" + finallink;
    }

    //console.log(finallink);


    window.location = finallink;
}

function TaskGetCounter() {
    var postData = window.location.href;
    
    if (postData.indexOf("?") == -1) {
        postData = 'join=alltasks';
    }
    else {
        postData = postData.substr(postData.indexOf("?") + 1);
    }

    //postData = postData.replace("%20a.enquiry_status_id%20in%20(1)", "").replace("%20and%20a.enquiry_status_id%20in%20(1)", "");

    //console.log("aaaa: " + postData);

    /*if (postData.indexOf("AND%20t.task_status_id") > -1) {
        postData = postData.substr(0, postData.indexOf("AND%20t.task_status_id"));
    }

    if (postData.indexOf("t.task_status_id") > -1) {
        postData = postData.substr(0, postData.indexOf("t.task_status_id"));
    }*/

    var urlhref = window.location.href;
    
    if (urlhref.indexOf("/task-reminder/") > -1)
    {
        if (postData.indexOf("?") == -1) {
            postData += '&extrafilter= taskcustomer_id in (' + (urlhref.substr(urlhref.indexOf("/task-reminder/")+15)) + ')';
        }
        else {
            postData += 'and taskcustomer_id in (' + (urlhref.substr(urlhref.indexOf("/task-reminder/") + 15)) + ')';
        }
    }
    
    //console.log(postData);

    $.ajax({
        type: "GET",
        url: "/CounterTaskAjax.aspx",
        data: postData,
        async: false,
        cache: false,
        timeout: 50000,
        error: function () { /*$("#ctl00_textPL_ctl00_noresults").html('');*/ },
        success: function (msg) {
            var totalcounter = msg.substr(0, msg.indexOf("-"));

            //$('#applicantcounter').html("<i class=\"fas fa-users\"></i><span>" + totalcounter + "</span>");
            //$('#applicantcounter').show();

            FilterTaskCounters(msg, postData);

        }
    });

}

function FilterTaskCounters(msg, postData) {
    var totalcount = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var complecount = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var outscount = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var duecount = msg;
    
    // if is only status, make quick search as "pressed"

    var dueselected = "", outselected = "", compleseleted = "", isfirstentry = 0;
    
    if (postData.indexOf("t.task_status_id%20in%20(1)") != -1 && postData.indexOf("t.date_reminder") == -1)
    {
        isfirstentry = 1;
    }

    if (postData.indexOf("taskcustomer_id") == -1 && postData.indexOf("task_type_id") == -1 && isfirstentry == 0)
    {
        if (duecount != "0") { dueselected = "tcounterselected"; }
        if (outscount != "0") { outselected = "tcounterselected"; }
        if (complecount != "0") { compleseleted = "tcounterselected"; }
    }

    // if is 0, hide the number

    if (duecount == "0") { duecount = ""; } else { duecount = ": " + duecount; }
    if (outscount == "0") { outscount = ""; } else { outscount = ": " + outscount; }
    if (complecount == "0") { complecount = ""; } else { complecount = ": " + complecount; }
    if (totalcount == "0") { totalcount = ""; } else { totalcount = ": " + totalcount; }


    var countercode = ""
    + "<span class=\"tduecount " + dueselected + "\" data=\"due\">Due" + duecount + "</span>"
    + "<span class=\"toutscount " + outselected + "\" data=\"outstanding\"><i class=\"fas fa-flag\"></i> Outstanding" + outscount + "</span>"
    + "<span class=\"tcomplcount " + compleseleted + "\" data=\"completed\"><i class=\"fas fa-check\"></i> Completed" + complecount + "</span>"
    //+ "<span class=\"tinprogcount\" data=\"inprogress\"><i class=\"far fa-clock\"></i> In Progress: " + taskinprogresscount + "</span>"
    + "<span class=\"ttotalcount\" data=\"all\"> Total" + totalcount + "</span>";

    $('#taskcounter').html(countercode);


    /*var countercode = ""
    + "<a href=\"javascript:ApplicantHeaderFilter('status','apptotal');\" class=\"apptotal\" style=\"\">Total: " + totalcount + "</a>"
    + "<a href=\"javascript:ApplicantHeaderFilter('status','apphot');\" class=\"apphot\"><i class=\"fab fa-hotjar\"></i> <span class=\"appcountresp\">Hot: </span>" + hotcount + "</a>"
    + "<a href=\"javascript:ApplicantHeaderFilter('status','appprog');\" class=\"appprog\"><i class=\"fas fa-sync\"></i> <span class=\"appcountresp\">In Progress: </span>" + inprogresscount + "</a>"
    + "<a href=\"javascript:ApplicantHeaderFilter('status','appnew');\" class=\"appnew\"><i class=\"fas fa-circle\"></i> <span class=\"appcountresp\">New: </span>" + newcounter + "</a>"
    + "<a href=\"javascript:ApplicantHeaderFilter('status','appnosta');\" class=\"appnosta\"><i class=\"fas fa-question\"></i> <span class=\"appcountresp\">Unknown: </span>" + nostatuscounter + "</a>";
    $('#taskcounterfilter').html(countercode);
    $('#taskcounterfilter').show();*/



}

function GetMoreTasks(isScrolling) {
    if ($('#ctl00_contentPL_paging2 li.next a').length > 0) {
        var postData, pageId;

        isFinished = false;
        postData = "";

        var newpostData = $('#ctl00_contentPL_paging2 li.next a').attr('href');
        //console.log('np:' + newpostData);

        if (newpostData.indexOf('?') == -1) {
            isFinished = true;
        }
        else {
            postData = newpostData.substr(newpostData.indexOf('?') + 1);
            //console.log('p:' + postData);

            $.ajax({
                type: "GET",
                url: "/TableJoinViewAjax.aspx",
                data: postData,
                async: false,
                cache: false,
                timeout: 50000,
                error: function () { /*$("#ctl00_textPL_ctl00_noresults").html('');*/ },
                success: function (msg) {

                    if (isScrolling) {
                        $("#ctl00_contentPL_mydatalist tbody").append(msg);
                        isFinished = true;

                        var extranewpostData = $('#ctl00_contentPL_paging2 li.next a').attr('href');
                        var extranewpostDatasub = extranewpostData.substr(extranewpostData.indexOf("page_id") + 8);


                        extranewpostDatasub++;

                        var newnexthref = extranewpostData.substr(0, extranewpostData.indexOf("page_id") + 8) + extranewpostDatasub;
                        $('#ctl00_contentPL_paging2 li.next a').attr('href', newnexthref);
                        //console.log(msg);
                        TaskAjaxColoring();

                        $('#ctl00_contentPL_mydatalist tr').each(function () {
                            var linkTo = $(this).children('.actions').children('.editlink').attr('href');

                            $(this).children('.datafield').click(function () {
                                window.location = linkTo;
                            });
                        });
                    }
                    else {
                    }
                }
            });
        }
    }
}

function TaskAjaxColoring() {
    //console.log('taskcoloring');

    //$('#ctl00_contentPL_mydatalist').attr('class', $('#ctl00_contentPL_mydatalist').attr('class') + ' tasktable');
   // $('#taskcounter').show();
    //$('#filtersbig').show();


    var counter = 1;
    var taskcompletedcount = 0, taskinprogresscount = 0, taskoutstandingcount = 0, totalcount = 0;

    /**** todaydate **/

    var today = $.datepicker.formatDate('dd-mm-yy', new Date());
    today = new Date(today.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

    $('#ctl00_contentPL_mydatalist tbody tr.newajax').each(function () {
        //1 join applicant name and surname
        //2 join lead reminder name and surname
        //3 add status class for coloring to the row 
        //4 replace status text for icon

        var statusTask = "";
        var tomergenames = 0;

        //if (counter > 1) {
            statusTask = $(this).children('td:nth-child(9)').html();
            //1
            $(this).children('td:nth-child(3)').html($(this).children('td:nth-child(3)').html() + " " + $(this).children('td:nth-child(4)').html());
            //2
            $(this).children('td:nth-child(5)').html($(this).children('td:nth-child(5)').html() + " " + $(this).children('td:nth-child(6)').html());

            totalcount++;

            var taskdate = $(this).children('td:nth-child(8)').html();
            taskdate = new Date(taskdate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

            if (taskdate > today) { taskinthefuture = 1; }
            else { taskinthefuture = 0; }
        //}

        var newcolor = "";


        if (statusTask == " Completed") { newcolor = "tcompleted"; }
        else if (statusTask == " Outstanding") { if (taskinthefuture == 1) { newcolor = "tdue"; } else { newcolor = "toutstanding"; } }
        else if (statusTask == " In Progress") { newcolor = "tinprogress"; }
        else { newcolor = ""; }

        if (statusTask == " Completed") {
            $(this).children('td:nth-child(9)').html("<span class=\"taskstatuscta\" style=\"\"><i class=\"fas fa-check\"></i></span>");
            taskcompletedcount++;
        }
        else if (statusTask == " Outstanding") {
            $(this).children('td:nth-child(9)').html("<span class=\"taskstatuscta\" style=\"\"><i class=\"fas fa-flag\"></i></span>");
            taskoutstandingcount++;
        }
        else if (statusTask == " In Progress") {
            $(this).children('td:nth-child(9)').html("<span class=\"taskstatuscta\" style=\"\"><i class=\"far fa-clock\"></i></span>");
            taskinprogresscount++;
        }

        $(this).attr('class', newcolor);

        counter++;
    });

    /*var countercode = ""
    + "<span class=\"toutscount\" data=\"outstanding\"><i class=\"fas fa-flag\"></i> Outstanding: " + taskoutstandingcount + "</span>"
    + "<span class=\"tcomplcount\" data=\"completed\"><i class=\"fas fa-check\"></i> Completed: " + taskcompletedcount + "</span>"
    //+ "<span class=\"tinprogcount\" data=\"inprogress\"><i class=\"far fa-clock\"></i> In Progress: " + taskinprogresscount + "</span>"
    + "<span class=\"ttotalcount\" data=\"all\"> Total: " + totalcount + "</span>";

    $('#taskcounter').html(countercode);*/

    TaskGetCounter();

    $('#taskcounter span').click(function () {
        var op = $(this).attr('data');
        var totalshows = 1;

        if (op == "outstanding") {
            window.location = "/TableJoinView.aspx?join=alltasks&extrafilter=t.task_status_id in (1)&orderby=date_reminder, task_status";
        }
        else if (op == "completed") {
            window.location = "/TableJoinView.aspx?join=alltasks&extrafilter=t.task_status_id in (3)&orderby=date_reminder, task_status";
        }
        else {
            window.location = "/task-reminder";
        }

        /*$('#ctl00_contentPL_mydatalist tbody tr').each(function ()
        {            
            if ($(this).hasClass('t' + op) || $(this).attr('class') == "" || op == "all")
            {                
                $(this).show();
                totalshows++;
            }
            else
            {                
                $(this).hide();
            }
        });*/

        //TaskMaxTableHeight(totalshows);
    });

    //$('#taskcounter span.tcomplcount').click();
}

function PopulateDropdown(sourceDD, PopulateDD, sourceTable) {
    var postData, table, selectedValue;

    selectedValue = $('#' + sourceDD).val();

    if (selectedValue != '') {
        postData = "table=" + sourceTable + '&filter=' + $('#' + sourceDD).attr('id') + '&filtervalue=' + selectedValue;
        //console.log(postData);

        $.ajax({
            type: "GET",
            url: "/PopulateDropdownAjax.aspx",
            data: postData,
            timeout: 50000,
            error: function () { console.log('GDD-Sorry there was a problem'); },
            success: function (msg) {
                //console.log(msg);

                if (msg == 'T') {
                    $('#outcome').html('Session timed out, please log in again');
                }
                else if (msg == 'F') {
                    $('#outcome').html('No Data Supplied');
                }
                else {
                    $('#' + PopulateDD).html(msg);
                }
            }
        });
    }
}

function ViewingColoring() {
    //console.log('taskcoloring');

    //$('#ctl00_contentPL_mydatalist').attr('class', $('#ctl00_contentPL_mydatalist').attr('class') + ' tasktable');
    $('#viewingcounter').show();
    $('#filtersbig').show();

    // check length name
    $('#ctl00_contentPL_mydatalist tbody tr').each(function () {

        var leadname = $(this).children('td:nth-child(2)').html();
        var appname = $(this).children('td:nth-child(3)').html();
        var agentname = $(this).children('td:nth-child(4)').html();

        if (leadname != undefined) {
            if (leadname.length > 20) {
                $(this).children('td:nth-child(2)').html(leadname.substr(0, 20) + "...");
            }
        }

        if (appname != undefined) {
            if (appname.length > 20) {
                $(this).children('td:nth-child(3)').html(appname.substr(0, 20) + "...");
            }
        }

        if (agentname != undefined) {
            if (agentname.length > 20) {
                $(this).children('td:nth-child(4)').html(agentname.substr(0, 20) + "...");
            }
        }
    });

    ViewingGetCounter();   
}

function ViewingGetCounter() {
    var postData = window.location.href;

    if (postData.indexOf("?") == -1) {
        postData = 'join=allviewingscounter';
    }
    else {
        postData = postData.substr(postData.indexOf("?") + 1);
    }

    $.ajax({
        type: "GET",
        url: "/CounterViewingAjax.aspx",
        data: postData,        
        cache: false,
        timeout: 50000,
        error: function () {  },
        success: function (msg) {
            var totalcounter = msg.substr(0, msg.indexOf("-"));
            //console.log(msg);
            FilterViewingCounters(msg);
        }
    });
}

function FilterViewingCounters(msg) {
    var totalcount = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var complecount = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var outscount = msg.substr(0, msg.indexOf("-"));
    msg = msg.substr(msg.indexOf("-") + 1);

    var cancelcount = msg;


    var optselectedco = 0;
    var plannedselected = "", completedselected = "", cancelledselected = "";


    if (outscount == "0") { outscount = ""; } else { outscount = ": " + outscount; optselectedco++; plannedselected = "vieqfselected";}
    if (complecount == "0") { complecount = ""; } else { complecount = ": " + complecount; optselectedco++; completedselected = "vieqfselected"; }
    if (cancelcount == "0") { cancelcount = ""; } else { cancelcount = ": " + cancelcount; optselectedco++; cancelledselected = "vieqfselected"; }

    if (optselectedco > 1) {
        plannedselected = "";
        completedselected = "";
        cancelledselected = "";
    }


    var countercode = ""    
    + "<span class=\"orange " + plannedselected + "\" data=\"planned\"><i class=\"fa fa-sync\"></i> Planned" + outscount + "</span>"
    + "<span class=\"green " + completedselected + "\" data=\"completed\"><i class=\"fa fa-check\"></i> Completed" + complecount + "</span>"
    + "<span class=\"red " + cancelledselected + "\" data=\"cancelled\"><i class=\"fa fa-times\"></i> Cancelled" + cancelcount + "</span>"
    + "<span class=\"ttotalcount\" data=\"all\"> Total: " + totalcount + "</span>";

    $('#viewingcounter').html(countercode);
    $('#viewingcounter').show();

    $('#viewingcounter span').click(function () {
        var op = $(this).attr('data');
        var totalshows = 1;
        //console.log(op);
        if (op == "planned") {
            window.location = "/TableJoinView.aspx?join=allviewings&extrafilter=v.cancelled= 0 AND v.viewing_date >= date(now())";
        }
        else if (op == "completed") {
            window.location = "/TableJoinView.aspx?join=allviewings&extrafilter=v.cancelled= 0 AND v.viewing_date < date(now())";
        }
        else if (op == "cancelled") {
            window.location = "/TableJoinView.aspx?join=allviewings&extrafilter=v.cancelled= 1";
        }
        else {
            window.location = "";
        }
    });
}

function ViewingFiltered() {
    var tempte = "", newsearch = "";
    var counter = 0;
    $.each($("input[name='tasklead']:checked"), function () {
        if (counter > 0) { tempte += "," }
        tempte += $(this).val();
        counter++;
    });

    if (tempte.length > 0) {
        newsearch = "v.leadnegotiator_id=(" + tempte + ")";
        $.cookie('tasklead', ',' + tempte + ',', { path: '/' });
    }
    else {
        $.removeCookie('applilead');
    }

    if ($('#filteragent').val() != 0 && $('#filteragent').val() != null) {
        if (newsearch.length > 0) {
            newsearch += "|";
        }

        newsearch += "v.agent_id=(" + $('#filteragent').val() + ")";

        $.cookie('filteragent', ',' + $('#filteragent').val() + ',', { path: '/' });
    }
    else {
        $.removeCookie('filteragent');
    }

    tempte = "";
    counter = 0;

    $.each($("input[name='viewings']:checked"), function () {
        if (counter > 0) { tempte += "," }
        tempte += $(this).val();
        counter++;
    });

    if (tempte.length > 0) {
        if (newsearch.length > 0) {
            newsearch += "|";
        }
        newsearch += "viewings=(" + tempte + ")";

        $.cookie('viewings', ',' + tempte + ',', { path: '/' });
    }
    else {
        $.removeCookie('viewings');
    }

    tempte = ""
    counter = 0;
    $.each($("input[name='viewingdev']:checked"), function () {
        if (counter > 0) { tempte += "," }
        tempte += $(this).val();
        counter++;
    });

    if (tempte.length > 0) {
        if (newsearch.length > 0) {
            newsearch += "|";
        }
        newsearch += "v.development_id=(" + tempte + ")";

        $.cookie('viewingsdev', ',' + tempte + ',', { path: '/' });
    }
    else {
        $.removeCookie('viewingsdev');
    }

    var apartmentselected = "";

    $.each($("#vfapartments select:visible"), function () {
        if ($(this).val() != 0 && $(this).val() != null) {
            if (newsearch.length > 0) {
                newsearch += "|";
            }

            apartmentselected = $(this).val().join();

            if (apartmentselected.charAt(0) == ',')
            {                
                apartmentselected = apartmentselected.substr(1);
            }

            newsearch += "v.property_id=(" + apartmentselected + ")";            
        }
    });
    
    if (tempte.length > 0) {
        $.cookie('vfapartments1', ',' + apartmentselected + ',', { path: '/' });
        $.cookie('vfapartments2', ',' + apartmentselected + ',', { path: '/' });
        $.cookie('vfapartments3', ',' + apartmentselected + ',', { path: '/' });
    }
    else {
        $.removeCookie('vfapartments1');
        $.removeCookie('vfapartments2');
        $.removeCookie('vfapartments3');
    }

    if ($('#viewingdate').val() != '')
    {
        var viewingDate = $('#viewingdate').val();
        viewingDate = viewingDate.replace(' - ', '_');
        if (newsearch.length > 0) {
            newsearch += "|";
        }

        newsearch += "v.viewing_date='" + viewingDate + "'";

        $.cookie('viewingdate', viewingDate, { path: '/' });

       // console.log(viewingDate);
    }
    else {
        $.removeCookie('viewingdate');
    }

    //console.log(newsearch);

    window.location.href = "/TableJoinView.aspx?join=allviewings&search=applicantmastersearch&extrafilter=" + newsearch + "&orderby=v.viewing_date%20DESC,%20v.viewing_hour%20DESC";
}

function ResetApplicantList()
{
    if ($('#applicantfiltercontent input').length > 0) {
        var fCookie, fieldID;

        $('#applicantfiltercontent *').filter(':input').each(function () {
            //fCookie = $.cookie(this.name);
            $.removeCookie(this.name);

            /*if ($(this).attr('type') == 'checkbox') {
                    $(this).attr('checked', false);
            }
            else {
                    $("#" + fieldID + " option[value='" + e + "']").prop("selected", false);
            }*/

        });
    }

    window.location = "/applicants";
}

function ResetTaskList() {

    if($('#hndJoin').val() == "alltasks") {
        var fCookie, fieldID;

        $('#taskfiltercontent *').filter(':input').each(function () {
            $.removeCookie(this.name);
        });
    }

    window.location = "/TableJoinView.aspx?join=alltasks&extrafilter=t.task_status_id in (1)&orderby=date_reminder, task_status";
}

function ResetViewingList() {
    if ($('#viewingcounterfilter #applicantfiltercontent input').length > 0) {
        var fCookie, fieldID;

        $('#viewingcounterfilter #applicantfiltercontent *').filter(':input').each(function () {
            //fCookie = $.cookie(this.name);
            $.removeCookie(this.name);

            /*if ($(this).attr('type') == 'checkbox') {
                    $(this).attr('checked', false);
            }
            else {
                    $("#" + fieldID + " option[value='" + e + "']").prop("selected", false);
            }*/

        });
    }

    window.location = "/viewings";
}

function SetUpFilterDevelopment()
{
    var devsel = $('#developmentmenu li.selected').attr('id');
    devsel = devsel.replace("dev", "");

    $('#viewingdevli1').hide();
    $('#viewingdevli2').hide();
    $('#viewingdevli3').hide();
    $('#viewingdevli0').hide();

    $('#viewingdevli' + devsel).show();
    $('#viewingdevli' + devsel + ' input').prop('checked', true);

    VFDevSelect();
}

function CleanDevelopmentTitle()
{
    var counter = 1;

    $('#ctl00_contentPL_mydatalist tbody tr').each(function ()
    {
        
        if (counter > 1) {
            //development text
            var productdevelopment = $(this).children('td:nth-child(4)').html();
            if (productdevelopment.indexOf("Vie") > -1) {
                $(this).children('td:nth-child(4)').html("All Developments");
            }
            //colors from stock
            var stock = $(this).children('td:nth-child(2)').html();
            var stockalert = $(this).children('td:nth-child(5)').html();
            var intstock = parseInt(stock);
            var intstockalert = parseInt(stockalert);
            if (intstock <= intstockalert)
            {
                $(this).attr('class', 'red');
            }
        }
        counter++;
    });
}

function GetMoreViewings(isScrolling) {
    if ($('#ctl00_contentPL_paging2 li.next a').length > 0) {
        var postData, pageId;

        isFinished = false;
        postData = "";

        var newpostData = $('#ctl00_contentPL_paging2 li.next a').attr('href');
        //console.log('np:' + newpostData);

        if (newpostData.indexOf('?') == -1) {
            isFinished = true;
        }
        else {
            postData = newpostData.substr(newpostData.indexOf('?') + 1);
            //console.log('p:' + postData);

            $.ajax({
                type: "GET",
                url: "/TableJoinViewAjax.aspx",
                data: postData,                
                cache: false,
                timeout: 50000,
                error: function () { },
                success: function (msg) {

                    if (isScrolling) {
                        $("#ctl00_contentPL_mydatalist tbody").append(msg);
                        isFinished = true;

                        var extranewpostData = $('#ctl00_contentPL_paging2 li.next a').attr('href');
                        var extranewpostDatasub = extranewpostData.substr(extranewpostData.indexOf("page_id") + 8);


                        extranewpostDatasub++;

                        var newnexthref = extranewpostData.substr(0, extranewpostData.indexOf("page_id") + 8) + extranewpostDatasub;
                        $('#ctl00_contentPL_paging2 li.next a').attr('href', newnexthref);

                        ViewingColoring();

                        $('#ctl00_contentPL_mydatalist tr').each(function () {
                            var linkTo = $(this).children('.actions').children('.editlink').attr('href');

                            $(this).children('.datafield').click(function () {
                                window.location = linkTo;
                            });
                        });
                    }
                    else {
                    }
                }
            });
        }
    }
}