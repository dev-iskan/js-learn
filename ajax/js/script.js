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
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setRequestHeader('MyHead', 'someString');
        request.send("name=BEN&age=18");
        
        request.onreadystatechange = function (){
            if(request.readyState == 4 && request.status == 200){
                document.getElementById('three').innerHTML = request.responseText;
            }
        }
    }



    var button = document.getElementById('myButton');
    addEvent(button, 'click', handler);


}