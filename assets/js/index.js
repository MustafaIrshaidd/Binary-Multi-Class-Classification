var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "18px Arial";
ctx.strokeText("This is Canvas Dear Aamer", 5, 60);

ctx.beginPath();
ctx.arc(200, 55, 30, 0, 2 * Math.PI);
ctx.stroke();

ctx.font = "18px Arial";
ctx.strokeText("الف مبروك الفوز للملوخية", 130, 110);


