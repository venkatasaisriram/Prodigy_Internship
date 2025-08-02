let cells = document.querySelectorAll(".cell");
let displayStatus = document.getElementById("display-status");
let resetBtn = document.getElementById("reset-game");

let count = 0; //determine whether game is draw or not

let turnX = true; // player X or player O

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

cells.forEach((box) => {
  box.addEventListener("click", () => {
  if (box.innerText !== "") return;

  box.innerText = turnX ? "X" : "O";
  box.classList.add("disabled");
  count++;

  let winner = checkWinner();
  if (winner) {
    showWinner(winner);
  } else if (count === 9) {
    gameDraw();
  } else {
    turnX = !turnX;
    displayStatus.innerText = turnX ? "X's Turn" : "O's Turn";
  }
});
})

function gameDraw() {
  displayStatus.textContent = "Game was a Draw!!";
}

function showWinner(winner) {
  displayStatus.textContent = `Winner is ${winner}`;
}

function resetGame() {
  count = 0;
  turnX = true;
  cells.forEach((box) => {
    box.innerText = "";
    box.classList.remove("disabled");
  })
  displayStatus.innerText = "X's Turn";
}

function disableALl() {
  cells.forEach((box) => {
    box.classList.add("disabled");
  })
}

function checkWinner() {
  for (let pattern of winningPatterns) {
    let posVal1 = cells[pattern[0]].textContent;
    let posVal2 = cells[pattern[1]].textContent;
    let posVal3 = cells[pattern[2]].textContent;

    if(posVal1 !== "" && posVal1 === posVal2 && posVal2 === posVal3) {
        disableALl();
        return posVal1;
    }
  }
  return null;
}