// Orbital Defense Minesweeper Application. Copyright (C) 2019 Eser Kokturk. All Rights Reserved.

/*
    Menu class hides and reveals application menus
*/

export default class Menu{

    constructor(sound){
        this.mainMenu = document.querySelector("#main-menu");                     // Select Menu section through id
        this.gameMenu = document.querySelector("#game-menu");                     // Select game section through id
        this.sideMenu = document.querySelector("#side-menu");                     // Select side menu section through id
        this.settingsMenu = document.querySelector("#settings-menu");             // Select settings menu section through id
        this.instructionsMenu = document.querySelector("#instructions-menu");     // Select instructions menu section through id
        this.scoreboardMenu = document.querySelector("#scoreboard-menu");         // Select scoreboard menu section through id
        this.regLogMenu = document.querySelector("#player-modal");                // Select register/login menu section through id
        this.sound = sound;
    }

    // Hide main menu and reveal game menu with sidebar
    goGameMenu(){
        this.mainMenu.classList.add("hide");                            // Hide main menu 
        this.gameMenu.classList.remove("hide");                         // Reveal game menu
        this.sideMenu.classList.remove("hide");                         // Reveal side menu
        this.sound.go(this.sound.effects.play);                         // Play menu transition effect
    }
    // Hide all menus and reveal game menu
    goBack(){
        this.mainMenu.classList.remove("hide");                         // Reveal main menu 
        this.gameMenu.classList.add("hide");                            // Hide game menu 
        this.sideMenu.classList.add("hide");                            // Hide side menu 
        this.instructionsMenu.classList.add("hide");                    // Hide instructions menu 
        this.scoreboardMenu.classList.add("hide");                      // Hide scoreboard menu 
        this.settingsMenu.classList.add("hide");                        // Hide settings menu 
        this.sound.go(this.sound.effects.menu);                         // Play menu transition effect
        this.sideMenu.querySelector("h1").innerHTML = "BACK";           // Change side menu text to 'BACK'
    }
    // Hide all menus and reveal settings menu
    goSettingsMenu(){                                                   
        this.mainMenu.classList.add("hide");                            // Hide main menu 
        this.settingsMenu.classList.remove("hide");                     // Reveal settings menu
        this.sideMenu.classList.remove("hide");                         // Reveal side menu
        this.sound.go(this.sound.effects.menu);                         // Play menu transition effect
        this.sideMenu.querySelector("h1").innerHTML = "APPLY";          // Change side menu text to 'APPLY'

    }
    // Hide all menus and reveal instructions menu
    goInstructionsMenu(){
        this.mainMenu.classList.add("hide");                            // Hide main menu 
        this.instructionsMenu.classList.remove("hide");                 // Reveal instructions menu
        this.sideMenu.classList.remove("hide");                         // Reveal side menu
        this.sound.go(this.sound.effects.menu);                         // Play menu transition effect

    }
    // Hide all menus and reveal scoreboard menu
    goScoreboardMenu(){
        this.mainMenu.classList.add("hide");                            // Hide main menu 
        this.scoreboardMenu.classList.remove("hide");                   // Reveal scoreboard menu
        this.sideMenu.classList.remove("hide");                         // Reveal side menu
        this.sound.go(this.sound.effects.menu);                         // Play menu transition effect
    }
    // Toggles on or off login/register menu
    toggleRegisterMenu(){
        if(!this.regLogMenu.classList.contains('hide'))                 // Check if menu is not hidden
            this.regLogMenu.classList.add("hide");                      // Hide login/register menu      
        else if(this.regLogMenu.classList.contains('hide'))             // Check if menu is hidden
            this.regLogMenu.classList.remove("hide");                   // Hide login/register menu  
    }

}
