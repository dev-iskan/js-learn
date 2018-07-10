jQuery(function($) {
	
$(".sf-menu li:has('ul')").hover(
  function(){
	  $(".sf-menu li ul").stop().fadeIn(300);} 
  ,
  
  function(){
	  $(".sf-menu li ul").stop().fadeOut(300);} 
  );
  
  
  $(".sf-menu li ul li").mousedown({a:'ku'},function(e) {
		e.preventDefault();
		//alert('Вы  нажали по ссылке с номером - ' + e.data.a + ' - ' + $(this).text());
		
		$('header h2').append('Click');
		
		//$(".sf-menu li ul").fadeOut();
		$(this).parent().fadeOut();
		
	});
	
	
	/*$('body').keypress(function (e) {
		alert(e.which);
	});*/
	
	/*$('input[name=name]').focus(function() {
		$(this).val('Введите текст');
	});
	
	$('input[name=name]').blur(function() {
		alert('Вы закончили редактирование?');
	});*/
	
	
	$('input[name=name]').select(function() {window.getSelection()});
	
	//$('.btn').click(function(e) {
		//e.preventDefault();
		
		$('form').submit(function(e) {
			e.preventDefault();
			alert($('input[name=name]').val());
		});
	//});
	
	/*$('input[name=name]').change(function() {
		
		var email = $('input[name=email]');
		email.val($(this).val());
		
	});*/
	
	$('input[name=name]').keypress(function(e) {
		
		var email = $('input[name=email]');
		alert(e.which);
		email.val($(this).val() + String.charCodeAt(e.which));
		
	});
	
	
  //$('.sf-menu li ul li').click();
  	
});




/*function func() {
	
	//$('#contact-form').append('<p>Some text</p>');
	var form = $('#contact-form fieldset label:first-child');
	//alert(form);
	//$('#contact-form').append('<p>Some text</p>');
	$('#contact-form').append(form);
}*/