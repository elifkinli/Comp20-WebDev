$(document).ready(function() {
	var storage = localStorage.getItem('log'); 
	$('#log').append(storage);
	if (localStorage) {
		$('#msg').keypress(function (e) {
			var key = e.which;
			//the enter key code: 13
			if(key == 13) {
				var message = $('input:text').val();
				var today = new Date();
				$('#msg').val('');
				var value = "<div>" + today + " - " + message + "</div>";
				$('#log').prepend(value);
				if (storage == null) {
					storage = value;
				} else {
					storage = storage + value;
				}
				localStorage.setItem('log', storage);
 				return false;  
			}
		}); 
	}
});
