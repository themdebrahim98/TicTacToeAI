let boxes = document.getElementsByClassName("box");
let countx = document.getElementsByClassName('countx')[0];
let counto = document.getElementsByClassName('counto')[0];
let overshadow = document.getElementsByClassName('overshadow')[0];
let restart = document.getElementById('restart');



console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("wining.mp3");
let turn = "O";
let isgameover = false;
let xwin = 0;
let owin = 0;



// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  var wins = [
    [3, 4, 5, 0, 128, 0],
    [6, 7, 8, 0, 216, 0],
    [0, 1, 2, 0, 34, 0],
    [0, 3, 6, -90, 127, 90],
    [1, 4, 7, 0, 127, 90],
    [2, 5, 8, 90, 127, 90],
    [0, 4, 8, 0, 125, 45],
    [2, 4, 6, 0, 131, 135],
  ];

  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {





      document.querySelector(".container .line").style.width = "100%";
      document.querySelector(".container .line").style.transform = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`;
      console.log(e, "element");
      document.getElementById("imgbox").querySelector('img').style.display = "initial";
      console.log(document.getElementById("imgbox").querySelector('img'), "sdklvncjksb");
      isgameover = true;
      document.getElementById('reset').style.display = "block"
      console.log(boxtext)
      document.getElementById("win").innerHTML = `Win ${boxtext[e[0]].innerText}`
      if (boxtext[e[0]].innerText === "X") {
        console.log(++xwin);
        countx.querySelector('span').innerText = xwin;
      } else if (boxtext[e[0]].innerText == "O") {
        console.log(owin++);
      }
      overshadow.style.display = "block"
      gameover.play();
    }

  });
};

// Game Logic
// music.play()

Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", (e) => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;

      mousePressed(e);


      checkWin();

    }
  });
});



// Add onclick listener to reset button

reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = "";
    }
  }

  document.getElementById("win").innerHTML = "";

  turn = "O";
  isgameover = false;
  document.querySelector(".line").style.width = "0px";
  document
    .getElementById("imgbox")
    .querySelector("img").style.display = "none";
  overshadow.style.display = "none"
});

restart.addEventListener('click', () => {
  xwin = 0;
  owin = 0;
  counto.querySelector('span').innerText = owin;
  countx.querySelector("span").innerText = xwin;
  console.log("ajilhfh")
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = "";
    }
  }

  document.getElementById("win").innerHTML = "";

  turn = "O";
  isgameover = false;
  document.querySelector(".line").style.width = "0px";
  document
    .getElementById("imgbox")
    .querySelector("img").style.display = "none";
  overshadow.style.display = "none"
})
