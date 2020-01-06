// Orbital Defense Minesweeper Application. Copyright (C) 2019 Eser Kokturk. All Rights Reserved.

/*
    Sound class initializes all audio and it has several methods to manipulate them
*/

export default class Sound{

    constructor(volume){
        // Initialize music and sound effects
        this.volume = volume;                                                                   // Volume of the application
        this.box= {
            flag: new Audio('./static/audio/SFX_RightClick_Flagged_EK.wav'),                    // Set box to flag
            question: new Audio('./static/audio/SFX_RightClick_Questionmark_EK.wav'),           // Set box to questionmark
            deactivate: new Audio('./static/audio/SFX_RightClick_Deactivate_EK.wav'),           // Set box to passive
            explosion: new Audio('./static/audio/SFX_Box_Explosion1_EK.wav'),                   // Mine explosion
            flagOpen: new Audio('./static/audio/SFX_Box_FlagOpen_EK.wav'),                      // Deactivated mine sound
            laserSingle: new Audio('./static/audio/SFX_Laser_Single_EK.wav'),                   // Single laser shot
            laserMultiple: new Audio('./static/audio/SFX_Laser_Multiple_EK.wav'),               // Multiple laser shot
        }
        this.music = {
            menu: new Audio('./static/audio/MUS_MenuLoop_Loop_EK_Satiate.wav'),                 // Menu music
            game: new Audio('./static/audio/MUS_GamePlay_Loop_EK_HidingYourReality.wav'),       // Game music
            gameWon: new Audio('./static/audio/MUS_GameWon_EK_TakeAChance.mp3'),                // Victory music
            ambient: new Audio('./static/audio/MUS_GameAmbient_Loop_EK_SpaceStation.wav'),                // Ambient music
        }
        this.effects = {
            menu: new Audio('./static/audio/SFX_MenuEffect_Open_EK.wav'),                       // Menu transition
            play: new Audio('./static/audio/SFX_MenuEffect_Play_EK.wav'),                       // New game
            robotOnline: new Audio('./static/audio/SFX_RobotVoice_SystemOnline_EK.wav'),        // Robot voice: "System Online"
            robotScan: new Audio('./static/audio/SFX_RobotVoice_ScanForID_EK.wav'),             // Robot voice: "Scan for ID"
            robotAccepted: new Audio('./static/audio/SFX_RobotVoice_ProgramAccepted_EK.wav'),   // Robot voice: "Program accepted"
            gameLost: new Audio('./static/audio/SFX_GameLost_Bass_EK.wav'),                     // Game lost
            click: new Audio('./static/audio/SFX_MenuEffect_Button_EK.wav'),                    // Menu item click

        }
        this.changeVolumeAll(this.volume);                         // Set volume of all audios to application volume
        this.buttonClicks();                                       // Set settings buttons click sound
        this.music.game.loop = true;                               // Loop game music
        this.music.menu.loop = true;                               // Loop menu music
        this.music.ambient.loop = true;                            // Loop menu music

        this.box.laserMultiple.playbackRate = 2;                   // Increase speed of multiple laser shot audio so it will play faster

    }
    // Starts playing a certain sound from start
    go(sound){
        sound.currentTime = 0;
        sound.play();
    }
    // Stops playing a sound and resets its time
    stop(sound){
        sound.pause();
        sound.currentTime = 0;
    }
    // Switches between menu music and game music while stoping other music audio
    switchMusic(){
        this.stop(this.music.gameWon);                  // Stop game won music
        this.stop(this.music.ambient);                  // Stop game won music
        if(this.music.game.currentTime != 0){           // If game music is playing
            this.stop(this.music.game);                 // Stop and reset game music
            this.music.menu.play();                     // Play menu music
        }
        else if(this.music.menu.currentTime != 0){      // If menu music is playing
            this.stop(this.music.menu);                 // Stop and reset menu music
            this.music.game.play();                     // Play game music
        }
    }

    // Stops all other music and starts playing only one
    playOneMusic(music){
        Object.values(this.music).forEach(e => {        // For music
            this.stop(e);
        });
        music.play();
    }

    // Changes volume of all audios (0 to 1)
    changeVolumeAll(vol){
        this.volume = vol;
        Object.values(this.effects).forEach(e => {      // For sound effects
            e.volume = this.volume;                     // Change volume of each component
        });
        Object.values(this.box).forEach(e => {          // For game effects
            e.volume = this.volume;                     // Change volume of each component
        });
        Object.values(this.music).forEach(e => {        // For music
            e.volume = this.volume;                     // Change volume of each component
        });
    }

    // Settings menu buttons event listener for click effect
    buttonClicks(){
        document.querySelector("#settings-menu").addEventListener("mouseup", event =>{  // Add event listener to settings menu
            if(event.target.classList.contains('settings-button'))                      // If the event target is button
                this.go(this.effects.click);                                            // Play click sound
        });
    }
    
    initialMusic(){
        return this.music.ambient.play();
    }
}