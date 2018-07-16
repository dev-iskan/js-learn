window.onload = function(e) {

    var button = document.getElementById('myButton');
    // button.addEventListener('click', handler, false);
    // button.attachEvent('onclick', handler);

    /*button.onclick=function(e){
    	return false;
    }*/

    function handler(e) {

        e = e || window.event;
        // console.log(e.type);
        // console.log(this);
        if (e.preventDefault()) {
            e.preventDefault();
            console.log(e.defaultPrevented);
        } else if (e.returnValue) {
            e.returnValue = false;
        } else {
            return false;
        }
    }

    function addEvent(target, type, handler) {
        if (target.addEventListener) {
            target.addEventListener(type, handler, false);
        } else {
            target.attachEvent('on' + type, function(event) {
                return handler.call(target, e);
            })
        }
    }

    addEvent(button, 'click', handler);

    document.forms.myForm.elements.exampleInputEmail.onkeypress = function(e) {
        if (e.charCode == 100) {
            return false;
        } else {
            return true;
        }
    }


    window.onbeforeonload = function() {
        var message = "Hello World";
        return message;
    }
}