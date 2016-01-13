// Replace this with your code...

function init() {
	var canvas = document.getElementById("game_canvas");
	var ctx = canvas.getContext("2d");

	var img = new Image();
	var birds = new Image();

	img.src = 'duckhunt-background.gif';
	birds.src = 'duckhunt_various_sheet.png';

	img.onload = function() {
		ctx.drawImage(img, 0, 0, 256, 240, 0, 0, 512, 480);
		ctx.drawImage(birds, 38, 150, 38, 38, 200, 100, 76, 76);
		ctx.drawImage(birds, 210, 150, 38, 38,  380, 40, 76, 76);
	}
}