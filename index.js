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

    constructor(elem) {
        this.theBox = elem;
    }

    start() {
        this.theBox.style.height = this.boxHeight + 'px';
        this.theBox.style.width = this.boxWidth + 'px';

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
    
        let sidesHit = 0;
    
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
    
        this.iterations++;
    
        if(this.iterations % 100 == 0) {
            this.SaveBoxData();
        }
    
        this.theBox.style.top = this.topPos + 'px';
        this.theBox.style.left =this. leftPos + 'px';
        setTimeout(this.MoveBox(), 1);
    }
    
    CornerHitsCounter() {
        this.cornerHits++;
    
        document.querySelector('#cornersCounter').innerHTML = "Corner hits: " + cornerHits;
    }
    
    timesBlinked = 0;
    
    CornerHit() {
        this.timesBlinked++;
    
        if (this.timesBlinked % 2 == 1) {
            theBox.style.backgroundColor = "red";
        }
        else {
            theBox.style.backgroundColor = "green";
        }
    
        if (this.timesBlinked < 12) {
            setTimeout(CornerHit, 250);
        }
        else {
            this.timesBlinked = 0;
        }
    }
    
    TeleportCornerHit() {
        this.reverseX = false;
        this.reverseY = false;
    
        this.leftPos = this.width - 400 - this.boxWidth;
        this.topPos = this.height - 400 - this.boxHeight;
    }
    
    SaveBoxData() {
        // localStorage.setItem('topPos', topPos);
        // localStorage.setItem('leftPos', leftPos);
    
        this.setCookie('topPos', this.topPos, 365);
        this.setCookie('leftPos', this.leftPos, 365);
        this.setCookie('reverseX', this.BoolToString(this.reverseX), 365);
        this.setCookie('reverseY', this.BoolToString(this.reverseY), 365);
    }
    
    LoadBoxData() {
        // topPos = localStorage.getItem('topPos');
        // leftPos = localStorage.getItem('leftPos');
    
        this.topPos = parseInt(this.getCookie('topPos')) || 0;
        this.leftPos = parseInt(this.getCookie('topPos')) || 0;
        this.reverseX = StringToBool(this.getCookie('reverseX'));
        this.reverseY = StringToBool(this.getCookie('reverseY'));
    
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
    
    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
}

const DVDInstance = new DVDLoader(document.querySelector("#box"));

function StartBoxLoop() {
    DVDInstance.start();
}   

