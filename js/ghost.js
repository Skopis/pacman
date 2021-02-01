'use strict'
const GHOST = '....';

var gGhosts = [];
var gIntervalGhosts;
var gGhostColor;
var isGhostBlue;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3,
        },
        color: getRandomColor(),
        currCellContent: EMPTY
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);
    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        gGhostColor = (isGhostBlue) ? 'blue' : gGhosts[i].color;
        moveGhost(ghost);
    }
}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // return if cannot move
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        console.log('hit by a ghost!');
        gameOver('loose');
        return;
    }
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)
    // Move the ghost
    // update the model
    ghost.currCellContent = nextCell
    ghost.location = nextLocation;
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span class="ghost" style="background-color:${gGhostColor}">${GHOST}</span>`
}