
//var newVar = 50;
//jQuery(function($) {

	/*var el = document.getElementById('stuck_container');
	
	if($.contains(document.body, el)) {
		$(el).css({'border':'1px solid red'});
	}*/
	
	//data()
	/*var ul = $('.sf-menu');
	
	var value = {
		one : 10,
		two : 20
	}
	
	//$.data(ul,'data','Hello world');
	$.data(ul,'data',value);
	
	console.log($.data(ul,'data').two);*/
	
	
	//each 
	/*
	var arr = ['one','two','three'];
	
	var result = $.each(arr, function (index, value) {
		
		console.log(index + ' - ' + value);
		
	});
	
	console.log(result);*/
	
	/*
	var object1 = {
		one : 10,
		two : 20,
		three : {
			val1:'Hello',
			val2: 'world',
			val3:'!'
		}
	}
	
	var object2 = {
		one : 100,
		four : 'string',
		three : {
			val1:'Ben',
			val2: 'Bob'
			
		}
	}
	
	var result = $.extend(true,object1, object2 );
	
	console.log(JSON.stringify(result));
	
	*/
	
	//var newVar = '50';
	/*console.log(newVar);
	$.globalEval("newVar = 'Hello world'; alert(newVar); ");
	console.log(newVar);*/
	
	
	/*
	//var arr = [1,2,3,4,5,6,7,8,9,10];
	var arr = $('p');
	
	function func(el,ind) {
		if(el == 4 || ind == 2) {
			return false;
		}
		else {
			return true;
		}
	}
	
	var result = $.grep(arr,func);
	
	
	console.log(result);*/
	
	//var arr = [1, "Bob", "Sid"];
	//console.log($.inArray('Bob',arr));
	
	//console.log($.isArray(arr));
	//console.log($.isEmptyObject({}));
	
	
	/*function func(el,ind) {
		if(el == 4 || ind == 2) {
			return false;
		}
		else {
			return true;
		}
	}
	
	console.log($.isFunction(arr));*/
	
	
	//console.log($.isNumeric({}));
	//console.log($.isPlainObject('hello'));  // new Object()
	//console.log($.isWindow(document));  // new Object()
	
	
	
	/*var obj = $('.sf-menu li');
	var arr = $.makeArray(obj);
	arr.reverse();
	$(arr).appendTo($('.sf-menu'));*/
	
	
	/*var obj = $('.sf-menu li');
	var arr = $.map(obj, function (el, index) {
		
		if($(el).hasClass('current')) {
			return el;
		}
		
	});
	console.log(arr);*/
	
	/*var arr1=[1,2,3];
	var arr2=[4,5,6];
	
	
	$.merge(arr1, arr2);
	
	console.log(arr1);*/
	
	
	/*var obj1 = $('p');
	var obj2 = $('li');
	
	$.merge(obj1,obj2).css({'border':'3px solid red'});*/
	
	
	//$('a').click($.noop());
	
	//var obj = $.parseJSON('{"name":"John"}');
	
	/*var str = '<li><a href="#">Hello world!</a></li>'
	var html = $.parseHTML(str);
	
	$('.sf-menu').append(html);
	
	alert(html);*/
	/*
	var obj1 = {
		name : 'User',
		test : function (event) {
			console.log('Объект 1 - ' + this.name);
			$('.message').off('click',this.test);
		}
	}
	
	var obj2 = {
		name : 'Ben',
		test : function (event) {
			console.log('Объект 2 - ' + this.name);
		}
	}
	*/
	//$('.message').on('click',$.proxy(obj1,'test'));/*.
	//on('click',$.proxy(obj2.test,obj2)).
	//on('click',$.proxy(obj2.test,obj1))
	
	
	//;*/
	
	//$.proxy()
	
	
	
	
	///console.log($.trim('       Hello World     '));
	
	//console.log($.now()); // new Date().getTime() 
	
	/*$.data(document.getElementById('contact-form'), 'var', 100);
	
	$.removeData(document.getElementById('contact-form'),'var');
	
	alert($.data(document.getElementById('contact-form'),'var'));*/
	
	
	//alert($.type({}));
	
	
	
	
	
	
	
	
	
	
	
	
 
//});



jQuery(function($) {
	
	$('#btn').click(function(e) {
		
		e.preventDefault();
		
		var myCall = $.Callbacks('stopOnFalse');
		
		$('#ajax').html('<span>Отправка!</span>').fadeIn(1000,function() {
			
			
			//var result = 'name='+ $('input[name=name]').val() +'email=' +$('input[name=email]').val() +'subject='+ $('input[name=subject]').val() +'text='+$('textarea[name=text]').val();
			
			var result = $('#contact-form').serializeArray();
			
			
			$.ajax({
				
				url : 'server.php',
				type : 'POST',
				data : result,
				dataType : 'json',
				context : document.getElementById('ajax'),
				success : function (data, status, jqXHR) {
					
					if(data.action) {
						myCall.add(fAction);
					}
					
					$(this).find('span').fadeOut(300,function() {
						
						$(this).text('Добавлено!').fadeIn(300);
						
					});
					
					if($('#check').prop('checked')) {
						myCall.add(fAlert);
					}
					
					$(this).delay(1000).fadeOut(1000,function() {
						
						$('.grid_5').append('<h3>' + data.name + '</h3>' + '<p>' + data.text + '</p>');
						
					});
					
					var quest = window.confirm('Активировать?');
					if(quest) {
						myCall.add(fQuest);
					}
					
					
					//myCall.empty();
					myCall.remove(fAction);
					
					myCall.fire(10);
					//myCall.add(fAlert);
					
					//myCall.fire('hello');
					
				},
				
				error : function() {
					
				}
				
			});
			
			
			
			
		});
		
	});
	
	
	function fAction(val1) {
		alert('Функция 1 - ' + val1);
		return false;
	}
	
	function fAlert(val1) {
		alert('Функция 2 - ' + val1);
	}
	
	function fQuest(val1) {
		alert('Функция 3 - ' + val1);
	}
	
	
});






