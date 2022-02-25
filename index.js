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

const height = window.innerHeight;
const width = window.innerWidth;
const theBox = document.getElementById("box");


var boxWidth = 200;
var boxHeight = 100;

var iterations = 0;

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

function MoveBox() {
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

    iterations++;

    if(iterations % 100 == 0) {
        SaveBoxData();
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

function SaveBoxData() {
    // localStorage.setItem('topPos', topPos);
    // localStorage.setItem('leftPos', leftPos);

    setCookie('topPos', topPos, 365);
    setCookie('leftPos', leftPos, 365);
    setCookie('reverseX', BoolToString(reverseX), 365);
    setCookie('reverseY', BoolToString(reverseY), 365);
}

function LoadBoxData() {
    // topPos = localStorage.getItem('topPos');
    // leftPos = localStorage.getItem('leftPos');

    topPos = getCookie('topPos');
    leftPos = getCookie('leftPos');
    reverseX = StringToBool(getCookie('reverseX'));
    reverseY = StringToBool(getCookie('reverseY'));

    console.log(topPos);
    console.log(reverseX);
}

function BoolToString(theBool) {
    if (theBool) {
        return "true";
    }
    else {
        return "false";
    }
}

function StringToBool(theBool) {
    if (theBool == "true") {
        return true;
    }
    else {
        return false;
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}