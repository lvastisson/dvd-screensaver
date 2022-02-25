class DVDLoader {

    height = window.innerHeight;
    width = window.innerWidth;
    boxWidth = 200;
    boxHeight = 100;
    iterations = 0;
    movementIncrement = 1;
    topPos = 0;
    leftPos = 0;
    reverseX = false;
    reverseY = false;
    cornerHits = 0;
    sidesHit = 0;
    timesBlinked = 0;
    theBox = null;

    constructor(elem) {
        this.theBox = elem;
    }

    RandomizeBox() {
        this.topPos = this.getRandomInt(0, this.height - this.boxHeight);
        this.leftPos = this.getRandomInt(0, this.width - this.boxWidth);
        this.reverseX = Math.random() < 0.5;
        this.reverseY = Math.random() < 0.5;
    }

    start() {
        this.theBox.style.height = this.boxHeight + 'px';
        this.theBox.style.width = this.boxWidth + 'px';

        this.LoadBoxData();

        this.SessionStartDate();

        this.MoveBoxLoop();
    }

    RefreshDimensions() {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
    }
    
    MoveBox() {
        this.MoveBoxLoop();
    }
    
    MoveBoxLoop() {
    
        if (!this.reverseY && this.topPos + this.boxHeight < this.height) {
            this.topPos += this.movementIncrement;
        }
        else if (this.reverseY && this.topPos > 0) {
            this.topPos -= this.movementIncrement;
        }
        else if (!this.reverseY && this.topPos + this.boxHeight >= this.height) {
            this.reverseY = true;
            this.sidesHit++;
            this.topPos -= this.movementIncrement;
        }
        else if (this.reverseY && this.topPos <= 0) {
            this.reverseY = false;
            this.sidesHit++;
            this.topPos += this.movementIncrement;
        }
    
        if (!this.reverseX && this.leftPos + this.boxWidth < this.width) {
            this.leftPos += this.movementIncrement;
        }
        else if (this.reverseX && this.leftPos > 0) {
            this.leftPos -= this.movementIncrement;
        }
        else if (!this.reverseX && this.leftPos + this.boxWidth >= this.width) {
            this.reverseX = true;
            this.sidesHit++;
            this.leftPos -= this.movementIncrement;
        }
        else if (this.reverseX && this.leftPos <= 0) {
            this.reverseX = false;
            this.sidesHit++;
            this.leftPos += this.movementIncrement;
        }
    
        if (this.sidesHit >= 2) {
            this.CornerHitsCounter();
            this.CornerHit();
        }

        this.sidesHit = 0;
    
        this.iterations++;
    
        if(this.iterations % 100 == 0) {
            this.SaveBoxData();
        }
    
        this.theBox.style.top = this.topPos + 'px';
        this.theBox.style.left =this. leftPos + 'px';
        setTimeout(this.MoveBoxLoop.bind(this), 1);
    }
    
    CornerHitsCounter() {
        this.cornerHits++;
    
        this.setCookie('cornerHits', this.cornerHits, 365);

        document.querySelector('#cornersCounter').innerHTML = "Corner hits: " + this.cornerHits;
    }
    
    CornerHit() {
        this.timesBlinked++;
    
        if (this.timesBlinked % 2 == 1) {
            this.theBox.style.backgroundColor = "red";
        }
        else {
            this.theBox.style.backgroundColor = "green";
        }
    
        if (this.timesBlinked < 12) {
            setTimeout(this.CornerHit.bind(this), 250);
        }
        else {
            this.timesBlinked = 0;
        }
    }
    
    TeleportCornerHit() {
        this.reverseX = false;
        this.reverseY = false;
    
        this.leftPos = this.width - 200 - this.boxWidth;
        this.topPos = this.height - 200 - this.boxHeight;
    }
    
    SaveBoxData() {
        // localStorage.setItem('topPos', topPos);
        // localStorage.setItem('leftPos', leftPos);
    
        this.setCookie('topPos', this.topPos, 1000);
        this.setCookie('leftPos', this.leftPos, 1000);
        this.setCookie('reverseX', this.reverseX, 1000);
        this.setCookie('reverseY', this.reverseY, 1000);
    }
    
    LoadBoxData() {
        // topPos = localStorage.getItem('topPos');
        // leftPos = localStorage.getItem('leftPos');
        this.cornerHits = parseInt(this.getCookie('cornerHits')) || 0;
        document.querySelector('#cornersCounter').innerHTML = "Corner hits: " + this.cornerHits;
    
        this.topPos = parseInt(this.getCookie('topPos')) || 0;
        this.leftPos = parseInt(this.getCookie('leftPos')) || 0;
        this.reverseX = this.StringToBool(this.getCookie('reverseX'));
        this.reverseY = this.StringToBool(this.getCookie('reverseY'));
    
        console.log(this.topPos);
        console.log(this.reverseX);
    }
    
    BoolToString(theBool) {
        return theBool === 'true' ? true : false;
    }
    
    StringToBool(theBool) {
        if (theBool == "true") {
            return true;
        }
        else {
            return false;
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
      
    
    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires;
    }
    
    getCookie(cname) {
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

    SessionStartDate() {
        if (this.getCookie('lastCacheClear') == '') {
            this.setCookie('lastCacheClear', Date(), 1000);
        }
        else {
            startedDate = this.getCookie('lastCacheClear');
            document.querySelector('#startedDate').innerHTML = 'Started on: ' + startedDate;
        }
    }
}

const DVDInstance = new DVDLoader(document.querySelector("#box"));

function RandomizeBox() {
    DVDInstance.RandomizeBox();
}

function StartBoxLoop() {
    DVDInstance.start();
}   

function LoadBoxData() {
    DVDInstance.LoadBoxData();
}

function SaveBoxData() {
    DVDInstance.SaveBoxData();
}

function TeleportCornerHit() {
    DVDInstance.TeleportCornerHit();
}

function RefreshDimensions() {
    DVDInstance.RefreshDimensions();
}