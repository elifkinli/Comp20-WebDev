
function parse() {
		var request = new XMLHttpRequest();
		request.open("GET", "http://messagehub.herokuapp.com/messages.json", true);
		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				data = request.responseText;
				parsedObjects = JSON.parse(data);
				elem = document.getElementById("messages");
				for (count = 0; count < parsedObjects.length; count++) {
					elem.innerHTML += "<p>" +  parsedObjects[count]["content"] + " " + parsedObjects[count]["username"] + "</p>";
				}
			}
		};

		request.send(null);
}