// Orbital Defense Minesweeper Application. Copyright (C) 2019 Eser Kokturk. All Rights Reserved.

/*
    Minesweeper Game Instance.
*/

import Minefield from './minefield.js';

export default class Game{

    constructor(gameValues, sound){
        this.gameOn = true;                                                         // State of the current game instance
        this.sendResults = false;                                                   // Option to send results to application
        this.row = gameValues.row;                                                  // State of the current game instance
        this.column = gameValues.column;                                            // Field column count
        this.mine = gameValues.mine;                                                // Field row count
        this.flagCount = gameValues.mine;                                           // Game flag count which starts as minecount
        this.timer = gameValues.timer;                                              // Game timer
        this.sound = sound;                                                         // Soung object for sound effects
        this.interval;                                                              // Interval for timer
        this.openBoxCount = 0;                                                      // Currently opened boxes in the field
        this.items = [];                                                            // Array which contains location of the items in boxes
        this.mineField = new Minefield(this.row,this.column,this.mine,this.sound);  // Minefield object
        this.items = this.mineField.initializeField()                               // Initializes minefield
        this.initializeIndicators();                                                // Initialize game indicators
        this.setEvents();                                                           // Set mouse events for clicking on boxes
    }

    // Initializes game indicators located at the top of the game menu
    initializeIndicators(){
        document.querySelector("#game-info-flag").innerHTML = `<h2>TARGETS</h2><h3>${this.flagCount}</h3>`;     // Flag indicator
        document.querySelector("#game-info-icon img").setAttribute("src", "./static/images/ship-icon.png");     // Replay button
        document.querySelector("#game-info-timer").innerHTML = `<h2>TIMER</h2><h3>${this.timer}</h3>`;          // Timer
    }

    // Checks if the win condition is met
    wonGame(){
        if(this.row*this.column - this.openBoxCount == this.mine){                                                  // Check if all boxes are opened
            document.querySelector("#game-info-icon img").setAttribute("src", "./static/images/victory-icon.png") ; // Change game icon indicator to victory
            this.mineField.showMines(this.items,100,this.gameOn,true);                                              // Show all of the mines in the field
            this.gameOn = false;                                                                                    // Stop the game
            this.sendResults = true;                                                                                // Send game results to the application
            clearInterval(this.interval);                                                                           // Clear current game timer interval
        }
    }

    // Checks if the lose condition is met
    lostGame(){
        document.querySelector("#game-info-icon img").setAttribute("src", "./static/images/defeat-icon.png");       // Change game icon indicator to lost
        this.mineField.showMines(this.items,100);                                                                   // Show all of the mines in the field
        this.gameOn = false;                                                                                        // Stop the game
        this.sendResults = true;                                                                                    // Send game results to the application
        clearInterval(this.interval);                                                                               // Clear current game timer interval
    }

    // Add event listener to minefield boxes for click event
    setEvents(){
        var boxes = document.querySelectorAll('.box');                                                              // Select all boxes in the minefield
        boxes.forEach((box) => {box.addEventListener("mouseup", event => {                                          // Add an event listener to each one of them
                let item = event.target;                                                                            // Get event listener target
                if(this.gameOn){                                                                                    // If a game is going on
                    if(event.which == 1){                                                                           // Left click logic
                        if(item.classList.contains('box-secret') || item.classList.contains('box-question')){       // Check if box is unopenned or marked as a question mark
                            this.setFieldCheckMine(item);                                                          
                            this.showContent(item);                                                                // Show box value
                            item.setAttribute("class", "box box-passive");                                          // Turn box class to openned (passive)
                        }
                    }
                    else if(event.which == 3)                                                                       // Right click logic
                        this.checkBoxClass(item);
                    this.wonGame();
                }
            });
        });
    }

    // Swap between non-left click options as classes of box
    checkBoxClass(item){

        if(item.classList.contains('box-secret')){                          // If box is unopenned
            item.setAttribute("class", "box box-flagged");                  // Set it to flagged
            this.sound.go(this.sound.box.flag);                             // Play flagged sound effect
            this.flagCount--;                                               // Decrease flag count
        }
        else if(item.classList.contains('box-flagged')){                    // If the box is flagged
            item.setAttribute("class", "box box-question");                 // Set it to questionmark
            this.sound.box.question.play();                                 // Play questionmark sound
            this.flagCount++;                                               // Increase flag count
        }
        else if(item.classList.contains('box-question')){                   // If box is questionmarked
            this.sound.box.deactivate.play();                               // Play sound effect for passive box
            item.setAttribute("class", "box box-secret");                   // Set it to unopenned
        }
        document.querySelector("#game-info-flag").innerHTML = `<h2>TARGETS</h2><h3>${this.flagCount}</h3>`
    }

    // This method only runs when there are no boxes opened and sets the values for minfield
    // If opened box is a mine (-1), it resets the values until it is a non-mine value
    setFieldCheckMine(box){
        if(this.openBoxCount == 0){                                                     // Check if any boxes are opened
            let timerIndicator = document.querySelector("#game-info-timer");
            this.timer = 1;
            timerIndicator.innerHTML = `<h2>TIMER</h2><h3>${this.timer}</h3>`;          // Timer starts with 1
            this.items = this.mineField.setValues();                                    // Set minefield values
            let row = Number(box.getAttribute("data-row"));                             // Get row of the item
            let column = Number(box.getAttribute("data-col"));                          // Get column of the item
            while(this.items[row][column] == -1){                                       // Check if there is a mine in the location
                this.items = this.mineField.setValues();                                // Reset values if so
            }
            this.interval = setInterval(() => {                                         // Start timer
                this.timer++;                                               
                timerIndicator.innerHTML = `<h2>TIMER</h2><h3>${this.timer}</h3>`;
            }, 1000); 
        }
    }

    // Show content of a certain box and do the required functions after
    // 1-8: Show only that box value, -1: Lose game, 0: Open zero value boxes around and the ones on their perimeter
    showContent(item){
        let r = Number(item.getAttribute("data-row"));             // Get row of the item
        let c = Number(item.getAttribute("data-col"));             // Get column of the item
        if(this.items[r][c] == 0){                                 // If box value is zero
            item.innerHTML =  "";                                  // Show nothing
            this.showNoMineContent(r, c);                         // Open other non-mine boxes around it
            this.sound.go(this.sound.box.laserMultiple);
        }
        else if(this.items[r][c] == -1){                           // If box value is -1 which means it contains a mine                     
            this.lostGame();
        }
        else if(this.items[r][c]>0 && this.items[r][c]<9) {        // If box value is a non-zero value (can be max 8)         
            item.innerHTML =  `${this.items[r][c]}`;               // Set box value
            this.sound.go(this.sound.box.laserSingle);
            this.openBoxCount ++;                                  // Increase opened box counter
        }
    }

    // This continues opening boxes until there are no more empty boxes in the perimeter of the opened group
    showNoMineContent(r, c){
     for(let ri = -1 ; ri < 2; ri++){                                                               // Perimeter rows of the item (1 unit distance)
        for(let ci = -1 ; ci < 2; ci++){                                                            // Perimeter columns of the item (1 unit distance)
            if( r+ri > -1 && r+ri < this.row && c+ci > -1 && c+ci < this.column){                   // Check if matrix is out of boundries
                let perElement = document.querySelector(`#r${r+ri}-c${c+ci}`);                      // Get the element with this id
                if(this.items[r+ri][c+ci] !=-1 && perElement.classList.contains('box-secret')){     // Do this only if the element is not a mine and it is not opened yet
                    this.openBoxCount ++;
                    perElement.setAttribute("class", "box box-passive");                            // Set box to opened
                    if(this.items[r+ri][c+ci] != 0){                                                // If selected item is not a zero
                        perElement.innerHTML =  `${this.items[r+ri][c+ci]}`;                        // Show the value of the item from items matrix
                    }
                    else                                                                            // If selected item is a zero
                        this.showNoMineContent(r+ri, c+ci);                                         // Run this function again
                }  
            }
        }
     }
    }

}