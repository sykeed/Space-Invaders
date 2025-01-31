
const gameArea = document.getElementById("game-area")
const player = document.querySelector(".player")

const enemybox = document.getElementById("gameArea")
const maxPosition = gameArea.offsetWidth - player.offsetWidth;

let position = maxPosition/2;
const playerSpeed = 5;  
let enemies = [];
 
const keys = {
    ArrowLeft: false,
    ArrowRight: false
}

 
document.addEventListener('keydown', (event) => {
    if (event.key in keys) {
        keys[event.key] = true;
    }
});

 
document.addEventListener('keyup', (event) => {
    if (event.key in keys) {
        keys[event.key] = false;
    }
});

 

function updatePlayerPosition() {
     
     
    // Update position based on active keys
    if (keys.ArrowLeft) {
        position = Math.max(position - playerSpeed, 0);
    }
    if (keys.ArrowRight) {
        position = Math.min(position + playerSpeed, maxPosition);
    }
     
    // Use left property for smooth movement
    player.style.transform = `translateX(${position}px)`;
}


function makeenemy(enemynum){
    for (i=0 ; i <enemynum ; i++){
       
        let div = document.createElement("div")
        div.className = "enemy"

        document.body.appendChild(div)
      }
}
// Function to create enemies
function createEnemies(rows, Maxcolumns) {

    const gameArea = document.getElementById("gameArea");
    let columns = Math.min(Maxcolumns , 7)
   
    gameArea.style.gridTemplateColumns = `repeat(${columns}, 50px)`; 
    gameArea.style.gridTemplateRows = `repeat(${rows}, 50px)`; 
  
    // Clear any existing enemies
    gameArea.innerHTML = "";
  
    // Generate enemies dynamically
    for (let i = 0; i < rows * columns; i++) {
      const enemy = document.createElement("div");
      enemy.classList.add("enemy");
      gameArea.appendChild(enemy);
      enemies.push(enemy);
    }
  }
  
  let playerX = 275; // Initial X position
 


  // Store active bullets
let bullets = [];
const bulletSpeed = 5; // Speed of the bullet


function firebullet() {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
//console.log( typeof(bullet.style.top));

 
 
  const bulletX = position + player.offsetWidth / 2 - 5;
  const bulletY = gameArea.offsetHeight - player.offsetHeight - 40;
  bullet.style.left = `${bulletX}px`
  bullet.style.top = `${bulletY}px`

  gameArea.appendChild(bullet);
  bullets.push(bullet)
  
  

  animateBullet(bullet);
}

// Function to animate a bullet
function animateBullet(bullet) {
  function move() {

    const currentY = parseInt(bullet.style.top);

    if (currentY <= 0) {
      bullet.remove(); 
      bullets = bullets.filter((b) => b !== bullet);
      return; 
    }

    bullet.style.top = `${currentY - bulletSpeed}px`;

    requestAnimationFrame(move);
  }

  move();
}


 

let enemyX = 0;  
let enemyY = 0; 
let enemyDirection = 1;  
const enemySpeed = 2;  
const enemyDropDistance = 10; 

function moveEnemy() {
  let enemyRect = enemybox.getBoundingClientRect();
  let gameRect = gameArea.getBoundingClientRect();

 
  enemyX += enemySpeed * enemyDirection;

  if (enemyRect.right >= gameRect.right && enemyDirection === 1) {
    enemyDirection = -1;  
    enemyY += enemyDropDistance;  
  } else if (enemyRect.left <= gameRect.left && enemyDirection === -1) {
    enemyDirection = 1;  
    enemyY += enemyDropDistance;  
  }
   
  enemybox.style.transform = `translate(${enemyX}px, ${enemyY}px)`;

 
}
 
 
 
function gameLoop() {
  updatePlayerPosition();
  moveEnemy()
  requestAnimationFrame(gameLoop);
}
// Start the game loop
gameLoop();

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    firebullet();
  }
});
createEnemies(3,6)

