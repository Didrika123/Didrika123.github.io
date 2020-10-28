"use strict";

let keypresses = [];
class Entity{
    constructor(id, x, y){
        this.id = id;
        this.x = x;
        this.y = y;
    }
}
let player = new Entity(0, 0,0);
let numGoals = 0;
StartGame();

function StartGame()
{
    let imagePaths = {"W": "img/wall.png", " ": "img/floor.png", "B": "img/box.png", "G": "img/goal.png", "P": "img/player.png"};
    let cols = "";
    for (let y = 0; y < tileMap01.height; y++) {
        for (let x = 0; x < tileMap01.width; x++) {
            if(y == 0)
                cols += "1fr ";
            let tile = document.createElement("img");
            tile.id = "x" + x + "y" + y;
            let tileType = tileMap01.mapGrid[y][x][0];
            tile.setAttribute("src", imagePaths[tileType]);
            if(tileType == "P")
                player = new Entity("P", x, y);
            if(tileType == "G")
                numGoals++;
            document.getElementById("map").appendChild(tile)
        }
    }
    document.getElementById("map").style = "grid-template-columns: " + cols;
}
function Update()
{
    if(keypresses["w"] || keypresses["ArrowUp"])
        Move(0, -1);
    else if(keypresses["s"] || keypresses["ArrowDown"])
        Move(0, 1);
    else if(keypresses["a"] || keypresses["ArrowLeft"])
        Move(-1, 0);
    else if(keypresses["d"] || keypresses["ArrowRight"])
        Move(1, 0);
}
function Move(vx, vy, isPlayer = false)
{
    let currentTile = document.getElementById("x" + player.x + "y" + player.y );
    let nextTile = document.getElementById("x" + (player.x + vx)+ "y" + (player.y + vy) );
    let nextnextTile = document.getElementById("x" + (player.x + vx + vx)+ "y" + (player.y + vy + vy) );
    let gogo = false;

    let imagePaths = {"W": "img/wall.png", " ": "img/floor.png", "B": "img/box.png", "G": "img/goal.png", "P": "img/player.png"};
    let imagePathsFloor = {"W": "img/floor.png", " ": "img/floor.png", "B": "img/floor.png", "G": "img/goal.png", "P": "img/floor.png"};
    
    
    if(nextTile.getAttribute("src").includes("wall"))
    {

    }
    else if(nextTile.getAttribute("src").includes("goal"))
    {
        gogo = true;     
        nextTile.setAttribute("src", imagePaths["P"])
        currentTile.setAttribute("src", imagePathsFloor[tileMap01.mapGrid[player.y][player.x][0]]);
   
    }
    else if(nextTile.getAttribute("src").includes("floor"))
    {
        gogo = true;
        nextTile.setAttribute("src", imagePaths["P"])
        currentTile.setAttribute("src", imagePathsFloor[tileMap01.mapGrid[player.y][player.x][0]]);
       // Swap(currentTile, nextTile);
    }
    else if(nextTile.getAttribute("src").includes("box"))
    {
        //Move(vx, vy);
        if(nextnextTile.getAttribute("src").includes("floor") || nextnextTile.getAttribute("src").includes("goal")){
            gogo = true;   
            if(nextnextTile.getAttribute("src").includes("goal"))
                numGoals--;
            if(tileMap01.mapGrid[player.y + vy][player.x + vx][0] == "G")
                numGoals++;

            nextTile.setAttribute("src", imagePaths["P"])
            nextnextTile.setAttribute("src", imagePaths["B"])
            currentTile.setAttribute("src", imagePathsFloor[tileMap01.mapGrid[player.y][player.x][0]]);
            
            //Swap(nextTile, nextnextTile);
            //Swap(currentTile, nextTile);
        }
        if(numGoals == 0)
            document.getElementsByTagName("h2")[0].innerText = "YOU WIN!";
        console.log(numGoals);
    }
    
    if(gogo)
    {
        player.x += vx;
        player.y += vy;
    }
}
function Reset(tile, x, y){
    let imagePaths = {"W": "img/wall.png", " ": "img/floor.png", "B": "img/box.png", "G": "img/goal.png", "P": "img/player.png"};
    tile.setAttribute("src", imagePaths[tileMap01.mapGrid[y][x][0]]);
}
function Swap(tile1, tile2)
{
    let temp = tile2.getAttribute("src");
    tile2.setAttribute("src", tile1.getAttribute("src")) ;
    tile1.setAttribute("src", temp);
}
window.addEventListener("keydown", function (event) {
    keypresses[event.key] = true;
    Update();
    event.preventDefault(); //Cancel the default action to avoid it being handled twice
}, true);
  window.addEventListener("keyup", function (event) {
    keypresses[event.key] = false;
    event.preventDefault(); //Cancel the default action to avoid it being handled twice
}, true);
