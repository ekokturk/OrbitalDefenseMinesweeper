// Orbital Defense Minesweeper Application. Copyright (C) 2019 Eser Kokturk. All Rights Reserved.

/*
    Creates a new minefield
*/

export default class Minefield{

    // Class constructor
    constructor(row, column, mine, sound){
        this.rowCount = row;                                        // Row size
        this.columnCount = column;                                  // Column size
        this.mineCount = mine;                                      // Mine Count
        this.items = [];                                            // Minefield box values
        this.sound = sound;                                         // Sound object for minefield
        this.createField(100);                                      // Create HTML field
    }

    // Create HTML Field with boxes depending on the row and column count
    createField(delay=0){
        let fieldID = document.getElementById("field");                             // Select the element where the mine field will be created
        document.getElementById("field").innerHTML = "";                            // Clear Field seciton content 
        for(let c = 0; c < this.columnCount; c++){                                  // Each column member count
            fieldID.innerHTML += `<ul id='c${c}'></ul>`;                            // Create a list item as a column
            let ulElement = document.getElementById(`c${c}`);                       // Select that list item
            for(let r = 0; r < this.rowCount; r++){                                 // Each row member
                // Add a clickable list item with default parameters for each row 
                ulElement.innerHTML += `<li><div data-row="${r}" data-col="${c}" 
                                        id="r${r}-c${c}" class="box box-secret"> </div></li>`;
            }
        }
    }

    // Initializes minefield as a zero matrix, puts mines into random location as value -1
    // Calculates values of other boxes according to the mines located near them and returns the matrix
    setValues(){
        let items = this.initializeField();                         // Create zero matrix
        items = this.randomizeMines(items);                         // Create random mines
        items = this.setBoxValue(items);                            // Set values for the boxes
        return items;
    }

    // Initialize a matrix of zeros according to row and column parameters
    initializeField(){
        let items = [];
        for(let i = 0 ; i  < this.rowCount; i ++) {
            items[i] = new Array(this.columnCount).fill(0);                     // Create an array of zeros inside of the items array to convert it to 2D
        }
        return items;
    }

    // Randomly generate mines in the matrix (Mines have a value of -1)
    randomizeMines(items){
        for(let b = 0; b < this.mineCount; b++){                                 // Do this for the amount of mines that are initialized
            let randomRow = Math.floor(Math.random() * this.rowCount);           // Get a random row as integer between 0 and row count
            let randomColumn = Math.floor(Math.random() * this.columnCount);     // Get a random column as integer between 0 and column count
            while(items[randomRow][randomColumn] == -1){                         // Check if a bomb is already placed in the spot
                randomRow = Math.floor(Math.random() * this.rowCount);           // Randomize again until it finds an empty spot
                randomColumn = Math.floor(Math.random() * this.columnCount);
            }
            items[randomRow][randomColumn] = -1;                                 // Set the value of the randomized box as -1 (mine)
        }
        return items;
    }

    // This function checks all perimeters of each box in the field and increments its value according the surrounding bombs
    setBoxValue(items){
        for(let r = 0; r < this.rowCount; r++){                                                          // Each row member
            for(let c = 0; c < this.columnCount; c++){                                                   // Each column member
                for(let ri = -1 ; ri < 2; ri++){                                                         // Perimeter rows of the item (1 unit distance)
                    for(let ci = -1 ; ci < 2; ci++){                                                     // Perimeter columns of the item (1 unit distance)
                        if( r+ri > -1 && r+ri < this.rowCount && c+ci > -1 && c+ci < this.columnCount){  // Check if matrix is out of boundries
                            if(!(ri == 0 && ci == 0) && items[r+ri][c+ci] ==-1 && items[r][c] !=-1)      // Check if the perimeter item is not itself 
                                items[r][c]++;                                                           // Increment its value if there is a bomb in the perimeter
                        }
                    }
                }
            }
        }
        return items;
    }

    // Show all hidden mines in the field and set all boxes to passive
    showMines(items, delay=0,gameOn=true, winCondition=false){
        if(gameOn){
            let resetGame = document.querySelector("#game-info-image");                   // Get reset game button
            resetGame.style.border = "solid rgba(44, 44, 139, 0.400) 4px";                // Change border to show button is not clickable
            resetGame.classList.add("no-events");                                         // Disable interaction during mines are opening
            setTimeout(() => {
                resetGame.classList.remove("no-events");                                  // Enable it after a certain delay
                resetGame.style.border = "solid rgb(44, 44, 139) 4px";                    // Change borders back
                if(!winCondition)                                                         // If game is lost
                    this.sound.go(this.sound.effects.gameLost);                           // Play game lost sound effect
            }, delay*this.rowCount);

            for(let r = 0; r < this.rowCount; r++){                                       // Each row member
                setTimeout(() => {                                                        // Add a delay for each row reveal
                    for(let c = 0; c < this.columnCount; c++){                            // Each column member
                        let item = document.getElementById(`r${r}-c${c}`);                // Select element from html
                        if(items[r][c] == -1){
                            if(item.classList.contains("box-flagged")){                   // Check if box is flagged
                                item.setAttribute("class", "box box-mine-flagged");       // Set mines to deactivated/flagged
                                this.sound.go(this.sound.box.flagOpen);                   // Play deactivated mine sound
                            }
                            else{
                                if(winCondition){                                         // If game is won 
                                    item.setAttribute("class", "box box-mine-flagged");   // Set mines to deactivated/flagged
                                    this.sound.go(this.sound.box.flagOpen);               // Play deactivated mine sound
                                }
                                else if(!winCondition){
                                    item.setAttribute("class", "box box-mine");           // Set mines to active
                                    this.sound.go(this.sound.box.explosion);              // Play explosion sound
                                }
                            }
                        }
                        else
                            item.setAttribute("class", "box box-passive");                // Set box to opened
                    }
                }, r*delay);
            }
        }

    }

}








