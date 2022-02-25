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
    gameLoop;
    renderLoop;
    fps;

    constructor(elem) {
        this.theBox = elem;
        this.storage = new Storage();
    }

    RandomizeBox() {
        this.topPos = this.getRandomInt(0, this.height - this.boxHeight);
        this.leftPos = this.getRandomInt(0, this.width - this.boxWidth);
        this.reverseX = Math.random() < 0.5;
        this.reverseY = Math.random() < 0.5;
    }

    initialize() {
        this.fpsText = document.querySelector("#fps");

        this.theBox.style.height = this.boxHeight + 'px';
        this.theBox.style.width = this.boxWidth + 'px';

        this.LoadBoxData();

        this.SessionStartDate();

        this.bindEvents();

        this.start();
    }

    start() {
        this.MoveBoxLoop();   
        this.RenderBoxLoop();     
    }

    bindEvents() {
        document.querySelector('#RandomizeBox').addEventListener('click', (e) => {
            e.preventDefault();
            this.RandomizeBox();
        });

        document.querySelector('#StartBoxLoop').addEventListener('click', (e) => {
            e.preventDefault();
            this.start();
        });

        document.querySelector('#SaveBoxData').addEventListener('click', (e) => {
            e.preventDefault();
            this.SaveBoxData();
        });

        document.querySelector('#LoadBoxData').addEventListener('click', (e) => {
            e.preventDefault();
            this.LoadBoxData();
        });

        document.querySelector('#TeleportCornerHit').addEventListener('click', (e) => {
            e.preventDefault();
            this.TeleportCornerHit();
        });

        window.addEventListener('resize', (e) => {
            this.RefreshDimensions();
        });
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

        clearTimeout(this.gameLoop);
        this.gameLoop = setTimeout(this.MoveBoxLoop.bind(this), 1);
    }

    NewFrame() {
        window.requestAnimationFrame(() => {
            this.RenderBoxLoop();

            if(!this.lastCalledTime) {
                this.lastCalledTime = Date.now();
                fps = 0;
                return;
             }
             let delta = (Date.now() - this.lastCalledTime)/1000;
             this.lastCalledTime = Date.now();
             this.fps = Math.round(1/delta);
        });
    }

    RenderBoxLoop() {
        this.theBox.style.top = this.topPos + 'px';
        this.theBox.style.left =this. leftPos + 'px';
        
        this.fpsText.innerHTML = 'fps: ' + this.fps;

        clearInterval(this.renderLoop);
        this.renderLoop = setTimeout(this.NewFrame.bind(this), 5);
    }
    
    CornerHitsCounter() {
        this.cornerHits++;
    
        this.storage.set('cornerHits', this.cornerHits, 365);

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
    
        this.storage.set('topPos', this.topPos, 1000);
        this.storage.set('leftPos', this.leftPos, 1000);
        this.storage.set('reverseX', this.reverseX, 1000);
        this.storage.set('reverseY', this.reverseY, 1000);
    }
    
    LoadBoxData() {
        // topPos = localStorage.getItem('topPos');
        // leftPos = localStorage.getItem('leftPos');
        this.cornerHits = parseInt(this.storage.get('cornerHits')) || 0;
        document.querySelector('#cornersCounter').innerHTML = "Corner hits: " + this.cornerHits;
    
        this.topPos = parseInt(this.storage.get('topPos')) || 0;
        this.leftPos = parseInt(this.storage.get('leftPos')) || 0;
        this.reverseX = this.StringToBool(this.storage.get('reverseX'));
        this.reverseY = this.StringToBool(this.storage.get('reverseY'));
    
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

    SessionStartDate() {
        if (this.storage.get('lastCacheClear') == '') {
            this.storage.set('lastCacheClear', Date(), 1000);
        }
        else {
            startedDate = this.storage.get('lastCacheClear');
            document.querySelector('#startedDate').innerHTML = 'Started on: ' + startedDate;
        }
    }
}

class Storage {

    constructor(storageType) {
        this.storageType = storageType;
    }
    
    set(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires;
    }
    
    get(cname) {
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
DVDInstance.initialize();