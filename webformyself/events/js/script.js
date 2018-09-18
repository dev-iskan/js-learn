window.onload = function() {		
	
	/*var button = document.querySelector(".btn-default");

	button.onclick = function(){
			document.forms[0].submit();
	}*/

	var button = document.querySelector(".btn-default");
/*	button.addEventListener('click', function(){
		document.forms[0].submit();
	}, false);
*/


	button.addEventListener('click', func, false);

/*	function func(){
		alert('do');
		document.forms[0].submit();
	}

	var query = location.search;

	if(query!=''){
		button.removeEventListener('click', func, false);
	}*/
	/*
	var button = document.querySelector(".btn-default");
	function func () {
		//document.forms[0].submit();
		
		var form = document.forms.myForm;
		var empty = false;
		
		for(var i = 0; i < form.length; i++) {
			
			if(form.elements[i].type == "text" || form.elements[i].type == "password") {
				if(form.elements[i].value == "") {
					form.elements[i].style.borderColor = "red";
					empty = true;
				}
			}	
			
		}
		
		if(empty) {
			alert("Заполните все поля");
		}
		else {
			form.submit();
		}
	}
	
	if(button.addEventListener) {
		button.addEventListener("click",func,false);
	}
	else if(button.attachEvent) {
		button.attachEvent("onclick",func);
	}
	
	*/
	
}


	

	