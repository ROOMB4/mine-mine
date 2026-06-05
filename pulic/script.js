const board = document.getElementById('board');
const sizeSelect = document.getElementById('sizeSelect');
const resetBtn = document.getElementById('resetBtn');

let size = 5;
let bombCount = 5;
let bombs = [];
let cells = [];
let isGameOver = false;

// 選択された難易度に応じて設定を更新
function updateSettings() {
  size = parseInt(sizeSelect.value);
  if (size === 5) bombCount = 5;
  else if (size === 10) bombCount = 15;
  else if (size === 15) bombCount = 30;
}

// ゲームの初期化（リセット）
function initGame() {
  updateSettings();
  board.innerHTML = '';
  // JavaScriptからCSSの列数を動的に変更
  board.style.gridTemplateColumns = `repeat(${size}, 35px)`;
  bombs = [];
  cells = [];
  isGameOver = false;

  const bombPositions = new Set();
  while(bombPositions.size < bombCount) {
    bombPositions.add(Math.floor(Math.random() * (size * size)));
  }
  bombs = Array.from(bombPositions);

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => clickCell(i));
    board.appendChild(cell);
    cells.push(cell); // 全てのマスを配列に保存しておく
  }
}

// マスをクリックしたときの処理
function clickCell(index) {
  if (isGameOver) return;
  const cell = cells[index];
  if (cell.classList.contains('open')) return;

  cell.classList.add('open');

  if (bombs.includes(index)) {
    cell.textContent = '💣';
    cell.style.backgroundColor = '#f87171';
    isGameOver = true;
    setTimeout(() => alert('ゲームオーバー！'), 100);
    return;
  }

  const count = countBombs(index);
  if (count > 0) {
    cell.textContent = count;
  } else {
    // 【連鎖開き】数字が0（安全）なら、周囲のマスもクリック扱いにする（再帰処理）
    const neighbors = getNeighbors(index);
    for (const neighborIndex of neighbors) {
      if (!cells[neighborIndex].classList.contains('open')) {
        clickCell(neighborIndex);
      }
    }
  }
}

// 周囲の地雷の数を数える
function countBombs(index) {
  let count = 0;
  const neighbors = getNeighbors(index);
  for (const neighborIndex of neighbors) {
    if (bombs.includes(neighborIndex)) {
      count++;
    }
  }
  return count;
}

// 周囲（最大8方向）のインデックスを取得する共通関数
function getNeighbors(index) {
  const neighbors = [];
  const row = Math.floor(index / size);
  const col = index % size;

  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      if (r === 0 && c === 0) continue; // 自分自身は除外
      const newRow = row + r;
      const newCol = col + c;
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        neighbors.push(newRow * size + newCol);
      }
    }
  }
  return neighbors;
}

// イベントリスナーの登録
resetBtn.addEventListener('click', initGame);
sizeSelect.addEventListener('change', initGame);

// 最初の起動
initGame();