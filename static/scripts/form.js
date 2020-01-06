// Orbital Defense Minesweeper Application. Copyright (C) 2019 Eser Kokturk. All Rights Reserved.

/*
    Form class controls users which are logging in and registering to the game
*/


import Player from './player.js';

export default class Form{

    constructor(sound){
        this.currentPlayer = null;                      // Currently logged player
        this.players = [];                              // Players registered to application
        this.sound = sound;                             // Sound object
        this.playerLogin();                             // Login event listener
        this.playerRegister();                          // Register event listener
    }

    // Login method for modal which logs in the user if entered username and password are valid
    playerLogin(){
        let error = document.querySelector("#modal-error");                                 // Get error span from html
        document.querySelector("#login-button").addEventListener('mouseup', event =>{       // Add event listener to login button
            let username = document.querySelector("#login-username").value;                 // Get username from input field
            let password = document.querySelector("#login-password").value;                 // Get password from input field
            let player = new Player(username, password);                                    // Initialize player object
            if(player.checkPlayerExists(this.players)){                                     // Check if username exists in application
                if(player.checkPassword(this.players)){                                     // Check if password of user is correct
                    document.querySelector("#player-modal").classList.add("hide");          // Hide modal
                    this.sound.effects.robotOnline.play();                                  // Play confirmation sound
                    this.clearForms();
                    this.currentPlayer = this.players[this.playerNo(username)];             // Set player as currently logged player
                }
                else{
                    error.innerHTML = "Invalid Password";                                   // Show error if password is invalid
                    this.sound.effects.robotScan.play();                                    // Play Scan For ID sound
                }
            }
            else{
                error.innerHTML = "Invalid Username";                                       // Show error if username is invalid
                    this.sound.effects.robotScan.play();                                    // Play Scan For ID sound
            }
        });
    }

    playerRegister(){
        let error = document.querySelector("#modal-error");                                 // Get error span from html
        // Add event listener to register button
        document.querySelector("#register-button").addEventListener('mouseup', event =>{
            let username = document.querySelector("#register-username").value;              // Get username from input field
            let password = document.querySelector("#register-password").value;              // Get password from input field
            if(this.checkRegisterInputs(username,password)){
                let player = new Player(username, password);                         // Initialize player object
                if(!player.checkPlayerExists(this.players) ){                               // Check if username exists in application
                    if(!player.checkEmail(this.players)){                                   // Check if email of user is correct
                            this.players.push(player);
                            document.querySelector("#player-modal").classList.add("hide");  // Hide modal
                            this.sound.effects.robotOnline.play();                          // Play confirmation sound
                            this.clearForms();
                            this.currentPlayer = player;                                    // Set player as currently logged player
                    }
                }
                else{
                    error.innerHTML = "Usermame Already Exists";                            // Show error if username is invalid
                    this.sound.effects.robotScan.play();
                }
            }
            else
                this.sound.effects.robotScan.play();
        });
    }

    clearForms(){
        document.querySelector("#modal-error").innerHTML = "";          // Clear error message
        document.querySelector("#login-username").value = "";           // Clear username input field
        document.querySelector("#login-password").value = "";           // Clear password input field
        document.querySelector("#register-username").value = "";        // Clear username input field
        document.querySelector("#register-password").value = "";        // Clear password input field
    }

    // Check if user registration is valid if not return false and a error message
    checkRegisterInputs(username, password){
        let error = document.querySelector("#modal-error");                       // Get error span from html
        let check = true;                                                         // Error check
        if(username == ""){                                                       // If username is empty
            error.innerHTML = "Enter Username"
            return check = false;
        }
        else if(username.length < 4){                                             // If username is shorter than 4 characters
            error.innerHTML = "Username Too Short"
            return check = false;
        }
        else if(username.length > 11){                                            // If username is longer than 11 characters
            error.innerHTML = "Username Too Long"
            return check = false;
        }
        if(password == ""){                                                       // Check if password is empty
            error.innerHTML = "Enter Password"
            return check = false;
        }
        else if(password.length < 4){                                             // Check if password is short
            error.innerHTML = "Password Too Short"
            return check = false;
        }
        return check;
    }

    // Returns the number of player with a certain username in players array
    playerNo(username){
        let i = 0;                                              // No of the player
        while(i < this.players.length){
            if(this.players[i].username == username)            // If username is found
                break;                                          // Stop loop
            i++;                                                
        }
        return i;
    }

    // Logs current player out of the application
    playerLogout(){
        this.currentPlayer = null;
    }

}