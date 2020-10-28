"use strict";
let imagePaths = { "W": "img/wall.png", " ": "img/floor.png", "B": "img/box.png", "G": "img/goal.png", "P": "img/player.png" };
let player;
let numGoals = 0;
let tileMap = tileMap02;
function StartGame() {
    let cols = "";
    let map = document.getElementById("map");
    for (let y = 0; y < tileMap.mapGrid.length; y++) {
        for (let x = 0; x < tileMap.mapGrid[0].length; x++) {
            if (y == 0)
                cols += "1fr ";
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
    map.style = "grid-template-columns: " + cols;
}
function Move(vx, vy) {
    let tiles = [document.getElementById("x" + player.x + "y" + player.y), document.getElementById("x" + (player.x + vx) + "y" + (player.y + vy)), document.getElementById("x" + (player.x + vx + vx) + "y" + (player.y + vy + vy))];
    let tileTypes = [tiles[0].src, tiles[1].src, tiles[2]?.src];
    let moveIsOk = false;
    if (tileTypes[1].endsWith(imagePaths["G"]) || tileTypes[1].endsWith(imagePaths[" "])) 
        moveIsOk = true;
    else if (tileTypes[1].endsWith(imagePaths["B"]) && (tileTypes[2].endsWith(imagePaths[" "]) || tileTypes[2].endsWith(imagePaths["G"]))) {
        moveIsOk = true;
        if (tileTypes[2].endsWith(imagePaths["G"]))
            numGoals--;
        if (tileMap.mapGrid[player.y + vy][player.x + vx][0] == "G")
            numGoals++;
        tiles[2].src = imagePaths["B"];
        if (numGoals === 0)
            document.getElementsByTagName("h2")[0].innerText = "YOU WIN!";
    }
    if (moveIsOk) {
        tiles[0].src = tileMap.mapGrid[player.y][player.x][0] === "G"? imagePaths["G"] : imagePaths[" "];
        tiles[1].src = imagePaths["P"];
        player.x += vx;
        player.y += vy;
    }
}
window.addEventListener("keydown", function (event) {
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