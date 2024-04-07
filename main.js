let machineSequence = [];
let userSequence = [];
let round = 0;
let maxScore = 0;
const currentRound = document.querySelector('#current-round');
const maxScoreDisplay = document.querySelector('#max-score');
const playButton = document.querySelector('#play-button');
const $board = document.querySelector('#board');

playButton.onclick = function () {
    startGame();
    playButton.disabled = true;
    return false;
}

function startGame() {
    returnToDefaultState();
    handleRound();
}

function changeTurnState(text) {
    const turn = document.querySelector('#turn');
    turn.textContent = text;
}

function returnToDefaultState() {
    currentRound.value = 0;
    round = 0;
    machineSequence = [];
    userSequence = [];
}

function handleRound() {
    changeTurnState("It's the machine's turn!");
    blockUserInput();

    const PLAYER_TURN_DELAY = (machineSequence.length + 1) * 1000;
    let newSquare = getNewSquare();

    machineSequence.push(newSquare);
    machineSequence.forEach(function ($square, index) {
        const DELAY = (index + 1) * 1000;
        setTimeout(function () {
            highlight($square);
        }, DELAY);
    });

    setTimeout(function () {
        changeTurnState("It's your turn!");
        unblockUserInput();
    }, PLAYER_TURN_DELAY);

    userSequence = [];
    round++;
    changeRoundNumber(round);
    // Update max score if the current round is higher
    if (round > maxScore) {
        maxScore = round;
        maxScoreDisplay.value = maxScore;
    }
}

function blockUserInput() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(function ($square) {
        $square.onclick = "";
    })
}

function unblockUserInput() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(function ($square) {
        $square.onclick = handleUserInput;
    })
}

function getNewSquare() {
    let newSquare = Math.ceil(Math.random() * 4);
    let newSquareId = `#square-${newSquare}`
    return newSquareId;
}

function highlight(squareId) {
    let squareToHighlight = document.querySelector(squareId);
    squareToHighlight.style.opacity = 1;
    setTimeout(function () {
        squareToHighlight.style.opacity = 0.3;
    }, 500);
}

function changeRoundNumber(number) {
    document.querySelector('#current-round').value = number;
}

function handleUserInput(e) {
    let squareClicked = e.target;
    let squareId = '#' + squareClicked.id;
    highlight(squareId);
    userSequence.push(squareId);
    const machineSquare = machineSequence[userSequence.length - 1];

    if (squareId !== machineSquare) {
        loseGame();
        return false;
    }

    if (userSequence.length === machineSequence.length) {
        blockUserInput();
        setTimeout(handleRound, 1000);
    }
}

function loseGame() {
    blockUserInput();
    changeTurnState('You lost.');
    playButton.disabled = false;
}
