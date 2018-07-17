window.onload = function(e) {

    function handler(e) {

        e = e || window.event;

        if (this.tagName == 'SPAN') {
            this.style.backgroundColor = "yellow";
            //e.cancelBubble = true;
        } else if (this.tagName == 'P') {
            this.style.backgroundColor = "green";
        } else {
            this.style.backgroundColor = "gray";
        }

    }

    function addEvent(target, type, hendler) {
        if (target.addEventListener) {
            target.addEventListener(type, hendler, false)
        } else {
            target.attachEvent("on" + type, function(e) {
                return hendler.call(target, e);
            });
        }
    }

    //addEvent(button,'click',handler);

     document.getElementById('one').addEventListener('click', function(e){
            this.style.backgroundColor = "grey";    
            alert(this.tagName);
            if(e.target.tagName == 'SPAN'){
                stop;
            }
     }, true);

            document.getElementById('two').addEventListener('click', function(e){
            this.style.backgroundColor = "green";   
            alert(this.tagName);
     }, true);

                document.getElementById('three').addEventListener('click', function(e){
            this.style.backgroundColor = "yellow";  
            alert(this.tagName);
     }, true);



    /*    document.getElementById('firstForm').addEventListener('click', function(e){
            e.target.style.border = "1px solid red";

            console.log(this);
        }, false);*/


   /* document.getElementById('one').addEventListener('click', function(e) {
        this.style.backgroundColor = "grey";
        alert(this.tagName);
    }, false);

    document.getElementById('two').addEventListener('click', function(e) {
        this.style.backgroundColor = "green";
        alert(this.tagName);
                e.stopPropagation();
    }, false);

    document.getElementById('three').addEventListener('click', function(e) {
        this.style.backgroundColor = "yellow";
        alert(this.tagName);
    }, false);

    document.getElementById('two').addEventListener('click', function(e) {
        this.style.backgroundColor = "green";
        alert(this.tagName);
    }, false);
    document.getElementById('two').addEventListener('click', function(e) {
        this.style.backgroundColor = "green";
        alert(this.tagName);
    }, false);*/

}