// Initializing variables
var myLat = 0;
var myLng = 0;
var R = 6371;
var map;
var marker;
var message = "Here I am";
var infowindow = new google.maps.InfoWindow();
var me = new google.maps.LatLng(myLat, myLng);
var request = new XMLHttpRequest();
var url = "https://floating-journey-7926.herokuapp.com/sendLocation";
request.open("POST", url, true);

// In case the toRadius function doesn't exist.
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

var myOptions = {
	zoom: 13,
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

function init() {
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	getMyLocation();
}

function getMyLocation() {
	if (navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap() {
	// to map my location
	me = new google.maps.LatLng(myLat, myLng);
	map.panTo(me);
	marker = new google.maps.Marker({
		position: me,
		map: map,
		title: message,
	});
	marker.setMap(map);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});

	// to send my location and get all of the students' location
	var params = "login=GaylaSoulen&lat=" + myLat + "&lng=" + myLng + "&message=Halliganing all day every day";
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
	request.onreadystatechange = function() {
	    if(request.readyState == 4 && request.status == 200) {
	        data = request.responseText;
	        parsedObjects = JSON.parse(data);
	        for ( count = 0; count < parsedObjects.length; count++) {
	        	var Lat = parsedObjects[count]["lat"];
	        	var Lng = parsedObjects[count]["lng"];
	        	var message = parsedObjects[count]["message"];
	        	var login = parsedObjects[count]["login"];

	        	mapStudents(Lat, Lng, message, login);
	        }
	    }
	}

	// to map students
	function mapStudents(lat, lng, message, login) {
		student = new google.maps.LatLng(lat, lng);
	    var distance = findDistance(lat, lng) + " miles from me";
	    var content = "<h1>" + login + "</h1>" + "<p>" + message + "</p>" + "<p>" + distance + "</p>";
	    var image = "marker.png";
	    if (login === "GaylaSoulen") {
	    	var mark = new google.maps.Marker({
	    		position: student, 
	    		title: content, 
	    		icon: image
	    	});
	    } else {
		    var mark = new google.maps.Marker({
		        position: student,
		        title: content
		    });
		}
	    mark.setMap(map);
		mark.addListener('click', function() {
			infowindow.setContent(mark.title);
		    infowindow.open(map, mark);
		});

	}

	// to find the distance 
	function findDistance(lat, lng) {
		var toRad = 0.0174532925
		var φ1 = lat * toRad;
		var φ2 = myLat * toRad;
		var Δφ = (myLat-lat)* toRad;
		var Δλ = (myLng-lng)* toRad;

		var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
		        Math.cos(φ1) * Math.cos(φ2) *
		        Math.sin(Δλ/2) * Math.sin(Δλ/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		var d = R * c;
		d = Math.round(d * 1000) / 1000;
		var in_miles = d * 0.621371192;
		in_miles = Math.round(in_miles * 100) / 100
		return in_miles;
	} 

	request.send(params);
}

