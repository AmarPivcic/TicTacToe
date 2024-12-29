var player = false;
var gameOver = false;
var playerX = 0;
var playerO = 0;
var tie = 0;
var pXScore = document.getElementById("playerXscore");
var pOScore = document.getElementById("playerOscore");
var tieScore = document.getElementById("tieScore");
var blurr = document.getElementById("blur");
var body = document.getElementById("body");
var winnerText = document.getElementById("winnerText");
let gameMode = "";
var botTurn = false;

var board = ["", "", "", "", "", "", "", "", ""];

function selectMode() {
    gameMode = "";
    document.getElementById("modeSelection").classList.remove("hidden");
    document.getElementById("gameContainer").classList.add("hidden");
    reset();
}

function startGame(mode) {
    gameMode = mode;
    document.getElementById("modeSelection").classList.add("hidden");
    document.getElementById("gameContainer").classList.remove("hidden");
    reset();
}

function showPopup(winner)
{
    blurr.classList.remove("hidden");
    body.classList.add("stop-scrolling");
    if(winner==="tie")
        winnerText.innerHTML="Tie!";
    else
        winnerText.innerHTML="The winner is " + winner;
}

function closePopup () {
    blurr.classList.add("hidden");
    body.classList.remove("stop-scrolling");
}

function showResult()
{
    pXScore.innerHTML=playerX;
    pOScore.innerHTML=playerO;
    tieScore.innerHTML=tie;
}


function clearBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    for (let i = 1; i <= 9; i++) {
        let box = document.getElementById(`box${i}`);
        box.innerHTML = "";
        box.classList.remove("green", "pink");
    }
    gameOver = false;
    botTurn = false;
}

function reset()
{
    playerX = 0;
    playerO = 0;
    tie = 0;
    showResult();
    clearBoard();
}

function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6],           
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes("") ? null : "tie";
}

function checkScore() {
    let winner = checkWinner(board);
    if (winner) {
        gameOver = true;
        if (winner === "X") playerX++;
        if (winner === "O") playerO++;
        if (winner === "tie") tie++;
        showPopup(winner);
    }
    showResult();
}

function playAudio(source)
{
    var audio = new Audio(source);
    audio.play();   
}

function setSymbol(index, symbol) {
    var element = document.getElementById("box" + (index + 1));
    element.innerHTML = `<h1>${symbol}</h1>`;
    element.classList.add(symbol === "X" ? "green" : "pink");
    board[index] = symbol;

    if(symbol==="X")
        playAudio("./sounds/pink.mp3");
        
    else
        playAudio("./sounds/green.mp3");
        
    checkScore();
}

function minimax(newBoard, depth, isMaximizing) {
    const scores = { X: -10, O: 10, tie: 0 };

    let winner = checkWinner(newBoard);
    if (winner) return scores[winner];

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = "O";
                let score = minimax(newBoard, depth + 1, false);
                newBoard[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = "X";
                let score = minimax(newBoard, depth + 1, true);
                newBoard[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function botMove() {
    botTurn = true;
    let bestScore = -Infinity;
    let move;

    setTimeout(() => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "O";
                let score = minimax(board, 0, false);
                board[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        setSymbol(move, "O");
        botTurn = false;
    }, 750);
}

$(".key").click(function () {
    var elementId = $(this).attr("id");
    var index = parseInt(elementId.replace("box", "")) - 1;

    if (!gameOver && board[index] === "") {
        if (gameMode === "PvP") {
            setSymbol(index, player ? "O" : "X");
            player = !player; 
        } else if (gameMode === "PvBot" && !botTurn) {
            setSymbol(index, "X");
            if (!gameOver) botMove();
        }
    }
});