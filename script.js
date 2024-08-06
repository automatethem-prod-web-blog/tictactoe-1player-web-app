
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const player = 'X';
const computer = 'O';

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell);
}

function computerMove() {
    let emptyCells = [];
    board.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = computer;
        cells[randomIndex].textContent = computer;
        if (checkWin()) {
            alert('Computer wins!');
            resetBoard();
        } else if (checkDraw()) {
            alert('Draw!');
            resetBoard();
        } else {
            currentPlayer = player;
        }
    }
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index] || currentPlayer !== player) return;
    
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
        resetBoard();
    } else if (checkDraw()) {
        alert('Draw!');
        resetBoard();
    } else {
        currentPlayer = computer;
        setTimeout(computerMove, 500);
    }
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = player;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetBoard);
