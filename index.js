document.getElementById("test").innerHTML = "Testtt";

function Runn() {
    document.getElementById("test").innerHTML = "Lorem";
}

var counter = 0;

var longIsRunning = true;

function StartLong() {
    longIsRunning = true;

    LongFunction();
}

function LongFunction() {
    counter++;

    document.getElementById("test").innerHTML = "Lorem" + counter;

    RefreshColor()

    if (longIsRunning) {
        setTimeout(LongFunction, 0);
    }
}

function StopLong() {
    longIsRunning = false;
    RefreshColor()
}

function RefreshColor() {
    if (longIsRunning) {
        document.getElementById("test").style.color = "green";
    }
    else {
        document.getElementById("test").style.color = "red";
    }
}

function MoveBox() {
    MoveBoxLoop();
}


const height = window.innerHeight;
const width = window.innerWidth;
const theBox = document.getElementById("box");


var boxWidth = 200;
var boxHeight = 100;

movementIncrement = 1;

var topPos = 0;
var leftPos = 0;

var reverseX = false;
var reverseY = false;

function StartBoxLoop() {
    theBox.style.height = boxHeight + 'px';
    theBox.style.width = boxWidth + 'px';

    MoveBoxLoop();
}

function MoveBoxLoop() {

    var sidesHit = 0;

    if (!reverseY && topPos + boxHeight < height) {
        topPos += movementIncrement;
    }
    else if (reverseY && topPos > 0) {
        topPos -= movementIncrement;
    }
    else if (!reverseY && topPos + boxHeight >= height) {
        reverseY = true;
        sidesHit++;
        topPos -= movementIncrement;
    }
    else if (reverseY && topPos <= 0) {
        reverseY = false;
        sidesHit++;
        topPos += movementIncrement;
    }

    if (!reverseX && leftPos + boxWidth < width) {
        leftPos += movementIncrement;
    }
    else if (reverseX && leftPos > 0) {
        leftPos -= movementIncrement;
    }
    else if (!reverseX && leftPos + boxWidth >= width) {
        reverseX = true;
        sidesHit++;
        leftPos -= movementIncrement;
    }
    else if (reverseX && leftPos <= 0) {
        reverseX = false;
        sidesHit++;
        leftPos += movementIncrement;
    }

    if (sidesHit >= 2) {
        CornerHit();
    }

    theBox.style.top = topPos + 'px';
    theBox.style.left = leftPos + 'px';
    setTimeout(MoveBox, 1);
}

var timesBlinked = 0;

function CornerHit() {
    timesBlinked++;

    if (timesBlinked % 2 == 1) {
        theBox.style.backgroundColor = "red";
    }
    else {
        theBox.style.backgroundColor = "green";
    }

    if (timesBlinked < 12) {
        setTimeout(CornerHit, 250);
    }
    else {
        timesBlinked = 0;
    }
}

function TeleportCornerHit() {
    reverseX = false;
    reverseY = false;

    leftPos = width - 400 - boxWidth;
    topPos = height - 400 - boxHeight;
}