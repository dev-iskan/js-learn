window.onload= function(){

	function urlArgs() {
		var args= {}; //пустой обьект в который будем сохранять
		var query = window.location.search.substring(1);

		var parts = query.split("&");

		for (var i = 0; i < parts.length; i++) {
			var pos = parts[i].indexOf("=");
			if(pos == -1){
				continue;
			}
			var name =parts[i].substring(0, pos);
			var value =parts[i].substring(pos+1);

			args[name] = value;

		}

		return args	;

	}

	console.log(urlArgs());
} 