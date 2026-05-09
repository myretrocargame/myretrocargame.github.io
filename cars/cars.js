//board
let board;
let boardWidth = 800;
let boardHeight = 800;
let context;

//red_car
let red_carWidth = 80;
let red_carHeight = 170;
let red_carX = 425;
let red_carY = 590;
let velocityX = 0;
let red_carImg;

let red_car = {
    x : red_carX,
    y : red_carY,
    width : red_carWidth,
    height : red_carHeight
}

//white_car
let white_carWidth = 80;
let white_carHeight = 170;
let white_carX = 425;
let white_carY = 0-white_carHeight;

let white_carimg;
let green_carimg;

let velocityY = 8;

let road_y=-76;
let velocityRoad = 4;
let farwardCheck = 1;

let other_carimg;

let white_car = {
    x : white_carX,
    y : white_carY,
    width : white_carWidth,
    height : white_carHeight
}

let explosion = {
    src: "./explosion.gif",
    width : 150,
    height : 150
}

//tree
let treeWidth = 200;
let treeHeight = 200;
let treeX = 10
let treeY = 0-treeHeight;
let treeImg;
let treeArray = [];

let tree = {
    x : treeX,
    y : treeY,
    width : treeWidth,
    height : treeHeight,
    img: 0
}

//coin
let coinWidth = 50;
let coinHeight = 50;
let coinX = 460;
let coinY = 0-coinHeight;
let coinImg;
let coin_count = 0;
let coin_count_not = 1450;

let coin = {
    x : coinX,
    y : coinY,
    width : coinWidth,
    height : coinHeight,
}

//bush
let bushWidth = 160;
let bushHeight = 160;
let bushX = 30
let bushY = 0-bushHeight
let bushImg

let bush = {
    x : bushX,
    y : bushY,
    width : bushWidth,
    height : bushHeight,
    img: 0
}

//unmute
let unmuteWidth = 40;
let unmuteHeight = 40;
let unmuteX = 5
let unmuteY = 5
let unmuteImg

let unmute = {
    x : unmuteX,
    y : unmuteY,
    width : unmuteWidth,
    height : unmuteHeight,
    img: 0
}

//unmute_x
let unmute_xWidth = 40;
let unmute_xHeight = 40;
let unmute_xX = 2
let unmute_xY = 5
let unmute_xImg

let unmute_x = {
    x : unmute_xX,
    y : unmute_xY,
    width : unmute_xWidth,
    height : unmute_xHeight,
    img: 0
}

let abcd = 0;

let score = 1;

let levels = 1;

let ding = null;

let is_music_playing = 1;

let music = null;
let music_start = 0;
let gameOver = false

window.onload = function(){

    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board
    
    //load images
    red_carImg = new Image ();
    red_carImg.src  = "./red_car.png";

    white_carImg = new Image();
    white_carImg.src = "./white_car.png";

    green_carImg = new Image();
    green_carImg.src = "./green_car.png";

    roadImg = new Image();
    roadImg.src = "./new_road.png";

    treeImg = new Image();
    treeImg.src = "./tree.png";

    bushImg = new Image();
    bushImg.src = "./bush.png";

    unmuteImg = new Image();
    unmuteImg.src = "./unmute.png";

    unmute_xImg = new Image();
    unmute_xImg.src = "./unmute_x.png";

    coinImg = new Image();
    coinImg.src = "./coin.png";

     music = new Audio();
    //music.muted = true;
    //music.autoplay = false;
    music.src = "./music.mp3";

    ding = new Audio();
    ding.src = "./ding.mp3";

//    let music = document.getElementById("music.mp3");

    other_carimg = white_carImg;
    
    bush.img = bushImg;

    tree.img = treeImg;

    window.onload = function() {
        context.drawImage(roadImg, 0, 0, 800, 1000);
        context.drawImage(red_carImg, red_car.x, red_car.y, red_car.width, red_car.height);
        context.drawImage(other_carimg, white_car.x, white_car.y, white_car.width, white_car.height);
        context.drawImage(coinImg, coin.x, coin.y, coin.width, coin.height);
        //context.drawImage(treeImg, tree.x, tree.y, tree.width, tree.height);
        context.drawImage(unmuteImg, unmute.x, unmute.y, unmute.width, unmute.height);
        //context.drawImage(unmute_xImg, unmute_x.x, unmute_x.y, unmute_x.width, unmute_x.height);
    };

    requestAnimationFrame(update);
    setInterval(plants, 2000); //every 2.0 seconds
    document.addEventListener("keydown", moveCar);
    setTimeout(playMusic, 1000);
    document.addEventListener("click", click);
    document.addEventListener("keydown", farward);
}

  function playMusic() {
      music.play();
  }

function update() {
    
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    // road
    road_y += velocityRoad;
    if (road_y>=2) road_y = -76;
    context.drawImage(roadImg, 0, road_y, 800, 1000);

    //red_car
    red_car.x = Math.min(425, Math.max(red_car.x + velocityX, 290)); //apply gravity to current bird.y, limit the bird.y to top of the canvas
    context.drawImage(red_carImg, red_car.x, red_car.y, red_car.width, red_car.height);
    
    //white_car
    white_car.y += velocityY;
    context.drawImage(other_carimg, white_car.x, white_car.y, white_car.width, white_car.height);

    //coin
    coin.y += velocityRoad;
    context.drawImage(coinImg, coin.x, coin.y, coin.width, coin.height);

    //unmute
    context.drawImage(unmuteImg, unmute.x, unmute.y, unmute.width, unmute.height);

    //unmute_x
    context.drawImage(unmute_xImg, unmute_x.x, unmute_x.y, unmute_x.width, unmute_x.height);

    //tree
    for (let i = 0; i < treeArray.length; i++) {
        let a_tree = treeArray[i];
        a_tree.y += velocityRoad;
        context.drawImage(a_tree.img, a_tree.x, a_tree.y, a_tree.width, a_tree.height);
        context.drawImage(bush.img, bush.x, bush.y, bush.width, bush.height);
    }

    //white_car
        if (white_car.y > 800 + white_carHeight ){

            white_car.y = 0-white_carHeight;
            
          //  cars_place = Math.random()

                if (Math.random() >= 0.5) {
            white_car.x = 425;
        }
        else{
            white_car.x = 290;
        }
        //if (Math.random() <= 0.666666) {
        //    white_car.x = 100;
      //  }

        if (Math.random() >= 0.5){
            other_carimg = white_carImg;
        } else {
            other_carimg = green_carImg;
        }
        }

        //coin
        if (coin.y > 750 + coinHeight ){
            //coin_count_not = 1;
            coin.y = 0-coinHeight;

                if (Math.random() >= 0.5) {
            coin.x = 460;
        }
        else {
            coin.x = 325;
        }
    }


    let word_level = "level";
    let word_coins = "coins";

    context.fillStyle = "black";
    context.font="39px sans-serif";
        context.fillText(score, 10, 100,);

        context.fillStyle = "black";
        context.font="39px sans-serif";
            context.fillText( levels, 700, 100,);

        context.fillStyle = "black";
        context.font="39px sans-serif";
            context.fillText(word_level, 670, 70,);

            context.fillStyle = "black";
            context.font="39px sans-serif";
                context.fillText( coin_count, 700, 200,);
    
            context.fillStyle = "black";
            context.font="39px sans-serif";
                context.fillText(word_coins, 670, 170,);
    

    if( white_car.y == 0-white_carHeight){
        score = score + 1;
    }

    if(coin_count_not == 1){
        if(coin_count > 2){
            if(coin_count/3.0 ==  Math.floor(coin_count/3.0)){
                coin_count_not = 2;
              //  if(levels < 4){
                velocityY = velocityY + 2;
                //}
                //else{
                //    velocityY = velocityY + 1.2;
                //}
                levels = levels + 1;
                velocityRoad = velocityRoad + 1;
                ding.play();
            
            }
        }
    }

    if (detectCollision(red_car, white_car)) {

        gameOver = true;

        music.pause();

        context.fillStyle = "white";
        context.font="39px sans-serif";
            context.fillText("GAME OVER", 281, 200,);

            let div = document.getElementById("overlay");
            let canvas_rect = document.getElementById("board").getBoundingClientRect();
            let img = document.createElement('img');
            img.id = "overlay_image_";
            img.style.position = "absolute";
            img.style.top = canvas_rect.y + red_car.y + (red_car.height / 2) - (explosion.height /2) + "px";
            img.style.left = canvas_rect.x + red_car.x + (red_car.width / 2) - (explosion.width /2) + "px";
            img.style.height = explosion.height + "px";
            img.style.width = explosion.width + "px";
            img.src = explosion.src;
            div.appendChild(img);
    
    }

    if (detectCollision(red_car, coin)) {
        coin.y = 799 + coinHeight;
        coin_count = coin_count + 1;
        coin_count_not = 1;
    }

    while ((treeArray.length > 0) && (treeArray[0].y > boardHeight)) {
       treeArray.shift(); //removes first element from the array
       abcd = abcd-1
    }
}

function click (e){
    let rect = document.getElementById("board").getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;


     if (mouseX >= unmute.x && mouseX <= unmute.x + unmute.width && mouseY >= unmute.y && mouseY <= unmute.y + unmute.height) {
        if (is_music_playing == 1){
            // music.pause();
            // unmute_x.x = 2;
            // is_music_playing = 2;
            music.play();
            unmute_x.x = -50;
            is_music_playing = 2;    
        }
        else{
            // music.play();
            // unmute_x.x = -50;
            // is_music_playing = 1; 
             music.pause();
             unmute_x.x = 2;
             is_music_playing = 1;   
        }
    }

}

function moveCar(e) {
    if (e.code == "ArrowLeft" || e.code == "KeyA") {
        velocityX = -8;
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD") {
        velocityX = +8;
    }
}

function farward(e) {
    if ( farwardCheck == 1) {
        if (e.code == "ArrowUp" || e.code == "KeyW") {
            velocityRoad = velocityRoad + 3;
            velocityY = velocityY + 2;
            farwardCheck = 2;
        }
    }

    if (farwardCheck == 2) {
        if (e.code == "ArrowDown" || e.code == "KeyS") {
            velocityRoad = velocityRoad - 3;
            velocityY = velocityY - 2;

            farwardCheck = 1;
        }
    }
}

function plants() {
    let a_tree = Object.assign({}, tree);
    let a_bush = Object.assign({}, bush);
    let other_plant
    if (Math.random() >= 0.5){
        other_plant = a_tree;
    } else {
        other_plant = a_bush;
    }
    treeArray[abcd] = other_plant;
    abcd = abcd+1;

    //if (Math.random() >= 0.5){
    //    other_plant = a_tree;
    //} else {
    //    other_plant = a_bush;
    //}

    if (Math.random() >= 0.5) {
        other_plant.x = 10;
    }
    else {
        other_plant.x = (boardWidth-10)-treeWidth;
    }
}


function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}