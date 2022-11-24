class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.playBtn = document.querySelector('.play')
        this.selects = document.querySelectorAll('select')
        this.muteBtns = document.querySelectorAll('.mute')
        this.currentKick = './sounds/kick-clacic.wav'
        this.currentSnare = './sounds/snare-acostic01.wav'
        this.currentHihat = './sounds/hihat-acostic01.wav'
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
    }

    activePad() {
        this.classList.toggle('active')
    }

    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        this.index++;
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.2s alternate ease-in-out 2`
            
            // check if the pad is active
            if (bar.classList.contains('active')) {
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0
                    this.hihatAudio.play();
                }
            }
        })
    }

    start() {
        const interval = (60 / this.bpm) * 1000;
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat()
            }, interval)
        } else {
            clearInterval(this.isPlaying)
            this.isPlaying = null
        }
    }

    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerText = 'stop'
        }
        else {
            this.playBtn.innerText = 'play'
        }
    }

    changeSound(event) {
        console.log(event)
        console.log(event.target.value)
        console.log(event.target.name)

        const selectionName = event.target.name;
        const selectionValue = event.target.value;

        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;

            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
    muteThem(event) {
        const muteIndex = event.target.getAttribute("data-track")
        event.target.classList.toggle('active')
        if (event.target.classList.contains('active')){
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 0
                    break;
                case '1':
                    this.snareAudio.volume = 0
                    break;
                case '2':
                    this.hihatAudio.volume = 0
                    break;
            }
        }else{
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 1
                    break;
                case '1':
                    this.snareAudio.volume = 1
                    break;
                case '2':
                    this.hihatAudio.volume = 1
                    break;
                }}
    }

}

const drumKit = new DrumKit();

// Event Listeners


drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function () {
        this.style.animation = "";
    })
})

drumKit.playBtn.addEventListener('click', () => {
    drumKit.updateBtn()
    drumKit.start()
})

drumKit.selects.forEach(select => {
    select.addEventListener('change', (event) => {
        drumKit.changeSound(event);
    })
})
drumKit.muteBtns.forEach(muteBtn => {
    muteBtn.addEventListener('click', (event) => {
        drumKit.muteThem(event);
    })
})