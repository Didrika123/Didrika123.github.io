"use strict";
let imagePaths = { "W": "img/wall.png", " ": "img/floor.png", "B": "img/box.png", "G": "img/goal.png", "P": "img/player.png" };
let player;
let numGoals;
let tileMap = tileMap01;
function StartGame() {
    numGoals = 0;
    let map = document.getElementById("map");
    for (let y = 0; y < tileMap.mapGrid.length; y++) {
        for (let x = 0; x < tileMap.mapGrid[0].length; x++) {
            let tile = document.createElement("img");
            tile.id = "x" + x + "y" + y;
            let tileType = tileMap.mapGrid[y][x][0];
            tile.src = imagePaths[tileType];
            if (tileType == "P")
                player = { x, y };
            else if (tileType == "G")
                numGoals++;
            map.appendChild(tile)
        }
    }
    map.style = "grid-template-columns: repeat(" + tileMap.mapGrid[0].length +", 1fr)";
}
function Move(vx, vy) { //Index 0: tile where player stands, Index 1: tile where player want to move, Index 2: Where player wanna move + 1
    let tiles = [document.getElementById("x" + player.x + "y" + player.y), document.getElementById("x" + (player.x + vx) + "y" + (player.y + vy)), document.getElementById("x" + (player.x + vx + vx) + "y" + (player.y + vy + vy))];
    let tileTypes = [tiles[0].src, tiles[1]?.src, tiles[2]?.src];
    let moveIsOk = false;
    if (tileTypes[1]?.endsWith(imagePaths["G"]) || tileTypes[1]?.endsWith(imagePaths[" "])) 
        moveIsOk = true;
    else if (tileTypes[1]?.endsWith(imagePaths["B"]) && (tileTypes[2]?.endsWith(imagePaths[" "]) || tileTypes[2]?.endsWith(imagePaths["G"]))) {
        moveIsOk = true;
        if (tileTypes[2].endsWith(imagePaths["G"])) //If box end up on goal, reduce remaining goals
            numGoals--;
        if (tileMap.mapGrid[player.y + vy][player.x + vx][0] == "G") //If box end up outside goal, increase remaining goals
            numGoals++;
        tiles[2].src = imagePaths["B"];
        if (numGoals === 0) //Win game when boxes placed on all goals
            Reset(true);
    }
    if (moveIsOk) {
        tiles[0].src = tileMap.mapGrid[player.y][player.x][0] === "G"? imagePaths["G"] : imagePaths[" "];
        tiles[1].src = imagePaths["P"];
        player.x += vx;
        player.y += vy;
    }
}
window.addEventListener("keydown", function (event) {
    if(newgameFrame > 0){ //If loading new map, deny player movement
        event.preventDefault();
        return;
    }
    if (event.key == "w" || event.key == "ArrowUp")
        Move(0, -1);
    else if (event.key == "a" || event.key == "ArrowLeft")
        Move(-1, 0);
    else if (event.key == "s" || event.key == "ArrowDown")
        Move(0, 1);
    else if (event.key == "d" || event.key == "ArrowRight")
        Move(1, 0);
    event.preventDefault(); //Cancel default action (aka move page up/down etc)
}, true);
let newgameFrame = 0;
let newgameInterval;
function Reset(won)
{
    clearInterval(newgameInterval)
    newgameInterval = setInterval(NewGameFun, 100, won);
}
function NewGameFun(won)
{
    if (newgameFrame >=  tileMap.mapGrid[0].length){ //Start new game when faded out
        if(won)
            tileMap = tileMap == tileMap01? tileMap02 : tileMap01; 
        document.getElementById("map").innerHTML = ""; //Clear all html tiles
        StartGame();
        clearInterval(newgameInterval);
        newgameFrame = 0;
    }
    else { //Fade out
        for (let y = 0; y < tileMap.mapGrid.length; y++) 
            document.getElementById("x" + newgameFrame + "y" + y).src = imagePaths["G"];
        newgameFrame++;
    }
}