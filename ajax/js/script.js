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


    function handler(e){
        e.preventDefault();
        var request = new XMLHttpRequest();
        request.open("POST", 'server.php');
    }

    var button = document.getElementById('myButton');
    addEvent(button, 'click', handler);


}