window.onload = function(e) {
     function addEvent(target,type,hendler) {
        if(target.addEventListener) {
            target.addEventListener(type,hendler,false)
        }
        else {
            target.attachEvent("on" + type,function (e) {
                return hendler.call(target,e);
            });
        }
    }

    // var chars = new Array();

    /*function handler (e) {
        e = e || window.event;

        console.log(e);
        // document.getElementById('firstForm').submit();

        // var target = e.target || e.srsElement;

        // console.log(e);
        // return true;
        // var code = e.charCode || e.keyCode;
        // if(code< 32 || e.ctrlKey || e.altKey){  // пропускаем пустые символы и с нажатием ctrl или alt
        //     return;
        // }

        // var char = String.fromCharCode(e.charCode); // записываем в текст
        // var chars = target.getAttribute('data-chars');

        // if(chars.indexOf(char) == -1){
        //     alert('Недопустимый символ - '+char);
        //     e.preventDefault();
        //     return false;
        // }
        // return true;

        // chars.push(String.fromCharCode(e.charCode));
        // console.log(chars);
        // e.preventDefault();
        // return false;
    }*/

/*    function handler2(e){
        e = e || window.event;

        console.log(e); 
    }
    */

    // var input = document.getElementById('elsexampleInputEmail');
    // addEvent(input, 'keypress', handler);
    // addEvent(input, 'keydown', handler);
    // addEvent(input, 'keydown', handler);



    // var button = document.getElementById('myButton');
    // addEvent(button, 'click', handler);

    // var input = document.getElementById('exampleInputEmail');
    // addEvent(input, 'focus', handler);
    // addEvent(input, 'blur', handler2);


    function handler(e){
         e= e|| window.event;
         var target = e.target|| e.srcElement; 

         var id = e.target.getAttribute('value');
            if(id) {
            var div = document.querySelector('.extraFields');
            var divs = div.children;
            for(var i = 0; i < divs.length; i++) {
                
                if(divs[i].lastElementChild.getAttribute('id') == id) {
                    console.log(divs[i]);
                    divs[i].className = 'active';
                }
                else {
                    divs[i].className = 'hidden';
                }

            }   
            parent.className = 'active';
        }
        return false
    }



    var inputs = document.getElementsByTagName('input');
    for(var i = 0; i < inputs.length; i++) {
        var el = inputs[i];
        
        if(el.type == 'radio') {
            addEvent(el,'change',handler);
        }
    }




}