// Orbital Defense Minesweeper Application. Copyright (C) 2019 Eser Kokturk. All Rights Reserved.

/*
    Settings class changes game setiings (difficulty - field size) and the application volume
*/


export default class Settings{

    // Settings class constructor
    constructor(){
        this.difficulty = 0;                                    // Game difficulty setting
        this.size = 1;                                          // Minefield size setting
        this.volume = 0.3;                                      // Application volume setting
        this.row =  {small:8, normal: 10, large: 12};           // Available row settings depending on the size
        this.column = {small:8, normal: 16, large: 27};         // Available column settings depending on the size
        this.mine = {easy: 0.13, normal: 0.22, hard: 0.30};     // Available mine ratios
        // Set HTML volume indicator percentage
        document.querySelector("#set-volume span").innerHTML = `${Math.round(this.volume*100)}%`;
        this.setSettings();                                     // Add event listener to html
    }

    // Returns mine amount according to the chosen difficulty setting (mine ratio * field size)
    setDifficulty(row,col){
        if(this.difficulty == 0)                                // Easy difficulty
            return Math.floor(this.mine.easy*row*col);
        else if(this.difficulty == 1)                           // Normal difficulty
            return Math.floor(this.mine.normal*row*col);        
        else if(this.difficulty == 2)                           // Hard difficulty   
            return Math.floor(this.mine.hard*row*col);               
    }

    // Returns row and column according to the chosen field size setting
    setSize(){
        if(this.size == 0)                                              // Small size
            return {"row":this.row.small,"col": this.column.small};
        else if(this.size == 1)
            return {"row":this.row.normal,"col": this.column.normal};   // Medium size
        else if(this.size == 2)
            return {"row":this.row.large,"col": this.column.large};     // Large size
    }

    // Adds mouse events to settings menu
    setSettings(){
        document.querySelector('#settings-menu').addEventListener('mouseup', event => {
            let eDiff = event.target.getAttribute("data-dfc");          // If difficulty button is targeted 
            if(eDiff != null)
                this.toggleDifficulty(eDiff);                           // Toggle difficulty buttons
            let eSize = event.target.getAttribute("data-size");         // If size button is targeted 
            if(eSize !=null)    
                this.toggleSize(eSize);                                 // Toggle size buttons
            let eVolume = event.target.getAttribute("data-volume");     // If volume button is targeted 
            if(eVolume != null)
            {
                if(eVolume == "volume-up")                              // Increase volume if button clicked
                    this.volume += 0.1;
                else if(eVolume == "volume-down")                       // Decrease volume if button clicked
                    this.volume -= 0.1;
                // Map volume from 0 to 1
                if(this.volume > 1.0)
                    this.volume = 1.0;
                else if(this.volume < 0.0)
                    this.volume = 0.0;
                // Reset HTML volume indicator percentage
                document.querySelector("#set-volume span").innerHTML = `${Math.round(this.volume*100)}%`;
            }
        });
    }

    // Toggle action for difficulty settings buttons
    toggleDifficulty(diffName){
        let diffSettings = document.querySelectorAll("[data-dfc]");     // Get all difficulty buttons 
        diffSettings.forEach(e =>{
            e.setAttribute("class", "box-secret settings-button");      // Untoggle all difficulty buttons
        });
        // Set clicked button as toggled
        document.querySelector(`[data-dfc='${diffName}']`).setAttribute("class", "box-passive settings-button");
        // Change difficulty variable of settings according to the clicked button
        if(diffName == "easy")
            this.difficulty = 0;
        else if(diffName == "normal")
            this.difficulty = 1;
        else if(diffName == "hard")
            this.difficulty = 2;
    }

    // Toggle action for size settings buttons
    toggleSize(sizeName){
        let sizeSettings = document.querySelectorAll("[data-size]");    // Get all size buttons 
        sizeSettings.forEach(e =>{
            e.setAttribute("class", "box-secret settings-button");      // Untoggle all size buttons
        });
        // Set clicked button as toggled
        document.querySelector(`[data-size='${sizeName}']`).setAttribute("class", "box-passive settings-button");
        // Change size variable of settings according to the clicked button
        if(sizeName == "small")
            this.size = 0;
        else if(sizeName == "medium")
            this.size = 1;
        else if(sizeName == "large")
            this.size = 2;
        // Change game menu size relative to the size of the minefield
        document.querySelector("#game-menu").setAttribute("class", `hide content-default menu-size-${sizeName}`);
    }

}

