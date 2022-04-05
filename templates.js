
// refaktorieren od ändern?
function gameOverScreenHTML(element) { //bearb
    if (winner) {
        element.innerHTML = /*html*/ `
                <h3>Winner:</h3>
                `;
        if (winner == 'circle') {
            element.innerHTML += /*html*/ `
                    <!-- <div class="f-center f-col"> -->
                        <i class="fa-regular fa-circle"></i>
                        <p>Player <b>1</b></p>
                    <!-- </div> -->
                    `;
        } else {
            element.innerHTML += /*html*/ `
                        <i class="fa-solid fa-xmark"></i>
                        <p>Player <b>2</b></p>
                    `;
        }
    } else {
        element.innerHTML = '<h3>Undecided!</h3>';
    }
    element.innerHTML += /*html*/ `
        <button id="restart-button" class="restart-button" onclick="restartGame()">Restart</button>
        <div class="flashlight"></div>`;
}

// 
function playerPanelHTML(player1, player2){
    if ( currentShape == 'cross'){
        if (singlePlayer) {
            player2.innerHTML = /*html*/ `<i class="fa-solid fa-xmark"></i><span><span>YOU:</span><br> Player 2</span>`;
        } else {
            player2.innerHTML = /*html*/ `<i class="fa-solid fa-xmark"></i><span>Player 2</span>`;
        }
    }
    if (currentShape == 'circle'){
        if (singlePlayer) {
            player1.innerHTML = /*html*/ `<i class="fa-regular fa-circle"></i><span><span>YOU:</span><br> Player 1</span>`;
        } else {
            player1.innerHTML = /*html*/ `<i class="fa-regular fa-circle"></i><span>Player 1</span>`;
        }
    }
}