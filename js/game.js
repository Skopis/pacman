'use strict'
const WALL = '🔳'
const FOOD = '&#8226;'
const EMPTY = ' ';
const SUPERFOOD = '🍋';
const CHERRY = '🍒';
var gCherryInterval;
var gCherryCounter = 0;
var gFoodCountOnTable = -1;
var gElGameOver = document.querySelector('.game-over');
var gElPlayAgain = document.querySelector('.play-again');
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    clearInterval(gCherryInterval);
    gCherryInterval = null;
    gCherryCounter = 0;

    gFoodCountOnTable = -1;
    gGame.score = 0;
    gElPlayAgain.style.display = 'none';
    gElGameOver.style.display = 'none';
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;


    gCherryInterval = setInterval(function () {
        var emptyCells = getEmptyCells(gBoard);
        var emptyCell = emptyCells[getRandomInt(0, emptyCells.length)];
        console.log('emptyCell', emptyCell);
        gBoard[emptyCell.i][emptyCell.j] = CHERRY;
        renderCell(emptyCell, CHERRY);
    }, 15000);
}

function buildBoard() {
    const SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCountOnTable++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gFoodCountOnTable--;
            }
            if ((i === 1 && j === 1) ||
                (i === SIZE - 2 && j === SIZE - 2) ||
                (i === 1 && j === SIZE - 2) ||
                (i === SIZE - 2 && j === 1)) {
                board[i][j] = SUPERFOOD;
                gFoodCountOnTable--;
            }
        }
    }
    board[3][3] = EMPTY;
    gFoodCountOnTable--;
    console.log('foodCountOnTable', gFoodCountOnTable)
    console.log(board)
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

function gameOver(winOrLoose) {
    console.log('foodCountOnTable on gameOver:', gFoodCountOnTable);
    clearInterval(gCherryInterval);
    gCherryInterval = null;

    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;

    gElPlayAgain.style.display = 'block';
    gElGameOver.style.display = 'block';

    if(winOrLoose === 'win'){
        gElGameOver.innerText = 'Victory!';
    }
    else gElGameOver.innerText ='Game over, You loose!';

    renderCell(gPacman.location, EMPTY)
    gGame.isOn = false;
}