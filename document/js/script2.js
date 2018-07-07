
window.onload = function() {
	var elId = document.getElementById("stuck_container");



	function getElements () {
		var elem = {};
		
		//arguments
		for(var i = 0; i < arguments.length; i++) {
			var id = arguments[i];
			
			var el =  document.getElementById(id);
			
			if(el == null) {
				continue;
			}
			
			elem[id] = el;
			
		}
		
		
		return elem;
	}
	//console.log(elId);
	
	/*
	var result = getElements("stuck_container","content",'footer');
	
	console.log(result);*/
	
	/*var elname = document.getElementsByName('email');
	
	var elname2 = document.getElementsByName('email')[0].style.border = "1px solid red";
	console.log(elname);*/
	/*
	var divMy = document.getElementById("divId");
	
	var eltag = divMy.getElementsByTagName('p'); 
	
	
	console.log(document.forms);
	
	for(var i = 0; i < document.images.length; i++) {
		document.images[i].style.border = '5px solid red';
	}*/
	
/*	
	var elId = document.getElementsByClassName("test");
	console.log(elId);*/
	
	
	
		

}

