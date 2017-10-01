var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var unit = "C";
var currCelTemp;
var celsiusUni = String.fromCharCode(8451);
var fahrenheitUni = String.fromCharCode(8457);

$(function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = "lat=" + position.coords.latitude;
			lon = "lon=" + position.coords.longitude;
			getWeather(lat, lon);
		});
	}
	$("#temp-button").on("click", changeTemp);
});

function getWeather(lat, lon) {
	$.ajax({
		url: api + lat + "&" + lon,
		success: function(result) {
			$("#location").text(result.name + ", " + result.sys.country);
			currCelTemp =  Math.round(result.main.temp);
			$("#temp").text(currCelTemp + " ");
			$("#temp-unit").text(celsiusUni);
			$("#weather-text").html(result.weather[0].main);
			$("#weather-icon").attr("src", result.weather[0].icon);
			
		}
	});
}

function changeTemp (temp) {
	var currTempUnit = $("#temp-unit").text();
	var newUnit = currTempUnit == celsiusUni ? fahrenheitUni : celsiusUni;
	$("#temp-unit").text(newUnit);
	
	if (newUnit == fahrenheitUni) {
		var fahr = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
		$("#temp").text(fahr + " ");
	} else {
		$("#temp").text(currCelTemp + " ");
	}
}