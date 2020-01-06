// Orbital Defense Minesweeper Application. Copyright (C) 2019 Eser Kokturk. All Rights Reserved.

/*
    Score class adds current player scores to scoreboard
*/


export default class Scores{

    // This funtion puts a zero at the start of day, month and minute if they are single digit
    reformatTime(object){
        let holder = ``;
        if(object< 10)                      // If date method is single digit
            holder = `0${object}`;          // Add zero at the start
        else if(object >= 10)               // If date method is not single digit
            holder = `${object}`;           
            return holder;
    }

    // Return current date and time as an ordered string
    currentTime(){
        let date = new Date();      // Date object
        let month = this.reformatTime(date.getMonth() + 1); 
        let day = this.reformatTime(date.getDate());
        let minutes = this.reformatTime(date.getMinutes()); 
        return `${date.getFullYear()}/${month}/${day} ${date.getHours()}:${minutes}`;
    }

    // Add data to the player scores array
    addToScores(array, result, difficulty, size, time){             
        array.push({Date:this.currentTime(),                    // Current date and time as Date
                    Result: result,                             // Result of the game
                    Difficulty: difficulty,                     // Game difficulty
                    Size:size,                                  // Game field size
                    Time:time});                                // Game final time count
    }

    // Return seconds converted into a string format of hours, minutes and seconds (# h # m # s)
    printTimer(t){
        t = Number(t);                                                  // Convert time to a number if it isnt one
        let h = Math.floor(t / 3600);                                   // Get gour count
        let m = Math.floor(t % 3600 / 60);                              // Get minute count
        let s = Math.floor(t % 3600 % 60);                              // Get second count
        let str =``;        
        if(h !=0)                                                       // If the game is more than an hour
            str = `${h} <span class="timer-letters">h</span> `;         // Print hour
        if(m !=0)                                                       // If the game is more than a minute
            str += `${m} <span class="timer-letters">m</span> `;        // Print minute
        str += `${s} <span class="timer-letters">s</span>`;             // Print seconds
        return str;
    }

    // Adds all scores of a player to scoreboards table
    setupScores(player){
        let tbody = document.querySelector("#scoreboard-menu tbody");   // Select table
        tbody.innerHTML = "";                                           
        for(let i=0; i < player.scores.length; i++){                    // Loop through all the scores 
            let size ="";                                               // Convert size integer to a text
            let diff =""                                                // Convert difficulty integer to a text
            if(player.scores[i].Difficulty == 0)                        // If difficulty is Easy
                diff = "Easy"
            else if(player.scores[i].Difficulty == 1)                   // If difficulty is Normal
                diff = "Normal"            
            else if(player.scores[i].Difficulty == 2)                   // If difficulty is Hard
                diff = "Hard"
            if(player.scores[i].Size == 0)                              // If size is Easy
                size = "Small"
            else if(player.scores[i].Size == 1)                         // If size is Medium
                size = "Medium"            
            else if(player.scores[i].Size == 2)                         // If size is Hard
                size = "Large"

            // Add data to html
            tbody.innerHTML += `
                                <tr>    
                                    <td class="box-passive">${player.scores[i].Date}</td>
                                    <td class="box-passive">${player.scores[i].Result}</td>
                                    <td class="box-passive">${diff}</td> 
                                    <td class="box-passive">${size}</td>
                                    <td class="box-passive">${this.printTimer(player.scores[i].Time)}</td>
                                </tr>`;
        }
    }

}