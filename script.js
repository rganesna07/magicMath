//Group Members: Trinity Paulson, Sandra Castillo, Rithika Ganesna
//This is our script file that handles all math and button clicking functionality 

window.addEventListener("DOMContentLoaded", domLoaded);

//global variables 
let generatedNumbers = []; //array to store randomly generated numbers
let win_score = 0; // win counter
let loss_score = 0; // loss counter
let operation = 0; //num of operations counter 


// generates the numbers for the board
function gameStart(button) { 
    const randomNumber = generateRandom(20); 
    generatedNumbers.push(randomNumber);
    button.innerText = randomNumber;
    button.classList.add('random');   
}

// prints goal to webpage
function print_goal () { 
    const para = getGoalParagraphID();
    const num = calculateGoal(generatedNumbers);
    para.innerText = num; //inner text of the goal is the generated number}
}

function returnGoal () { // returns the goal so it can be printed on site
    const para = getGoalParagraphID();// returns the goal so it can be printed on site    
    return para.innerText;
}

//generate a random number
// this will be used for the math board
function generateRandom(max) {
   return Math.floor(Math.random() * max)+1;
}

//this function generates an 
//achievable goal based on the 
// numbers that were randomly generated
function calculateGoal(numArray){

    let result = numArray[0]; // isert first number of the array
    
    const ops = ['+', '-', '*']; // array of operations

    for (let i = 1; i <= 3; i++){ // go through the array

        //randomly do operations for the numbers in the array
        const op = ops[Math.floor(Math.random() * 3)];

        //based on the operation, do the arithmetic
        switch(op){
            case '+':
                result += numArray[i];
                break;
            case '-':
                result -= numArray[i];
                break;
            case '*':
                result *= numArray[i];
                break;
        };
    };

    return result;
 
}


// Initializes the game by disabling math buttons, 
// calling necessary functions, and setting up the new game button.
// tasks: disabling math buttons, invoking functions 
// for game setup, and setting up an event listener
// on the new game button for handling restarts.
function domLoaded(){
    
    const math_buttons = getMathButton();
    
    for(let button of math_buttons){
        button.disabled = true;
    }

    
    math();
    

    print_goal();
    
    //if the new Game button is hit, clear the announcement, 
    // clear the final value, reset operation count4er, and
    // finally, restart the game
    const newGameButton = getNewGameButton();
    newGameButton.addEventListener("click", function () {
        clearAnouncement();
        clearFinalValue();
        operation = 0;
        restart();     
    });

}

//function for when the new game button is clicked:
function restart(){
    generatedNumbers = []; //restart generated numbers array
    const buttons = getGameBoardButton();
    buttons.forEach(button => {

        button.disabled = false;

        button.innerText = "";
        

        gameStart(button);
    });
    print_goal();
    emptyWorkspace();
}

//handles arithmetics 
function math(){
    let eq_array = [];
    let equal = 0;
    operation = 0;
    
    const num_buttons = getGameBoardButton();
    const math_buttons = getMathButton();
    
    
    for ( let button of num_buttons) {
       
        gameStart(button);

        //if button is clicked then:
        button.addEventListener("click", function() {
            
            //add the button to the work space
            eq_array.push(printToWorkAreaNum(button));
            //if the equation was complete, meaning the equation array
            // has 2 nums and 1 operation, incremenet the operation counter
            if(eq_array.length == 3){ // when the array has 3 numbers 
                
                operation++;
        
                //perform the arithmetics based on the operation
                switch(eq_array[1]){
                    case "+":
                        equal=Number(eq_array[0])+Number(eq_array[2]); // does the calculation
                        eq_array = []; // empties array
                        
                        break;
                    case "-":
                        equal=eq_array[0]-eq_array[2];
                        eq_array = [];

                        break;
                    case "*":
                        equal=eq_array[0]*eq_array[2];
                        eq_array = [];
                    
                        break;
                };
                
                printEqualToWorkArea(equal); //finally, print the result to the work space
                button.innerText = equal; //update the button's text with the result

                //if the operation counter is at 3,
                //finish the operations and print the fina value
                // and disable all buttoms
                if(operation === 3) {
                    printFinalValue(equal);
                    for( let button of num_buttons){
                        button.disabled = true;
                    }
                }

            }else{
                //empty buttons text to empty string
                button.innerText = "";
                
                //enable operations
                for(let button of math_buttons){
                    button.disabled = false;
                }
                printOpInstructions(); //print the operation instruciton
                //disable numbers
                for( let button of num_buttons){
                    button.disabled = true;
                }
            }
        });
    }   

    for (let button of math_buttons) {
        button.addEventListener("click", function () { 
            eq_array.push(printToWorkAreaMath(button));
            
            //disable math buttons
            for( let button of math_buttons){
                button.disabled = true;
            }
            printNumInstructions();
            //enable number buttons
            for( let button of num_buttons){
                button.disabled = false;
                //disable empty text buttons
                if(button.innerText=== "") {
                    button.disabled = true;
                    console.log("button disabled");
                }
            }
        });
    }
    
}

//print the final value
function printFinalValue(equal){
    const add_value = getVauleSpan();
    add_value.append(equal);
    updateScore();
}

//clear the final value (when new game gets pressed)
function clearFinalValue() {
    const finalValue = getVauleSpan();
    finalValue.innerText = ""; // Clear the content of the workspace
}

//print the winning message
function printWon(){
    const won = getAnouncementSpan();
    won.innerHTML = "You Won!!"; //added to announcement area
}

//print Num instruction
function printNumInstructions(){
    const won = getAnouncementSpan();
    won.innerHTML = "Select a number"; //added to announcement area
}

//Print operations Instruciton
function printOpInstructions(){
    const won = getAnouncementSpan();
    won.innerHTML = "Select an operation"; //added to announcement area
}

//print the lost message
function printLoss(){
    const loss = getAnouncementSpan();
    loss.innerHTML = "You Lost :("; //added to announcement area
}

//clear announcement (when new game gets pressed)
function clearAnouncement() {
    const clear = getAnouncementSpan();
    clear.innerText = "Let's Play!"; // Clear the content of the workspace
}

//getter for final value 
function getFinalValue() {
    const total =  getVauleSpan();
    return total.innerText
}

//appends operation button to work space
function printToWorkAreaMath(button) {
    const work_area = getWorkArea();
    const text = button.innerText;
    const add = document.createTextNode(button.innerText); 
    work_area.appendChild(add); //add the text node with the button's text
    
    return text;
}

//appends number button to work space
function printToWorkAreaNum(button) {
    const work_area = getWorkArea();
    const text = button.innerText;
    const add = document.createTextNode(button.innerText);
    work_area.appendChild(add);  //add the text node with the button's text

    return text;

}

//append  the equal sign and the new result
function printEqualToWorkArea(equal){
    const work_area = getWorkArea();
    work_area.append(" = ");
    work_area.append(equal);
    const new_para = document.createElement("p");
    work_area.append(new_para);
}

// Clear the content of the workspace
function emptyWorkspace() {
    const workArea = getWorkArea();
    workArea.innerText = ""; //empty string
}

// This fucntion when called is in charge decididng weatherthe total value
// the user got matches the goal value. Frome there it changes the necessary text 
//indicating our score
function updateScore() {
    
    let total = getFinalValue()
    let goal = returnGoal();

    //increment win score if the total from the game
    // equals the goal
    if(total === goal){
        win_score++;
        const para = getWINParagraphID();
        para.innerText = win_score;
        printWon();

    } else { //increment loss score if it was not equal
        loss_score++;
        const other_para = getLOSSParagraphID();
        other_para.innerText = loss_score;
        printLoss();
    }
}



// getter for turn indicator ID
function getAnouncementSpan(){
    return document.getElementById("turn-indicator");
}

//getter for turn button on game board
function getGameBoardButton() {
    return document.querySelectorAll("#game-board > button");
}

//getter for the new game button
function getNewGameButton() {
    return document.getElementById("newGameButton");
}

//getter for the goal
function getGoalParagraphID() {
    return document.getElementById("goal");
}

//getter for the wins section
function getWINParagraphID() {
    return document.getElementById("p_wins");
}

//getter for loss section
function getLOSSParagraphID() {
    return document.getElementById("p_losses");
}

//getter for empty work area space
function getWorkArea() {
    return document.getElementById("para_to_add");
}

//getter for the operation buttons
function getMathButton() {
    return document.querySelectorAll("#game-math > button");
}


//getter for the final value
function getVauleSpan() {
    return document.getElementById("total_value");
}

