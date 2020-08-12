//var c = 20;
var fewpointless = 50;
var y = 0; // your y start from zero and move up to setpoint c*kH as you write in the equation in draw function
//var tauH = 1;
//var t = 0;
//var dt = 0.1;
//var totalTime = 200;
var w = window.innerWidth;
var h = window.innerHeight;
var canvas_width = w * 0.2;//scale canvas width,heigth to 10% of window size
var canvas_height = h * 0.7;

const MaxTimeAllow = 50;
var maxY = 10, minY = 0, maxT = 10;
creatEmptyChart();  //make empty chart right from the begining

//
// The statements in the setup() function 
// execute once when the program begins

var isRunning = false; //flag to check running or not
var isCompleted = true;
let img;

function preload() {
    img = loadImage('Tensile.png');
}
function setup() {
    // createCanvas and assign the drawing to div id='canvasWrapper'
    var canvas = createCanvas(canvas_width, canvas_height); // use variable here so that every thing can be scale as needed without rewriting this code again 
    canvas.parent('canvasWrapper');
    enablesetting();
}
// The statements in draw() are executed until the 
// program is stopped. Each statement is executed in 
// sequence and after the last line is read, the first 
// line is executed again.
//var y0 = 0, y1 = 0, dydt = 0, olddydt = 0; // this variable needs to be global
function draw() {
    image(img,0,0)
    Plotly.extendTraces('chartarea', {x: [[t]], y: [[y1 - 1]]}, [0]);
}

var layout = {//declare chart appearance here
    title: 'Stress-strain curve',
    xaxis: {
        title: 'Elongation',
        showgrid: true,
        zeroline: true
    },
    yaxis: {
        title: 'Force',
        showline: true,
        zeroline: true
    }
};
function doRun() {

    if ((isRunning === false) || (isCompleted === true)) {
        t = 0;// reset the time get ready for next run
        var dt = 0.1;
        var totalTime = MaxTimeAllow;

        liftxy = [];
        if (document.getElementById("Blue").checked === true)
        {
            pid2init(liftpid, zeta, omega, c, dt, totalTime, kp, 0.0000001, 0.0000001);
        }
        if (document.getElementById("Pink").checked === true)
        {
            pid2init(liftpid, zeta, omega, c, dt, totalTime, 0.0000001, ki, 0.0000001);
        }
        if (document.getElementById("Green").checked === true)
        {
            pid2init(liftpid, zeta, omega, c, dt, totalTime, 0.0000001, 0.0000001, kd);
        }
        if (document.getElementById("Red").checked === true)
        {
            pid2init(liftpid, zeta, omega, c, dt, totalTime, kp, 0.0000001, kd);
        }
        if (document.getElementById("Black").checked === true)
        {
            pid2init(liftpid, zeta, omega, c, dt, totalTime, kp, ki, 0);
        }
        isRunning = true;
        isCompleted = false;
        disableSetting();
        t = 0;
        creatEmptyChart();
        document.getElementById("NeckingUpdate").innerHTML = "Running";
    } else {
        window.alert("Still running. Click Stop to stop");
    }
}

function doStop() {
    isRunning = false;
    enablesetting();
    document.getElementById("NeckingUpdate").innerHTML = "Stop";
}
//r2c function convert real coordinate to canvas coordinate can be use for x,and y. but not necessary for x
//input r=real cordinate, macr=maximum real coordinate,cs=canvas size
//function r2c(r, maxr, cs, inverted) {
    //procedure 1. normalise real coordinate by dividing it with maximum realcoordinate need to display
    //2. multiplier it with the canvas size. this will make sure the coordinate will map from 0..1 to 0..canvas sise
    //3. invert it by substracting with canvas size. this is because canvas coordinate are inverted
    //var cc;
    //if (inverted === true)
        //cc = cs - (r / maxr) * cs;
    //else
        //cc = (r / maxr) * cs;
    //return cc;
//}

function creatEmptyChart()
{
    data = []; // clear all chart data before start
    var point = {
        x: [],
        y: [],
        mode: 'lines',
        type: 'scatter',
        name: 'Stress-Strain'
    };
    data[0] = point;

    var layout = {
        xaxis: {range: [0, maxT]}, //let x auto update instead of fixing the axis because some cases takes longer time while some takes only a while
        yaxis: {range: [0, maxY]}
    };
    Plotly.react('chartarea', data, layout);

}

function disableSetting() {
    document.getElementById("plotKp").disabled = true;
    document.getElementById("plotKi").disabled = true;
    document.getElementById("plotKd").disabled = true;
    document.getElementById("plotKpKi").disabled = true;
    document.getElementById("plotKpKd").disabled = true;
    document.getElementById("plotKpKiKd").disabled = true;
    document.getElementById("zetaSlider").disabled = true;
    document.getElementById("omegaSlider").disabled = true;
    document.getElementById("cSlider").disabled = true;
    document.getElementById("KpSlider").disabled = true;
    document.getElementById("KiSlider").disabled = true;
    document.getElementById("KdSlider").disabled = true;
    document.getElementById("KiSlider").disabled = true;
    document.getElementById("runbutton").disabled = true;
    document.getElementById("stopbutton").disabled = false;
    //  console.log("disableSetting");
}
function enablesetting() {
    document.getElementById("plotKp").disabled = false;
    document.getElementById("plotKi").disabled = false;
    document.getElementById("plotKd").disabled = false;
    document.getElementById("plotKpKi").disabled = false;
    document.getElementById("plotKpKd").disabled = false;
    document.getElementById("plotKpKiKd").disabled = false;
    document.getElementById("zetaSlider").disabled = false;
    document.getElementById("omegaSlider").disabled = false;
    document.getElementById("cSlider").disabled = false;
    document.getElementById("KpSlider").disabled = false;
    document.getElementById("KiSlider").disabled = false;
    document.getElementById("KdSlider").disabled = false;
    document.getElementById("KiSlider").disabled = false;
    document.getElementById("runbutton").disabled = false;
    document.getElementById("stopbutton").disabled = true;
    //  console.log("enablesetting");
}