var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "18px Arial";
ctx.strokeText("This Canvas Dear Aamer", 5, 60);


var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(181, 55, 30, 0, 2 * Math.PI);
ctx.stroke();