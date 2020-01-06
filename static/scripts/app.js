// Orbital Defense Minesweeper Application. Copyright (C) 2019 Eser Kokturk. All Rights Reserved.

/*
    Minesweeper application.
*/

import Menu from './menu.js';
import Game from './game.js';
import Sound from './sound.js';
import Settings from './settings.js';
import Form from './form.js';
import Scores from './scores.js';

export default class App {

    constructor(){
        document.addEventListener('contextmenu', event => event.preventDefault());  // Disable right click context menu
        this.gameVals = {row:0, column: 0, mine: 0, timer: 0};                      // Initialize main applicaition variables
        this.game;                                                                  // Initialize game object
        this.settings = new Settings();                                             // Settings object
        this.setGameValues();                                                       // Set game values from settings
        this.sound = new Sound(this.settings.volume);                               // Sound object for application
        this.form = new Form(this.sound);                                           // Login form object
        this.menu = new Menu(this.sound);                                           // Menu object to hide/reveal menus for navigation
        this.scores = new Scores();                                                 // Scores object for scoreboard processing
        this.menuOptions();                                                         // Menu event listener
        this.endGameActions();                                                      // Event listener to detect game is over
        this.playerLogged();                                                        // Event listener for actions after when player logs in
        this.replayGame();                                                          // Replay button mouse events to generate new game
    }

    // This method adds an event listener to application for main menu options
    menuOptions(){
        // Check for mouse event on the 
        document.querySelector('#container').addEventListener('mouseup', event => {
            if(this.form.currentPlayer != null){                                    // Check if player is logged in
                let opt = event.target.getAttribute("data-option");                 // Get data attribute from menu options
                if(opt == "option-play"){                                           // Check for play option
                    this.menu.goGameMenu();                                         // Go to game menu
                    this.sound.switchMusic();                                       // Switch menu music to game music
                    this.game = new Game(this.gameVals, this.sound);                // Instantiate a new game with current app parameteers
                }
                else if(opt == "option-back"){                                      // Check for back to main menu option
                    if(!this.menu.gameMenu.classList.contains('hide')){             // If you are currently in the game menu
                        clearInterval(this.game.interval)                           // Clear timer for that game instance
                        this.sound.switchMusic();                                   // Switch back to menu music
                    }
                    if(!this.menu.settingsMenu.classList.contains('hide')){         // If you are currently in the game menu
                        this.sound.effects.robotAccepted.play();                    // Play sound to confirm new settings are applied
                        this.setGameValues();                                       // Set new values to the application
                    }          
                    this.sound.changeVolumeAll(this.settings.volume);               // Change app volume
                    this.menu.goBack();                                             // Go to main menu
                }
                else if(opt == "option-settings")                                   // Check for settings menu option
                    this.menu.goSettingsMenu();                                     // Go to settings menu
                else if(opt == "option-instructions")                               // Check for instructions menu option
                    this.menu.goInstructionsMenu();                                 // Go to instructions menu
                else if(opt == "option-scoreboard"){                                // Check for scoreboard menu option
                    this.scores.setupScores(this.form.currentPlayer);               // Get scores of current player and add them to scoreboard
                    this.menu.goScoreboardMenu();                                   // Go to scoreboard menu
                }
                else if(opt == "option-logout"){                                    // Check for logout option
                    this.sound.go(this.sound.music.ambient);                        // Play ambient music
                    this.sound.stop(this.sound.music.menu);                         // Stop menu music
                    this.menu.toggleRegisterMenu();                                 // Toggle register/login form
                    this.form.playerLogout();                                       // Log current player out
                }
            }
        });
    }

    // This method adds an event listener to game menu and listens for mouse inputs when the game instance is over
    // It stops the game music and records final result of the game to current player scores
    endGameActions(){
        let gameMenu = document.querySelector("#game-menu");
        gameMenu.addEventListener("mouseup", event =>{                                                                      // Add event listener to game menu
            if(this.game.sendResults == true){                                                                              // Check if game is ready to send results    
                this.game.sound.music.game.pause();                                                                         // Stop game music
                if(document.querySelector("#game-info-image").getAttribute("src") == "./static/images/victory-icon.png"){   // If the game is won
                    this.game.sound.music.gameWon.play();                                                                   // Play victory music
                    this.scores.addToScores(this.form.currentPlayer.scores,"Win",                                           // Add score to the player
                                            this.settings.difficulty, this.settings.size, this.game.timer);
                    setTimeout(() => {                                                                                      // Start ambient music with a delay
                        if(!gameMenu.classList.contains("hide") && !this.game.gameOn)
                            this.sound.go(this.sound.music.ambient);                                                        // If you are still on the game menu
                    }, 19000);                                                                                              // Play ambient sound
                }
                if(document.querySelector("#game-info-image").getAttribute("src") == "./static/images/defeat-icon.png"){    // If the game is lost
                    this.scores.addToScores(this.form.currentPlayer.scores,"Lose",                                          // Add score to the player
                                            this.settings.difficulty, this.settings.size, this.game.timer);
                        setTimeout(() => {                                                                                  // Start ambient music with a delay
                            if(!gameMenu.classList.contains("hide") && !this.game.gameOn)                                   // If you are still on the game menu
                                this.sound.go(this.sound.music.ambient);
                        }, 4500);                                                                                           // Play ambient sound
                }
            }
            this.game.sendResults = false;                                                                                  // Stop getting results from the game
        });
    }

    // This method adds an event listener to the game replay button so that it starts a new instance of the game when clicked
    replayGame(){
        document.querySelector("#game-info-image").addEventListener('mouseup', event =>{                                    // Add event listener to replay button
            clearInterval(this.game.interval)                                                                               // Stop timer for the previous instance
            this.sound.go(this.sound.effects.play);                                                                         // Play new game sound effect
            this.game = new Game(this.gameVals, this.sound);                                                                // Create a new game instance
            this.sound.playOneMusic(this.sound.music.game);                                                                 // Play game music
        });
    }

    // This method sets application game values gathered from the settings object
    setGameValues(){
        this.gameVals.row = this.settings.setSize().row;                                                // Get row value
        this.gameVals.column = this.settings.setSize().col;                                             // Get column value
        this.gameVals.mine = this.settings.setDifficulty(this.gameVals.row, this.gameVals.column);      // Get mine count
    }

    // This method adds an event listener to user login/register form to start playing menu music
    playerLogged(){
        let modal = document.querySelector("#player-modal");                                            // Select login/register form
        modal.addEventListener("mouseup",event=>{                                                       // Add an event listener
            if(this.form.currentPlayer!= null)                                                          // Check if player is successfully logged in
                document.querySelector("#logged-user").innerHTML = this.form.currentPlayer.username;    // Change username in the menu
            setTimeout(() => {                                                                          // Play menu music after a certain delay
                if(modal.classList.contains("hide")){                                                   // Check if form is closed
                    if(this.form.currentPlayer!= null)                                                  // Check if login is successful
                    {
                        this.sound.stop(this.sound.music.ambient);                                      // Play ambient music
                        this.sound.go(this.sound.music.menu);                                           // Play menu music
                    }   
                }
            }, 800);
        });
    }
}
