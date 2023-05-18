var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var dropDown = document.getElementById("dropDown");
var numOfClasses = document.getElementById("numOfClasses");
var learningRate = document.getElementById("learningRate");
var dropdownButton = document.getElementById("dropdownMenuLink");
var iterations = document.getElementById("iterations");
var cmd = document.getElementById("cmd");

var Oldweight1 = 0;
var Oldweight2 = 0;
var Oldthreshold = 0;

// array of colors
var arrOfColors = ["Black", "Red", "Green", "Blue"];
var indexOfDrawing;

// Learning Rate
var learning_Rate = 0.5;

// Number of Classes
var num_Of_Classes = 3;

// Number of Iterations
var num_Of_Iterations = 100;

// Coordinates Schema
var Coordinates = {
  Black: {
    X_Axis: [],
    Y_Axis: [],
  },
  Red: {
    X_Axis: [],
    Y_Axis: [],
  },
  Green: {
    X_Axis: [],
    Y_Axis: [],
  },
  Blue: {
    X_Axis: [],
    Y_Axis: [],
  },
};

// Handle Canvas Width Height
fitToContainer(canvas);
window.addEventListener("resize", function () {
  fitToContainer(canvas);
});

function fitToContainer(canvas) {
  // Make it visually fill the positioned parent
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  // ...then set the internal size to match
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

const drawCircle = (x, y, color) => {
  if (typeof color == "undefined") {
    return;
  }
  const radius = 5;
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.stroke();
  context.fillStyle = color;
  context.fill();

  switch (indexOfDrawing) {
    case 0:
      Coordinates.Black.X_Axis.push(x);
      Coordinates.Black.Y_Axis.push(y);
      break;
    case 1:
      Coordinates.Red.X_Axis.push(x);
      Coordinates.Red.Y_Axis.push(y);
      break;
    case 2:
      Coordinates.Green.X_Axis.push(x);
      Coordinates.Green.Y_Axis.push(y);
      break;
    case 3:
      Coordinates.Blue.X_Axis.push(x);
      Coordinates.Blue.Y_Axis.push(y);
      break;
  }
};

const getCoordination = (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  drawCircle(x, y, arrOfColors[indexOfDrawing]);
  console.log(`this is x : ${x} this is y ${y}`);
};

const numberOfClasses = (event) => {
  numOfClasses.innerHTML = event.target.value;
  num_Of_Classes = event.target.value;

  dropdownButton.innerHTML = "Black";
  dropdownButton.style = `background-color:#000 !important;`;
  indexOfDrawing = 0;

  var data = ``;
  for (var i = 1; i <= event.target.value; i++) {
    data += `<li><a class="dropdown-item" href="#" onclick="handleDropdownSelection('${
      arrOfColors[i - 1]
    }')">${arrOfColors[i - 1]}</a></li>`;
  }
  dropDown.innerHTML = data;
  data = "";
};

const changeLearningRate = (event) => {
  learningRate.innerHTML = event.target.value / 100;
  learning_Rate = event.target.value / 100;
};
const getNumOfIterations = (event) => {
  iterations.innerHTML = event.target.value;
  num_Of_Iterations = event.target.value;
};

function handleDropdownSelection(option) {
  dropdownButton.innerHTML = option;
  dropdownButton.style = `background-color:${option} !important;`;
  indexOfDrawing = arrOfColors.indexOf(option);
}

const Clear = (event) => {
  event.preventDefault();
  window.dispatchEvent(new Event("resize"));
  dropdownButton.innerHTML = "Black";
  dropdownButton.style = `background-color:#000 !important;`;
  indexOfDrawing = 0;
  Coordinates = {
    Black: {
      X_Axis: [],
      Y_Axis: [],
    },
    Red: {
      X_Axis: [],
      Y_Axis: [],
    },
    Green: {
      X_Axis: [],
      Y_Axis: [],
    },
    Blue: {
      X_Axis: [],
      Y_Axis: [],
    },
  };
};

// Binary Training Program

const stepFunc = (x) => {
  return x >= 0 ? 1 : -1;
};

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

const newWeight = (error, input, weight) => {
  // e , x ,
  // var dw = 0
  // var lr = learning_Rate
  // dw = lr * x * e
  // weight = weight + dw
  // return weight
  var learningRate = 0.1; // Adjust the learning rate as needed
  return weight + learningRate * error * input;
};

function newThreshold(error, threshold) {
  var learningRate = 0.1; // Adjust the learning rate as needed
  return threshold - learningRate * error;
}

// const binaryClassClassification = (num_Of_Iterations)=>{
//     var data=``
//     var out
//     var e = 0
//     var weight1 =  Math.random() - 0.5;
//     var weight2 = Math.random() - 0.5;
//     var threshold = Math.random() - 0.5;
//     while(num_Of_Iterations!=0){
//         for(var j=0;j<Coordinates.Black.X_Axis.length;j++){
//             out = ((weight1 * Coordinates.Black.X_Axis[j])) + ((weight2 * Coordinates.Black.Y_Axis[j])) - threshold
//             e = out1 - stepFunc(out)
//             if(e != 0){
//                 weight1 = newWeight(e,Coordinates.Black.X_Axis[j],weight1)
//                 weight2 = newWeight(e,Coordinates.Black.Y_Axis[j],weight2)
//             }
//         }

//         for(var j=0;j<Coordinates.Red.X_Axis.length;j++){
//             out = ((weight1 * Coordinates.Red.X_Axis[j])) + ((weight2 * Coordinates.Red.Y_Axis[j])) - threshold
//             e = out1 - stepFunc(out)
//             if(e != 0){
//                 weight1 = newWeight(e,Coordinates.Red.X_Axis[j],weight1)
//                 weight2 = newWeight(e,Coordinates.Red.Y_Axis[j],weight2)
//             }
//         }

//         num_Of_Iterations-=1

//         data+=`Console
//         <br>
//         w1:${weight1} w2:${weight2} threshold:${threshold}
//         <br>
//          <span class="animate">></span>
//         `
//         cmd.innerHTML=data
//     }
//     plot(weight1,weight2,threshold)
// }

const binaryClassClassification = (num_Of_Iterations) => {
  var data = "";
  var out;
  var e = 0;
  var weight1 = Math.random() - 0.5;
  var weight2 = Math.random() - 0.5;
  var threshold = Math.random() - 0.5;

  while (num_Of_Iterations != 0) {
    for (var j = 0; j < Coordinates.Black.X_Axis.length; j++) {
      out =
        weight1 * Coordinates.Black.X_Axis[j] +
        weight2 * Coordinates.Black.Y_Axis[j] -
        threshold;
      e = sigmoid(out);
      if (e == 0) break;
      weight1 = newWeight(e, Coordinates.Black.X_Axis[j], weight1);
      weight2 = newWeight(e, Coordinates.Black.Y_Axis[j], weight2);
      // threshold = newThreshold(e, threshold);
    }

    for (var j = 0; j < Coordinates.Red.X_Axis.length; j++) {
      out =
        weight1 * Coordinates.Red.X_Axis[j] +
        weight2 * Coordinates.Red.Y_Axis[j] -
        threshold;
      e = sigmoid(out);
      if (e == 0) break;
      weight1 = newWeight(e, Coordinates.Red.X_Axis[j], weight1);
      weight2 = newWeight(e, Coordinates.Red.Y_Axis[j], weight2);
      // threshold = newThreshold(e, threshold);
    }

    num_Of_Iterations -= 1;

    data += `Console<br>e:${e} Iteration:${num_Of_Iterations}<br><span class="animate">&gt;</span>`;
    cmd.innerHTML = data;
  }

  plot(weight1, weight2, threshold, "red");
};

// function drawLine(weight1, weight2, threshold) {
//     var canvasWidth  = canvas.offsetWidth;
//     var canvasHeight = canvas.offsetHeight;

//     // Set the line color
//     context.strokeStyle = 'black';

//     // Set the line width
//     context.lineWidth = 2;

//     // Calculate the coordinates of two points on the line
//     var x1 = 0;
//     var y1 = (threshold - (weight1 * x1)) / weight2;

//     var x2 = canvasWidth;
//     var y2 = (threshold - (weight1 * x2)) / weight2;

//     // Draw the line
//     context.beginPath();
//     context.moveTo(x1, y1);
//     context.lineTo(x2, y2);
//     context.stroke();
//   }

const startTraining = (event) => {
  event.preventDefault();
  plot(Oldweight1, Oldweight2, Oldthreshold, "white");
  if (num_Of_Classes == 2) {
    binaryClassClassification(num_Of_Iterations);
  }
};

function plot(weight1, weight2, threshold, color) {
  Oldweight1 = weight1;
  Oldweight2 = weight2;
  Oldthreshold = threshold;
  var a = weight1;
  var b = weight2 * threshold;

  var x0 = 0.5 * canvas.width;
  var y0 = 0.5 * canvas.height;
  var scale = 1; //40px per 1 unit
  var x;
  var y;
  var dx = 4;
  var xMax = Math.round((canvas.width - x0) / dx);
  var xMin = Math.round(-x0 / dx);
  var axes = {};
  axes.x0 = x0;
  axes.y0 = y0;
  axes.scale = scale;

  drawAxes(axes);

  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = 2;

  for (var i = xMin; i < xMax; i++) {
    x = dx * i;
    y = (-a * x + b) / weight2;

    x /= scale;
    y /= scale;
    if (i == xMin) {
      context.moveTo(x0 + x, y0 - y);
    } else {
      context.lineTo(x0 + x, y0 - y);
    }
  }

  context.stroke();
}

function drawAxes(axes) {
  var x0 = axes.x0;
  var y0 = axes.y0;
  var width = context.canvas.width;
  var height = context.canvas.height;
  var xmin = 0;
  context.beginPath();
  context.strokeStyle = "black";
  context.lineWidth = 5;
  //----Y axis----
  context.moveTo(xmin, y0);
  context.lineTo(width, y0);
  //----X axis-----
  context.moveTo(x0, 0);
  context.lineTo(x0, height);

  //---X arrow---
  context.moveTo(width, height / 2);
  context.lineTo(width - 15, height / 2 + 10);
  context.moveTo(width, height / 2);
  context.lineTo(width - 15, height / 2 - 10);
  //---Y arrow---
  context.moveTo(width / 2, 0);
  context.lineTo(width / 2 - 10, 15);
  context.moveTo(width / 2, 0);
  context.lineTo(width / 2 + 10, 15);

  //X - signs
  for (var i = x0; i < width; i += 50) {
    context.moveTo(i, height / 2 - 7);
    context.lineTo(i, height / 2 + 7);
  }
  for (var i = x0; i > 0; i -= 50) {
    context.moveTo(i, height / 2 - 7);
    context.lineTo(i, height / 2 + 7);
  }

  //Y - signs
  for (var i = y0; i < height; i += 50) {
    context.moveTo(width / 2 - 7, i);
    context.lineTo(width / 2 + 7, i);
  }
  for (var i = y0; i > 0; i -= 50) {
    context.moveTo(width / 2 - 7, i);
    context.lineTo(width / 2 + 7, i);
  }

  context.stroke();
}
