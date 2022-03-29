let fields = [];
let gameOver = false;
let scope = 3; // Level können später angepasst werden

let winnerPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]; // für Level 1, scope = 3

let currentShape = 'cross'; // initial value

// getWinnerPatterns() (Gewinner-Pattern ermitteln)
// für variable (quadratische) Feldanzahlen --> VERSCH LEVEL

// count array length without empty values
function getArrLength(arr){
    let count=0;
    for(let i=0; i< arr.length; i++){
        if(arr[i] !== undefined){
            count++;
        }
    }
    return count;
}

function renderGamefield(){
    let table = document.getElementById('gamefield');
    table.innerHTML = '';

    // A.: - Diese Methode eine Tabelle zu generieren fkt NICHT (warum?)
    // for (let i = 0; i < scope; i++){
    //     table.innerHTML += '<tr class="row">';
    //     for ( let j = 0; j < scope; j++){
    //         table.innerHTML += '<td class="field"> DATA </td>';
    //     }
    //     table.innerHTML += '</tr>';
    // }

    // B.: - STATDESSEN (hier wird css :first-child etc für tr und td nicht angewandt)
    // for (let i = 0; i < scope; i++) {
    //     let row = document.createElement('tr');
    //     table.appendChild(row);

    //     for(let j = 0; j < scope; j++ ){
    //         let field = document.createElement('td');
    //         field.innerHTML = `data ${j}`;
    //         table.appendChild(field);
    //     }
    // }

    // c.: + STATDESSEN
    // 1.: Tabelle. alle Felder generieren (todo: refactor in FKT: makeTable())
    for (let i = 0; i < scope; i++) {
        let row = table.insertRow(i);

        for(let j = 0; j < scope; j++ ){
            let field = row.insertCell(j);
            field.classList.add('game-field');
        }
    }
    // 2.: Felder befüllen (todo: refactor in FKT renderTableContent())
    let gameFields = document.getElementsByClassName('game-field');
    for (let i = 0; i< gameFields.length; i++) {
        gameFields[i].id = i;
        gameFields[i].innerHTML = /*html*/ `
            <i id="circle-${i}" class="fa-regular fa-circle shape d-none"></i>
            <i id="cross-${i}" class="fa-solid fa-xmark shape d-none"></i>
        `;
        gameFields[i].addEventListener("click", fillShape);
    }
}

function fillShape() {
    let id = this.id;
    // check ob schon eine form im feld eingefüllt wurde bzw Feld voll ist
    if (!fields[id] && !gameOver){ //
        if(currentShape == 'cross'){ // FKT changePlayer() Spieler wechseln
            currentShape = 'circle';
            document.getElementById('player-2').classList.remove('player-inactive');
            document.getElementById('player-1').classList.add('player-inactive');
        } else {
            currentShape = 'cross';
            document.getElementById('player-1').classList.remove('player-inactive');
            document.getElementById('player-2').classList.add('player-inactive');
        }
    
        fields[id] = currentShape; //
        draw();
        checkForWin();
        console.log(fields);
    }
}

function draw() {
    for( let i=0; i<fields.length; i++){
        if(fields[i] == 'circle'){
            document.getElementById(`circle-${i}`).classList.remove('d-none'); // ev noch kl. soundeffekt einfügen
        }
        if (fields[i] == 'cross') {
            document.getElementById(`cross-${i}`).classList.remove('d-none');
        }
    }
}

function checkForWin(){
    let winner;
    for (let i = 0; i < winnerPatterns.length; i++) {
        let pattern = winnerPatterns[i];
        if (fields[pattern[0]] == fields[pattern[1]] && fields[pattern[1]] == fields[pattern[2]] && fields[pattern[0]]) { // stellen 0,1,2 & Evaluation ob auch ausgefüllt (kein undefined)
            winner = fields[pattern[0]];
            console.log('winner: ',winner);
            if (i < 3 ){
                document.getElementById(`line-${i}`).style.transform = 'scale(1)'; // achtung für rotierte linien, alle transform eigenschaften müssen hier drinnen sein, sonst wird rest überschrieben.
            }
            else if (i < 6 ){
                document.getElementById(`line-${i}`).style.transform = 'rotate(90deg) scale(1)';
            }
            else if ( i == 6){
                document.getElementById(`line-${i}`).style.transform = 'rotate(45deg) scale(1.3)';
            }
            else if (i == 7) {
                document.getElementById(`line-${i}`).style.transform = 'rotate(-45deg) scale(1.3)';
                }
            }
        }

    if (winner || getArrLength(fields) === ((scope * scope)) ) { // winner or undecided
        gameOver = true;
        console.log('fields elements: ', fields.length);
        document.getElementById('player-1').classList.add('player-inactive');
        document.getElementById('player-2').classList.add('player-inactive');
    }

    if (gameOver){
        setTimeout( function () {
            document.getElementById('game-over').classList.remove('d-none'); // all dieses ein/ ausblenden v funktionen könnte man auch i eigene fkt auslagern? (am besten nur noch id-name übergeben) //1.: document.getElement.. & 2. class List add/remove (mit d-none als default?)
            document.getElementById('restart-button').classList.remove('d-none');
        }, 1000);
    }
    // kl Animation/ Video/ ClipArt hinzufügen
}

function restartGame() {
    gameOver = false;
    fields = [];
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('restart-button').classList.add('d-none');
    for( let i = 0; i < 8; i++ ){
        document.getElementById('line-'+i).style.transform = 'scale(0)';
    }
    for ( let i = 0; i < (scope*scope); i++ ) {
        document.getElementById('circle-' + i).classList.add('d-none');
        document.getElementById('cross-' + i).classList.add('d-none');
    }
    // changePlayer() //aktiven Spieler anzeigen
}

