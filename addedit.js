var isnewalmaitem = 0, addCriteriaCounter = 0, _ckEditor = null, communicationnewcreate = 0, _newLeadEmailSent = false;
var mcagent, mcapplicant;

$(function () {
   // $('input.datepicker').datepicker({ showAnim: 'blind', dateFormat: 'dd/mm/yy' });

    $('input.datepicker').each(function () {
        var oldclass = $(this).attr('class');
        var newclass = oldclass.replace("datepicker", "lockdpicker");
        $(this).attr('class',newclass);
    });


    /*if ($('#ctl00_contentPL_hndItemId').val() == '0') {
        $('input.datepicker').datepicker('setDate', new Date());
    }*/

    //console.log('valor: ' + $('#ctl00_contentPL_hndItemId').val());
    
    if ($('#ctl00_contentPL_hndItemId').val() == 0) {
        //console.log('entra newitem');
        UnlockFieldsNew();

        if ($('#ctl00_contentPL_tabledata div:first-child div.panel-heading').html() == "Applicant")
        {
            //console.log('entra new applicant -- ' + $('#loggedstaffid').val());
            if ($('#hdnIsAgent').val() == 1)
            {
                //console.log('entra next 1');
                if ($('#loggedstaffid').val() == 29)
                {
                    //console.log('entra next 2');
                    $('#agent_introducer').val("300");
                    $('.dropdown #leadnegotiator_id').val("88");
                    $('#fapplicant #leadnegotiator_id').val("88");
                }
            }
        }
    }
    else
    {
        // for existing applicant, store the current leadnegotiator_id
        if ($('#ctl00_contentPL_hndTable').val() == 'applicant') {            
            $('#hndOldLeadNeg').val($('#leadnegotiator_id').val());
        }
        else if ($('#ctl00_contentPL_hndTable').val() == 'viewing') {
            UnlockFieldsNew();
        }
    }

    if ($('.main-content .datapanels').length == 0) {
        $('#ctl00_contentPL_tabledata > div:first-child').addClass('selected');
    }

    $('textarea.bodytext').each(function () {
        $(this).attr('name', $(this).attr('id'));
    });

    $('.checkboxlist table input').click(function () {        
        var postData = "data=" + $(this).parent().attr('data') + '|' + $(this).is(':checked');

        $.ajax({
            type: "POST",
            url: "/AddEditCBoxList.aspx",
            data: postData,
            timeout: 50000,
            error: function () { $('#outcome').html('CBox Sorry there was a problem'); },
            success: function (msg) {                
            }
        });
    });

    $(".fa-info-circle").click(function (event) {
        event.preventDefault();

        $('.modal-example-body').html('<h2>Keep my profile private</h2> You would like to keep your profile private and not visible to other members.');
        ShowPopUp('infobox');
    });

    //console.log('title ' + $('#ctl00_contentPL_tabledata div:first-child div.panel-heading').html());


    if ($('#ctl00_contentPL_tabledata div:first-child div.panel-heading').html() == "Applicant")
    {
        ApplicantContact();
        BoxesSize();
        ApplicantQualified();
        MobilePhoneButton();
        //ApplicantPageTaskRedoLink();
        ApplicantContactClocks();
        ViewingLink('applicant');
        setTimeout('AddUserJourney();', 500);
        MarketingCollateralPreselDevel();

        if ($('#hndFullDevName').val() == 'The Bryanston Hyde Park')
        {
            $('#dtmarketingsuite').addClass('show');
        }
    }
    else if ($('#ctl00_contentPL_tabledata div:first-child div.panel-heading').html() == "Overview") // add/edit property
    {
        PropertyCleanAmenities();
        ViewingLink('property');
        ApplicantLinkedButton();
    }
    else if ($('#ctl00_contentPL_tabledata div:first-child div.panel-heading').html() == "Task Applicant")
    {
        BoxesSizeTask();
        PreSelectApplicant();
        ExternalPreselectAgentTask();
        ExtraInfoClocks();
        MobilePhoneButtonTask();
        $('#ftasktwo span.checkbox input').change(function () {
           // alert('cambia');
            if (this.checked) {
                $('#ftasktwo span.hiddenfield input').val("3");
                PreCheckTaskCompleted();
            }
            else {
                $('#ftasktwo span.hiddenfield input').val("1");
                PreCheckTaskCompleted();
            }
        });
    }
    else if ($('#ctl00_contentPL_tabledata div:first-child div.panel-heading').html() == "Agent") { // add/edit agent
        HideDevMenu();
        AgentContact();
        AgentCheckerAgent();
        ViewingLink('agent');
        MarketingCollateralPreselDevel();
    }
    else if ($('#ctl00_contentPL_tabledata div:first-child div.panel-heading').html() == "Viewing Information") // add/edit viewing
    {
        PreSelectInViewing();
        ViewingPropertiesInfo();
        ViewingCheckApplicantLink();
        ViewingAttendeeInfo();
        PreselectLocationandClean();

        $("#viewing_hour").keyup(function () {
            PreselectViewingEndHour();
        });

        $('#viewing_date').datepicker({ showAnim: 'blind', dateFormat: 'dd/mm/yy' });

        CleanApartmentDropdowns();
    }

    if ($('#newapplicantredirect').val() == 1)
    {
        NewApplicantAnimationShow();
    }

    // task detail Go To Applicant button
    if ($('#ctl00_contentPL_hndTable').val() == 'task' && $('#ctl00_contentPL_hndItemId').val() != '0')
    {
        $('#viewapplicantbtn').attr('href', '/applicant-profile/' + $('#applicant_id').val());
        $('#viewapplicantbtn').show();
    }

    $('.notescontentacordeon').click(function () {
        var shortheight = $(this).children('.notescontentshort').height() + 20;
        var longheight = $(this).children('.notescontentlong').height() + shortheight;
        var acordeonid = $(this).attr('id');

        var newheight = 0;
        var todisplay = "";

        if ($(this).children('.notescontentshort').css('display') == "block")
        {
            newheight = longheight;
            $(this).children('.notescontentshort').fadeOut();
            setTimeout("NoteAcordeonStep1('" + acordeonid + "','notescontentlong')", 200);
            /*NoteAcordeonStep1(itemid, divclass)
            $(this).children('.notescontentlong').attr('style', 'color:white;');
            $(this).children('.notescontentlong').fadeIn();*/
            //todisplay = "long";
        }
        else
        {
            newheight = shortheight;
            $(this).children('.notescontentlong').fadeOut();
            setTimeout("NoteAcordeonStep1('" + acordeonid + "','notescontentshort')", 200);
            //$(this).children('.notescontentshort').fadeIn();
            //todisplay = "short";
        }

        /*$(this).animate({
            height: newheight + "px"
        }, 500);

        setTimeout("OpenAcordeonNotes('" + todisplay + "','" + acordeonid + "')", 500);*/
        //console.log('short: ' + shortheight + ' - long: ' + longheight + ' -- ' + $(this).children('.notescontentshort').css('display') + ' -- ' + $(this).children('.notescontentlong').css('display'));
    });

    $('#sbtnnotespanel').attr('href', 'javascript:SaveNotesAlma();');


    $('.taskcounter span').click(function () {
        var statustoshow = $(this).attr('itemref');
        ShowTaskList(statustoshow);
    });

    if ($('div.panel div.row div.taskcounter').length > 0)    
    {
        ShowTaskList(1);
    }

    // add onclick to rows in comms mgr
    $('#dtcommunicationspanel a.editlink').click(function () {
        var dataValues = $(this).parent().parent().attr('id').split('-');

        GetCommsDetails(dataValues[2], dataValues[1]);
    });

    // add onclick to delete buttons in comms mgr
    $('div.commitem a.dellink').click(function () {
        var dataValues = $(this).parent().parent().attr('id').split('-');
        
        DeleteItem(dataValues[0], dataValues[1], dataValues[2]);
    });

    // add onclick to rows in comms mgr
    $('#dtcriteria a.editlink').click(function () {
        var dataValues = $(this).parent().parent().attr('id').split('-');
        
        AddEditCriteria(dataValues[1]);
    });

    // add onclick to delete buttons in task tracker
    $('div.taskitemdiv a.dellink').click(function () {
        var dataValues = $(this).parent().attr('id').split('-');
        
        DeleteItem(dataValues[0], dataValues[1], dataValues[2]);
    });

    if ($('#fagentcontact span').length > 0 && $('#ctl00_contentPL_hndItemId').val() != '0')
    {
        //** REM* this was comment out in 11/03 check if they dont want back in 1 week  
        //GetCompanyAddressAjax();
    }
    
    // if its edit task, of type phone call and not completed    
    if (
        $('#ctl00_contentPL_hndTable').val() == 'task' && $('#ctl00_contentPL_hndItemId').val() != '0'
        && $('#task_type_id').val() == '1' && $('#task_status_id').val() != '3'
        ) {
        $('#sbtntasktwo').attr('href', 'javascript:CheckTaskCompleted()');
    }

    $('span.taskstatus').click(function () {
        //console.log('aaaaa');
        var dataValues = $(this).parent().attr('id').split('-');
        //CompleteTask(dataValues[1]);
        EditTaskAjaxPopup(dataValues[1]);
    });


    $(".jiinputtototal").change(function(){
        BuyerJourneyCalculateTotal();
    });
    
    // add onclick to delete buttons in viewings
    $('div.viewingitemdiv a.dellink').click(function () {
        var dataValues = $(this).parent().parent().attr('id').split('-');
        
        DeleteItem(dataValues[0], dataValues[1], dataValues[2]);
    });

    // set file mgr btn link
    if ($('#dtfilemangerpanel div').length > 0)
    {
        var fmlink = $('#filemgrbtn').attr('href');
        fmlink = fmlink.replace('**dev**', $('#development_id>option:selected').text().replace(' ', ''))
        $('#filemgrbtn').attr('href', fmlink);
    }

    // if its viewing
    if ($('#ctl00_contentPL_hndTable').val() == 'viewing')
    {
        // if its add new viewing
        if ($('#ctl00_contentPL_hndItemId').val() == '0')
        {
            //if its Centre Point then default Apartment to 51
            if ($('#development_id').val() == '1') 
            {
                $('#property_id').val('24');
                $('#property_id2').val('36');
                $('#property_id3').val('73');
            }
            else if ($('#development_id').val() == '2')
            {
                $('#viewing_location_id').val('2');
                $('#property_id').val('201');
            }
            /*else if ($('#development_id').val() == '3')
            {
                $('#property_id').val('138');
                $('#property_id2').val('142');
            }*/
        
            SetViewingSubjectLine();
        }
        else // on edit viewing 
        {
            // hide Viewing Extra Information text if date/start/end hour is changed
            $("#viewing_date").change(function () {
                $('#details').val('');
            });

            $("#viewing_hour").keyup(function () {
                $('#details').val('');
            });
        }

        $("#leadnegotiator_id").change(function () {
            SetViewingSubjectLine();
        });

        $("#agent_id").change(function () {
            SetViewingSubjectLine();
        });

        $("#applicant_id").change(function () {
            SetViewingSubjectLine();
        });

        $("#property_id").change(function () { SetViewingSubjectLine(); });
        $("#property_id2").change(function () { SetViewingSubjectLine(); });
        $("#property_id3").change(function () { SetViewingSubjectLine(); });
        $("#property_id4").change(function () { SetViewingSubjectLine(); });
        $("#property_id5").change(function () { SetViewingSubjectLine(); });
        $("#property_id6").change(function () { SetViewingSubjectLine(); });
        $("#property_id7").change(function () { SetViewingSubjectLine(); });
        $("#property_id8").change(function () { SetViewingSubjectLine(); });
        $("#property_id9").change(function () { SetViewingSubjectLine(); });
        $("#property_id10").change(function () { SetViewingSubjectLine(); });
    }

    ShowPlusInfoFirst();
    
});

function NoteAcordeonStep1(itemid, divclass)
{
    $('#' + itemid + ' .' + divclass).attr('style', 'color:white;');
    setTimeout("NoteAcordeonStep2('" + itemid + "', '" + divclass + "')", 200);
}

function NoteAcordeonStep2(itemid, divclass) {
    $('#' + itemid + ' .' + divclass).fadeIn();
    setTimeout("NoteAcordeonStep3('" + itemid + "', '" + divclass + "')", 200);
}

function NoteAcordeonStep3(itemid, divclass) {
    $('#' + itemid + ' .' + divclass).animate({
        color: "black"
    }, 200);
}

function AddNavOnClick(navItem) {
    $('#tn' + navItem + ' a').click(function() {
        var tabId = $(this).attr('id');

        if (!$(this).hasClass('selected')) {
            $('#tabnav a').attr('class', '');
            $(this).attr('class', 'selected');

            $('div.formfields').removeClass('selected');
            $('#d' + tabId).addClass('selected');
            $('#ctl00_contentPL_hndTable').val(tabId.substring(1));
            $('#outcome').html('');
        }
    });
}

function SaveUpdateItem(table, option, itemId) {
    
    var formId = 'f' + table, formData = '', showMsg = false, isOk = 1;

    if (table == "task" && option == "sub")
    { }
    else
    {
        if (itemId == 'new') { formId += 'isnew'; } else { formId += itemId; }
    }

    //console.log(table + " -- " + option + " -- " + itemId + " -- " + $('#newtaskpopup #details').val().length);

    if (table == "task" && option == "sub" && itemId != "0") {
        if ($('#newtaskpopup #details').val().length < 2)
        {
            isOk = 0;
        }

    }


    if ($('#' + formId).valid() && isOk == 1) {
        //if (ValidateDate($('#dob').val())) {


            var postData = '', fieldID, parentId = '', fieldValue, formDiv;

            $('#outcome_' + table).html('<img src="/gfx/loading-sm.gif" width="22" height="22"/>');

            if (table == '') {
                table = $('#ctl00_contentPL_hndTable').val();
            }
            if (itemId == '') {
                itemId = $('#ctl00_contentPL_hndItemId').val();
                formDiv = option + 'addedit_' + table;
                showMsg = true;
            }
            else {
                if (itemId == 'new') {
                    formDiv = 'f' + table + 'isnew';
                }
                else {
                    formDiv = 'f' + table + itemId;
                }
            }

            postData = "table=" + table + "&id=" + itemId + "&formdata=";
            //console.log(postData);

            $('#' + formDiv + ' *').filter(':input').each(function () {
                fieldID = $(this).attr('id');

                if (fieldID == null || fieldID == '') {
                    
                }
                else if (fieldID.charAt(0) == '_') {
                    parentId = fieldID.replace('_', '');

                    if ($(this).val() == '') {
                        formData += "||" + parentId + "¬¬" + $('#' + parentId).val();
                    } else {
                        formData += "||" + $(this).val() + "¬¬" + $('#' + $(this).val()).val();
                    }
                }
                else if (fieldID.indexOf('ctl') == -1) {
                    if ($(this).hasClass('bodytext')) {
                        formData += "||" + fieldID + "¬¬" + CKEDITOR.instances[fieldID].getData();
                    } else if ($(this).hasClass('datepicker') || $(this).hasClass('simpledate')) { // format date to mysql
                        if ($(this).val() != '') {
                            var dateParts = $(this).val().split('/');
                            if (dateParts.length == 3) {
                                formData += "||" + fieldID + "¬¬" + dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
                            }
                        }
                    } else {
                        formData += "||" + fieldID + "¬¬" + $(this).val();
                    }
                }
                else {
                    fieldID = $(this).attr('idname');

                    if (fieldID != undefined) {
                        if ($(this).attr('type') == 'checkbox') {
                            fieldValue = ($(this).is(':checked')) ? 1 : 0;
                            formData += "||" + fieldID + "¬¬" + fieldValue;
                        }
                    }
                }
            });

            if ($('#_' + table).val() == '' || $('#_' + table).val() == '0') { // L2 table, add/edit mode        
                parentId = $('#__' + table).html();
                formData += "||" + parentId + "¬¬" + $('#' + parentId).val();
            }
            else {
                if (option == 'sub' && parentId == '') { // L3 table, add/edit mode            
                    parentId = $('#_' + table).val();
                    formData += "||" + parentId + "¬¬" + $('#ctl00_contentPL_hndItemId').val();
                }
            }

            //console.log('me llega: ' + table + ' -- ' + option + ' -- ' + itemId);

            if (table == "task" && option == "sub" && itemId != "0")
            {
                formData = "||details¬¬" + $('#newtaskpopup #details').val();

            }
            else if (table == "task" && option == "sub")
            {
                formData = "||applicant_id¬¬" + $('#newtaskpopup #applicant_id').val()
                + "||development_id¬¬" + $('#newtaskpopup #development_id').val()
                + "||task_type_id¬¬" + $('#newtaskpopup #task_type_id').val()
                + "||taskcustomer_id¬¬" + $('#newtaskpopup #taskcustomer_id').val()
                + "||time_reminder¬¬" + $('#newtaskpopup #time_reminder').val()
                + "||task_status_id¬¬1"// + $('#newtaskpopup #task_status_id').val()
                + "||details¬¬" + $('#newtaskpopup #details').val()
                + "||date_reminder¬¬";

                var dateremin = $('#newtaskpopup #date_reminder').val();
                var gooddate = "-" + dateremin.substr(0,dateremin.indexOf("/"));
                dateremin = dateremin.substr(dateremin.indexOf("/") + 1);

                gooddate = "-" + dateremin.substr(0,  dateremin.indexOf("/")) + gooddate;
                dateremin = dateremin.substr(dateremin.indexOf("/") + 1);

                gooddate = dateremin + gooddate;

                formData += gooddate;
            }


            //console.log('sale: ' + formData);

            postData += encodeURIComponent(formData);


            $.ajax({
                type: "POST",
                url: "/AddEditProcess.aspx",
                data: postData,
                timeout: 50000,
                error: function () {
                    $('#outcome_' + table).addClass('label-warning');
                    $('#outcome_' + table).html('Operation Failed');
                },
                success: function (msg) {

                    // if is task popup
                    if (table == "task" && option == "sub")
                    {
                        if (itemId != "0") //edit coment pop up
                        {
                            CompleteTaskPopup(itemId);
                            //window.location.reload;
                            $('#newtaskpopup').fadeOut();
                            $('#newtaskquestion').fadeIn();
                        }
                        else //new task pop up from applicant profile
                        {
                            window.location = window.location;
                        }

                    }
                    else
                    {
                        var msgValues = msg.split('|');

                        if (msgValues[0] == ':') {
                            $('#outcome_' + table).addClass('error');
                            $('#outcome_' + table).html(msgValues[1]);
                        }
                        else if (msgValues[0] == '0') {
                            if (showMsg) {
                                $('#outcome_' + table).html('Updated Successfully');
                            }
                            else if (option == 'sub' && itemId != 'new') { // L3 table                        
                                $('#is' + itemId + ' .actions').html('<strong>Saved</strong>');
                            }
                            else {
                                $('#outcome_' + table).html('Updated Successfully');
                            }
                        }
                        else {
                            $('#outcome_' + table).addClass('msg');
                            if (itemId == '0' && option == '') { // L1 table
                                $('#addedit_' + table + ' input:first-child').val(msgValues[0]);
                                $('#ctl00_contentPL_hndItemId').val(msgValues[0]);
                                $('#outcome_' + table).html('Added Successfully');
                            } else if (itemId == '0' && option == 'sub') { // L2 table                            
                                $('#subaddedit_' + table + ' input:first-child').val(msgValues[0]);
                                $('#ctl00_contentPL_hndItemId').val(msgValues[0]);
                                $('#addedit_' + table).hide('slow');

                                postData = "table=" + table + "&id=" + msgValues[0];

                                $.ajax({
                                    type: "GET",
                                    url: "/TableAjax2.aspx",
                                    data: postData,

                                    timeout: 50000,
                                    error: function () { alert('LCTD2-Sorry there was a problem'); },
                                    success: function (msg) {
                                        if (msg == 'F') {

                                        }
                                        else {
                                            $("html, body").animate({ scrollTop: 0 }, "slow");
                                            $('#tl' + table).prepend(msg);
                                        }
                                    }
                                });
                            } else if (itemId == 'new' && option == 'sub') { // L3 table                            
                                AppendNewRowData(table, msgValues[0]);
                            }
                            else {
                                $('#outcome_' + table).html('Added Successfully');
                            }
                        }

                        if (msgValues[1] != '') {
                            var extraMsg = '<span class="orange">';

                            for (var k = 1; k < msgValues.length; k++) {
                                if (msgValues[k] != '') {
                                    extraMsg += ' ' + k + ') ' + msgValues[k];
                                }
                            }

                            extraMsg += '</span>';

                            $('#outcome_' + table).append(extraMsg);
                        }
                    }
                }
            });
        //}
        /*else
        {
            $('#outcome_' + table).addClass('error');
            $('#outcome_' + table).html('Date of Birth is not in a valid format, should be dd/mm/yyyy.');
        }*/
    } else {
        if ($('#outcome_' + table).html() == '') {
            $('#outcome_' + table).addClass('error');
            $('#outcome_' + table).html('Some required field(s) have missing/invalid data.');
        }
    }
}

function EditItem(table, itemId) {
    var subTable, fieldID;

    $('#tabledata .tabdata').hide();
    $('#ctl00_contentPL_hndTable').val(table);
    $('#ctl00_contentPL_hndItemId').val(itemId);
    $('#_' + table).val(itemId);
    $('#outcome_' + table).html('');

    $('#subaddedit_' + table + ' input.datepicker').datepicker({ showAnim: 'blind', dateFormat: 'dd/mm/yy' });

    if (itemId == '0') { // reset image fields and src
        $('#subaddedit_' + table + ' *').filter(':input').each(function() {
            fieldID = $(this).attr('id');

            if (fieldID == null || fieldID == '') {
            }
            else if (fieldID.indexOf('ctl') != -1) {
                fieldID = $(this).attr('idname');
            }
            if ($('#imgctl00_contentPL_' + fieldID + ' img').length > 0) {
                $('#imgctl00_contentPL_' + fieldID + ' img').attr('src','/gfx/blank-icon.jpg');
                $('#' + fieldID).val('');
            } else if ($('#ctl00_contentPL_img' + fieldID + ' img').length > 0) {
                $('#ctl00_contentPL_img' + fieldID + ' img').attr('src', '/gfx/blank-icon.jpg');
                $('#' + fieldID).val('');
            }
        });
    }
    else {
        GetItemJsonData(table, itemId)
    }

    $('#addedit_' + table + ' .tabdata').each(function() {
        subTable = $(this).attr('id').replace('td', '');

        if (table != subTable) {            
            LoadChildTableData(subTable, itemId);
        }
    });

    $('#td' + table).show();
    $('#subaddedit_' + table).show();
    $('#addedit_' + table).show();
    $('#hndTabOpen').val('td' + table);
    window.scrollTo(0, 0);

    if ($(window).width() > 729) {
        $('.tabdata textarea.bodytext').each(function () {
            if (!CKEDITOR.instances[$(this).attr('id')]) {
                CKEDITOR.replace($(this).attr('id'), {
                    toolbar: [
                    ['Source'],
                    ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'SpellChecker', 'Scayt'],
                    ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'],
                    '/',
                    ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                    ['NumberedList', 'BulletedList', '-', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar'],
                    '/',
                    ['Format', 'FontSize'],
                    ['Bold', 'Italic', 'Underline', 'Strike'],
                    ['Link', 'Unlink', 'Anchor']
                    ]
                });
            }
        });
    }
    else {
        $('.tabdata textarea.bodytext').each(function () {
            if (!CKEDITOR.instances[$(this).attr('id')]) {
                CKEDITOR.replace($(this).attr('id'), {
                    toolbar: [
                        ['Bold', 'Italic', 'Underline', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                    ]
                });
            }
        });
    }
}

function ShowTab(tabName, tabIndex) {    
    if (tabIndex > 0 && $('#ctl00_contentPL_hndItemId').val() == '0') {
        alert('Please complete section ' + $('#tabledata div.tabhead:first-child').text() + ' first.');        
    }
    else {
        var nowopen = $('#hndTabOpen').val();

        if (nowopen == tabName) {
            $('#' + tabName).toggle('blind', { direction: 'vertical' }, 1000);
            $('#hndTabOpen').val('');
            $('#ctl00_contentPL_hndTable').val('');
        }
        else {
            if (nowopen != '') {
                $('#' + nowopen).toggle('blind', { direction: 'vertical' }, 1000);
            }
            $('#' + tabName).toggle('blind', { direction: 'vertical' }, 1000);
            $('#hndTabOpen').val(tabName);
            $('#ctl00_contentPL_hndTable').val(tabName.replace('td', ''))
        } 
    }
}

function GetItemJsonData(table, itemId) {
    var postData;

    if (table == '') {       
        table = $('#ctl00_contentPL_hndTable').val();
    }
    
    postData = "table=" + table + "&id=" + itemId;

    $.ajax({
        type: "GET",
        url: "/JsonTableAjax.aspx",
        data: postData,
        
        timeout: 50000,
        error: function () { $('#outcome').html('GIJD-Sorry there was a problem'); },
        success: function(msg) {
            if (msg == 'T') {
                $('#outcome').html('Session timed out, please log in again');
            }
            else if (msg == 'F') {
                $('#outcome').html('GIJD-No Data Supplied');
            }
            else {
                var data = JSON.parse(msg);

                $('#subaddedit_' + table + ' *').filter(':input').each(function () {
                    fieldID = $(this).attr('id');

                    if (fieldID == null || fieldID == '') {
                    }
                    else if (fieldID.indexOf('ctl') != -1) {
                        fieldID = $(this).attr('idname');
                    }

                    if ($(this).attr('type') == 'checkbox') {
                        if (data[0][fieldID] == '1') {
                            $(this).attr('checked', true);
                        }
                    }
                    else {
                        if ($(this).attr('type') != 'file') {
                            $(this).val(data[0][fieldID]);

                            if ($('#imgctl00_contentPL_' + fieldID + ' img').length > 0) {
                                if ($('#imgctl00_contentPL_' + fieldID).hasClass('doclink')) { // document
                                    $('#imgctl00_contentPL_' + fieldID + ' img').attr('src', '/gfx/file-icon.jpg');
                                    $('#docfctl00_contentPL_' + fieldID).html(data[0][fieldID]);
                                }
                                else if ($('#imgctl00_contentPL_' + fieldID).hasClass('imglink')) { // image
                                    $('#imgctl00_contentPL_' + fieldID + ' img').attr('src', '/uploadedimages/' + $('#ctl00_contentPL_hndDB').val() + '/db/' + $('#' + fieldID).val());
                                }
                                else {
                                    $('#imgctl00_contentPL_' + fieldID + ' img').attr('src', '/gfx/file-icon.jpg');
                                }
                            } else if ($('#ctl00_contentPL_img' + fieldID + ' img').length > 0) {
                                if ($('#ctl00_contentPL_img' + fieldID).hasClass('imglink')) {
                                    $('#ctl00_contentPL_img' + fieldID + ' img').attr('src', '/uploadedimages/' + $('#ctl00_contentPL_hndDB').val() + '/db/' + $('#' + fieldID).val());
                                }
                                else {
                                    $('#imgctl00_contentPL_' + fieldID + ' img').attr('src', '/gfx/file-icon.jpg');
                                }

                                $('#' + fieldID).val('');
                            }
                        }
                    }
                });
            }
        }
    });
}

function AddItem(table) {
    $('#ctl00_contentPL_hndItemId').val('0');    
    $('#subaddedit_' + table).show();
    $('#addedit_' + table).show();    
    $('#f' + table).trigger('reset');

    EditItem(table, 0);
}

function GetDBDropDownData(table) {
    var postData, table, selValue;
        
    postData = "table=" + table;

    $.ajax({
        type: "GET",
        url: "/DBDropdownAjax.aspx",
        data: postData,
        
        timeout: 50000,
        error: function () { $('#outcome').html('GDD-Sorry there was a problem'); },
        success: function(msg) {
            if (msg == 'T') {
                $('#outcome').html('GDD-Session timed out, please log in again');
            }
            else if (msg == 'F') {
                $('#outcome').html('GDD--No Data Supplied');
            }
            else {
                $('#data_' + table + ' select.dbdd').each(function() {                    
                    $(this).html(msg);
                    selValue = $(this).attr('data');
                    if (selValue != '0') {
                        $(this).val(selValue);
                    }
                });
            }
        }
    });
}

function EnableUpload(fieldID, table) {
    var uploadField, postData = '&table=', IdToUse = '';

    if (table == '') {
        postData += $('#ctl00_contentPL_hndTable').val();
        $('#ctl00_contentPL_' + fieldID).attr('name', 'files[]');
        if (fieldID.indexOf('ctl00') == -1) {
            uploadField = 'ctl00_contentPL_' + fieldID;
            IdToUse = fieldID;
        } else {
            uploadField = fieldID;
            IdToUse = fieldID.replace('ctl00_contentPL_', '');
        }
    }
    else {
        postData += table + '&id=0&parentid=' + $('#ctl00_contentPL_hndItemId').val();
        uploadField = fieldID;
        IdToUse = fieldID;
    }

    postData += '&field=' + IdToUse;

    $('#ldr' + IdToUse).css('display', 'block');

    $('#' + uploadField).fileupload({
        dataType: 'json',
        url: '/UploadImageDB.aspx?' + postData,
        done: function (e, data) {
            $('#ldr' + IdToUse).hide();

            if (table == '') {
                $('#' + IdToUse).val(data.result[0].filename);

                if (fieldID.indexOf('ctl00') == -1) {
                    $('#ctl00_contentPL_img' + IdToUse + ' img').attr('src', data.result[0].path + '/' + data.result[0].filename);
                } else {
                    $('#imgctl00_contentPL_' + IdToUse + ' img').attr('src', data.result[0].path + '/' + data.result[0].filename);
                }
            }
            else {
                $('#images').prepend('<li><a href="javascript:ImageOptions(' + data.result[0].imageid + ',\'' + table + '\');" class="imglink"><img src="' + data.result[0].path + '/' + data.result[0].filename + '"></a><a href="javascript:Delete(' + data.result[0].imageid + ', \'' + table + '\')" class="delimglink"><img src="/gfx/close-sm.png"></a></li>');
            }
        },
        fail: function (e, data) {
            alert(data.errorThrown);
        }
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);

        $('#ldr' + IdToUse).css('width', progress + '%');
    });
}

function Delete(itemId, table) {    
    if (confirm("Are you sure, you want to delete this image?")) {        
        if (table == '') {
            $('#ctl00_contentPL_img' + fieldId + ' img').attr('src', '/gfx/blank-icon.jpg');
            $('#ctl00_contentPL_link' + fieldId).hide();
            $('#' + fieldId).val('');
        }
        else {
            var postData = "id=" + itemId + "&table=" + table;
            
            $.ajax({
                type: "GET",
                url: "/DeleteAjax.aspx",
                data: postData,
                
                timeout: 50000,
                error: function () { alert('Sorry there was a problem'); },
                success: function(msg) {
                if (msg == 'T') {
                        alert('Session timed out, please log in again');
                    }
                    else if (msg == 'F') {
                        alert('No Data Supplied');
                    }
                    else {
                        $('#i' + itemId).hide();                        
                    }
                }
            });
        }
    }
}

function ImageOptions(itemId, table) {
    if ($(window).width() > 989) {
        var postData = "id=" + itemId + "&table=" + table;

        $.ajax({
            type: "GET",
            url: "/ImageAjax.aspx",
            data: postData,
            
            timeout: 50000,
            error: function () { alert('Sorry there was a problem'); },
            success: function(msg) {
                if (msg == 'T') {
                    alert('Session timed out, please log in again');
                }
                else {                    
                    $('#imageoptions').html(msg);
                }
            }
        });
    }
    else {
        $('#imageoptions').hide();
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
        url: "/UpdateTableAjax.aspx",
        data: postData,
        cache: false,
        timeout: 50000,
        error: function () { alert('Sorry there was a problem'); },

        success: function (msg) {
            if (msg == 'T') {
                alert('Session timed out, please log in again');
            }
            else {
                $('#' + item.id).attr('disabled', 'disabled');
            }
        }
    });
}

function ShowPopUp(divId) {
    $.fn.custombox({
        url: '#' + divId
    });
}

function ValidateDate(dtValue) {
    var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
    return dtRegex.test(dtValue);
}

function PopulateDropdown(sourceDD, PopulateDD, sourceTable) {
    var postData, table, selectedValue;

    selectedValue = $('#' + sourceDD).val();

    if (selectedValue != '') {
        postData = "table=" + sourceTable + '&filter=' + $('#' + sourceDD).attr('id') + '&filtervalue=' + selectedValue;

        $.ajax({
            type: "GET",
            url: "/PopulateDropdownAjax.aspx",
            data: postData,

            timeout: 50000,
            error: function () { alert('GDD-Sorry there was a problem'); },
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

function EnableDocUpload(fieldID, table) {
    var uploadField, postData = '&table=', IdToUse = '';

    if (table == '') {
        postData += $('#ctl00_contentPL_hndTable').val();
        $('#' + fieldID).attr('name', 'files[]');
        if (fieldID.indexOf('ctl00') == -1) {
            uploadField = fieldID;
            IdToUse = fieldID;
        } else {
            uploadField = fieldID;
            IdToUse = fieldID.replace('ctl00_contentPL_', '');
        }
    }
    else {
        postData += table + '&id=0&parentid=' + $('#ctl00_contentPL_hndItemId').val();
        uploadField = fieldID;
        IdToUse = fieldID;
    }

    postData += '&field=' + IdToUse;    

    $('#ldr' + IdToUse).css('display', 'block');

    $('#' + uploadField).fileupload({
        dataType: 'json',
        url: '/UploadDoc.aspx?' + postData,
        done: function (e, data) {
            $('#ldr' + IdToUse).hide();
            $('#' + IdToUse).val(data.result[0].filename);
            $('#docfctl00_contentPL_' + IdToUse).html(data.result[0].filename);
            if (fieldID.indexOf('ctl00') == -1) {
                $('#ctl00_contentPL_img' + IdToUse + ' img').attr('src', '/gfx/file-icon.jpg');
            } else {
                $('#img' + IdToUse + ' img').attr('src', '/gfx/file-icon.jpg');
            }
        },
        fail: function (e, data) {
            alert(data.errorThrown);
        }
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);

        $('#ldr' + IdToUse).css('width', progress + '%');
    });
}

function ChangeTaskStatus(newstatus) {
    $('#taskstatus_id').val(newstatus);
    SaveUpdateItem('task', '', '');
}

function ChangeTaskStatusAlert(newstatus, bttid) {
    var alerttext;
    if (newstatus == 4)
    {
        alerttext = "close";
    }
    else
    {
        alerttext = "cancel";
    }

    var fulltext = "Make sure you update the comments. If you already did it, please click again in the " + alerttext + " button. Thanks";

    alert(fulltext);

    $('#' + bttid).attr('href', 'javascript:ChangeTaskStatus(\'' + newstatus + '\')');
}

function Editable(tabId, allowEdit)
{
    $('#f' + tabId + ' *').filter(':input').each(function () {
        
        if (allowEdit == 1) {
            var id = $(this).attr('id');

           // alert(id);
//id != 'quote_price' && 
            if (id != 'quote_price_psf' && id != 'quote_price_psm' && id != "applicant_id" && id != "property_status_id"
                && id != "viewing_hour" && id != "viewing_end_hour" && id != "viewing_date") {
                if (tabId == "task" && id == "development_id")
                {
                    $(this).attr('disabled', 'disabled');
                }
                else if ($(this).hasClass('dropdown')) {
                    $(this).removeAttr('disabled');
                }
                else if ($(this).hasClass('checkbox')) {
                    $(this).removeAttr('onclick');
                }
                else if ($(this).hasClass('lockdpicker')) {
                    var oldclass = $(this).attr('class');
                    var newclass = oldclass.replace("lockdpicker","datepicker" );
                    $(this).attr('class', newclass);
                    $(this).datepicker({ showAnim: 'blind', dateFormat: 'dd/mm/yy' });
                }
                else {
                    $(this).removeAttr('readonly');
                }
            }
            else if (id == "viewing_date")
            {
                $(this).unbind();
            }


        }
        else
        {
            if ($(this).hasClass('dropdown')) {
                $(this).attr('disabled', 'disabled');
            }
            else if ($(this).hasClass('checkbox')) {
                $(this).attr('onclick', 'return false');
            }
            else {
                $(this).attr('readonly', 'readonly');
            }
            
        }
    });

    if (tabId == "digitalcomms")
    {
        $('#communication_method_id').parent().show();
    }
    else if (tabId == "viewing")
    {
        //OpenNoEditViewingPopUp();
    }

    //alert(entra);

    if (allowEdit == 1) {
        $('#ebtn' + tabId).attr('style', 'display:none'); // hide edit button
        $('#sbtn' + tabId).attr('style', 'display:inline-block'); // show save button
        $('#rbtn' + tabId).attr('style', 'display:inline-block'); // show reset button
        $('.contactaddlink').removeClass('readonly');
    }
    else {
        $('#sbtn' + tabId).attr('style', 'display:none'); // hide save button
        $('#rbtn' + tabId).attr('style', 'display:none'); // hide reset button
        $('#ebtn' + tabId).attr('style', 'display:inline-block'); // show edit button
        $('.contactaddlink').addClass('readonly');
    }
}

function SaveData(tabId, returnValue) {
    var formId = 'f' + tabId, formData = '', showMsg = false, extraCheck, outcomeMsg = '', table, itemId;
    
    //console.log('save all entro: ' + tabId);

    if (tabId == "propertydetails" || tabId == "overview")
    {
        PropertyAutocompleteFields(tabId);
    }
    else if (tabId == "tasktwo")
    {
        /*if ($('#time_reminder').val().length > 1)
        {
            $('#time_reminder').val($('#time_reminder').val().replace(":", "").replace(":", ""));
        }*/
    }

    //console.log('save: ' + tabId);

    // currency/price fields cleanup
    if (tabId == "ewrangecriteria") {
        //console.log('ewrangecriteria');
        CurrencyFieldCleanUp(tabId);
    }

    if ($('#' + formId).valid())
    {
        extraCheck = ValidateContactAppli(tabId);
        
        if (extraCheck == '')
        {        
            //console.log('extracheck OK');
            var postData = '', fieldID, parentId = '', fieldValue;

            if (!returnValue)
            {
                $('#outcome_' + tabId).html('<img src="/gfx/loading-sm.gif" width="22" height="22"/>');
            }

            table = $('#ctl00_contentPL_hndTable').val();
            itemId = $('#ctl00_contentPL_hndItemId').val();

            postData = "table=" + table + "&id=" + itemId + "&formdata=";

            $('#' + formId + ' *').filter(':input').each(function () {
                fieldID = $(this).attr('id');

                if (fieldID == null || fieldID == '') {

                }
                else if (fieldID.charAt(0) == '_') {
                    parentId = fieldID.replace('_', '');

                    if ($(this).val() == '') {
                        formData += "||" + parentId + "¬¬" + $('#' + parentId).val();
                    } else {
                        formData += "||" + $(this).val() + "¬¬" + $('#' + $(this).val()).val();
                    }
                }
                else if (fieldID.indexOf('ctl') == -1) {
                    if ($(this).hasClass('bodytext')) {
                        formData += "||" + fieldID + "¬¬" + CKEDITOR.instances[fieldID].getData();
                    } else if ($(this).hasClass('datepicker') || $(this).hasClass('simpledate')) { // format date to mysql
                        if ($(this).val() != '') {
                            var dateParts = $(this).val().split('/');
                            if (dateParts.length == 3) {
                                formData += "||" + fieldID + "¬¬" + dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
                            }
                        }
                    } else {
                        formData += "||" + fieldID + "¬¬" + $(this).val();
                    }
                }
                else {
                    fieldID = $(this).attr('idname');

                    if (fieldID != undefined) {
                        if ($(this).attr('type') == 'checkbox') {
                            fieldValue = ($(this).is(':checked')) ? 1 : 0;
                            formData += "||" + fieldID + "¬¬" + fieldValue;
                        }
                    }
                }
            });
                              
            postData += encodeURIComponent(formData);
            //console.log('save: ' + tabId + ' --- content: ' + postData);
            //console.log(postData);
        
            $.ajax({
                type: "POST",
                url: "/AddEditProcess.aspx",
                data: postData,
                timeout: 50000,
                error: function () {
                    if (!returnValue)
                    {
                        $('#outcome_' + tabId).attr('class', 'label error');
                        $('#outcome_' + tabId).html('Operation Failed');
                    }
                    else
                    {
                        outcomeMsg = 'Operation Failed, please refresh the page and try again.';
                    }

                    //console.log('error');
                },
                success: function (msg) {

                    //console.log('saved - ' + msg);
                    //console.log('retVal - ' + returnValue);

                    var msgValues = msg.split('|');
                    
                    if (msgValues[0] == ':') {
                        
                        if (!returnValue)
                        {
                            $('#outcome_' + tabId).attr('class', 'label error');
                            $('#outcome_' + tabId).html(msgValues[1]);
                        }
                        else
                        {                            
                            outcomeMsg = msgValues[1];
                        }                       
                    }
                    else if (msgValues[0] == '0') {
                        if (!returnValue)
                        {
                            $('#outcome_' + tabId).attr('class', 'label msg');
                            $('#outcome_' + tabId).html('Updated Successfully');
                        }
                        // if lead negotiator has changed then and new negotiator is Alma then send email
                        if (table == "applicant") {

                            if ($('#leadnegotiator_id').val() != $('#hndOldLeadNeg').val()) {
                                if (!_newLeadEmailSent && IsAlmaNegotiator($('#leadnegotiator_id').val())) {
                                    NewApplicantEmailAjax($('#applicant_id').val(), $('#first_name').val() + " " + $('#surname').val(), $('#leadnegotiator_id').val(), $('#development_id').val());
                                    _newLeadEmailSent = true;
                                    setTimeout("Editable('" + tabId + "', 0)", 6000);
                                }
                                else {
                                    Editable(tabId, 0);
                                }
                            }
                            else
                            {
                                Editable(tabId, 0);
                            }
                        }
                        else if (table == "viewing") {
                            setTimeout("GoToOldApplicant('viewing-edit')", 6000);
                        }
                        else {
                            Editable(tabId, 0);
                        }
                    }
                    else {
                        if (!returnValue)
                        {
                            $('#outcome_' + tabId).attr('class', 'label msg');                                                
                            $('#outcome_' + tabId).html('Added Successfully');
                        }

                        $('#ctl00_contentPL_hndItemId').val(msgValues[0]);
                        
                        //console.log($('#ctl00_contentPL_hndItemId').val());

                        if (table == "applicant")
                        {
                            var newapplifullname = "";
                            if ($('#first_name').val().length > 0) { newapplifullname = $('#first_name').val() + " "; }
                            newapplifullname += $('#surname').val();
                            //  negotiator chosen is Alma then send email
                            //console.log("else -- applicant -- " + !_newLeadEmailSent + " -- " + $('#leadnegotiator_id').val());
                            if (!_newLeadEmailSent && IsAlmaNegotiator($('#leadnegotiator_id').val()))
                            {                                
                                NewApplicantEmailAjax(msgValues[0], newapplifullname, $('#leadnegotiator_id').val(), $('#development_id').val());
                                _newLeadEmailSent = true;
                            }
                            setTimeout("GoToFullNewItemAfterCreate('/applicant-profilenew/','" + msgValues[0] + "')", 6000);
                        }
                        else if (table == "viewing")
                        {
                            setTimeout("GoToOldApplicant('viewing')", 6000);
                        }
                        else if (table == "task") {
                            setTimeout("GoToFullNewItemAfterCreate('/task-details/','" + msgValues[0] + "')", 6000);
                        }
                        else if (table == "agent_company") {
                            setTimeout("GoToFullNewItemAfterCreate('/agent-company','')", 6000);
                        }
                        else if (table == "leadnegotiator") {
                            setTimeout("GoToFullNewItemAfterCreate('/lead-negotiator','')", 6000);
                        }
                        
                        Editable(tabId, 0);                                               
                    }
                }
            });            
        }
        else
        {
            if (!returnValue)
            {
                $('#outcome_' + tabId).attr('class', 'label error');
                $('#outcome_' + tabId).html(extraCheck);
            }
            else
            {
                outcomeMsg = extraCheck;
            }
        }
    } else {

        //console.log('required');

        if (!returnValue)
        {
            $('#outcome_' + tabId).attr('class', 'label error');
            $('#outcome_' + tabId).html('Some required field(s) have missing/invalid data.');
        }
        else
        {
            outcomeMsg = 'Some required field(s) have missing/invalid data.';
        }
    }

    if (returnValue)
    {
        return outcomeMsg;
    }
}

function NewApplicantEmailAjax(newid, applicantname, negoid, devid)
{
    var postData = "appid=" + newid + "&appliname=" + applicantname + "&negoid=" + negoid + "&develodid=" + devid;
    //console.log('new applicant' + postData);
    $.ajax({
        type: "POST",
        url: "/CScripts/NewApplicantEmail.aspx",
        data: postData,
        timeout: 50000,
        error: function () {
            /*$('#outcome_' + tabId).addClass('error');
            $('#outcome_' + tabId).html('Operation Failed');*/
        },
        success: function (msg) { }
    });
}

/*function GoToNewApplicant(newid)
{
    window.location = "/applicant-profilenew/" + newid;
}

function GoToNewTask(newid) {
    window.location = "/task-details/" + newid;
}*/


function GoToFullNewItemAfterCreate(prefix,newid) {
    window.location = prefix + newid;
}

function GoToOldApplicant(newid)
{
    if (newid == 'viewing')
    {
        window.location = $('#returnbtn').attr('href');
    }
    else if (newid == 'viewing-edit') {
        window.location = "/applicant-profile/" + $('#applicant_id').val() + '#dtviewingapplicantpanel';
    }
    else
    {
        window.location = "/applicant-profile/" + newid;
    }
}

function UnlockFieldsNew()
{
    //console.log('unlock');

    $('#ctl00_contentPL_tabledata input').each(function () {
        $(this).attr('readonly', false);
        if ($(this).hasClass('checkbox')) {
            $(this).removeAttr('onclick');
        }
        else if ($(this).hasClass('lockdpicker')) {
            var oldclass = $(this).attr('class');
            var newclass = oldclass.replace("lockdpicker", "datepicker");
            $(this).attr('class', newclass);
            $(this).datepicker({ showAnim: 'blind', dateFormat: 'dd/mm/yy' });
        }
    });
    
    $('#ctl00_contentPL_tabledata select').each(function () {
        if ($(this).attr('id') != "development_id")
        {
            $(this).attr('disabled', false);
        }
        else
        {
            //alert($(this).parent().parent().attr('id'));
            if ($(this).parent().parent().attr('id') != "fproduct")
            {
                $(this).attr('disabled', true);

                $(this).attr('style', 'background:#f4f7fa !important;');
            }
            else
            {                
                $(this).attr('disabled', false);
            }
        }
    });

    $('#ctl00_contentPL_tabledata textarea').each(function () {
        $(this).attr('readonly', false);
    });

    isnewalmaitem = 1;


    // display save btt
    $('#ctl00_contentPL_tabledata > div > div.row > div.buttons > a.btn-gray').each(function ()
    {
        $(this).attr('style', 'display:block; color:white;padding:6px 12px !important;');
    });

    //hide portion save buttons and add save all

    $('#ctl00_contentPL_tabledata > div').each(function () {
        $(this).children('.row').children(".buttons").children('a').hide();

        $(this).children('.row').children(".buttons").attr('style', 'min-height:35px;');
    });

    //console.log("table: " + $('#ctl00_contentPL_hndTable').val() + " -- item:" + $('#ctl00_contentPL_hndItemId').val());

    // for add new applicant, call function CheckApplicantExists instead of SaveAllNewItem
    if ($('#ctl00_contentPL_hndTable').val() == 'applicant' && $('#ctl00_contentPL_hndItemId').val() == '0')
    {
        $('#addnewoption').append("<a id=\"saveall\" class=\"btn btn-black ebtn\" href=\"javascript:CheckApplicantExists()\">Save</a>");
        $('#applicant_id').parent().html("");

        $('#fapplicant span.checkbox input').attr("onclick", "");
    }
    // for add new agent, call function CheckAgentExists instead of SaveAllNewItem
    else if ($('#ctl00_contentPL_hndTable').val() == 'agent' && $('#ctl00_contentPL_hndItemId').val() == '0')
    {
        $('#addnewoption').append("<a id=\"saveall\" class=\"btn btn-black ebtn\" href=\"javascript:CheckAgentExists()\">Save</a>");        
    }
    // for add new viewing, call function AddOutlookViewing instead of SaveAllNewItem    
    else if ($('#ctl00_contentPL_hndTable').val() == 'viewing')
    {
        $('#addnewoption').append("<a id=\"previewbtn\" class=\"btn btn-black ebtn\" href=\"javascript:AddOutlookViewing(1)\">Preview</a><a id=\"saveall\" class=\"btn btn-black ebtn\" href=\"javascript:AddOutlookViewing(0)\">Save & Send</a>");
        // if only one option in Location dropdown then pre-select it
        if ($('#viewing_location_id option').length == 2) { $("#viewing_location_id").prop("selectedIndex", 1); }
    }
    else
    {
        $('#addnewoption').append("<a id=\"saveall\" class=\"btn btn-black ebtn\" href=\"javascript:SaveAllNewItem()\">Save</a>");
    }


    // prepopulate Lead Negotiator
    if ($('#loggedstaffid').val() == "3")
    {
        $('#leadnegotiator_id option:selected').removeAttr('selected');
        $('#leadnegotiator_id').val("1");
        $("#leadnegotiator_id option[value=1]").attr("selected", "selected");
    }
    else if ($('#loggedstaffid').val() == "4")
    {
        $('#leadnegotiator_id option:selected').removeAttr('selected');
        $('#leadnegotiator_id').val("2");
        $("#leadnegotiator_id option[value=2]").attr("selected", "selected");
    }
    else if ($('#loggedstaffid').val() == "7")
    {
        $('#leadnegotiator_id option:selected').removeAttr('selected');
        $('#leadnegotiator_id').val("3");
        $("#leadnegotiator_id option[value=3]").attr("selected", "selected");
    }


    // hide notes and viewings

    $('#enquiry_status_id').val(6);
    $('#dtnotespanel').attr('style','display:none !important;');
    $('#dtviewingapplicantpanel').attr('style', 'display:none !important;');
    $('#dttaskapplicantpanel').attr('style', 'display:none !important;');
    $('#fsourcepanel span.datedropdown').attr('style', 'display:none !important;');
    $('#dtcommunicationspanel').attr('style', 'display:none !important;');
    $('#dtcriteria').attr('style', 'display:none !important;');
    // do not hide dtdigitalcomms, as we need it for checking if applicant exists
    //$('#dtdigitalcomms').attr('style', 'display:none !important;');
    $('#dtcriteriapanel').attr('style', 'display:none !important;');
    $('#dtemailresponsepanel').attr('style', 'display:none !important;');
    $('#dtbuyerjourneypanel').attr('style', 'display:none !important;');
    $('#dtcompanyproductpanel').attr('style', 'display:none !important;');
    $('#dtcategoryproductpanel').attr('style', 'display:none !important;');

    $('#ctl00_contentPL_ctl114').prop('checked', true);

    $('#qualified option:first-child').attr('hidden', 'true');
    $('#qualified option:nth-child(3)').attr('selected', 'selected');

    if ($('#ctl00_contentPL_tabledata div:first-child div.panel-heading').html() == "Applicant")
    {
        $('#fapplicant').append("<input type=\"hidden\" id=\"leadnegotiator_id\"/>");
        $('#fsourcepanel span select#leadnegotiator_id').attr("onchange", "ReplicateLeadNegValue()");
    }

    //$('#dtsourcepanel').attr('style', 'display:none !important;');

    //LeadNegotiatorDisplayOnlyAlma();    
}

function ReplicateLeadNegValue()
{
    $('#fapplicant input#leadnegotiator_id').val($('#fsourcepanel span select#leadnegotiator_id').val());
}

function LeadNegotiatorDisplayOnlyAlma()
{
    $('#leadnegotiator_id option').each(function ()
    {
        if ($(this).val() != "1" && $(this).val() != "2" && $(this).val() != "3" && $(this).val() != "selected")
        {
            $(this).attr('style', 'display:none;');
        }
    });
}

function ResetData()
{
    window.location = window.location;
}

function ApplicantQualified()
{
    $('#qualified option:first-child').attr('display:none');

    /*$('#qualified option').each(function () {
        var optval = $(this).val();
        if (optval == 1) {
            $(this).html("&#xf00c; Yes");
        }
        else if (optval == 2) {
            $(this).html("&#xf00d; No");
        }
        else {
            $(this).html("&#xf059; Unknown");
        }
    });*/
}

function ApplicantContact()
{
    $('#dtdigitalcomms div.row form span').each(function ()
    {
        if ($(this).children('input').attr('id') == "email2" || $(this).children('input').attr('id') == "email3" ||
            $(this).children('input').attr('id') == "email4" || $(this).children('input').attr('id') == "email5" ||
            $(this).children('input').attr('id') == "mobile2" || $(this).children('input').attr('id') == "mobile3" ||
            $(this).children('input').attr('id') == "mobile4" || $(this).children('input').attr('id') == "mobile5" ||
            $(this).children('input').attr('id') == "telephone2" || $(this).children('input').attr('id') == "telephone3" ||
            $(this).children('input').attr('id') == "telephone4" || $(this).children('input').attr('id') == "telephone5")
        {
            $(this).hide();
            $(this).addClass("sp" + $(this).children('input').attr('id'));
        }
        else if ($(this).children('input').attr('id') == "email" || $(this).children('input').attr('id') == "mobile" 
            || $(this).children('input').attr('id') == "telephone")
        {
            $(this).append("<a class=\"contactaddlink readonly\" id=\"contactaddlink" + $(this).children('input').attr('id') + "\" href=\"javascript:ApplicantContactAddMore(\'" + $(this).children('input').attr('id') + "\')\">+</a>"
                + "<input id=\"" + $(this).children('input').attr('id') + "count\" type=\"hidden\" value=\"1\"/>");

            //$(this).attr('class', 'text contact')
        }
    });

    var isComm = false;
    var methodid = $('#communication_method_id').val();
    if (methodid == 1) { $('#email').attr('style', 'border:1px solid green'); }
    else if (methodid == 2) { $('#mobile').attr('style', 'border:1px solid green'); }
    else if (methodid == 3) { $('#telephone').attr('style', 'border:1px solid green'); }

    $('#communication_method_id').parent().hide();

    var temptext = '<div class="mobilequickaction">';

    if ($('#email').val().length > 3) {
        temptext += '<a href=\"javascript:ShowSendEmailPopup()\" title=\"Email\"><i class=\"far fa-paper-plane\"></i></i></a>'
            + '<a href="javascript:MobileQuickContact(\'mail\');"><i class="fas fa-envelope"></i></a>';
        isComm = true;
    }

    if ($('#mobile').val().length > 3)
    {
        temptext += '<a href="javascript:MobileQuickContact(\'mobile\');"><i class="fas fa-mobile-alt"></i></a>'
            + '<a href="javascript:MobileQuickContact(\'text\');"><i class="far fa-comment"></i></a>';
        isComm = true;
    }

    if ($('#telephone').val().length > 3) {
        temptext += '<a href="javascript:MobileQuickContact(\'telephone\');"><i class="fas fa-phone"></i></a>';
        isComm = true;
    }

    if (isComm)
    {
        temptext += '<a href=\"javascript:AddComm(\'\')\" title=\"Add New\"><i class=\"far fa-plus-square\"></i></a>';
    }

    temptext += '</div>';

    $(temptext).insertAfter('#fdigitalcomms #applicantitemid');

    $('#communication_method_id').change(function () {
        var methodid = $('#communication_method_id').val();

        $('#email').attr('style', 'border:0');
        $('#mobile').attr('style', 'border:0');
        $('#telephone').attr('style', 'border:0');

        if (methodid == 1) { $('#email').attr('style', 'border:1px solid green'); }
        else if (methodid == 2) { $('#mobile').attr('style', 'border:1px solid green'); }
        else if (methodid == 3) { $('#telephone').attr('style', 'border:1px solid green'); }
    });
}

function MobileQuickContact(buttonname)
{
    //console.log('entra mobile quick contact');

    var newlocastr = "";

    switch (buttonname)
    {
        case "mail":
            RecordCommunication(1);
            var strUser = $('#hndFullDevName').val();            
            strUser = strUser.replace(/ /g, '%20');
            //console.log();
            //window.location = 'mailto:' + $('#email').val() + '?subject=' + strUser + '&body=Dear%20' + $('#first_name').val();

            var mytitle = $('#title_id>option:selected').text();

            if (mytitle == "---") { mytitle = ""; }
            else { mytitle += '%20'; }

            newlocastr = 'mailto:' + $('#email').val() + '?subject=' + strUser + '&body=Dear%20' + mytitle
                + $('#first_name').val() + '%20' + $('#surname').val();
            setTimeout("OpenPopUpCommunication('" + newlocastr + "');", 1000);
            break;
        case "telephone":
            RecordCommunication(2);
            if ($(window).width() < 521) {
                //window.location = 'tel:' + $('#telephone').val();
                newlocastr = 'tel:' + $('#telephone').val();
                setTimeout("OpenPopUpCommunication('" + newlocastr + "');", 1000);
            }
            else
            {
                $("#dtcommunicationspanel div.row").load(location.href + " #dtcommunicationspanel div.row div.comms");
                $('selector').css('cursor', 'wait');
                setTimeout("CallOpenEdit();", 3000);
            }
            break;
        case "mobile":
            RecordCommunication(2);
            if ($(window).width() < 521) {
                //window.location = 'tel:' + $('#mobile').val();
                newlocastr = 'tel:' + $('#mobile').val();
                setTimeout("OpenPopUpCommunication('" + newlocastr + "');", 1000);
            }
            else
            {
                $("#dtcommunicationspanel div.row").load(location.href + " #dtcommunicationspanel div.row div.comms");
                $('selector').css('cursor', 'wait');
                setTimeout("CallOpenEdit();", 3000);
            }
            break;
        case "text":
            RecordCommunication(4);
            if ($(window).width() < 521) {
                //window.location = 'sms:' + $('#mobile').val();
                newlocastr = 'sms:' + $('#mobile').val();
                setTimeout("OpenPopUpCommunication('" + newlocastr + "');", 1000);
            }
            break;
    }    
    //console.log('sale mobile quick contact');
}

function CallOpenEdit()
{
    communicationnewcreate = 1;

    var dataValues = $('#dtcommunicationspanel div.row div.comms div:nth-child(3)').attr('id').split('-');
    GetCommsDetails(dataValues[2], dataValues[1]);
}

function OpenPopUpCommunication(newloca)
{
    window.location = newloca;
}

function ApplicantContactAddMore(typeofcontact)
{
    //console.log('add: ' + typeofcontact);

    if ($('#' + typeofcontact).attr('readonly') != "readonly")
    {

        var countno = $('#' + typeofcontact + "count").val();

        countno++;

        $('#' + typeofcontact + '' + countno).parent().show();

    

        if (countno == 5)
        {
            $('#contactaddlink' + typeofcontact).hide();
            $('#' + typeofcontact).attr('style', 'width:100% !important;');
        }
        else
        {
            $('#' + typeofcontact + "count").val(countno);
        }
    }
}

function ValidateContactAppli(boxname)
{
    //console.log('eeeee:' + $('#ctl00_contentPL_hndTable').val());

    if ($('#ctl00_contentPL_hndTable').val() != "applicant")
    {
        //&& $('#ctl00_contentPL_hndTable').val() != "agent" && $('#ctl00_contentPL_hndTable').val() != "task"
        return '';
    }
    else
    {
        var tocheck = 0;

        if (isnewalmaitem == 1)
        {
            if (boxname == "dtdigitalcomms")
            {
                tocheck = 1;
            }
        }
        else
        {
            tocheck = 1;
        }

        if (tocheck == 1)
        {
            var counter = 0;

            if ($('#email').val().length > 5) {
                counter++;
            }

            if ($('#mobile').val().length > 5) {
                counter++;
            }

            if ($('#telephone').val().length > 5) {
                counter++;
            }

            if (counter > 0 && boxname == 'digitalcomms') {
                $('#dtdigitalcomms').attr('style', 'border: 1px solid #d5dde0;');
                return '';
            }
            else {
                if ($('#ctl00_contentPL_hndItemId').val() == '0') {
                    $('#dtdigitalcomms').attr('style', 'border: 1px solid red;');
                    return 'Please specify at least one Contact Info and save it first';
                }
                else {
                    $('#dtdigitalcomms').attr('style', 'border: 1px solid #d5dde0;');
                    return '';
                }
            }
        }
        else
        {
            return '';
        }
    }
}

function PropertyCleanAmenities()
{
    var maindevel = $('#dtoverview select#development_id').val();

    var amenhtml = "<ul id=\"amenitieslist\">";

    $('#famenitiespanel select#development_id option').each(function ()
    {
        var newhtmlcodeicon = "";

        switch ($(this).html())
        {
            case "Swimming Pool":
                newhtmlcodeicon = "<i class=\"fas fa-swimmer\"></i>";
                break;
            case "Gym":
                newhtmlcodeicon = "<i class=\"fas fa-dumbbell\"></i>";
                break;
            case "Meeting Room":
                newhtmlcodeicon = "<i class=\"fas fa-comments\"></i>";
                break;
            case "Concierge":
                newhtmlcodeicon = "<i class=\"fas fa-concierge-bell\"></i>";
                break;
            case "Screening Room":
                newhtmlcodeicon = "<i class=\"fas fa-film\"></i>";
                break;
            case "Private Dining":
                newhtmlcodeicon = "<i class=\"fas fa-utensils\"></i>";
                break;
            case "Club Lounge":
                newhtmlcodeicon = "<i class=\"fas fa-couch\"></i>";
                break;
            case "Spa":
                newhtmlcodeicon = "<i class=\"fas fa-spa\"></i>";
                break;
        }

        newhtmlcodeicon += "&nbsp;&nbsp;&nbsp;" + $(this).html();

        if ($(this).val() == maindevel)
        {
            amenhtml += "<li>" + newhtmlcodeicon + "</li>";
        }
    });

    amenhtml += "</ul>";

    $('#famenitiespanel').html(amenhtml);
}

function BoxesSize()
{
    $('#dtsourcepanel div.row').attr('style', 'height: ' + $('#dtapplicant div.row').height() + 'px;');
    $('#dtcriteria div.row').attr('style', 'height: ' + $('#dtdigitalcomms div.row').height() + 'px;');
}

function BoxesSizeTask()
{
    $('#dttaskapplicant div.row').attr('style', 'height: ' + $('#dttask div.row').height() + 'px;');
}

function SaveAllNewItem()
{
    var outcomeMsg = '';

    $('#saveall').off('click');

    /*alert('aaaa:' + $('#dtoverview').length);*/
    
    $('#addnewoutcome').html('<img src="/gfx/loading-sm.gif" width="22" height="22"/>');
    $('#addnewoutcome').show();
       
    if($('#dtapplicant').length == 1)
    {
        var mandatoryapplicantitem = NewApplicantMandatoryChecker();

        if (mandatoryapplicantitem == 1)
        {
            outcomeMsg = SaveData('applicant', true);            
        }        
        else
        {
            outcomeMsg = 'Some required field(s) have missing/invalid data.';
        }
    }
    else if ($('#dtagent').length == 1)
    {
        var mandatoryagentitem = NewAgentMandatoryChecker();

        if (mandatoryagentitem == 1) {
            outcomeMsg = SaveData('agent', true);
        }
        else {
            outcomeMsg = 'Some required field(s) have missing/invalid data.';
        }
    }
    else if ($('#dtagent_company').length == 1)
    {
        outcomeMsg = SaveData('agent_company', true);
    }
    else if ($('#dttask').length == 1)
    {
        var dateremindercorrect = TaskDateCheckr();

        /*if ($('#time_reminder').val().length == 0)
        {
            $('#time_reminder').val("00:00");
        }
        else
        {
            $('#time_reminder').val($('#time_reminder').val().substr(0, 2) + ":" + $('#time_reminder').val().substr(2, 4));
        }*/
        
        if (dateremindercorrect == 1)
        {            
            outcomeMsg = SaveData('task', true);            
        }        
        else
        {
            outcomeMsg = 'Some required field(s) have missing/invalid data.';
        }        
    }
    else if ($('#dtreminder').length == 1)
    {
        outcomeMsg = SaveData('reminder', true);
    }
    else if ($('#dtoverview').length == 1) {
        outcomeMsg = SaveData('overview', true);
    }
    else if ($('#dtleadnegotiator').length == 1) {
        if ($('#fleadnegotiator').valid()) {
            outcomeMsg = SaveData('leadnegotiator', true);
        }
        else {
            outcomeMsg = 'Some required field(s) have missing/invalid data.';
        }       
    }
    else if ($('#dtviewing').length == 1)
    {
        ViewingCleanHours();
        //console.log("dtviewing  --- " + $('#dtviewing').length)

        outcomeMsg = SaveData('viewing', true);
    }

    //console.log(outcomeMsg);

    if (outcomeMsg == '')
    {        
        setTimeout("SaveAllNewItemSecond()", 3000);
    }
    else
    {        
        $('#addnewoutcome').attr('class', 'label error');
        $('#addnewoutcome').html(outcomeMsg);
        $('#addnewoutcome').show();
    }    
}

function NewApplicantMandatoryChecker()
{
    var allcorrect = 0;

    //$('#first_name').attr('style', '');
    $('#surname').attr('style', '');
    $('#leadnegotiator_id').attr('style', '');

    /*if ($('#first_name').val().length < 1)
    {
        $('#first_name').attr('style', 'border-color:#fb3d4d;');
        allcorrect++;
    }*/
    if ($('#surname').val().length < 1)
    {
        $('#surname').attr('style', 'border-color:#fb3d4d;');
        allcorrect++;
    }

    //console.log($('#leadnegotiator_id').val() + " -- " + $('#agent_introducer').val());

    if ($('#dtsourcepanel #leadnegotiator_id').val().length < 1)
    {
        $('#dtsourcepanel #leadnegotiator_id').attr('style', 'border-color:#fb3d4d;');
        allcorrect++;
    }
    
    if (allcorrect > 0) 
    {
        return 0;
    }
    else
    {
        return 1;
    }
}

function TaskDateCheckr()
{
    if ($('#ftask').valid() && $('#ftasktwo').valid()) {
        if (!$('#date_reminder').val()) {
            alert('Date Reminder is mandatory');
            $('#date_reminder').attr('style', 'border-color:red;');
            return 0;
        }
        else {
            return 1;
        }
    }
    else {
        return 0;
    }
}

function ViewingCleanHours()
{
    if ($('#viewing_hour').val().length == 4)
    {
        var oldval = $('#viewing_hour').val();
        var newval = oldval.substr(0, 2) + ":" + oldval.substr(2);
        $('#viewing_hour').val(newval);
    }

    if ($('#viewing_end_hour').val().length == 4) {
        var oldval2 = $('#viewing_end_hour').val();
        var newval2 = oldval2.substr(0, 2) + ":" + oldval2.substr(2);
        $('#viewing_end_hour').val(newval2);
    }

    /*var datevalu = $('#viewing_date').val();
    var msgValues = datevalu.split('/');

    $('#viewing_date').val(msgValues[2] + "-" + msgValues[0] + "-" + msgValues[1] + " 00:00:00");

    alert($('#viewing_date').val());*/
}

function NewAgentMandatoryChecker() {
    var allcorrect = 0;

    //$('#first_name').attr('style', '');
    $('#fullname').attr('style', '');
    $('#agent_company_id').attr('style', '');

    /*if ($('#first_name').val().length < 1)
    {
        $('#first_name').attr('style', 'border-color:#fb3d4d;');
        allcorrect++;
    }*/
    if ($('#fullname').val().length < 1) {
        $('#fullname').attr('style', 'border-color:#fb3d4d;');
        allcorrect++;
    }

    if ($('#agent_company_id').val().length < 1) {
        $('#agent_company_id').attr('style', 'border-color:#fb3d4d;');
        allcorrect++;
    }

    if (allcorrect > 0) {
        return 0;
    }
    else {
        return 1;
    }
}

function SaveAllNewItemSecond() {

    var outcomeMsg = '';


    //console.log('SaveAllNewItemSecond');

    $('#ctl00_contentPL_tabledata > div').each(function () {
        var idbox = $(this).attr("id");

        if (
            idbox != 'dtapplicant' && idbox != 'dtagent'
            && idbox != 'dttaskapplicant' && idbox != 'dtoverview'
            && idbox != 'dttaskextrainfo' && idbox != 'dtviewing'
            )
        {
            //console.log('dentro if SaveAllNewItemSecond');

            idbox = idbox.substr(2);

            if ($('#f' + idbox + ' span').length > 0) // only save, if form has fields
            {                
                outcomeMsg += SaveData(idbox, true);
            }            
        }
    });

    if (outcomeMsg == '')
    {
        setTimeout("SaveAllOutcome()", 1000);
    }
    else
    {        
        $('#addnewoutcome').attr('class', 'label error');
        $('#addnewoutcome').html(outcomeMsg);
        $('#addnewoutcome').show();
    }
}

function MoreViewingInfo(itemid)
{
    var newhe = $('#' + itemid + ' > div').height() + 38;

    $('#' + itemid).animate({
        height: newhe + "px"
    }, 300);

    $('#' + itemid.replace('ing', 'btt')).attr('href', 'javascript:LessViewingInfo("' + itemid + '")');
    $('#' + itemid.replace('ing', 'btt')).html('- Info');
}

function LessViewingInfo(itemid) {
    $('#' + itemid).animate({
        height: "28px"
    }, 300);

    $('#' + itemid.replace('ing', 'btt')).attr('href', 'javascript:MoreViewingInfo("' + itemid + '")');
    $('#' + itemid.replace('ing', 'btt')).html('<i class=\"fas fa-angle-down\"></i> Info');
}

function SaveNotesAlma()
{
    var postData = "";
    var formData = "";
    
    if ($('#dtagent').length == 1)
    {
        postData = "table=agent_notes&id=0&formdata=";

        formData = "||details¬¬" + $('#notes').val() + "||staff_id¬¬" + $('#notesstaff').val() +
                "||agent_id¬¬" + $('#agentitemid').val();
    }
    else
    {
        postData = "table=notes&id=0&formdata=";

        formData = "||details¬¬" + $('#notes').val() + "||staff_id¬¬" + $('#notesstaff').val();

        if ($('#dtapplicant').length == 1) {
            formData += "||applicant_id¬¬" + $('#applicantitemid').val();
        }
        else {
            formData += "||property_id¬¬" + $('#propertyitemid').val();
        }
            
        formData += "||development_id¬¬" + $('#development_id').val();
    }
    
    postData += encodeURIComponent(formData);
    
    $.ajax({
        type: "POST",
        url: "/AddEditProcess.aspx",
        data: postData,
        timeout: 50000,
        error: function () {
            $('#outcome_' + tabId).addClass('error');
            $('#outcome_' + tabId).html('Operation Failed');
        },
        success: function (msg) {
            var msgValues = msg.split('|');

            /*Editable(tabId, 0);

            if (msgValues[0] == '0') {
                $('#outcome_' + tabId).addClass('msg');
                $('#outcome_' + tabId).html('Updated Successfully');
            }
            else {
                $('#outcome_' + tabId).addClass('msg');
                $('#ctl00_contentPL_hndItemId').val(msgValues[0]);
                $('#outcome_' + tabId).html('Added Successfully');
            }*/
            window.location.reload();


        }
    });
}

function DeleteNotesAlma(noteid) 
{
    if (confirm("Are you sure, you want to delete this item?")) {
       
        var postData = "";

        if ($('#dtagent').length == 1) { postData = "table=agent_notes&id="; }
        else { postData = "table=notes&id=" }


        postData += noteid;

        // if (confirm("Are you sure, you want to delete this item?")) {
        //     var postData = "table=" + table + "&id=" + itemId;

        $.ajax({
            type: "GET",
            url: "/DeleteAjax.aspx",
            data: postData,

            timeout: 50000,
            error: function () { ('DI-Sorry there was a problem'); },
            success: function (msg) {
                window.location.reload();
            }
        });
    }
}

function ShowTaskList(toshowid)
{
    var classtocompare = "tasktype" + toshowid;

    if ($('#tasktypeshown').val().length > 0)
    {
        HideTaskList($('#tasktypeshown').val());
    }

    $('.taskitemdiv').each(function () {
       if ($(this).attr('class').indexOf(classtocompare) > 0 || toshowid == '0')
        {
            $(this).show();
        }
    });

    $('#tasktypeshown').val(toshowid);
}

function HideTaskList(tohideid)
{
    var classtocompare = "tasktype" + tohideid;

    $('.taskitemdiv').each(function () {
        if ($(this).attr('class').indexOf(classtocompare) > 0 || tohideid == '0') {
            $(this).hide();
        }
    });
}

function SaveAllOutcome()
{    
    $('#saveall').hide();
    $('#addnewoutcome').attr('class', 'label msg');                           
    $('#addnewoutcome').html('Added Successfully');
    $('#addnewoutcome').show();
    $('#returnbtn').show();
}

function NewApplicantAnimationShow()
{
    $('#dtnotespanel').attr('style', 'display:none !important;');
    $('#dtviewingapplicantpanel').attr('style', 'display:none !important;');
    $('#dttaskapplicantpanel').attr('style', 'display:none !important;');

    setTimeout("$('#dtnotespanel').fadeIn();", 300);
    setTimeout("$('#dtviewingapplicantpanel').fadeIn();", 600);
    setTimeout("$('#dttaskapplicantpanel').fadeIn();", 900);
}

function PropertyAutocompleteFields(tabId)
{
    var totalprice;

    if (tabId == "overview")
    {
        totalprice = $('#dtoverview #quote_price').val();
    }
    else if (tabId == "propertydetails")
    {
        totalprice = $('#dtpropertydetails #quote_price').val();
    }

    totalprice = totalprice.replace('£', '');
    totalprice = totalprice.replace(/,/g, '');
    totalprice = parseInt(totalprice);

    if (tabId == "overview") {        
        $('#dtoverview #quote_price').val(totalprice);
    }
    else if (tabId == "propertydetails") {        
        $('#dtpropertydetails #quote_price').val(totalprice);
    }
   
    var sqtft = $('#area_sqft').val();
    var sqm = Math.trunc(sqtft * 0.092903);

    $('#quote_price_psf').val(Math.round(totalprice / sqtft));
    $('#area_sqm').val(sqm);
    $('#quote_price_psm').val(Math.round(totalprice / sqm));    
}

function GetCommsDetails(commType, commId) {

    var postData = 'comm_type=' + commType + '&comm_id=' + commId;

    $.ajax({
        type: "POST",
        url: "/GetCommsDetailsAjax.aspx",
        data: postData,
        timeout: 50000,
        error: function () { alert('Sorry there was a problem'); },
        success: function (msg) {

            if (msg == 'N')
            {
                alert('Sorry this record no longer exists');
            }
            else
            {
                var commItem = msg.split('¬¬');

                if (commType == 1) // email
                {
                    var iframe = document.getElementById('emdetails');


                    var cleanhtml = "";
                    var cleaningdata = commItem[1];


                    /*******************DO NOT REMOVE
                    CHEKING HTML TO REPLACE BAD SRC TO ALL THE IMAGES APPEARS

                    //doc = new DOMParser().parseFromString(commItem[1], "text/xml");
                    while (cleaningdata.length > 0)
                    {
                        cleanhtml += cleaningdata.substr(0, cleaningdata.indexOf("<img"));
                        cleaningdata = cleaningdata.substr(cleaningdata.indexOf("<img"));
                        
                        var srccontent = cleaningdata.substr((cleaningdata.indexOf("src=") + 5), 3);

                        //console.log("clean:" + cleanhtml + " -------------------------- cleaning: " + cleaningdata + " --------------- src: " + srccontent);
                        //console.log(cleaningdata.indexOf("src=") + " -------------------------- cleaning: " + (cleaningdata.indexOf("src=") + 5) + "---" + (cleaningdata.substr(cleaningdata.indexOf("src=") + 8));
                        //console.log(cleaningdata.indexOf("src=") + " ---" + srccontent);

                        if (srccontent != "htt")
                        {
                            alert(srccontent);
                        }
                        else
                        {
                            cleanhtml += cleaningdata.substr(0, cleaningdata.indexOf(">"));
                            cleaningdata = cleaningdata.substr(cleaningdata.indexOf(">"));
                        }
                    }*/


                    if (iframe.document) {
                        document.emdetails.document.body.innerHTML = commItem[1]; //Chrome, IE
                    } else {
                        iframe.contentDocument.body.innerHTML = commItem[1]; //FireFox
                    }

                    $('#smsmsg').val(commItem[3]);
                    $('#commtype').val(commItem[0]);
                    $('#smsdate').val(commItem[2]);

                    $('#commoptions .ebtn').hide();                    
                    $('#emdetails').show();                    

                    $('#popup').addClass('popuptall');
                    $('#popup').removeClass('popupsm');
                }
                else
                {
                    $('#smsmsg').val(commItem[1]);
                    $('#commtype').val(commItem[0]);
                    $('#smsdate').val(commItem[2]);

                    $('#emdetails').hide();
                    $('#commoptions .ebtn').show();
                    $('#sendsms').removeClass('sendembox').addClass('show');
                    $('#popup').removeClass('popuptall');
                    $('#popup').addClass('popupsm');

                    var iframe = document.getElementById('emdetails');

                    if (iframe.document) {
                        document.emdetails.document.body.innerHTML = commItem[1]; //Chrome, IE
                    } else {
                        iframe.contentDocument.body.innerHTML = commItem[1]; //FireFox
                    }
                }

                $('#commoptions').show();
                $('#embtnbar').hide();
                $('#senderDD').hide();
                $('#emailto').hide();
                $('#bodytext').hide();
                $('div.ck-editor').hide();

                $('#hndCommId').val(commId);
                $('#popupwrapper').show();
                $('#popup').show();

                var emailcontentheight;
                
                if ($(window).width() > 521) 
                {
                    emailcontentheight = (($(window).height() * 0.7) - $('#sendsms').height()) - 100;
                }
                else
                {
                    emailcontentheight = (($(window).height() * 0.7) - $('#sendsms').height()) - 10;
                }
                $('#emdetails').attr('style', 'height:' + emailcontentheight + 'px;');

                /*$('#emdetails img').each(function () {
                    $(this).attr('src',$(this).attr('alt'));
                });*/

            }
        }
    });    
}

function HidePopUp(id)
{
    $('#popupwrapper').hide();
    $('#' + id).hide();
    
    if (communicationnewcreate == 1)
    {
        CreateOtherNewTask();
    }
}

function SendSMS() {

    var isOK = CheckRequired('smsform', '');

    if (isOK == '') {
        var postData = 'mobile=' + $('#telephone').val() + '&receiver=' + $('#first_name').val() + ' ' + $('#surname').val()
            + '&message=' + $('#smsmsg').val() + '&applicant_id=' + $('#ctl00_contentPL_hndItemId').val();

        $.ajax({
            type: "POST",
            url: "/SendSMSAjax.aspx",
            data: postData,
            timeout: 50000,
            error: function () {
                $('#smsoutcome').addClass('error');
                $('#smsoutcome').html('Sorry not able to send SMS at present');
            },
            success: function (msg) {
                if (msg == 'T') {
                    $('#smsoutcome').addClass('error');
                    $('#smsoutcome').html('Session timed out, please log in again');
                }
                else {
                    $('#smsmsg').val('');
                    $('#smsoutcome').removeClass('error');
                    $('#smsoutcome').html('Message has been sent');
                }
            }
        });
    }
    else {
        $('#smsoutcome').addClass('error');
        $('#smsoutcome').html('Please specify ' + isOK + '.');
        $('#smsoutcome').show();
        return false;
    }
}

function SaveComm() {

    var isOK = CheckRequired('smsform', '');

    if (isOK == '') {
        var date = '', dateParts = $('#smsdate').val().split('/');

        if (dateParts.length == 3) {
            date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
        }

        var postData = 'type=' + $('#commtype').val() + '&applicant=' + $('#first_name').val() + ' ' + $('#surname').val()
            + '&applicant_id=' + $('#ctl00_contentPL_hndItemId').val() + '&message=' + $('#smsmsg').val()
             + '&date=' + date + '&comm_id=' + $('#hndCommId').val();

        $.ajax({
            type: "POST",
            url: "/SaveCommAjax.aspx",
            data: postData,
            timeout: 50000,
            error: function () {
                $('#smsoutcome').addClass('error');
                $('#smsoutcome').html('Sorry not able to save at present');
            },
            success: function (msg) {
                /*document.forms['smsform'].reset();
                $('#smsoutcome').removeClass('error');
                $('#smsoutcome').html('Message has been saved');*/
                
                if (communicationnewcreate == 0) {
                    window.location.reload();
                }
                else
                {
                    HidePopUp('popup');
                    CreateOtherNewTask();
                }
            }
        });
    }
    else {
        $('#smsoutcome').addClass('error');
        $('#smsoutcome').html('Please specify ' + isOK + '.');
        $('#smsoutcome').show();
        //return false;
    }
}

function AddComm(commType) {    
    $('#hndCommId').val('0');
    $('#commtype').val(commType);    
    $('#smsdate').val('');
    $('#smsform').trigger('reset');    
    $('#smsoutcome').removeClass('error');
    $('#smsoutcome').html('');
    $('#emdetails').hide();
   
    if (commType == 4) {
        $('#commoptions .btn').attr('href', 'javascript:SendSMS()');
    } else {
        $('#commoptions .btn').attr('href', 'javascript:SaveComm()');
    }

    $('#commoptions .ebtn').show();
    $('#sendsms').removeClass('sendembox').addClass('show');
    $('#commoptions').show();

    $('#embtnbar').hide();
    $('#senderDD').hide();
    $('#emailto').hide();
    $('#bodytext').hide();
    $('div.ck-editor').hide();

    var oldclass = $('#smsdate').attr('class');
    var newclass = oldclass.replace("lockdpicker", "datepicker");
    $("#smsdate").attr('class', newclass);
    $('#smsdate').datepicker({ showAnim: 'blind', dateFormat: 'dd/mm/yy' });
    
    $('#popupwrapper').show();
    $('#popup').removeClass('popuptall');
    $('#popup').addClass('popupsm');
    $('#popup').show();       
}

function EmailSelectedComm()
{
    if ($('#hndCommId').val() == '0')
    {
        if ($('#commtype').val() == 5 || $('#commtype').val() == 6)
        {
            $('#smsmsg').html($('#commtype>option:selected').text());
            $('#commoptions .btn').attr('href', 'javascript:SaveComm()');
        }
        else if ($('#commtype').val() == 4)
        {
            $('#commoptions .btn').attr('href', 'javascript:SendSMS()');
        }
        else
        {
            $('#smsmsg').html('');
            $('#commoptions .btn').attr('href', 'javascript:SaveComm()');
        }
    }    
}

function PreSelectApplicant()
{
    var applicantid = $('#ctl00_contentPL_hndExtraField').val();

    if(applicantid.length > 0)
    {

        var appliid = "";
        var leadnid = "";

        appliid = applicantid.substr(0, applicantid.indexOf("-"));
        leadnid = applicantid.substr(applicantid.indexOf("-") + 1);

        $('#applicant_id').val(appliid);
        $('#taskcustomer_id').val(leadnid);
        $('#task_status_id').val("1");

        SetUpDateAppliTask();

        // preselect phone call in task type
        $('#task_type_id').val(1);

        $('#ftasktwo span.checkbox').hide();


        //console.log("++" + appliid + "++" + leadnid + "++");

        //$('#applicant_id').val(applicantid);
    }
    else if ($('#taskitemid').val() == 0)
    {
        //is new task from task tracker
        var devid = $('#development_id').val();
        var newlead = 0;
        switch (devid)
        {
            case "1": //CP
                newlead = 4;
                break;
            case "2": //Bryanston
                newlead = 3;
                break;
            case "3": //LP
                newlead = 7;
                break;
        }

        if (newlead > 0)
        {
            $('#taskcustomer_id').val(newlead);
        }
        $('#task_status_id').val("1");
        SetUpDateAppliTask();

        // preselect phone call in task type
        $('#task_type_id').val(1);

        $('#ftasktwo span.checkbox').hide();
    }
}

function SetUpDateAppliTask()
{
    var fullDate = new Date();
    var dateday = new Date().getDay();

    if (dateday > 0 && dateday < 5)
    {
        fullDate.setDate(fullDate.getDate() + 1);
    }
    else if (dateday == 5)
    {
        fullDate.setDate(fullDate.getDate() + 3);
    }

    //alert(fullDate.getMonth() + ' ---- ' + fullDate.getMonth().length + ' ---- ' + fullDate.getMonth().toString().length);

    //var twoDigitMonth = ((fullDate.getMonth().toString().length) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
    var twoDigitMonth = "";
    var mymonth = fullDate.getMonth() + 1;
    if (mymonth < 10)
    {
        twoDigitMonth = "0" + mymonth;
    }
    else
    {
        twoDigitMonth = mymonth;
    }

    var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

    $('#date_reminder').val(currentDate);    
}

function SendOutlookEmailAjax() {
    var isOK = '', returnItems = '', body = '';

    if ($('#smsmsg').val() == '' || $('#emailto').val() == '' || $('#senderDD').val() == '') {
        isOK = 'Please make sure Email From, Email To and Subject are specified.'
    }

    if (isOK == '') {
        $('#smsoutcome').html('<img src="/gfx/loading.gif" width="20" height="20" alt="processing .."/>');

        body = '<p style=\"font-family:Arial,sans-serif;font-size:11px;">' + _ckEditor.getData() + '</p>';

        var postData = 'subject=' + encodeURIComponent($('#smsmsg').val()) + '&body=' + encodeURIComponent(body)
            + '&applicant_id=' + $('#ctl00_contentPL_hndItemId').val() + '&applicant_email=' + $('#emailto').val()
            + '&applicant_name=' + encodeURIComponent($('#first_name').val() + ' ' + $('#surname').val())
            + '&agent_id=' + $('#senderDD').val() + '&sender=' + $('#senderDD>option:selected').text();

        //console.log(postData);

        $.ajax({
            type: "POST",
            url: "/SendOutlookEmailAjax.aspx",
            data: postData,
            cache: false,
            timeout: 50000,
            error: function (msg) {
                $('#smsoutcome').removeClass('msg').addClass('error');
                $('#smsoutcome').html('Sorry, not able to send email at present');
            },
            success: function (msg) {
                if (msg == 'F') {
                    $('#smsoutcome').removeClass('msg').addClass('error');
                    $('#smsoutcome').html('Sorry, not able to send email at present');
                }
                else if (msg == "OK") {
                    SaveOutlookEmailAjax();
                }
            }
        });
    }
    else {
        $('#smsoutcome').removeClass('msg').addClass('error');
        $('#smsoutcome').html(isOK);
    }
}

function GetEmailTemplate()
{
    if ($('#emailtemplate').val() != '')
    {
        var postData = 'template_type_id=' + $('#emailtemplate').val() + '&applicant_name=' + $('#first_name').val() + ' ' + $('#surname').val();

        $.ajax({
            type: "POST",
            url: "/GetEmailTemplateAjax.aspx",
            data: postData,
            cache: false,
            timeout: 50000,
            error: function (msg) {
                
            },
            success: function (msg) {
                if (msg == '|') {
                    $('#commsemailoutcome').addClass('error');
                    $('#commsemailoutcome').html('Sorry, not able to get email template at present');
                }
                else
                {
                    var values = msg.split('|');

                    $('#commsemailoutcome').removeClass('error');
                    $('#commsemailoutcome').html('');

                    $('#emailsubject').val(values[0]);
                    $('#emailbody').val(values[1]);
                }
            }
        });   
    }
}

function SaveCriteria() {

    if ($('#fcriteriapanel').valid())
    {
        var postData, isOK = true, budget;

        postData = 'applicant_id=' + $('#ctl00_contentPL_hndItemId').val() + '&budget_id=' + $('#mainbudget').val()
            + '&criterias=';

        $('#criteriabody .commitem').each(function () {
            var id = $(this).attr('id').replace('applicant_criteria-', '').replace('-', '');

            if ($('#bed' + id).val() == '' && $('#ap' + id).val() == '' && $('#budget' + id).val() == '')
            {
                isOK = false;
            }
            else
            {
                budget = $('#budget' + id).val().replace('£', '');
                budget = budget.replace(/,/g, '');

                postData += '|' + id + '¬' + $('#bed' + id).val() + '¬' + $('#ap' + id).val() + '¬' + budget;
            }

        });
        
        if (isOK)
        {
            $.ajax({
                type: "POST",
                url: "/SaveApplicantCriteria.aspx",
                data: postData,
                timeout: 50000,
                error: function () { },
                success: function (msg) {
                    $('#outcome_criteriapanel').removeClass('error').addClass('msg');
                    $('#outcome_criteriapanel').html('Updated Successfully');
                }
            });
        }
        else
        {
            $('#outcome_criteriapanel').removeClass('msg').addClass('error');
            $('#outcome_criteriapanel').html('Please specify at least one criteria Bedroom/Apartment/Sub-budget.');
        }
    }
}

function AddCriteria()
{
    var postData = 'counter=x' + addCriteriaCounter;

    $('#outcome_criteriapanel').html('');

    $.ajax({
        type: "POST",
        url: "/GenApplicantCriteriaAjax.aspx",
        data: postData,
        timeout: 50000,
        error: function () { },
        success: function (msg) {
            $('#criteriabody').append(msg);
            addCriteriaCounter++;
        }
    });    
}

function GetPropertyPrice(id) {
    var postData = 'apartment=' + $('#ap' + id).val();
    
    $.ajax({
        type: "POST",
        url: "/GetPropertyPriceAjax.aspx",
        data: postData,
        timeout: 50000,
        error: function () { },
        success: function (msg) {
            var values = msg.split('|');
            var budget = parseInt(values[0]);

            $('#budget' + id).val('£' + budget.toLocaleString());
            $('#bed' + id).val(values[1])
        }
    });
}

function ExtraInfoClocks()
{
    if ($('#task_type_id').val() == 1 && $('#ctl00_contentPL_hndItemId').val() != 0) {
        startTimeLocal();
        startTimeCountry();
    }
    else
    {
        $('#dttaskextrainfo').attr('style','display:none !important;');
    }
}

function CleanTaskReminderHour()
{
    if ($('#time_reminder').val().length > 2)
    {
        $('#time_reminder').val($('#time_reminder').val().substr(0, 5));
    }
}

function ApplicantContactClocks()
{
    clockhtml = "<div id=\"masterclockdivapp\"><div id=\"ukclockdiv\" class=\"clockdiv\">"
        + "<span class=\"clocklabel\">UK Time</span><span id=\"ukclock\" class=\"clocktimer\"></span></div>";

    startTimeLocal();

    //console.log("X" + $('#countryclockapp').attr('itemid') + "X")

    if (parseInt($('#countryclockapp').attr('itemid')) != "0" && $('#countryclockapp').attr('itemid') != null)
    {
        clockhtml += "<div id=\"countryclockdiv\" class=\"clockdiv\"><span class=\"clocklabel\">Local Time (" + $('#country_id :selected').text() + ")</span>"
			+ "<span id=\"countryclock\" class=\"clocktimer\"></span></div>";
        startTimeCountryApp();
    }

    $('#fdigitalcomms').append(clockhtml);
}

function startTimeLocal()
{
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('#ukclock').html(h + ":" + m + ":" + s);
    var t = setTimeout(startTimeLocal, 500);
}

function startTimeCountry()
{
    var today = new Date();
    var h = today.getHours() + parseInt($('#countryclock').attr('itemid'));

    if (h >= 24)
    {
        if (h == 24)
        {
            h = "00";
        }
        else
        {
            h = h - 24;
        }
    }

    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('#countryclock').html(h + ":" + m + ":" + s);
    var t = setTimeout(startTimeCountry, 500);
}

function startTimeCountryApp() {
    var today = new Date();
    var h = today.getHours() + parseInt($('#countryclockapp').attr('itemid'));

    if (h >= 24) {
        if (h == 24) {
            h = "00";
        }
        else {
            h = h - 24;
        }
    }

    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('#countryclock').html(h + ":" + m + ":" + s);
    var t = setTimeout(startTimeCountryApp, 500);
}

function checkTime(i)
{
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

function ViewingFilter(classtoshow)
{
    $('.viewingsappli > div').each(function () {
        
        if (classtoshow == 'ptotal') {
            $(this).removeClass('hide');
        }
        else {
            if ($(this).hasClass(classtoshow)) {
                $(this).removeClass('hide');
            }
            else {
                $(this).addClass('hide');
            }
        }
    });

    //titles

    $('#viewingcountercounter > a').each(function () {
        var aclass = $(this).attr('class');

        if (aclass == classtoshow) {
            $(this).attr('style', 'border:1px solid black;');
        }
        else {
            $(this).attr('style', '');
        }
    });
}

function GetEmailResponses(applicantId) {

    var postData = 'applicant_id=' + applicantId;

    $.ajax({
        type: "POST",
        url: "/EmailResponseAjax.aspx",
        data: postData,
        timeout: 50000,
        error: function () { alert('Sorry there was a problem'); },
        success: function (msg) {
            $('#addeditsendemail').html(msg);
            $('#popupwrapper').show();
            $('#sendemailpopup').show();
        }
    });
}

function MobilePhoneButton()
{
    /*if ($(window).width() < 760)
    {
        var phoneshtml = "";
        var phoneclean = $('#telephone').val().replace(" ","").replace("(", "").replace(")", "");
        var mobileclean = $('#mobile').val().replace(" ","").replace("(", "").replace(")", "");

        if ($('#telephone').val().length > 1)
        {
            phoneshtml = "<span class=\"text\"><a class=\"mobphonebtt\" href=\"tel:" + phoneclean + "\">Call Telephone (" + $('#telephone').val() + ")</a></span>";
        }

        if ($('#mobile').val().length > 1) {
            phoneshtml += "<span class=\"text\"><a class=\"mobphonebtt\" href=\"tel:" + mobileclean + "\">Call Mobile (" + $('#mobile').val() + ")</a></span>";
        }

        $('#fapplicant').append(phoneshtml);
    }*/
}

function MobilePhoneButtonTask()
{
    if ($(window).width() < 760)
    {
        if ($('#task_type_id').val() == 1)
        {
            $('#ftask').append("<span class=\"text\">" + $('#mastertelephonediv').html() + "</span>");
        }
    }    
}

function ApplicantPageTaskRedoLink()
{
    var leadid = $('#leadnegotiator_id').val();
    var tochangelink = 0;
    var customerid = 0;

    switch (leadid)
    {
        case "68": // tracy
            customerid = "19";
            tochangelink = 1;
            break;
        case "2": // j hislop
            customerid = "4";
            tochangelink = 1;
            break;
        case "3": // j guilf
            customerid = "7";
            tochangelink = 1;
            break;
    }

    if (tochangelink == 1)
    {
        $('#addnewtask').attr('href', $('#addnewtask').attr('href') + "/" + customerid);
    }
}

function HideDevMenu() {
    $('#developmentmenu').hide();
}

function GetBedroomApartments(id) {    
    var postData = 'bedroom_id=' + $('#bed' + id).val();
    
    $.ajax({
        type: "POST",
        url: "/GetBedroomApartmentsAjax.aspx",
        data: postData,
        timeout: 50000,
        error: function () { },
        success: function (msg) {            
            $('#ap' + id).html(msg);
        }
    });
}

function AgentContact() {
    $('#dtagentcontact div.row form span').each(function () {
        if (
            $(this).children('input').attr('id') == "telephone2" || $(this).children('input').attr('id') == "telephone3" ||
            $(this).children('input').attr('id') == "telephone4" || $(this).children('input').attr('id') == "telephone5") {
            $(this).hide();
        }
        else if ($(this).children('input').attr('id') == "telephone") {
            $(this).append("<a class=\"contactaddlink readonly\" id=\"contactaddlink" + $(this).children('input').attr('id') + "\" href=\"javascript:AgentContactAddMore(\'" + $(this).children('input').attr('id') + "\')\">+</a>"
                + "<input id=\"" + $(this).children('input').attr('id') + "count\" type=\"hidden\" value=\"1\"/>");

            //$(this).attr('class', 'text contact')
        }
    });    
}

function AgentContactAddMore(typeofcontact) {
   // alert('add: ' + typeofcontact);

    if ($('#' + typeofcontact).attr('readonly') != "readonly") {

        var countno = $('#' + typeofcontact + "count").val();

        countno++;

        $('#' + typeofcontact + '' + countno).parent().show();



        if (countno == 5) {
            $('#contactaddlink' + typeofcontact).hide();
            $('#' + typeofcontact).attr('style', 'width:100% !important;');
        }
        else {
            $('#' + typeofcontact + "count").val(countno);
        }
    }
}

function CheckApplicantExists()
{
    var isOK = false;

    if ($('#email').val() != '' || $('#telephone').val() != '' || $('#mobile').val() != '')
    {
        isOK = true;
    }

    if (isOK) {
        var postData = 'email=' + $('#email').val() + '&telephone=' + $('#telephone').val() + '&mobile=' + $('#mobile').val();

        $.ajax({
            type: "POST",
            url: "/IsApplicantExists.aspx",
            data: postData,
            timeout: 50000,
            error: function () { },
            success: function (msg) {                
                if (msg == '0') // not exists
                {
                    $('#addnewoutcome').html('');
                    $('#addnewoutcome').hide();

                    SaveAllNewItem();                    
                }
                else {                    
                    $('#returnbtn').hide();
                    $('#viewapplicantbtn').attr('href', '/applicant-profile/' + msg);
                    $('#viewapplicantbtn').show();
                    $('#addnewoutcome').attr('class', 'label error');
                    $('#addnewoutcome').html('Sorry an applicant with this info already exists.');
                    $('#addnewoutcome').show();
                }
            }
        });
    }
    else
    {
        $('#addnewoutcome').html('');
        $('#addnewoutcome').hide();
        SaveAllNewItem();
    }
}

function GetCompanyAddressAjax()
{    
    if ($('#agent_company_id').val() != '') {
        var postData = 'company_id=' + $('#agent_company_id').val();

        $.ajax({
            type: "POST",
            url: "/GetCompanyAddressAjax.aspx",
            data: postData,
            timeout: 50000,
            error: function () { },
            success: function (msg) {
                if (msg != '') // exists
                {
                    $('#fagentcontact').append('<span class="companyaddresagentbox"><label class="control-label col-sm-3">Company Address</label><div>' + msg
                        + '</div><a href="/company-profile/' + $('#agent_company_id').val() + '">edit</a></label></span>');
                    
                }
            }
        });
    }    
}

function RecordCommunication(commType) {
    
    var postData = 'comm_type=' + commType + '&receiver=' + $('#first_name').val() + ' ' + $('#surname').val() + '&applicant_id=' + $('#ctl00_contentPL_hndItemId').val();

    //console.log('RecordCommunication: ' + postData);

    $.ajax({
        type: "POST",
        url: "/RecordCommunicationAjax.aspx",
        data: postData,
        timeout: 50000,
        error: function (msg) {
            //console.log('RecordCommunication Error: ' + JSON.stringify(msg));
        },
        success: function (msg) {
            //console.log('RecordCommunication Answer: ' + msg);
        }
    });    
}

function PreCheckTaskCompleted() {
    /*if ($('#time_reminder').val().indexOf(":") == -1)
    {
        $('#time_reminder').val($('#time_reminder').val().substr(0,2) + ":" + $('#time_reminder').val().substr(2,4));
    }*/

    //console.log('saleeee: ' + $('#time_reminder').val());

    if ($('#task_status_id').val() == '3') {
        if ($('#ftasktwo #details').length == 0) {
            $('#ftasktwo').append('<span id=\"phonenotes\"><label class="control-label col-sm-3">Phone Call Notes</label><textarea rows="4" cols="20" class="form-control autogrow" id="details" maxlength="10000" required="true" style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 100px; overflow-y: scroll;"></textarea></span><span></span>');
        }
        else {
            $('#phonenotes').show();
        }
    }
    else {
        $('#phonenotes').hide();
    }
}

function CheckTaskCompleted()
{
    /*if ($('#time_reminder').val().indexOf(":") == -1)
    {
        $('#time_reminder').val($('#time_reminder').val().substr(0,2) + ":" + $('#time_reminder').val().substr(2,4));
    }*/

    //console.log('saleeee: ' + $('#time_reminder').val());

    if ($('#task_status_id').val() == '3')
    {
        if ($('#ftasktwo #details').length == 0)
        {
            $('#ftasktwo').append('<span id><label class="control-label col-sm-3">Phone Call Notes</label><textarea rows="2" cols="20" class="form-control autogrow" id="details" maxlength="1000" required="true" style="overflow: hidden; overflow-wrap: break-word; resize: horizontal; height: 54px;"></textarea></span><span></span>');
        }
        else
        {
            var outcomeMsg = SaveData('tasktwo', true);

            if (outcomeMsg == '') {
                setTimeout("ShowAddNewTaskLink()", 1000);
            }            
        }
    }
    else
    {
        SaveData('tasktwo', false);
    }
}

function ShowAddNewTaskLink()
{
    $('#outcome_tasktwo').attr('class', 'label msg');
    $('#outcome_tasktwo').html('<span>Updated Successfully </span> <a href="/new-applicant-task/' + $('#applicant_id').val() + '/' + $('#taskcustomer_id').val() + '" style="margin:0 0 0 20px;color:white">Add Another Task?</a>');
    $('#outcome_tasktwo').show();    
}

function UpdateTableField(table, fieldName, fielId, itemId) {
    var postData = "table=" + table
		+ "&" + fieldName + "=" + $('#' + fielId).val() + "&itemid=" + itemId;
    
    //console.log("postdata: " + postData);

    if (table == "viewing" && fieldName == "notes")
    {
        var currentdate = new Date(); 
        var datetime = "" + currentdate.getFullYear() + "-"
            + ( '0' + (currentdate.getMonth()+1) ).slice( -2 )  + "-"
            + ( '0' +currentdate.getDate()).slice( -2 ) + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

        postData += "&customer_id=" + $('#loggedstaffid').val() +  "&note_date=" + datetime; 
        
        //console.log("postdata 2: " + postData);
    }

    $.ajax({
        type: "POST",
        url: "/UpdateTableAjax.aspx",
        data: postData,
        cache: false,
        timeout: 50000,
        error: function () { alert('Sorry there was a problem'); },

        success: function (msg) {
            if (msg == 'T') {                                
                $('#m' + fielId).html('Session timed out, please log in again');
                $('#m' + fielId).show();
            }
            else {                                
                $('#m' + fielId).html('Saved Successfully');
                $('#m' + fielId).show();
                if (table == "viewing" && fieldName == "notes")
                {
                    location.reload();
                }
            }
        }
    });
}

function OutlookInsertAttachmentCode()
{
    var html, files, selected, fileInfo, attachments = '', logo, filename, index;

    //logo = $('#developmentname').html().replace(' ', '') + 'logo.png';

    selected = $('#fmselected').val()

    if (selected != '')
    {
        files = selected.split('¬¬');

        for (var x=0; x < files.length; x++)
        {
            if (files[x] != '')
            {
                fileInfo = files[x].split('|');
                //alert('0--' + fileInfo[0] + '--|--' + fileInfo[1] + '--|--' + fileInfo[2] + '--|--' + fileInfo[3] + '--|--' + fileInfo[4] + '--|--' + fileInfo[5]);
                attachments += '<br/><br/><a href="http://d.almacantar.surgesolutions.co.uk/DownloadFile.aspx?file=' + fileInfo[0] + '|' + fileInfo[1] + '|' + fileInfo[2] + '|' + fileInfo[4] + '&appli=' + $('#applicant_id').val() + '" style="font-weight:bold;text-decoration:underline">' + fileInfo[3] + '</a>';
            }
        }

        if (attachments != '')
        {            
            html = _ckEditor.getData();
            html += attachments;

            _ckEditor.setData(html);
        }
    }

    FMClosePopUp();
}

function OutlookGetFiles(fileType, development)
{
    var id = 'fml' + fileType + development;

    if ($('#fmselectedtab').val() == id) {
        $('#fmselectedtab').val('');
        $('#' + id + ' ul').toggle('blind', { direction: 'vertical' }, 1000);       
    }
    else {
        if ($('#fmselectedtab').val() != '') {
            $('#' + $('#fmselectedtab').val() + ' ul').hide();
        }

        if ($('#' + id + ' ul').length == 0) {
            $('#' + id).append('<ul><li><img src="/gfx/loading-sm.gif" width="22" height="22"/></li></ul>');
            $('#' + id + ' ul').toggle('blind', { direction: 'vertical' }, 1000);
            $('#fmselectedtab').val(id);

            var postData = 'development_id=' + development + '&file_type_id=' + fileType;

            $.ajax({
                type: "GET",
                url: "/FileBrowserAjax.aspx",
                data: postData,
                timeout: 50000,
                error: function () { alert('Sorry there was a problem'); },
                success: function (msg) {
                    $('#' + id + ' ul').html(msg);
                }
            });
        }
        else
        {
            $('#fmselectedtab').val(id);
            $('#' + id + ' ul').toggle('blind', { direction: 'vertical' }, 1000);
        }
    }
}

function OutlookAddAttachment(cbox)
{
    var selected = $('#fmselected').val() + '¬¬';
    
    if ($(cbox).is(':checked'))
    {
        if (selected.indexOf('¬¬' + cbox.value + '¬¬') == -1)
        {
            selected += cbox.value + '¬¬';
        }
    }
    else
    {        
        selected = selected.replace(cbox.value + '¬¬', '');
    }
    
    $('#fmselected').val(selected);    
}

function OutlookShowFiles(folder)
{
    $('#fmfiles ul').each(function () {
        if ($(this).attr('id') == 'fm' + folder)
        {
            $(this).addClass('show');
        }
        else
        {
            $(this).removeClass('show');
        }
    });

    $('#fmlinks li').each(function () {
        if ($(this).attr('id') == 'fml' + folder)
        {
            $(this).addClass('selected');
        }
        else
        {
            $(this).removeClass('selected');
        }
    });
}

function GetOutlookEmailTemplate(development, template, showPopUp)
{    
    var link = $('#er-' + development + '-' + template).attr('href');
    var linkParts = link.split('=');
    var template = linkParts[linkParts.length - 1];
    
    template = template.replace(/%20/g, ' ');
    template = template.replace(/%0D%0A/g, '<br/>');

    $('#hndemailtemplate').val(template);

    if (showPopUp) 
    { 
        ShowSendEmailPopup(true); 
    }
    else
    {
        _ckEditor.setData(template);
        $('#commemtemp').hide();
    }
}

function ViewingLink(op) {
    var oldhref = $('#newviewingfromappli').attr("href");
    var leadnegotiatorId, agentId;
    // only for applicant we need to append leadnegotiatorId and agent
    if (op == 'applicant')
    {
        if ($('#leadnegotiator_id').val() == '') { leadnegotiatorId = '0'; } else { leadnegotiatorId = $('#leadnegotiator_id').val(); }
        if ($('#agent_introducer').val() == '') { agentId = '0'; } else { agentId = $('#agent_introducer').val(); }
    }

    $('#newviewingfromappli').attr("href", oldhref + "/" + leadnegotiatorId + "/" + agentId);
}

function PreSelectInViewing() {
    if ($('#ctl00_contentPL_hndItemId').val() == 0 && $('#ctl00_contentPL_hndExtraField').val() != '') {
        var extraValue = $('#ctl00_contentPL_hndExtraField').val().split('-');
        var comingFrom = $('#ctl00_contentPL_hndComingFrom').val();

        $('#viewing_type_id').val(1);

        switch (comingFrom) {
            case 'applicant':
                $('#applicant_id').val(extraValue[0]);
                $('#leadnegotiator_id').val(extraValue[1]);
                $('#agent_id').val(extraValue[2]);
                break;
            case 'agent':
                $('#agent_id').val(extraValue[0]);
                break;
            case 'property':
                $('#property_id').val(extraValue[0]);
                break;
        }
    }
}

function AddUserJourney()
{
    /*$('#newjiapartment').val(0);
    $('#newjiprice').val("");
    $('#newjidisco').val("");
    $('#newjiparking').val("");
    $('#newjitotal').val("");*/


    /*$('#newbuyerjourney').animate({
        height: "75px",
        marginBottom: "25px",
        borderWidth: "1px"
    }, 500);*/


    $('#newjidate').val($.datepicker.formatDate('yy-mm-dd', new Date()));
    $('#newjidate').datepicker({ showAnim: 'blind', dateFormat: 'yy-mm-dd' });
}

function SaveUserJourney() {
    if ($('#newjiapartment').val() == '0') {
        alert('Please select an Apartment first.');
    }
    else {
        var checked = "";
        var prepostData = "option=check&applicant_id=" + $('#applicantitemid').val()
            + "&property_id=" + $('#aptselected').val();

        $.ajax({
            type: "POST",
            url: "/BuyersJourneyAjax.aspx",
            data: prepostData,
            timeout: 50000,
            error: function () {
                checked = "error";
                //console.log('pre: ' + checked);
                SaveUserJourneyStep2(checked);
            },
            success: function (msg) {
                checked = msg;
                //console.log('pre: ' + checked);
                SaveUserJourneyStep2(checked);
            }
        });
    }
}

function SaveUserJourneyStep2(checked) {

    //console.log(checked);

    if (checked == "error") {
        alert("Sorry, there was an error, try again later");
    }
    else if (checked == "step") // new step in the buyers journey
    {
        LinkApplicantToProperty();
        BuyerJourneyChangeApplicantStatus("0");
        setTimeout("AddJourneyAfterCheck();", 500);
    }
    else if (checked == "new") // property not linked with an applicant, new journey, first step
    {
        LinkApplicantToProperty();
        BuyerJourneyChangeApplicantStatus("0");
        setTimeout("AddJourneyAfterCheck();", 500);
    }
    else if (checked.indexOf("locked") > -1)
    {
        alert('Sorry, this apartment is locked by applicant: ' + checked.substr(checked.indexOf("-") + 1));
    }
}

function AddJourneyAfterCheck()
{
    var postData = "";
    var formData = "";

    postData = "table=applicant_property&id=0&formdata=";

    var discoval = $('#newjidisco').val();
    var parkingval = $('#newjiparking').val();

    if (discoval.length == 0) { discoval = 0; }
    if (parkingval.length == 0) { parkingval = 0; }

    formData = "||applicant_id¬¬" + $('#applicantitemid').val() 
        + "||property_id¬¬" + $('#aptselected').val() 
        + "||floorplans¬¬2"
        + "||property_status_id¬¬" + $('#newjistage').val() 
        + "||journey_date¬¬" + $('#newjidate').val() + " 00:00:00" 
        + "||prop_price¬¬" + $('#newjiprice').val() 
        + "||discount_in_price¬¬" + discoval
        + "||parking_price¬¬" + parkingval
        + "||total_price¬¬" + $('#newjitotal').val();

    //console.log(postData + " -------- " + formData);

    postData += encodeURIComponent(formData);
    
    $.ajax({
        type: "POST",
        url: "/AddEditProcess.aspx",
        data: postData,
        timeout: 50000,
        error: function () {
            $('#outcome_' + tabId).addClass('error');
            $('#outcome_' + tabId).html('Operation Failed');
        },
        success: function (msg) {
            setTimeout(function(){
                window.location.reload(true);
            }, 250);
            //window.location = "/applicant-profile/" + $('#applicantitemid').val()
        }
    });
}

function LinkApplicantToProperty()
{
    var postData = "";
    var formData = "";

    postData = "table=property&id=" + $('#aptselected').val() + "&formdata=";

    formData = "||applicant_id¬¬" + $('#applicantitemid').val() + "||property_status_id¬¬" + $('#newjistage').val();
    
   // alert(formData);

    postData += encodeURIComponent(formData);

    $.ajax({
        type: "POST",
        url: "/AddEditProcess.aspx",
        data: postData,
        timeout: 50000,
        error: function () {
        },
        success: function (msg) {
        }
    });
}

function BuyerJourneyChangeApplicantStatus(statu) {
    var postData = "";
    var formData = "";

    postData = "table=applicant&id=" + $('#applicantitemid').val() + "&formdata=";

    var prostatus = "";
    
    if (statu == "0") {
        prostatus = $('#newjistage').val();
        //alert('nooo');
    }
    else
    {
        prostatus = statu;
        $('#changeappstatuswithdrawnjourney').fadeOut();
        //alert('siiii');
    }

    var appstatus;

    //alert('sale: ' + prostatus);

    switch(prostatus)
    {

        case "6":
        case "3":
        case "4":
        case "7":
            appstatus = 5; // hot
            break;
        case "5":
            appstatus = 14; // completed
            break;
        case "8":
            appstatus = 2; // cold
            break;
        case "2":
            appstatus = 13; // exchanged
            break;
        case "10":
            appstatus = 3; // dead
            break;
        case "11":
            appstatus = 1; // in progress
            break;
        default:
            appstatus = 0;
            break;
    }

    formData = "||enquiry_status_id¬¬" + appstatus;

    //alert(formData);

    postData += encodeURIComponent(formData);
    
    if (appstatus != 0) {
        $.ajax({
            type: "POST",
            url: "/AddEditProcess.aspx",
            data: postData,
            timeout: 50000,
            error: function () {
            },
            success: function (msg) {
                window.location.reload(true);
            }
        });
    }
}

function BuyerJourneyApartmentSelect()
{
    var msg = $('#newjiapartment').val();
    var values = msg.split('|');

    $('#aptselected').val(values[0]);
    $('#newjiprice').val(values[1]);    

    BuyerJourneyCalculateTotal();
}

function BuyerJourneyStageSelect()
{
    if ($('#newjistage').val() == "8")
    {
        $('#newjiprice').attr('style','display:none;');
        $('#newjidisco').attr('style','display:none;');
        $('#newjiparking').attr('style','display:none;');
        $('#newjitotal').attr('style','display:none;');
        
        $('.jiprice.title').attr('style','display:none;');
        $('.jidisco.title').attr('style','display:none;');
        $('.jiparking.title').attr('style','display:none;');
        $('.jitotal.title').attr('style','display:none;');       
            
            //'background:rgba(251,61,77,0.4);');

        $('#buyjourbtt').attr('href','javascript:CancelUserJourney();');
        $('#buyjourbtt').html('withdrawn');
    }
    else
    {
        $('#newjiprice').attr('style','');
        $('#newjidisco').attr('style','');
        $('#newjiparking').attr('style','');
        $('#newjitotal').attr('style','');
        
        $('.jiprice.title').attr('style','');
        $('.jidisco.title').attr('style','');
        $('.jiparking.title').attr('style','');
        $('.jitotal.title').attr('style','');   

        $('#buyjourbtt').attr('href','javascript:SaveUserJourney();');
        $('#buyjourbtt').html('save');
    }
}

function BuyerJourneyCalculateTotal()
{
    var quotepri = $('#newjiprice').val();
    var disco = $('#newjidisco').val();
    var parking = $('#newjiparking').val();

    if (disco.length == 0) { disco = 0;}
    if (parking.length == 0) { parking = 0;}

    $('#newjitotal').val(parseFloat((parseFloat(quotepri) - (parseFloat(quotepri) * (parseFloat(disco) * 0.01))) + parseFloat(parking)));
}

function BuyerJourneyCalculateDiscount()
{
    var quotepri = $('#newjiprice').val();
    var total = $('#newjitotal').val();
    var parking = $('#newjiparking').val();

    if (parking.length == 0) { parking = 0; }

    var mydisco = total - parking;

    /*mydisco = quotepri - mydisco;
    mydisco = (mydisco / total) * 100;*/
    
    mydisco = (mydisco * 100) / quotepri;
    mydisco = 100 - mydisco;

    $('#newjidisco').val(mydisco.toFixed(2));

   // $('#newjitotal').val(parseFloat((parseFloat(quotepri) - (parseFloat(quotepri) * (parseFloat(disco) * 0.01))) + parseFloat(parking)));
}

function DeleteUserJourney(applipropid)
{
    DeleteItem("applicant_property", applipropid, "");
    setTimeout("window.location.reload();", 100);
}

function CancelUserJourneyOpen()
{
    if ($('#canceljiapartment option').length == 1)
    {
        $('#canceljourney div.journeyinputs').html("<p>No active journey for this applicant</p>");

        $('#canceljourney').animate({
            height: "35px",
            marginBottom: "25px",
            borderWidth: "1px"
        }, 500);
    }
    else {

        $('#canceljourney').animate({
            height: "75px",
            marginBottom: "25px",
            borderWidth: "1px"
        }, 500);

        if ($('#canceljiapartment option').length == 2)
        {
            var theValue = $('#canceljiapartment option:nth-child(2)').val();
            $('#canceljiapartment option[value=' + theValue + ']').attr('selected', true);
        }
    }

    $('#newbuyerjourney').animate({
        height: "0px",
        marginBottom: "0px",
        borderWidth: "0px"
    }, 500);

    $('#canceljidate').val($.datepicker.formatDate('yy-mm-dd', new Date()));
    $('#canceljidate').datepicker({ showAnim: 'blind', dateFormat: 'yy-mm-dd' });
}

function CancelUserJourney()
{
    if($('#newjiapartment').children(":selected").attr("class") != "bjmyprop")
    {
        //alert("is NOOOOO my prop");
        alert("Please, select a property linked to this applicant.");
        $('#newjiapartment').attr('style','border:1px solid rgba(251,61,77,0.6)')
    }
    else
    {
        var postData = "";
        var formData = "";

        postData = "table=property&id=" + $('#newjiapartment').val().substr(0, $('#newjiapartment').val().indexOf("|")) + "&formdata=";

        formData = "||applicant_id¬¬0||property_status_id¬¬1||";

        //alert(postData + " -- aaaaaaaaaaaaaaaaaaa -- " + formData);

        postData += encodeURIComponent(formData);

        $.ajax({
            type: "POST",
            url: "/AddEditProcess.aspx",
            data: postData,
            timeout: 50000,
            error: function () {
            },
            success: function (msg) {
                //window.location.reload();
                WithdrawnCancelUserJourney();
                //BuyerJourneyChangeApplicantStatus(); Is removed as now we ask what status to apply

                $('#changeappstatuswithdrawnjourney').fadeIn();
            }
        });
    }

}

function NoChangeAppStatus()
{
    $('#changeappstatuswithdrawnjourney').fadeOut();
    window.location.reload(true);
}

function WithdrawnCancelUserJourney() {
    var postData = "";
    var formData = "";
   
    postData = "table=applicant_property&id=0&formdata=";

    formData = "||applicant_id¬¬" + $('#applicant_id').val()
        + "||property_id¬¬" + $('#newjiapartment').val().substr(0,$('#newjiapartment').val().indexOf("|"))
        + "||floorplans¬¬2"
        + "||property_status_id¬¬99"
        + "||journey_date¬¬" + $('#newjidate').val() + " 00:00:00";

    $('.journeyitem').each(function () {

        //alert('aaaaa: ' + $(this).children('.jiapartment').attr('itemid') + " bbbbb: " + $('#newjiapartment').val());

        if ($(this).children('.jiapartment').attr('itemid') == $('#newjiapartment').val().substr(0, $('#newjiapartment').val().indexOf("|")))
        {
            /*alert('price ' + $(this).children('.jiprice').html().replace('£', '').replace(' ', '').replace(',', '')
                + ' -- ' + $(this).children('.jiprice').html().replace('£', '').replace(' ', '')
                + ' -- ' + $(this).children('.jiprice').html().replace('£', '')
                + ' -- ' + $(this).children('.jiprice').html());*/

            formData += "||prop_price¬¬" + $(this).children('.jiprice').html().replace('£', '').replace(' ', '').replace(/\,/g, '')
            + "||discount_in_price¬¬" + $(this).children('.jidisco').html().replace('%', '')
            + "||parking_price¬¬" + $(this).children('.jiparking').html().replace('£ ', '').replace(/\,/g, '')
            + "||total_price¬¬" + $(this).children('.jitotal').html().replace('£', '').replace(' ', '').replace(/\,/g, '');

            return false;
        }

    });
    



    //alert(" postData -- " + formData);

    postData += encodeURIComponent(formData);
    
    $.ajax({
        type: "POST",
        url: "/AddEditProcess.aspx",
        data: postData,
        timeout: 50000,
        error: function () {
        },
        success: function (msg) {
            //window.location.reload();
        }
    });

}

function GetTodayDateFormated()
{
    var todaydate = new Date();
    var todaystring = todaydate.getFullYear() + "-";

    var todaymonth = todaydate.getMonth() + 1;

    if (todaymonth < 10)
    {
        todaymonth = "0" + todaymonth;
    }
    todaystring += todaymonth + "-";

    var todayday = todaydate.getDate();
    if (todayday < 10) {
        todayday = "0" + todayday;
    }
    todaystring += todayday + " ";

    var todayhour = todaydate.getHours();
    if (todayhour < 10) {
        todayhour = "0" + todayhour;
    }
    todaystring += todayhour + ":";

    var todaymin = todaydate.getMinutes();
    if (todaymin < 10) {
        todaymin = "0" + todaymin;
    }
    todaystring += todaymin + ":";

    var todayseg = todaydate.getSeconds();
    if (todayseg < 10) {
        todayseg = "0" + todayseg;
    }
    todaystring += todayseg;
    
    return todaystring;
}

function CheckAgentExists()
{
    var isOK = false;

    if ($('#email').val() != '')
    {
        isOK = true;
    }

    if (isOK) {
        var postData = 'email=' + $('#email').val();

        $.ajax({
            type: "POST",
            url: "/IsAgentExists.aspx",
            data: postData,
            timeout: 50000,
            error: function () { },
            success: function (msg) {                
                if (msg == '0') // not exists
                {
                    $('#addnewoutcome').html('');
                    $('#addnewoutcome').hide();

                    SaveAllNewItem();                    
                }
                else {                    
                    $('#returnbtn').hide();
                    $('#viewapplicantbtn').html('Go To Agent');
                    $('#viewapplicantbtn').attr('href', '/agent-profile/' + msg);
                    $('#viewapplicantbtn').show();
                    $('#addnewoutcome').attr('class', 'label error');
                    $('#addnewoutcome').html('Sorry an agent with this email already exists.');
                    $('#addnewoutcome').show();
                }
            }
        });
    }
    else
    {
        $('#addnewoutcome').html('');
        $('#addnewoutcome').hide();
        SaveAllNewItem();
    }
}

function ShowHideEmailTemplates()
{
    $('#commemtemp').toggle();
}

function CreateOtherNewTask() {


    $('#newtaskquestion').fadeOut();

    var postData = "table=task&id=0";

    $.ajax({
        type: "GET",
        url: "/AddEditAjax.aspx",
        data: postData,

        timeout: 50000,
        error: function () { },
        success: function (msg) {
            $('#newtaskpopup').html(msg);

            //prepopulate data
            $('#newtaskpopup #applicant_id').val($('#fapplicant #applicant_id').val());
            $('#newtaskpopup #development_id').val($('#fapplicant #development_id').val());

            var taskcust = $('#fapplicant #development_id').val();

            $('#newtaskpopup #development_id').attr('disabled', 'disabled');
                       
            var newlead = 0;

            if ($('#leadnegotiator_id').val() == null || $('#leadnegotiator_id').val() == '') {                
                switch (taskcust) {
                    case "1": //CP
                        newlead = 4;
                        break;
                    case "2": //Bryanston
                        newlead = 25;
                        break;
                    case "3": //LP
                        newlead = 5;
                        break;
                }
                    
                if (newlead > 0) {
                    $('#newtaskpopup #taskcustomer_id').val(newlead);
                }
            }
            else {                
                $("#newtaskpopup #taskcustomer_id option").each(function () {                    
                    if ($(this).text().replace(',', '') == $('#leadnegotiator_id>option:selected').text()) {
                        $(this).attr('selected', 'selected');
                        newlead = $(this).val();                        
                        return false;
                    }                        
                });                
            }                
            
            if (newlead == 0)
            {                
                $('#newtaskpopup #taskcustomer_id').val($('#loggedstaffid').val());
            }            
            
            $('#newtaskpopup #task_status_id').val("1");
            $('#newtaskpopup #task_type_id').val(1);
            SetUpDateAppliTask();
            $('input.datepicker').datepicker({ showAnim: 'blind', dateFormat: 'dd/mm/yy' });

            var hrefcode = $('#newtaskpopup .buttons > a').attr('href');
            hrefcode = hrefcode.replace("''", "'0'");
            $('#newtaskpopup .buttons > a').attr('href', hrefcode);

            $('#ctl31').removeAttr("onclick");

            $('#newtaskpopup #hhtask').html("Create A New Task")

            $('#newtaskpopup #hhtask').append("<a style=\"float:right;color:black; display:block;margin-right:15px;\" href=\"javascript:CloseNewTask()\"><i class=\"fas fa-times-circle\"></i></a>");
                            
            $('#hhtask').attr('style', 'background:#e2e8ef;font-weight:lighter !important;');

            CleanDDForNewTaskFromApplicant();

            $('#ftask span.checkbox').hide();
            // display pop up
            $('#newtaskpopup').fadeIn();
            $('#newtaskpopup #tdtask').fadeIn();
            $('#newtaskpopup #details').removeAttr('readonly');
            $('#newtaskpopup #date_reminder').removeAttr('readonly');
            
        }
    });

}

function CloseNewTask()
{
    $('#newtaskpopup').fadeOut();

    window.location = window.location;
}

function NoCreateOtherNewTask()
{
    window.location = window.location;
}

function EditTaskAjaxPopup(taskid) {
    var postData = "table=task&id=" + taskid;

    if ($('#task-' + taskid + '- span.tasktype').html().indexOf("phone") > -1)
    {
        // is a phone task, so ask for notes
        
        $.ajax({
            type: "GET",
            url: "/AddEditAjax.aspx",
            data: postData,

            timeout: 50000,
            error: function () { },
            success: function (msg) {
                $('#newtaskpopup').html(msg);
                $('#newtaskpopup').fadeIn();
                $('#newtaskpopup #tdtask').fadeIn();
                $('#newtaskpopup #tdtask span.dropdown').fadeOut();
                $('#newtaskpopup #tdtask span.datedropdown').fadeOut();
                $('#newtaskpopup #tdtask span.time').fadeOut();
                $('#newtaskpopup #tdtask span.checkbox').fadeOut();

                $('#newtaskpopup #details').removeAttr('readonly');

                $('#hhtask').html("Completed Task <a href=\"javascript:CloseNewTask()\" style=\"float:right;color:black; display:block;margin-right:15px;\"><i class=\"fas fa-times-circle\"></i></a>");
                $('#hhtask').attr('style', 'background:#e2e8ef;font-weight:lighter !important;');

                //amend id
                var taskid = $('#newtaskpopup #task_id').val();
                var hrefcode = $('#newtaskpopup .buttons > a').attr('href');
                hrefcode = hrefcode.replace("''", "'" + taskid + "'");
                $('#newtaskpopup .buttons > a').attr('href', hrefcode);
            }
        });
    }
    else
    {
        CompleteTaskPopup(taskid);
        $('#newtaskpopup').fadeOut();
        $('#newtaskquestion').fadeIn();
        //SaveUpdateItem('task', 'sub2', taskid)
    }






    /*refer to 74, then in applicant profile view, if you click on the flag icon to complete, it is here to have the light box for notes 
    (do not need to go into task detail view) and then once completed, put in add new task button in the same lightbox and then move to comm 
    manager, but all views to remain on applicant profile view. All icons in the comms manager need to be proportionate to each other. The 
    phone icon is bigger than the others, this needs to look neat and tidy.

    SPEND 1 DAY TO IMPLEMENT THE LIGHT BOX

    TEST ON MOBILE DEVICES AND IPAD PRO*/

}

function IsAlmaNegotiator(negId)
{
    if (negId == 68 || negId == 2 || negId == 3 || negId == 88 || negId == 114 || negId == 118)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ViewingPropertiesInfo() {    
    $('#dtviewing div.row form span').each(function () {        
        if ($(this).children('select').attr('id') == "property_id2" || $(this).children('select').attr('id') == "property_id3" ||
            $(this).children('select').attr('id') == "property_id4" || $(this).children('select').attr('id') == "property_id5" ||
            $(this).children('select').attr('id') == "property_id6" || $(this).children('select').attr('id') == "property_id7" ||
            $(this).children('select').attr('id') == "property_id8" || $(this).children('select').attr('id') == "property_id9" ||
            $(this).children('select').attr('id') == "property_id10") {
            $(this).hide();            
        }
        else if ($(this).children('select').attr('id') == "property_id") {
            $(this).append("<a class=\"contactaddlink\" id=\"contactaddlink" + $(this).children('select').attr('id') + "\" href=\"javascript:ViewingPropertyAddMore(\'" + $(this).children('select').attr('id') + "\')\">+</a>"
                + "<input id=\"" + $(this).children('select').attr('id') + "count\" type=\"hidden\" value=\"1\"/>");
        }
    });    
}

function ViewingPropertyAddMore(typeofcontact) {
    if ($('#' + typeofcontact).attr('readonly') != "readonly") {

        var countno = $('#' + typeofcontact + "count").val();

        countno++;

        $('#' + typeofcontact + '' + countno).parent().show();

        if (countno == 10) {
            $('#contactaddlink' + typeofcontact).hide();
            $('#' + typeofcontact).attr('style', 'width:100% !important;');
        }
        else {
            $('#' + typeofcontact + "count").val(countno);
        }
    }
}

function FMClosePopUp()
{
    if ($('#fmselectedtab').val() != '') {
        $('#' + $('#fmselectedtab').val() + ' ul').hide();
        $('#fmselectedtab').val('');
    }    
    $('#fmselected').val('');
    $('#filebrowserpopup').hide();
}

function PreselectViewingEndHour()
{
    var starthour = $('#viewing_hour').val().replace(':', '');

    if (!$.isNumeric(starthour))
    {
        $('#viewing_hour').attr('style', 'border:1px solid red !important;');
        $('#saveall').hide();
        $('#addnewoption a:nth-child(6)').hide();
    }
    else if (starthour.length == 4)
    {
        if (Math.floor(starthour) == starthour && $.isNumeric(starthour))
        {
            var myendhour = parseInt(starthour) + 100;
            if (myendhour.toString().length == 3)
            {
                myendhour = "0" + myendhour;
            }

            $('#viewing_end_hour').val(myendhour);

            $('#saveall').show();
            $('#addnewoption a:nth-child(6)').show();
            $('#viewing_hour').attr('style', '');
            ViewingCleanHours();
        }
        else
        {
            $('#viewing_hour').attr('style', 'border:1px solid red !important;');
            $('#saveall').hide();
            $('#addnewoption a:nth-child(6)').hide();
        }
    }
}

function ShowInternalFiles(folder) {
    var id = 'if' + folder;

    if ($('#fmselectedtab').val() == id) {
        $('#fmselectedtab').val('');
        $('#' + id + ' ul').toggle('blind', { direction: 'vertical' }, 1000);
    }
    else {
        if ($('#fmselectedtab').val() != '') {
            $('#' + $('#fmselectedtab').val() + ' ul').hide();
        }

        $('#fmselectedtab').val(id);
        $('#' + id + ' ul').toggle('blind', { direction: 'vertical' }, 1000);
    }
}

function GetInternalFMFiles(folder)
{
    if ($('#internalfm li').length == 0) {
        
        var postData = 'folder=' + folder + '&applicant_id=' + $('#ctl00_contentPL_hndItemId').val();
        
        $.ajax({
            type: "GET",
            url: "/InternalFileManagerAjax.aspx",
            data: postData,
            timeout: 50000,
            error: function () { alert('Sorry there was a problem'); },
            success: function (msg) {
                $('#internalfm').html(msg);
                $('#fmlinks').hide();
                $('#internalfm').show();
                ShowSendEmailPopup(false);
                $('#filebrowserpopup').show();
            }
        });
    }
    else {
        $('#fmlinks').hide();
        $('#internalfm').show();
        ShowSendEmailPopup(false);
        $('#filebrowserpopup').show();
    }
}

function ShowFileBrowser()
{
    $('#internalfm').hide();
    $('#fmlinks').show();   
    $('#filebrowserpopup').show();
}

function CurrencyFieldCleanUp(tabId)
{
    var totalprice;

    $('#f' + tabId + ' *').filter(':input').each(function () {
        if ($(this).hasClass('currency'))
        {
            //console.log($(this).attr('id'));
            //console.log($(this).val());

            totalprice = $(this).val();
            totalprice = totalprice.replace('£', '');
            totalprice = totalprice.replace(/,/g, '');
            totalprice = parseInt(totalprice);
            $(this).val(totalprice);
        }
    });
}

function CleanApartmentDropdowns()
{
    for (var x = 1; x < 4; x++) {
        var numberid;

        if (x == 1) {
            numberid = "";
        }
        else {
            numberid = x;
        }

        $('#property_id' + numberid + ' option').each(function () {
            if ($(this).html().indexOf("0 Bed") > -1) {
                $(this).html($(this).html().replace("- 0 Bedroom", ""));
            }
        });
    }

}

function SetViewingSubjectLine()
{
    var subjectLine = '', apartment = '';

    //if its Centre Point then default Apartment to 51
    if ($('#development_id').val() == '1') {
        apartment = 'Viewing ';
        apartment += ViewingPropertiesSubject();
    }
    else if ($('#development_id').val() == '2') {
        apartment = 'Marketing Suite';
    }
    else if ($('#development_id').val() == '3') {       
        apartment = 'Viewing ';
        apartment += ViewingPropertiesSubject();
    }

    // set subject line
    if ($('#ctl00_contentPL_hndItemId').val() == '0')
    {
        subjectLine = $('#hndFullDevName').val() + ' | ' + apartment;
    } else {
        var currentValues = $('#subject').val().split('|');

        if (currentValues.length == 1) {
            subjectLine = currentValues[0].trim();
        } else if (currentValues.length > 1) {
            subjectLine = currentValues[0].trim() + ' | ' + currentValues[1].trim();
        }
    }

    if ($('#applicant_id').val() !== null && $('#applicant_id').val() != '') {
        subjectLine += ' | ' + $('#applicant_id > option:selected').text();
    }

    if ($('#leadnegotiator_id').val() !== null && $('#leadnegotiator_id').val() != '') {
        subjectLine += ' | ' + $('#leadnegotiator_id > option:selected').text();
    }

    if ($('#agent_id').val() !== null && $('#agent_id').val() != '') {
        subjectLine += ' | ' + $('#agent_id > option:selected').text();
    }

    $('#subject').val(subjectLine);
}

function ViewingPropertiesSubject()
{
    var countapart = $('#property_idcount').val();
    var aparttext = "";

    for (var x = 1; x <= countapart; x++)
    {
        var xstring = x;
        if (xstring == "1") { xstring = ""; }
        

        var cleanapartment = $('#property_id' + xstring + ' option:selected').text();

        if (cleanapartment != '---')
        {            
            if (aparttext.length > 0) { aparttext += ", "; }

            cleanapartment = cleanapartment.substr(0, cleanapartment.indexOf(" - "));
            cleanapartment = cleanapartment.replace("Standard ", "");
            cleanapartment = cleanapartment.replace("Penthouse ", "");
            cleanapartment = cleanapartment.replace("Duplex ", "");
            cleanapartment = cleanapartment.replace("Vantage ", "");
            cleanapartment = cleanapartment.replace("Apartment ", "");
            cleanapartment = cleanapartment.replace("Town House ", "");

            aparttext += cleanapartment;
        }
    }
    return aparttext;
}

function AgentCheckerAgent()
{
    if ($('#hdnIsAgent').val() == "1")
    {
        // hide alma staff checkbox
        $('#fagent span:nth-child(6)').hide();

        // autoselect company
        $('#agent_company_id')[0].selectedIndex = 1;
    }
}

function ExternalPreselectAgentTask()
{
    if ($('#hdnIsAgent').val() == 1 && $('#ctl00_contentPL_hndItemId').val() == 0)
    {
        $('#taskcustomer_id').val($('#loggedstaffid').val());
    }
}

function ShowPlusInfoFirst()
{
    if ($('#ctl00_contentPL_tabledata div:first-child div.panel-heading').html() == "Applicant")
    {
        // email
        for (var x = 2; x < 6; x++)
        {
            var myemail = $('#email' + x).val();
            //console.log('opt: ' + x + ' sale: -' + myemail + '-');
            if (myemail != undefined && myemail.length > 2)
            {
                $('.spemail' + x).attr('style', 'display:block;');
                $('#emailcount').val(parseInt($('#emailcount').val()) + 1);
            }
        }

        // telephone
        for (var x = 2; x < 6; x++) {
            var myphone = $('#telephone' + x).val();
            //console.log('opt: ' + x + ' sale: -' + myemail + '-');
            if (myphone != undefined && myphone.length > 2) {
                $('.sptelephone' + x).attr('style', 'display:block;');
                $('#telephonecount').val(parseInt($('#telephonecount').val()) + 1);
            }
        }

        // mobile
        for (var x = 2; x < 6; x++) {
            var myemail = $('#mobile' + x).val();
            //console.log('opt: ' + x + ' sale: -' + myemail + '-');
            if (myemail != undefined && myemail.length > 2) {
                $('.spmobile' + x).attr('style', 'display:block;');
                $('#mobilecount').val(parseInt($('#mobilecount').val()) + 1);
            }
        }
    }
    else if ($('#ctl00_contentPL_tabledata div:first-child div.panel-heading').html() == "Agent") 
    {
        // telephone
        for (var x = 2; x < 6; x++) {
            var myphone = $('#telephone' + x).val();
            //console.log('opt: ' + x + ' sale: -' + myemail + '-');
            if (myphone != undefined && myphone.length > 2) {
                $('#telephone' + x).parent().attr('style', 'display:block;');
                $('#telephonecount').val(parseInt($('#telephonecount').val()) + 1);
            }
        }
    }
    else if ($('#ctl00_contentPL_tabledata div:first-child div.panel-heading').html() == "Viewing Information")
    {
        // property
        for (var x = 2; x < 12; x++) {
            var myproperty = $('#property_id' + x).val();
            //console.log('myproperty: ' + myproperty);
            if (myproperty != undefined && myproperty.length > 0) {
                $('#property_id' + x).parent().attr('style', 'display:block;');
                $('#property_idcount').val(parseInt($('#property_idcount').val()) + 1);
            }
        }

        if ($('#ctl00_contentPL_hndItemId').val() == 0) {
            SetViewingSubjectLine();
        }
    }
    
    if ($('#ctl00_contentPL_tabledata div:nth-child(2) div.panel-heading').html() == "Attendees")
    {
        // visitor
        for (var x = 2; x < 12; x++) {
            var visitor = $('#visitor' + x).val();
            //console.log('myproperty: ' + myproperty);
            if (visitor != undefined && visitor.length > 0) {
                $('#visitor' + x).parent().attr('style', 'display:block;');
                $('#visitorcount').val(parseInt($('#visitorcount').val()) + 1);
            }
        }
    }
}

function ViewingCheckApplicantLink()
{
    $('#deletebtn').hide();

    if ($('#ctl00_contentPL_hndItemId').val() > 0) {
        if ($('#outlook_id').val() == '') {
            $('#previewbtn').attr('href', 'javascript:alert("Sorry, this option will become available in 10 minutes")');
            $('#previewbtn').attr('style', 'background-color:#999');

            $('#saveall').attr('href', 'javascript:alert("Sorry, this option will become available in 10 minutes")');
            $('#saveall').attr('style', 'background-color:#999');
        }

        if ($('#applicant_id').val() != 0 && $('#applicant_id').val() != null) {
            $('#viewapplicantbtn').attr('href', '/applicant-profile/' + $('#applicant_id').val());
            $('#viewapplicantbtn').show();
        }

        if ($('#agent_id').val() != 0 && $('#agent_id').val() != null) {
            $('#viewagentbtn').attr('href', '/agent-profile/' + $('#agent_id').val());
            $('#viewagentbtn').show();
        }
        else {
            $('#viewagentbtn').hide();
        }
    }
    else
    {
        var defaultAttendees = '';

        if ($('#hndFullDevName').val() == 'Lyons Place') {
            defaultAttendees = 'LP.Viewings@almacantar.com';
        }
        else if ($('#hndFullDevName').val() == 'Centre Point Residences') {
            defaultAttendees = 'CP.Viewings@almacantar.com,cp.showapartment2@almacantar.com';
        }
        else if ($('#hndFullDevName').val() == 'The Bryanston Hyde Park')
        {
            defaultAttendees = 'TBHP.Viewings@almacantar.com';
        }

        $('#default_attendees').val(defaultAttendees);
    }
}

function AddMarketingCollateralOpen() {
    $('#newmarkcollabigdiv').animate({
        height: "270px",
        marginBottom: "0px",
        borderWidth: "0px"
    }, 500);

    $('#newmcdate').val($.datepicker.formatDate('yy-mm-dd', new Date()));
    $('#newmcdate').datepicker({ showAnim: 'blind', dateFormat: 'yy-mm-dd' });

    //$('#newmcqty').attr('max', ($(this).find(":selected").attr('itemid')));
    $('#newmcqty').attr('value', '1');
    
    $('#newmcgift').on('change', function () {
        $('#newmcqty').attr('max',($(this).find(":selected").attr('itemid')));
    });
}

function SaveMarketingCollateral()
{
    if ($('#newmcgift').val() == '0') {
        alert('Please select an Gift first.');
    }
    else
    {
        var prepostData = "option=check&table=product&";
        if ($('#ctl00_contentPL_tabledata div:first-child div.panel-heading').html() == "Applicant")
        {
            prepostData += "applicant_id=" + $('#applicant_id').val() + "&agent_id=0";
            mcagent = 0;
            mcapplicant = $('#applicant_id').val();
        }
        else
        {
            prepostData += "agent_id=" + $('#agentitemid').val() + "&applicant_id=0";
            mcagent = $('#agentitemid').val();
            mcapplicant = 0;
        }

        //alert("appl: " + mcapplicant + " -- agent: " + mcagent);

        //
        prepostData += "&product_id=" + $('#newmcgift').val() + "&qty=" + $('#newmcqty').val();
        
        $.ajax({
            type: "POST",
            url: "/MarketingCollateralAjax.aspx",
            data: prepostData,
            timeout: 50000,
            error: function () {
                checked = "error";
                //console.log('pre: ' + checked);
                SaveMarkeColleStep2(checked);
            },
            success: function (msg) {
                checked = msg;
                //console.log('pre: ' + checked);
                SaveMarkeColleStep2(checked);
            }
        });
    }
}

function SaveMarkeColleStep2(checked) {
    
    if (checked == "error")
    {
        alert('error');
    }
    else
    {
        var postData2 = "table=product&id=" + $('#newmcgift').val() + "&formdata="
            
        var formData2 = "||stock¬¬" + (checked - $('#newmcqty').val());

        //alert(formData2);

        postData2 += encodeURIComponent(formData2);

        $.ajax({
            type: "POST",
            url: "/AddEditProcess.aspx",
            data: postData2,
            timeout: 50000,
            error: function () {
                $('#outcome_' + tabId).addClass('error');
                $('#outcome_' + tabId).html('Operation Failed');
            },
            success: function (msg) {

                var postData = "table=product_applicant&id=0&formdata=";
                
                var dataclean = $('#newmcdate').val();//"2018-05-05";

                var formData = "||applicant_id¬¬" + mcapplicant + "||product_id¬¬" + $('#newmcgift').val()
                    + "||gift_date¬¬" + $('#newmcdate').val() + " 00:00:00" + "||agent_id¬¬" + mcagent
                    + "||notes¬¬" + $('#newmcnote').val() + "||quantity¬¬" + $('#newmcqty').val();

                postData += encodeURIComponent(formData);

        
                $.ajax({
                    type: "POST",
                    url: "/AddEditProcess.aspx",
                    data: postData,
                    timeout: 50000,
                    error: function () {
                        $('#outcome_' + tabId).addClass('error');
                        $('#outcome_' + tabId).html('Operation Failed');
                    },
                    success: function (msg) {
                        window.location.reload(true);
                        //window.location = "/applicant-profile/" + $('#applicant_id').val() + "#dtbuyerjourneypanel";
                    }
                });
            }
        });

    }
}

function DeleteMarektingCollateral(mcid) {
    DeleteItem("product_applicant", mcid, "");
    setTimeout("window.location.reload();", 100);
}

function OpenMCNotes(divid)
{
    if ($('#mcnoteopen').val() != '0')
    {
        $("#mcnotebigdiv" + $('#mcnoteopen').val()).animate({
            height: "0px"
        }, 500);
        $('#mcbttsid' + $('#mcnoteopen').val() + " a.moreinfo").html("<i class=\"fas fa-chevron-down\"></i>");
        $('#mcbttsid' + $('#mcnoteopen').val() + " a.moreinfo").attr("href", "javascript:OpenMCNotes('" + $('#mcnoteopen').val() + "');");
        $('#mcnoteopen').val('0');
    }

    $("#mcnotebigdiv" + divid).animate({
        height: ($("#mcnotebigdiv" + divid + " > div").height() + 20) + "px"
    }, 500);

    $('#mcbttsid' + divid + " a.moreinfo").html("<i class=\"fas fa-chevron-up\"></i>");
    $('#mcbttsid' + divid + " a.moreinfo").attr("href", "javascript:CloseMCNotes('" + divid + "');");
    
    $('#mcnoteopen').val(divid);
}

function CloseMCNotes(divid)
{
    $("#mcnotebigdiv" + divid).animate({
        height: "0px"
    }, 500);

    $('#mcbttsid' + divid + " a.moreinfo").html("<i class=\"fas fa-chevron-down\"></i>");
    $('#mcbttsid' + divid + " a.moreinfo").attr("href", "javascript:OpenMCNotes('" + divid + "');");
    
    $('#mcnoteopen').val('0');
}

function ViewingAttendeeInfo() {
    $('#dtviewingpeople div.row form span').each(function () {
        if ($(this).children('input').attr('id') == "visitor2" || $(this).children('input').attr('id') == "visitor3" || $(this).children('input').attr('id') == "visitor4"
             || $(this).children('input').attr('id') == "visitor5" || $(this).children('input').attr('id') == "visitor6" || $(this).children('input').attr('id') == "visitor6"
             || $(this).children('input').attr('id') == "visitor7" || $(this).children('input').attr('id') == "visitor8" || $(this).children('input').attr('id') == "visitor9"
             || $(this).children('input').attr('id') == "visitor10"
            ) {
            $(this).hide();
        }
        else if ($(this).children('input').attr('id') == "visitor") {
            $(this).append("<a class=\"contactaddlink\" id=\"contactaddlink" + $(this).children('input').attr('id') + "\" href=\"javascript:ViewingAttendeeAddMore(\'" + $(this).children('input').attr('id') + "\')\">+</a>"
                + "<input id=\"" + $(this).children('input').attr('id') + "count\" type=\"hidden\" value=\"1\"/>");
        }
    });
}

function ViewingAttendeeAddMore(typeofcontact) {
    
    if ($('#' + typeofcontact).attr('readonly') != "readonly") {

        var countno = $('#' + typeofcontact + "count").val();
        
        countno++;

        $('#' + typeofcontact + '' + countno).parent().show();

        if (countno == 10) {
            $('#contactaddlink' + typeofcontact).hide();
            $('#' + typeofcontact).attr('style', 'width:100% !important;');
        }
        else {
            $('#' + typeofcontact + "count").val(countno);
        }
    }
}

function CleanDDForNewTaskFromApplicant()
{
    $('#ftask select#applicant_id option').each(function () {
        $(this).html($(this).html().replace(",",""));
    });

    $('#ftask select#taskcustomer_id option').each(function () {
        $(this).html($(this).html().replace(",", ""));
    });
}

function ApplicantLinkedButton()
{
    if ($('#applicant_id').val() != 0)
    {
        $('#foverview').append("<a id=\"applicantlinkbtt\" class\"btn btn-black ebtn\" href=\"/applicant-profile/" + $('#applicant_id').val() +
            "\" style=\"float:left;color:white;margin-left:2%;margin-top:30px;\">Linked Applicant</a>");
    }
}

function MarketingCollateralPreselDevel()
{
    var ppdevel = $('#development_id').val();

    $('#newmcdevelop').val(ppdevel);

    $('#newmcdevelop').change(function () {
        MarketingCollateralCleanProductList()
    });

    MarketingCollateralCleanProductList();
}

function MarketingCollateralCleanProductList()
{
    var devsel =  "prodev" + $('#newmcdevelop').val();


    $('#newmcgift option').each(function () {
        var thisclass = $(this).attr('class');
        if (thisclass == "prodev0" || thisclass == devsel)
        {
            $(this).attr('style', '');
        }
        else
        {
            $(this).attr('style', 'display:none;');
        }
    });

}

function LoadMoreComm(tableName,itemId)
{
    var postData = "tablen=" + tableName + "&id=" + itemId + "&page=" + $('#commpage').val();

    //alert(postData);

    var oldlink = $('#loadmoracommbtt').attr('href');
    $('#loadmoracommbtt').attr('href', '#');
    $('#loadmoracommbtt').html("<img src=\"/gfx/loading-white.gif\"/>");

    $.ajax({
        type: "POST",
        url: "/GetCommunicationAjax.aspx",
        data: postData,
        timeout: 50000,
        error: function () { $('#outcome').html('CBox Sorry there was a problem'); },
        success: function (msg) {
            $('#mycomms').append(msg);

            var count = (msg.match(/class="commitem/g) || []).length;

            //alert(count);

            if (count < 50)
            {
                $('#loadmoracommbtt').hide();
            }
            else
            {
                $('#loadmoracommbtt').attr('href', oldlink);
                $('#loadmoracommbtt').html("View More");
            }

            var oldpage = parseInt($('#commpage').val());
            $('#commpage').val(oldpage + 1);
        }
    });
}

function PreselectLocationandClean()
{
    var myoptions = $('#viewing_location_id option').length;

    //alert(myoptions + ' --- ' + $('#viewing_location_id').val());

    if (myoptions == 2)
    {
        $('#viewing_location_id').attr('disabled', 'disabled');
        $('#viewing_location_id').attr('style', 'background:#f4f7fa !important');
    }
}

function EditableViewingDetaNote(itemorderid, itemid)
{
    $('#vnotes' + itemorderid).attr("readonly", false);
    $('#viewing-' + itemid + '- div div a.savenote').show();
    $('#viewing-' + itemid + '- div div a.editnote').hide();
}

function OpenNoEditViewingPopUp()
{
    var leadid = $('#leadnegotiator_id').val();
    var agentId = $('#agent_id').val();
    //alert("-" + leadid + "-");

    if (leadid == null || leadid == "")
    {
        leadid = "0";
    }

    if (agentId == null || agentId == "") {
        agentId = "0";
    }

    $('#havetocreatenewviewing a.opencreatev').attr("href", "/new-viewing/" + $('#applicant_id').val() + "/applicant/" + leadid + "/" + agentId);
    $('#havetocreatenewviewing').fadeIn();    
}

function CloseNoEditViewingPopUp() {
    $('#havetocreatenewviewing').fadeOut();
}

function SaveOutlookEmailAjax() {
    
    console.log('SaveOutlookEmailAjax');

    body = '<p style=\"font-family:Arial,sans-serif;font-size:11px;">' + _ckEditor.getData() + '</p>';

    var postData = 'subject=' + encodeURIComponent($('#smsmsg').val()) + '&body=' + encodeURIComponent(body)
        + '&applicant_id=' + $('#ctl00_contentPL_hndItemId').val() + '&applicant_email=' + $('#email').val()
        + '&applicant_name=' + encodeURIComponent($('#first_name').val() + ' ' + $('#surname').val())
        + '&customer_id=' + $('#senderDD').val() + '&sender_name=' + $('#senderDD>option:selected').text();

    $.ajax({
        type: "POST",
        url: "/SaveOutlookEmailAjax.aspx",
        data: postData,
        cache: false,
        timeout: 50000,
        error: function (msg) {
            $('#smsoutcome').removeClass('msg').addClass('error');
            $('#smsoutcome').html('Sorry, not able to save email at present');
        },
        success: function (msg) {
            if (msg == 'F') {
                $('#smsoutcome').removeClass('msg').addClass('error');
                $('#smsoutcome').html('Sorry, not able to save email at present');
            }
            else if (msg == "OK") {
                $('#smsoutcome').addClass('msg');
                $('#smsoutcome').html('Email has been sent');
                setTimeout("HidePopUp('popup');", 1500);
            }
        }
    });    
}