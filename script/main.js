
var canvas = document.getElementById("canvas");
var content = canvas.getContext("2d");
var radius = canvas.height / 2;
content.translate(radius, radius);

radius = radius * 0.90;
setInterval(myClock, 1000);

// clock callback

function myClock(){
    clockBody(content, radius);
    clockNumbers(content, radius);
    clockTimeSystem(content, radius);
}



// Designing Clock Body

function clockBody(content, radius){
    var bodyColor;
    content.beginPath();
    content.arc(0, 0, radius, 0, 2*Math.PI);
    content.fillStyle = '#F0512F';
    content.fill();

    bodyColor = content.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    bodyColor.addColorStop(0, '#333');
    bodyColor.addColorStop(0.2, 'Red');
    bodyColor.addColorStop(1, '#333');

    content.strokeStyle = bodyColor;
    content.lineWidth = radius*0.1;
    content.stroke();
    content.beginPath();
    content.arc(0, 0, radius * 0.1, 0, 2*Math.PI);
    content.fillStyle = '#333';
    content.fill();
}


// Setup and place clock nymber

function clockNumbers(content, radius){
    var ang;
    var numbers;
    content.font = radius*0.15 + "px arial";
    content.textBaseline="middle";
    content.textAlign="center";


    for(numbers = 1; numbers < 13; numbers++){
        ang = numbers * Math.PI / 6;
        content.rotate(ang);
        content.translate(0, -radius*0.85);
        content.rotate(-ang);
        content.fillText(numbers.toString(), 0, 0);
        content.rotate(ang);
        content.translate(0, radius*0.85);
        content.rotate(-ang);
    }
}



// Set the clock time

function clockTimeSystem(content, radius){
    var CurrentTime = new Date();
    var hour = CurrentTime.getHours();
    var minute = CurrentTime.getMinutes();
    var second = CurrentTime.getSeconds();

    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(6*60*60));
    clockbar(content, hour, radius*0.5, radius*0.07);


    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    clockbar(content, minute, radius*0.8, radius*0.07);

    second = (second*Math.PI/30);
    clockbar(content, second, radius*0.8, radius*0.02);
}

 

// Design clock hands.

function clockbar(content, position, length, width){
    content.beginPath();
    content.lineWidth = width;
    content.lineCap = "round";
    content.moveTo(0,0);
    content.rotate(position);
    content.lineTo(0, -length);
    content.stroke();
    content.rotate(-position);
}