// Orbital Defense Minesweeper Application. Copyright (C) 2019 Eser Kokturk. All Rights Reserved.

/*
    Player class which records username, password, email and game scores
*/

export default class Player{

    constructor(username="", password="", email=""){
        this.username = username;               // Username 
        this.password = password;               // Password
        this.email = email;                     // Email
        this.scores = [];                       // Array containing all game score of the player
    }

    // To check if player with same username is already registered
    checkPlayerExists(players){
        let exists = false;                             
        players.forEach(p => {                  // Check from all registered players
            if(p.username == this.username){    // If it exists
                exists = true;                  // return true
            }
        });
        return exists;
    }

    // To check if player with same email is already registered
    checkEmail(players){
        let exists = false;
        players.forEach(p => {                  // Check from all registered players
            if(p.email == this.email)           // If it exists
                exists = true;                  // return true
        });
        return exists;
    }

    checkPassword(players){                     
        let exists = false;
        players.forEach(p => {                  // Check from all registered players
            if(p.password == this.password)     // If it exists
                exists = true;                  // return true
        });
        return exists;
    }


}