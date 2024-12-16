const playBoard = document.querySelector(".play-board")
const scoreElem = document.querySelector(".score")
const highScoreElem = document.querySelector(".hi-score")

let gameOver = false;
let foodX , foodY;
let snakeX = 5 , snakeY = 10;
let snakeBody = [];
let speedX = 0 , speedY = 0;
let setIntervalID;
let score = 0;



const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalID);
    alert("Game is over !");
    location.reload();
}

const changeDirection = (e) => {
     if(e.key === "ArrowUp" && speedY != 1){
        speedX = 0;
        speedY = -1;
     }else if(e.key === "ArrowDown" && speedY != -1){
        speedX = 0;
        speedY = 1;
     }else if(e.key === "ArrowLeft" && speedX != 1){
        speedX = -1;
        speedY = 0;
     }else if(e.key === "ArrowRight" && speedX != -1){
        speedX = 1;
        speedY = 0;
     }
}

const initGame = () => {
    if(gameOver) return handleGameOver();
    let creteGame = `<div class = "food" style = "grid-area: ${foodY} / ${foodX} "></div>`

    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;

        
        scoreElem.innerText = `Score : ${score}`;
        

    }

    for( let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX , snakeY];
     
    snakeX += speedX;
    snakeY += speedY;

    if(snakeX <= 0 || snakeX > 25 || snakeY <= 0 || snakeY > 25){
      gameOver = true;
    }

    for(i = 0; i < snakeBody.length; i++){
       creteGame += `<div class = "head" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
       if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
        gameOver = true;
       }
    }
    playBoard.innerHTML = creteGame;
}

changeFoodPosition();
setIntervalID = setInterval(initGame , 150);

document.addEventListener("keydown" , changeDirection);