'use strict'
var PACMAN = '😁';
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 6
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell

    var nextLocation = getNextLocation(ev);
    console.log('nextCell', nextCell);
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (!isGhostBlue) {
            console.log('hit by a ghost!');
            gameOver('loose');
            return;
        }
        var currGhost = findGhost(nextLocation.i, nextLocation.j);
        if (currGhost.currCellContent === FOOD) {
            console.log('currGhost.currCellContent', currGhost.currCellContent);
            gFoodCountOnTable--;
            console.log('foodCountOnTable', gFoodCountOnTable);
        }
        gGhosts.splice(gGhosts.indexOf(currGhost), 1);
        setTimeout(createGhost, 5000, gBoard);
    }
    if (nextCell === FOOD) updateScore(1);
    if (nextCell === CHERRY) {
        updateScore(10);
        gCherryCounter++;
    }
    if (nextCell === SUPERFOOD) {
        if (isGhostBlue) return;
        else {
            isGhostBlue = true;
            gGhostColor = 'blue';
            for (var i = 0; i < gGhosts.length; i++) {
                renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
            }
            setTimeout(function () { isGhostBlue = false; }, 5000);
        }
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    // Move the pacman
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
    if ((gFoodCountOnTable + (gCherryCounter * 10)) === gGame.score) {
        console.log('counter = score');
        gameOver('win');
        return;
    }
}

function findGhost(iIdx, jIdx) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === iIdx && gGhosts[i].location.j === jIdx)
            return gGhosts[i];
    }
}

function getNextLocation(eventKeyboard) {
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            PACMAN = '🙄'
            gBoard[nextLocation.i][gPacman.location.j] = PACMAN;
            nextLocation.i--
            break
        case 'ArrowDown':
            PACMAN = '😌'
            gBoard[nextLocation.i][gPacman.location.j] = PACMAN;
            nextLocation.i++
            break
        case 'ArrowLeft':
            PACMAN = '🤪'
            gBoard[nextLocation.i][gPacman.location.j] = PACMAN;
            nextLocation.j--
            break
        case 'ArrowRight':
            PACMAN = '😒'
            gBoard[nextLocation.i][gPacman.location.j] = PACMAN;
            nextLocation.j++
            break
        default:
            PACMAN = '😁'
            return null

    }
    return nextLocation;
}