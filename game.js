const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

console.log(gameArea);


startScreen.addEventListener('click' , start);

let player = {speed : 5, score:0};

let keys = { ArrowUp:false,  ArrowDown:false,
    ArrowLeft:false, ArrowRight:false}


document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
e.preventDefault();
keys[e.key]=true;
//console.log(e.key);
console.log(keys);
}

function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom)
     || (aRect.right < bRect.left) || (aRect.left > bRect.right));

}

function moveLines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){

        if(item.y >= 700){
            item.y -= 750;
        }


        item.y += player.speed;
        item.style.top = item.y + "px";


    });
}

function endGame(){
    player.start=false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your Final Score "+player.score +  "<br>Press Here To Restart Your Game.";
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item){

        if(isCollide(car, item)){
            console.log('enemy is hit');
            endGame();
        }

        if(item.y >= 750){
            item.y = -300;
            item.style.left=Math.floor(Math.random() * 350) +"px";
        }


        item.y += player.speed;
        item.style.top = item.y + "px";


    });
}

function keyUp(e){
 e.preventDefault();
 keys[e.key]= false;
 //console.log(e.key);
 console.log(keys);
}

function gamePlay(){
    console.log("Start Game");
    let car=document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    console.log(road);

    if(player.start){

        moveLines();
        moveEnemy(car) ;



        if(keys.ArrowUp && player.y>(road.top +50)) {player.y-=player.speed}
        if(keys.ArrowDown && player.y<(road.bottom-85)){player.y+=player.speed}
        if(keys.ArrowLeft && player.x>0){player.x-=player.speed}
        if(keys.ArrowRight && player.x<(road.width-50)){player.x+=player.speed}

        car.style.top = player.y+ "px";
        car.style.left = player.x+ "px";

    window.requestAnimationFrame(gamePlay);
    console.log(player.score++);

    player.score++;
    let ps =player.score - 2;
    score.innerHTML ="Score: " + ps;
}

}

function start(){
    //gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML="";

    player.start = true; 
    player.score =0;
    window.requestAnimationFrame(gamePlay);

    for(x=0; x<5; x++){
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class','lines');
    roadLine.y = (x*145);
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);

    }


    let car = document.createElement('div');
    car.setAttribute('class','car');
    //car.innerText="hay i am your car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;



    //console.log("top position"+car.offsetTop);
    //console.log("left position"+car.offsetLeft);

    for(x=0; x<3; x++){
        let anemyCer = document.createElement('div');
        anemyCer.setAttribute('class','enemy');
        anemyCer.y = ((x+1) * 350) *-1;
        anemyCer.style.top = anemyCer.y + "px";
        anemyCer.style.backgroundColor='blue';
        anemyCer.style.left=Math.floor(Math.random() * 350) +"px";
        gameArea.appendChild(anemyCer);
    
        }
}

function randomColor(){

    function c(){
        let hex =Math.floor(Math.random() *256).toString(16);
        return("0"+String(hex)).substring(-2);
    }
    return "#"+c()+c()+c();
}




