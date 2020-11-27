function CheckRequired(formName, action) {
    var pass = 0, box = 0, theForm = document.forms[formName], tempobj, emailfield;
    var emailField = false;

    for (i = 0; i < theForm.length; i++) {
        tempobj = theForm.elements[i];

        if (tempobj.name.substring(0, 1) == "*") {
            if (tempobj.name.toLowerCase().indexOf("email") != -1 || tempobj.name.toLowerCase().indexOf("e-mail") != -1) {
                emailfield = tempobj;
                emailField = true;
            }
            if (
			(
				(tempobj.type == "text" || tempobj.type == "textarea" || tempobj.type == "password" || tempobj.type == "email")
				&&
			    (tempobj.value == '' || tempobj.name.toLowerCase() == "*" + tempobj.value.toLowerCase() || tempobj.name.toLowerCase() == tempobj.value.toLowerCase())
			)
			||
			(tempobj.type.toString().charAt(0) == "s" && tempobj.selectedIndex == 0)
			) {
                tempobj.style.border = "1px solid red";
                pass = 1;
                break;
            }
            else {
                tempobj.style.border = "1";
            }
        }
    }
    if (pass == 1) {
        return tempobj.name.substring(1).toUpperCase();
    } else {

        if (emailfield == null) {
            if (action != '') {
                theForm.action = action;
                theForm.submit();
            }
            else {
                return '';
            }
        }
        else {
            if (emailCheck(emailfield)) {
                if (action != '') {
                    theForm.action = action;
                    theForm.submit();
                }
                else {
                    return '';
                }
            }
            else {
                return 'valid ' + emailfield.name.substring(1).toUpperCase();
            }
        }
    }
}

function ClearField(field) {
    if (field.value == field.defaultValue) {
        field.value = '';
    }
}

function SetDefaultValue(field) {
    if (field.value == '') {
        field.value = field.defaultValue;
    }
}

function emailCheck(thisControl) {
    var emailStr = thisControl.value;

    if (emailStr != "") {
        var emailPat = /^(.+)@(.+)$/
        var specialChars = "\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
        var validChars = "\[^\\s" + specialChars + "\]"
        var quotedUser = "(\"[^\"]*\")"
        var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
        var atom = validChars + '+'
        var word = "(" + atom + "|" + quotedUser + ")"
        var userPat = new RegExp("^" + word + "(\\." + word + ")*$")
        var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$")
        var matchArray = emailStr.match(emailPat);
        if (matchArray == null) {
            alert("Email address seems incorrect (check @ and .'s)");
            thisControl.focus();
            thisControl.style.border = "1px solid red";
            return false;
        }
        var user = matchArray[1];
        var domain = matchArray[2];

        if (user.match(userPat) == null) {
            alert("The username doesn't seem to be valid.");
            thisControl.focus();
            thisControl.style.border = "1px solid red";
            return false;
        }

        var IPArray = domain.match(ipDomainPat);
        if (IPArray != null) {
            for (var i = 1; i <= 4; i++) {
                if (IPArray[i] > 255) {
                    alert("Destination IP address is invalid.");
                    thisControl.focus();
                    thisControl.style.border = "1px solid red";
                    return false;
                }
            }
            return true
        }

        var domainArray = domain.match(domainPat);
        if (domainArray == null) {
            alert("The domain name doesn't seem to be valid.");
            thisControl.focus();
            thisControl.style.border = "1px solid red";
            return false;
        }

        var atomPat = new RegExp(atom, "g");
        var domArr = domain.match(atomPat);
        var len = domArr.length;
        if (domArr[domArr.length - 1].length < 2) {
            alert("The address must end with at least two-letter domain");
            thisControl.focus();
            thisControl.style.border = "1px solid red";
            return false;
        }

        if (len < 2) {
            alert("This address is missing a hostname.");
            thisControl.focus();
            thisControl.style.border = "1px solid red";
            return false;
        }
        return true;
    } else {
        return false;
    }
}