let fields = [];
let gameOver = false;
let winner;
let currentShape = 'cross';
let scope = 3; // Level könnten später vl angepasst werden

let singlePlayer = false;

let winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]; // for level 1, scope = 3

// TODO(idea) getWinPatterns() (determine winning pattern, for possible variable field numbers/levels later?)

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

function getEmptyField(){
    let emptyFieldsIndexes = [];
    let randomIndex;

    for (let i = 0; i < scope * scope; i++) {
        if (fields[i] == undefined) {
            emptyFieldsIndexes.push(i);
        }
    }
    //generate a random index and get a random value from the emptyFieldsIndexes array
    randomIndex = Math.floor(Math.random() * emptyFieldsIndexes.length);
    // return the index of a random empty field
    return emptyFieldsIndexes[randomIndex];
}

function hideElement(...elementIDs) {
    for(let i = 0; i< elementIDs.length; i++){
        if (document.getElementById(elementIDs[i])){
            document.getElementById(elementIDs[i]).classList.add('d-none');
        }
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

// generate table
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

// fill table fields
function populateTableContent(){
    let gameFields = document.getElementsByClassName('game-field');
    for (let i = 0; i < gameFields.length; i++) {
        gameFields[i].id = i;
        gameFields[i].innerHTML = /*html*/ `
                <i id="circle-${i}" class="fa-regular fa-circle shape d-none"></i>
                <i id="cross-${i}" class="fa-solid fa-xmark shape d-none"></i>
            `;
        gameFields[i].addEventListener("click", executeMove);
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

function executeMove() {
    let id = this.id;
    if (!fields[id] && !gameOver) { // check if a shape has not already been filled & game still running
        // 1. player makes move
        changePlayer();
        fields[id] = currentShape;
        drawShape();
        checkForWin();
        // 2. case singlePlayer: generate an automatic move
        if(singlePlayer && !gameOver) {
            generateRandomMove();
            // TODO (idea): generate calculated move, and do a random OR calculated move (so it won't be impossible or too hard to win)
            // Math.random() < 0.5 ? generateRandomMove() : generateCalculatedMove() // Ternäre Operatoren sehr angenehm (adjust 0.5 je nach Schwierigkeitsgrad,zB)
        }
    }
}

// generate a completely random move
function generateRandomMove(){
    changePlayer();
    fields[getEmptyField()] = currentShape;
    setTimeout( function(){
        drawShape();
    }, 500);
    checkForWin();
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
    for (let i = 0; i < winPatterns.length; i++) {
        let pattern = winPatterns[i];
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
            showElement('game-over');
            renderGameOverScreen();
        }, 1000);
        // ev. kl Animation/ Video/ ClipArt hinzufügen
    }
}

function restartGame() {
    // reset variables
    gameOver = false;
    fields = [];
    winner = undefined;
    // reset game-field (hide game-over screen, line and shapes)
    hideElement('game-over', 'restart-button');
    hideLines();
    for ( let i = 0; i < (scope*scope); i++ ) {
        hideElement(`circle-${i}`, `cross-${i}`);
    }
}

function setPlayerMode(bool) {
    restartGame();
    singlePlayer = bool;
}

function setActiveLink(x) {
    let links = document.getElementsByClassName('nav-link');
    for (let i=0; i< links.length; i++){
        links[i].classList.remove('active-link');
    }
    links[x].classList.add('active-link');
}
