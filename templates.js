
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