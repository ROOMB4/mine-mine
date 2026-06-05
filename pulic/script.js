const board = document.getElementById('board');
const size = 5;
const bombCount = 5;
let bombs = [];

function createBoard() {
  const bombPositions = new Set();
  while(bombPositions.size < bombCount) {
    bombPositions.add(Math.floor(Math.random() * (size * size)));
  }
  bombs = Array.from(bombPositions);

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => clickCell(cell, i));
    board.appendChild(cell);
  }
}

function clickCell(cell, index) {
  if (cell.classList.contains('open')) return;
  cell.classList.add('open');

  if (bombs.includes(index)) {
    cell.textContent = '💣';
    cell.style.backgroundColor = '#f87171';
    setTimeout(() => alert('ゲームオーバー！'), 100);
  } else {
    const count = countBombs(index);
    if (count > 0) {
      cell.textContent = count;
    }
  }
}

function countBombs(index) {
  let count = 0;
  const row = Math.floor(index / size);
  const col = index % size;

  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      const newRow = row + r;
      const newCol = col + c;
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        const neighborIndex = newRow * size + newCol;
        if (bombs.includes(neighborIndex)) {
          count++;
        }
      }
    }
  }
  return count;
}

createBoard();