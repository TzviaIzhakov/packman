'use strict';

const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const SUPER = '🍰';
const gGame = {
  score: 0,
  isOn: false,
  isWin: false,
};
var gBoard;
var gIntervalId = null;
function onInit() {
  console.log('hello');

  gBoard = buildBoard();
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalId);
  createGhosts(gBoard);
  createPacman(gBoard);
  renderBoard(gBoard);
  const elModal = document.querySelector('.modal');
  const elH2 = document.querySelector('h2 span');
  gGame.isOn = true;
  gGame.isWin = false;
  gGame.score = 0;
  elH2.innerHTML = gGame.score;
  elModal.classList.add('hidden');
  gIntervalId = setInterval(addCherry, 15000);
}
function addCherry() {
  //   clearInterval(gIntervalId);
  addElement(CHERRY, CHERRY);
}
function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
      }
    }
  }
  board[1][1] = board[1][8] = board[8][1] = board[8][8] = SUPER;

  return board;
}

function renderBoard(board) {
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td class="${className}">${cell}</td>`;
    }
    strHTML += '</tr>';
  }
  const elContainer = document.querySelector('.board');
  elContainer.innerHTML = strHTML;
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function updateScore(diff) {
  // DONE: update model and dom

  // update model
  gGame.score += diff;
  // update dom
  document.querySelector('.score').innerText = gGame.score;
}

function gameOver() {
  // TODO
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalId);
  if (!gGame.isWin) renderCell(gPacman.location, '🪦');
  gGame.isOn = false;
}
