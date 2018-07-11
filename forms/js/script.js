window.onload = function() {		
	
	/*var form = document.getElementById('firstForm')
	console.log(form);	*/

	/*var email = document.getElementById('exampleInputEmail')
	console.log(email);*/


	/*var checkboxes = document.querySelectorAll('#firstForm input[type="checkbox"]'); // выбираем все checkboxы
	console.log(checkboxes);

	for (var i = 0; i < checkboxes.length; i++) {
		console.log(checkboxes[i].type)	
	}*/


	// console.log(document.myForm);

	// console.log(document.forms.firstForm.email);

	// console.log(document.forms.firstForm.elements);

	var form = document.forms.firstForm;
	console.log(form.action);
	console.log(form.target);
	console.log(form.method);

	form.submit();
	form.reset(); 
}


	

	