function IsViewingSlotAvailable(preview)
{
    var viewingId = $('#ctl00_contentPL_hndItemId').val();
    var dateParts = $('#viewing_date').val().split('/');

    postData = 'date=' + dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] +
        '&viewing_hour=' + $('#viewing_hour').val() + '&viewing_id=' + viewingId;

    //console.log(postData);

    $.ajax({
        type: "POST",
        url: "/IsViewingSlotAvailable.aspx",
        data: postData,
        timeout: 50000,
        error: function () { },
        success: function (msg) {
            if (msg == '') // available
            {
                $('#addnewoutcome').html('');
                $('#addnewoutcome').hide();

                AddUpdateViewing(preview);
            }
            else {
                var divToUse = viewingId == '0' ? 'addnewoutcome' : 'outcome_viewing';

                $('#' + divToUse).attr('class', 'label error');
                $('#' + divToUse).html('Sorry this viewing slot is not available.');
                $('#' + divToUse).show();
            }
        }
    });
}

function AddUpdateViewing(preview)
{
    var postData, viewingDate, dateParts, cpApt;

    // for CP, workout what property type is being shown
    if ($('#viewing_location_id > option:selected').text() == 'Centre Point')
    {
        var selectedApt = ',' + $('#property_id > option:selected').text() + "," + $('#property_id2 > option:selected').text() + ',' + $('#property_id3 > option:selected').text() + ',';
        var penthouse = false; apt = false;

        //console.log(selectedApt);

        if (selectedApt.indexOf('Penthouse') != -1)
        {
            penthouse = true;
        }
        if (selectedApt.indexOf('Standard') != -1 || selectedApt.indexOf('Vantage') != -1)
        {
            apt = true;
        }

        if (penthouse && apt)
        {
            cpApt = 'both';
        }
        else if (penthouse)
        {
            cpApt = 'p';
        }
        else if (apt)
        {
            cpApt = 'a';
        }            
    }
    else
    {
        cpApt = '';
    }

    var viewingId = $('#ctl00_contentPL_hndItemId').val(), outcomeMsg;

    var postData = 'applicant_id=' + $('#applicant_id').val() + '&viewing_date=' + $('#viewing_date').val()
        + '&start=' + $('#viewing_hour').val() + '&end=' + $('#viewing_end_hour').val()
        + '&agent_id=' + $('#agent_id').val() + '&lead=' + $('#leadnegotiator_id').val()
        + '&subject=' + encodeURIComponent($('#subject').val()) + '&location=' + $('#viewing_location_id > option:selected').text()
        + '&visitor1=' + $('#visitor').val() + '&visitor2=' + $('#visitor2').val() + '&visitor3=' + $('#visitor3').val()
        + '&preview=' + preview + '&outlook_id=' + $('#outlook_id').val() + '&cancelled=' + $('span.checkbox input').is(':checked')
        + '&visitor4=' + $('#visitor4').val() + '&visitor5=' + $('#visitor5').val() + '&visitor6=' + $('#visitor6').val()
        + '&visitor7=' + $('#visitor7').val() + '&visitor8=' + $('#visitor8').val() + '&visitor9=' + $('#visitor9').val() 
        + '&visitor10=' + $('#visitor10').val() + '&default_attendees=' + $('#default_attendees').val() 
        + '&cp_apt=' + cpApt;

    //console.log(postData);

    if (preview == 0 && $('#vinviteemail').length)
    {
        postData += '&emailbody=' + _ckEditor.getData();
    }

    if (viewingId == '0')
    {
        outcomeMsg = 'Sorry not able to create viewing via Outlook at present.';
    }
    else
    {
        outcomeMsg = 'Sorry not able to edit viewing as it was not created using this account.';
    }
        
    $.ajax({
        type: "POST",
        url: "/AddOutlookViewingAjax.aspx",
        data: postData,
        timeout: 50000,
        error: function () {
            $('#addnewoutcome').attr('class', 'label error');
            $('#addnewoutcome').html(outcomeMsg);
        },
        success: function (msg)
        {
            $('#addnewoutcome').attr('class', 'label error');
            $('#addnewoutcome').html(msg);

            if (msg == ':T') {                    
                $('#addnewoutcome').attr('class', 'label error');
                $('#addnewoutcome').html('Session timed out, please log in again');
            }
            else if(msg == ':F')
            {
                $('#addnewoutcome').attr('class', 'label error');
                $('#addnewoutcome').html(outcomeMsg);
            }
            else if (msg.charAt(0) == ':')
            {
                $('#popupwrapper').hide();
                $('#sendemailpopup').hide();

                if (msg != ':OK')
                {
                    $('#outlook_id').val(msg.substr(1));
                }

                SaveAllNewItem();
            }                
            else
            {
                var emailTemplate = '<form name="inviteform">'
                    + '<textarea id="vinviteemail">' + msg + '</textarea>'
                    + '<div class="buttons"><a class="btn btn-black ebtn" href="javascript:AddOutlookViewing(0)">Save &amp; Send</a></div>';
                + '</form>';

                $('#addnewoutcome').attr('class', 'label msg');
                $('#addnewoutcome').html('');

                $('#addeditsendemail').html(emailTemplate);

                ClassicEditor
                    .create( document.querySelector( '#vinviteemail' ), {
                        toolbar: [ 'bold', 'italic', 'Underline' ]
                    } )
                    .then( editor => {
                        _ckEditor = editor;
                   
            } )
            .catch( error => {
            
            } );

            $('#popupwrapper').show();
            $('#sendemailpopup').show();
        }
    }
    });
}

function ShowSendEmailPopup(setTemplate) 
{
    var template = '';
    
    $('#hndCommId').val('0');
    $('#commtype').val('1');
    $('#commoptions').hide();
    $('#smsform').trigger('reset');
    $('#smsoutcome').removeClass('error');
    $('#smsoutcome').html('');
    $('#emdetails').hide();

    $('#sendsms').addClass('sendembox');
    $('#embtnbar').show();
    $('#senderDD').show();
    $('#emailto').show();       

    $('#smsmsg').val($('#hndFullDevName').val());
    $('#senderDD').val($('#loggedstaffid').val());
    $('#sendemailbtn').addClass('show');
    $('#emailto').val($('#email').val());
    $('#fmselected').val('');
    
    if ($('#senderDD').val() == null)
    {
        $('#senderDD').val('');
    }

    if (setTemplate)
    {
        template = $('#hndemailtemplate').val();
    }

    var mytitle = $('#title_id').children("option:selected").text();
    if (mytitle.indexOf("-") > -1) { mytitle = ""; }

    if (template == '') { template = 'Dear ' + mytitle + ' ' + $('#first_name').val() + ' ' + $('#surname').val() + '<br/>'; }

    // add ck editor
   if (_ckEditor == null)
    {
       ClassicEditor
            .create( document.querySelector( '#bodytext' ), {
                toolbar: ['bold', 'italic', 'Underline', 'numberedList', 'bulletedList', 'insertTable']
            } )
            .then( editor => {
                _ckEditor = editor;
                _ckEditor.setData(template);
       } )
        .catch( error => {
                
        } );
    }    
    else
    {
        _ckEditor.setData(template);
    }

    $('div.ck-editor').show();

    $('#popupwrapper').show();
    $('#popup').removeClass('popuptall');
    $('#popup').addClass('popupsm');
    $('#popup').show();
}


function AddOutlookViewing(preview)
{
    var isOK = false;
    
    if (($('#applicant_id').val() === null || $('#applicant_id').val() == '') && ($('#agent_id').val() === null || $('#agent_id').val() == ''))
    {
        $('#addnewoutcome').attr('class', 'label error');
        $('#addnewoutcome').html('Please select an applicant or an agent');
        $('#addnewoutcome').show();
    }
    else
    {
        isOK = true;
    }

    if (isOK) {
        isOK = $('#fviewing').valid();
    }

    if (isOK)
    {
        if ($('#fsubjectlocation span').length > 0) {
            isOK = $('#fsubjectlocation').valid();
        }
    }

    if (isOK) {
        $('#saveall').off('click');
        $('#addnewoutcome').html('<img src="/gfx/loading-sm.gif" width="22" height="22"/>');
        $('#addnewoutcome').show();

        ViewingCleanHours();

        IsViewingSlotAvailable(preview);        
    }
}