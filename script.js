let fields = [];
let gameOver = false;
let winner;
let currentShape = 'cross';
let scope = 3; // Level könnten später angepasst werden

let winnerPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]; // for level 1, scope = 3

// getWinnerPatterns() (determine winning pattern, for possible variable field numbers/levels later)


function renderGameOverScreen(){
    let screen = document.getElementById('game-over');
    gameOverScreenHTML(screen);
}

// get actual array length without empty values
function getArrLength(arr){
    let count=0;
    for(let i=0; i< arr.length; i++){
        if(arr[i] !== undefined){
            count++;
        }
    }
    return count;
}

function hideElement(...elementIDs) {
    for(let i = 0; i< elementIDs.length; i++){
        document.getElementById(elementIDs[i]).classList.add('d-none');
    }
}

function showElement(...elementIDs){
    for (let i = 0; i < elementIDs.length; i++) {
        document.getElementById(elementIDs[i]).classList.remove('d-none');
    }
}

function hideLines() {
    for (let i = 0; i < 8; i++) {
        document.getElementById('line-' + i).style.transform = 'scale(0)';
    }
}

// 1.: generate table
function makeTable(table){
    // generate rows
    for (let i = 0; i < scope; i++) {
        let row = table.insertRow(i);
        // generate game-fields
        for (let j = 0; j < scope; j++) {
            let field = row.insertCell(j);
            field.classList.add('game-field');
        }
    }
}

// 2.: fill table fields
function populateTableContent(){
    let gameFields = document.getElementsByClassName('game-field');
    for (let i = 0; i < gameFields.length; i++) {
        gameFields[i].id = i;
        gameFields[i].innerHTML = /*html*/ `
                <i id="circle-${i}" class="fa-regular fa-circle shape d-none"></i>
                <i id="cross-${i}" class="fa-solid fa-xmark shape d-none"></i>
            `;
        gameFields[i].addEventListener("click", fillShape);
    }
}

function renderGamefield(){
    let table = document.getElementById('gamefield');
    table.innerHTML = '';
    makeTable(table);
    populateTableContent();
}

function changePlayer() {
    if (currentShape == 'cross') {
        document.getElementById('player-2').classList.remove('player-inactive');
        document.getElementById('player-1').classList.add('player-inactive');
        currentShape = 'circle';
    } else {
        document.getElementById('player-1').classList.remove('player-inactive');
        document.getElementById('player-2').classList.add('player-inactive');
        currentShape = 'cross';
    }
}

function fillShape() {
    let id = this.id;
    if (!fields[id] && !gameOver) { // check if a shape has not already been filled & game still running
        changePlayer();
        fields[id] = currentShape;
        drawShape();
        checkForWin();
    }
}

function drawShape() {
    for( let i=0; i<fields.length; i++){
        if(fields[i] == 'circle'){
            showElement(`circle-${i}`);
        }
        if (fields[i] == 'cross') {
            showElement(`cross-${i}`);
        }
    }
}

function drawLine(i) {
    if (i < 3) {
        document.getElementById(`line-${i}`).style.transform = 'scale(1)';
    } else if (i < 6) {
        document.getElementById(`line-${i}`).style.transform = 'rotate(90deg) scale(1)';
    } else if (i == 6) {
        document.getElementById(`line-${i}`).style.transform = 'rotate(45deg) scale(1.3)';
    } else if (i == 7) {
        document.getElementById(`line-${i}`).style.transform = 'rotate(-45deg) scale(1.3)';
    }
}

function checkWinner() {
    for (let i = 0; i < winnerPatterns.length; i++) {
        let pattern = winnerPatterns[i];
        // check respective pattern & evaluation if field is filled (no undefined)
        if (fields[pattern[0]] == fields[pattern[1]] && fields[pattern[1]] == fields[pattern[2]] && fields[pattern[0]]) { 
            winner = fields[pattern[0]];
            drawLine(i);
            return true;
        }
    }
}

function checkUndecided() {
     if (getArrLength(fields) === ((scope * scope)) && !winner) {
         document.getElementById('player-1').classList.add('player-inactive');
         document.getElementById('player-2').classList.add('player-inactive');
         return true;
     }
}

function checkForWin(){ 
    // do game-over stuff (screen etc)
    if (checkWinner() || checkUndecided() ){
        gameOver = true;
        setTimeout( function () {
            document.getElementById('game-over').classList.remove('d-none');
            renderGameOverScreen();
            //document.getElementById('restart-button').classList.remove('d-none');
        }, 1000);
        // kl Animation/ Video/ ClipArt hinzufügen
    }
}

function restartGame() {
    // reset variables
    gameOver = false;
    fields = [];
    winner = undefined;
    // hide game-over screen and restart-btn
    hideElement('game-over', 'restart-button');
    // hide lines
    hideLines();
    // hide shapes
    for ( let i = 0; i < (scope*scope); i++ ) {
        hideElement(`circle-${i}`, `cross-${i}`);
    }
    if (!winner){
        changePlayer();
    }
}
