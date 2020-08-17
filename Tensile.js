

//CHART
//var lineDiv = document.getElementById('chartarea');
//var traceA = {
    //x:[1,2,3,4,16,17],
    //y:[1,40,9,60,4,20],
    //type: 'scatter'
//};

//var data = [traceA];

//var layout = {
    //title: 'Force-Extension curve'
//};

//Plotly.plot(lineDiv,data,layout)

const MaxTimeAllow = 50;
var maxY = 10, minY = 0, maxT = 10;
creatEmptyChart();  //make empty chart right from the begining

//
// The statements in the setup() function 
// execute once when the program begins

var isRunning = false; //flag to check running or not
var isCompleted = true;
let img;

function setup() {
    // createCanvas and assign the drawing to div id='canvasWrapper'
    img = loadImage('Tensile.png');
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
    image(img,0,200)
    Plotly.extendTraces('chartarea', {x: [[t]], y: [[y1 - 1]]}, [0]);
    
}

var layout = {//declare chart appearance here
    title: 'Force-elongation curve',
    xaxis: {
        title: 'Elongation [mm]',
        showgrid: true,
        zeroline: true
    },
    yaxis: {
        title: 'Force [N]',
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
            //plot on plotly from the excel sheet for the blue sample 
            pid2init(liftpid, zeta, omega, c, dt, totalTime, kp, 0.0000001, 0.0000001);
        }
        if (document.getElementById("Pink").checked === true)
        {
            //plot on plotly from the excel sheet for the pink sample
            pid2init(liftpid, zeta, omega, c, dt, totalTime, 0.0000001, ki, 0.0000001);
        }
        if (document.getElementById("Green").checked === true)
        {
             //plot on plotly from the excel sheet for the green sample
            pid2init(liftpid, zeta, omega, c, dt, totalTime, 0.0000001, 0.0000001, kd);
        }
        if (document.getElementById("Red").checked === true)
        {
            //plot on plotly from the excel sheet for the red sample
            pid2init(liftpid, zeta, omega, c, dt, totalTime, kp, 0.0000001, kd);
        }
        if (document.getElementById("Black").checked === true)
        {
            //plot on plotly from the excel sheet for the black sample
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

function creatEmptyChart()
{
    data = []; // clear all chart data before start
    var point = {
        x: [],
        y: [],
        type: 'scatter',
        name: 'Force-extension curve'
    };
    data[0] = point;

    var layout = {
        xaxis: {range: [0, 14]}, //let x auto update instead of fixing the axis because some cases takes longer time while some takes only a while
        yaxis: {range: [0, 4500]}
    };
    Plotly.newPlot('chartarea', data, layout);

}

function disableSetting() {
    document.getElementById("Blue").disabled = true;
    document.getElementById("Pink").disabled = true;
    document.getElementById("Green").disabled = true;
    document.getElementById("Red").disabled = true;
    document.getElementById("Black").disabled = true;
    document.getElementById("runbutton").disabled = true;
    document.getElementById("stopbutton").disabled = false;
    //  console.log("disableSetting");
}
function enablesetting() {
    document.getElementById("Blue").disabled = false;
    document.getElementById("Pink").disabled = false;
    document.getElementById("Green").disabled = false;
    document.getElementById("Red").disabled = false;
    document.getElementById("Black").disabled = false;
    document.getElementById("runbutton").disabled = false;
    document.getElementById("stopbutton").disabled = true;
    //  console.log("enablesetting");
}