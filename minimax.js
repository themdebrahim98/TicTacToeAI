let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

let ai = "X";
let human = "O";
let currentPlayer = human;

function equals3(a, b, c) {
    return a == b && b == c && a != "";
}

function checkWinnerInRecurson() {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == "") {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots === 0) {
        return "tie";
    } else {
        return winner;
    }
}

function findBestMove(board) {
    // heare AI is Maximizer player
    // AI will maximize the score (respect to AI )
    let box = document.getElementsByClassName("box");

    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (board[i][j] == "") {
                board[i][j] = ai;
                let score = minimax(board, 0, false); //oponent  will minimize the  score (humon)
                board[i][j] = "";
                if (score > bestScore) {
                    bestScore = score;

                    move = { i, j };
                }
            }
        }
    }
    board[move.i][move.j] = ai;

    Array.from(box).forEach((cell) => {
        if (cell.id == `${move.i}${move.j}`) {
            cell.childNodes[0].innerHTML = ai;
        }
    });

    currentPlayer = human;
}

let scores = {
    X: 10,
    O: -10,
    tie: 0,
};

function minimax(board, depth, isMaximizing) {
    let result = checkWinnerInRecurson();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        // AI maximize the score
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == "") {
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false); // Human will minimize
                    board[i][j] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        // human(oponent) minimize the score( respect to AI)
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == "") {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

// boxes.forEach((cell) => {
//   //   cell.classList.remove(XcLASS);
//   //   cell.classList.remove(CIRCLECLASS);
//   //   cell.classList.remove("clrchange");
// });

function mousePressed(e) {
    // const winingMessage = document.getElementById("winingMessage");
    let cellidArray = e.target.id.split("");

    board[cellidArray[0]][cellidArray[1]] = human;
    document.getElementById(e.target.id).style.color = "white";

    console.log(board);
    // e.target.classList.add("circle");

    let result = checkWinnerInRecurson();
    if (result != null) {
        if (result == "tie") {
            console.log("tie");
            document.getElementById("win").innerHTML = "tie";
            document.getElementById("reset").style.display = "block";
        } else {
            console.log(`wins ${result}`);
        }
    }
    findBestMove(board);
}
