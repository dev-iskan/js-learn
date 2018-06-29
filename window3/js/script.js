
function myOpen() {
	window.open('http://yandex.ru');
}



window.onload = function () {
	
	console.log(window.name);
	
	var w1 = null;
	
	var openWindow = document.getElementById('openWindow');
	openWindow.onclick = function () {
		
		
		w1 = window.open(
					'w1.html',
					'w1',
					"width=420,height=220,resizable=no,scrollbars=yes,status=no,left=500,top=300,menubar=no,toolbar=no,location=no"
					
					);
					
					
		console.log(w1.opener);
	}
	
	var closeWindow = document.getElementById('closeWindow');
	closeWindow.onclick = function () {
		
		if(typeof w1 == 'object') {
			w1.close();
			
			console.log(w1.closed);
		}
		
	}
	
	var myVar = 'Hello world!';
	
	function getMyVar() {
		/*alert(myVar);
		myVar = w1.editMyVar();
		alert(myVar);*/
		
		// var fr = document.getElementById('f1');
		// fr.contentWindow.getAlert();

	    //window.frames['f1'].getAlert();
		// window.frames['f1'].getParentFunc();
		
		//w1.focus();
		//w1.print();
		//w1.scrollBy(50,50);
		//w1.scrollTo(50,50);
		
		//w1.moveBy(50,50);
		//w1.moveTo(50,50);
		
		//w1.resizeTo(50,50);
		//w1.resizeBy(-50,-50);
		
		
		// alert(w1.innerHeight + '|' + w1.innerWidth);
		// alert(w1.outerHeight + '|' + w1.outerWidth);
		
		
	}
	
	var f = document.getElementById('function');
	f.onclick = function() {
		getMyVar();
	}
	
	
		
	
	
	
}



