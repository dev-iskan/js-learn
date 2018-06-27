window.onload = function (){
	var openWindow = document.getElementById('openWindow');
	var w1 = null;
	openWindow.onclick = function () {

		w1 = window.open(
				'w1.html',
				'w1', 
				"width=420, height=220, resizable=yes, scrollbars=no, status=no, left=500, top=300, menubar=no,toolbar=no,location=no"
			);
	}


	var closeWindow = document.getElementById('closeWindow');
	closeWindow.onclick = function () {

		//20.00
	}
}