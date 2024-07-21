// Tic Tac Toe
// What will you need?


// 1. A gameboard IIFE or something like that
const gameBoard = (function () {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    function callGameBoard() {
        return gameBoard
    }

    function updateBoard(index, marker) {
        gameBoard[index] = marker;
    }

    function resetBoard() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
    }

    return { callGameBoard, updateBoard, resetBoard };
})();

// 4. A IIFE that controls the DOM
// This comes when the game works in the console, afterwards we can expand it into the DOM.
const displayController = (function() {

    function endGamePrompt(gameStatus) {
        const dialog = document.querySelector('dialog')
        dialog.classList.add('dialog')
        const gameStatusText = document.querySelector('h2.game-status')
        gameStatusText.textContent = gameStatus;
        dialog.show();

        const quitButton = document.querySelector('button.quit-button');
        quitButton.addEventListener('click', () => {
            gameController.switchPlayerTurn();
            dialog.close();
        });

        const restartButton = document.querySelector('button.restart-button');

        restartButton.addEventListener('click', () => {
            gameBoard.resetBoard();
            refreshBoard();
            displayGameBoard();
            handleClicks();
            dialog.close();
        })
    }

    const resetButton = document.querySelector('header button.reset-button');

    resetButton.addEventListener('click', () => {
        gameBoard.resetBoard();
        refreshBoard();
        displayGameBoard();
        gameController.resetActivePlayer();
        handleClicks();
    })

    function refreshBoard() {
        gameBoardContainer = document.querySelector('div.gameboard-container');
        gameBoardContainer.textContent = ""
        for ( let squares = 0; squares < 9; squares++) {
            createSquare = document.createElement('p');
            createSquare.classList.add('square');
            gameBoardContainer.appendChild(createSquare);
        }
        displayGameBoard();
    }

    function displayGameBoard() {
        const squares = document.querySelectorAll('p.square')
        const board = gameBoard.callGameBoard();
        squares.forEach((square, index) => {
            square.textContent = board[index]
        });
    }

    function handleClicks(activePlayer) {
        const board = gameBoard.callGameBoard();
        refreshBoard();
        const squares = document.querySelectorAll('.square')
        let gameStatus = '';
        squares.forEach((square, index) => {
            square.addEventListener('click', () =>  {
                if (board[index] === "") {
                    gameBoard.updateBoard(index, gameController.getActivePlayer().marker)
                    refreshBoard();
                    displayGameBoard();
                    if (gameController.checkWinConditions() === true) {
                        displayGameBoard();
                        gameStatus = `${gameController.getActivePlayer().name} has won the round!`
                        endGamePrompt(gameStatus); // prompt players to "play again?"
                        gameController.resetActivePlayer();
                    } else if (board.includes("") === false && gameController.checkWinConditions() !== true) {
                        gameStatus = 'DRAW!';
                        displayGameBoard(); 
                        endGamePrompt(gameStatus); // prompt players to "play again?"
                    } else {
                        gameController.switchPlayerTurn();
                        handleClicks(gameController.getActivePlayer());
                    }
                };
            });
        });
    };

    return { displayGameBoard, handleClicks };
})();

// 2. A IIFE that controls the entire game functionality

const gameController = (function() {
    const players = [
        {
            name: "Player One",
            marker: "X",
        },
        {
            name: "Player Two",
            marker: "O",
        }
    ];

    let activePlayer = players[0];

    function switchPlayerTurn() {
        if (activePlayer === players[0]) {
            activePlayer = players[1]
        } else {
            activePlayer = players[0];
        }
    }


    function checkWinConditions() {
        let board = gameBoard.callGameBoard();
        if (board[0]==="X" && board[1]==="X" && board[2]==="X"
            || board[3]==="X" && board[4]==="X" && board[5]==="X"
            || board[6]==="X" && board[7]==="X" && board[8]==="X"
            || board[2]==="X" && board[5]==="X" && board[8]==="X"
            || board[1]==="X" && board[4]==="X" && board[7]==="X"
            || board[0]==="X" && board[3]==="X" && board[6]==="X"
            || board[0]==="X" && board[4]==="X" && board[8]==="X"
            || board[2]==="X" && board[4]==="X" && board[6]==="X") {
            return true;
        } else if (board[0]==="O" && board[1]==="O" && board[2]==="O"
            || board[3]==="O" && board[4]==="O" && board[5]==="O"
            || board[6]==="O" && board[7]==="O" && board[8]==="O"
            || board[2]==="O" && board[5]==="O" && board[8]==="O"
            || board[1]==="O" && board[4]==="O" && board[7]==="O"
            || board[0]==="O" && board[3]==="O" && board[6]==="O"
            || board[0]==="O" && board[4]==="O" && board[8]==="O"
            || board[2]==="O" && board[4]==="O" && board[6]==="O") {
            return true;
        };
    };

    function getActivePlayer() {
        return activePlayer;
    }

    function resetActivePlayer() {
        activePlayer = players[0];
    }

    // 3. A function that allows a round to be played, and allows the players to make their moves.
    function playRound() {
        displayController.displayGameBoard();
        displayController.handleClicks();
    };

    return { playRound, checkWinConditions, getActivePlayer, switchPlayerTurn, resetActivePlayer };
})();

gameController.playRound();