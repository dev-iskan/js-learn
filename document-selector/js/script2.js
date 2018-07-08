
window.onload = function() {
	
	// p div h1
	// #id .class
	
	 
	// input[name='email']
	
	// .class[name='email']
	
	//#id .class
	//#id, .class
	
	
	//console.log(document.querySelectorAll('p'));
	//console.log(document/*.querySelector('p')*/.querySelector('span'));//Element
	
	// :first-line
	// :first-leter
	
	//:link
	//:visited
	
	
	
	
	document.querySelector('h2').onclick = function () {
		
		var myLi = document.querySelector('.current');
		
		// console.log(myLi.parentNode);

		// console.log(myLi.childNodes);


		//myLi.parentNode.firstChild.style.border = '2px solid red';
		//myLi.parentNode.lastChild.style.border = '2px solid red';
		
		///myLi.nextSibling.previousSibling.style.border = '2px solid red';
		
		//console.log(myLi.nextSibling.nextSibling.firstChild.firstChild.nodeValue = 'hello');
		
		//console.log(myLi.nextSibling.nextSibling.firstChild.nodeName);
		
		console.log(myLi.parentNode.children);
		//myLi.parentNode.firstElementChild.style.border = '2px solid red';
		//myLi.parentNode.lastElementChild.style.border = '2px solid red';
		
		//myLi.nextElementSibling.style.border = '2px solid red';
		//myLi.previousElementSibling.style.border = '2px solid red';
		
		//console.log(myLi.parentNode.children.length);
		console.log(myLi.id = 'hello');
		
		//console.log(document.forms[0].action = 'http://yandex.ru');
		//console.log(document.links[0].href = 'http://yandex.ru');// htmlFor
		console.log(document.querySelector('label.name').style.borderTop="5px solid yellow");// htmlFor   onclick=""
		
		document.images[0].setAttribute('for','100');
		console.log(document.images[0].getAttribute('for'));
		
		if(document.images[0].hasAttribute('for')) {
			document.images[0].removeAttribute('for');
		}
		
		
		
	};
}

