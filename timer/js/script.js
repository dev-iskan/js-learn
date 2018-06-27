window.onload = function() {
	
	var wrap = document.getElementById('popup_overlay');
	
	var closeB = document.getElementById('popup_close');
	closeB.onclick=popupClose;

	var popIn = document.getElementById('popupIn');
	popIn.onclick=popup;

	var tIn, tOut;

	function popup() {
		wrap.style.display= "block";
		popupIn(1);
	}

	function popupClose(){
		popupOut(0);
	}


	function popupIn(x){
		var opacity = (wrap.style.opacity) ? parseFloat(wrap.style.opacity) : 0;

		if(opacity<x){
			clearInterval(tOut);
  			opacity +=0.05;
  			wrap.style.opacity = opacity;

  			tIn = setTimeout(function(){
  				popupIn(x);
  			}, 10)
		}
	}   // --функция которая рекурсивно будет вызываться для плавного появления, где х это конечное opacity 

	function popupOut(x){
		var opacity = (wrap.style.opacity) ? parseFloat(wrap.style.opacity) : 1;

		if(opacity>x){
			clearInterval(tIn);
  			opacity -=0.05;
  			wrap.style.opacity = opacity;

  			tOut = setTimeout(function(){
  				popupOut(x);
  			}, 10)
		}

		if(wrap.style.opacity == x){
			wrap.style.display = "none";
		}
	}   // --функция которая рекурсивно будет вызываться для плавного исчезания, где х это конечное opacity 

	var h1 = document.getElementById('header');
	
	h1.onclick = function () {
		clearTimeout(intStop);
	}
	
	function changeColor() {
		
		///color
		if(h1.style.color == 'black') {
			h1.style.color = 'white';
		}
		else {
			h1.style.color = 'black';
		}
	}
	
	var intStop = setInterval(changeColor, 500);

}