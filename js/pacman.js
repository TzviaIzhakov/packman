'use strict';

const PACMAN = '😀';
const CHERRY = '🍒';
var gPacman;
var gGhostsRemoved;
var gCount = 0;

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function createPacman(board) {
  gPacman = {
    location: {
      i: 2,
      j: 2,
    },
    isSuper: false,
  };

  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function onMovePacman(ev) {
  if (!gGame.isOn || gGame.isWin) return;
  const nextLocation = getNextLocation(ev.key);
  const nextCell = gBoard[nextLocation.i][nextLocation.j];

  if (nextCell === WALL) return;

  if (nextCell === CHERRY) {
    updateScore(10);
  }

  if (nextCell === SUPER) {
    if (gPacman.isSuper) return;
    gCount++;
    gGhostsRemoved = [];
    gPacman.isSuper = true;
    setTimeout(() => {
      console.log('time start');
      gPacman.isSuper = false;
      for (let i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        renderCell(ghost.location, getGhostHTML(ghost));
      }
      for (let i = 0; i < gGhostsRemoved.length; i++) {
        var ghost = gGhostsRemoved[i][0];
        gGhosts.push(ghost);
        renderCell(ghost.location, getGhostHTML(ghost));
      }
    }, 5000);
    for (let i = 0; i < gGhosts.length; i++) {
      var ghost = gGhosts[i];
      renderCell(ghost.location, getGhostHTML(ghost));
    }
  }

  if (nextCell === GHOST && gPacman.isSuper) {
    removeFromGhosts(nextLocation.i, nextLocation.j);
  } else if (nextCell === GHOST) {
    const elModal = document.querySelector('.modal');
    const elModalP = document.querySelector('.modal p');
    elModal.classList.remove('hidden');
    elModalP.innerText = 'You lost 🙁\n';
    gameOver();
    return;
  }

  if (nextCell === FOOD) updateScore(1);

  if (isWin(gBoard)) {
    const elModal = document.querySelector('.modal');
    const elModalP = document.querySelector('.modal p');
    elModal.classList.remove('hidden');
    elModalP.innerText = 'You Win 😄\n';
    gGame.isWin = true;
    gameOver();
    return;
  }

  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  renderCell(gPacman.location, EMPTY);

  // DONE: Move the pacman to new location:
  // DONE: update the model
  gBoard[nextLocation.i][nextLocation.j] = PACMAN;
  gPacman.location = nextLocation;
  // DONE: update the DOM

  renderCell(nextLocation, PACMAN);
}

function getNextLocation(eventKeyboard) {
  const nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // DONE: figure out nextLocation
  switch (eventKeyboard) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
  }
  return nextLocation;
}

function isWin(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === FOOD) return false;
    }
  }
  return true;
}

function removeFromGhosts(i, j) {
  if (!gGhosts) return;
  for (let x = 0; x < gGhosts.length; x++) {
    const ghost = gGhosts[x];
    if (ghost.location.i === i && ghost.location.j === j) {
      console.log(ghost);
      //MODEL
      gBoard[i][j] = ghost.currCellContent;
      var ghostRemove = gGhosts.splice(x, 1);
      gGhostsRemoved.push(ghostRemove);
    }
  }
  console.log(gGhosts);
}
