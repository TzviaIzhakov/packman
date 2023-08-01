'use strict';

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function addElement(boardValue, htmlValue) {
  var emptyPos = getEmptyCell(gBoard);
  if (!emptyPos) return;
  // model
  gBoard[emptyPos.i][emptyPos.j] = boardValue;
  // dom
  renderCell(emptyPos, htmlValue);

  return emptyPos;
}
function getEmptyCell(board) {
  var emptyCells = [];
  for (let i = 1; i < board.length - 1; i++) {
    for (let j = 1; j < board[i].length - 1; j++) {
      const cell = gBoard[i][j];
      if (cell === ' ') emptyCells.push({ i, j });
    }
  }
  // console.table(gBoard);
  // console.log(emptyCells);
  if (!emptyCells.length) return;
  const randomIdx = getRandomIntInclusive(0, emptyCells.length - 1);
  const pos = emptyCells.splice(randomIdx, 1)[0];
  return pos;
}
