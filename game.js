
let entities = [];
let world;
let screen;
let keypresses = [];
let cam_x = 0;
let cam_x_timer = 0;
let cam_y = 0;

function startGame() {
    myGameArea.start();
    screen = myGameArea;
    screen.context.font = this.width + " " + this.height;
    screen.context.fillStyle = "green";
    screen.context.fillText("Hello Wold", 15, 55);
    entities[0] = entity;
    world = World;
}

let myGameArea =
{
    canvas: document.getElementsByTagName("canvas")[0],
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.interval = setInterval(update, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function update() {
    screen.clear();
    let entity = entities[0];
    //screen.context.fillStyle = entity.col;
    //screen.context.fillRect(entity.x, entity.y, entity.w, entity.h);
    world.update();
    entity.update();
    cam_x_timer += 0.1;
    cam_x = Math.floor(cam_x_timer);
}
let World = {
    img: new Image(),
    x1: 0,
    img2: new Image(),
    x2: 192,
    update: function () 
    {
        this.img.src = "img\\world.png";
        //if(cam_x%120)
        screen.context.drawImage(this.img, 0, 0, 192, 32, -cam_x , 0, screen.canvas.width, screen.canvas.height);
        screen.context.drawImage(this.img2, 0, 0, 192, 32, -cam_x , 0, screen.canvas.width, screen.canvas.height);
    }
}
let entity =
{
    x: 5,
    y: 15,
    w: 0,
    h: 0,
    vx: 0,
    vy: 0,
    img: new Image(),
    col: "rgb(200,20,20)",//"#ff0000",
    timer: 0,
    update: function () {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y + this.h >= screen.canvas.height) 
            this.y = screen.canvas.height- this.w;
        if(this.y < 0)
            this.y = 0;
        if (this.x + this.w >= cam_x + screen.canvas.width ) 
            this.x = cam_x + screen.canvas.width - this.w;
        if(this.x < cam_x )
            this.x = cam_x ;
        let colors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.col = "rgb(" + colors[0] + "," + colors[1] + "," + colors[1] + ")";

        this.h = this.w = (this.y * 25) / screen.canvas.height + 100 ;
        
        this.vy = Direction(keypresses["ArrowDown"], keypresses["ArrowUp"], 3);
        this.vx = Direction(keypresses["ArrowRight"], keypresses["ArrowLeft"], 5);

        if(this.vx != 0 || this.vy != 0)
            this.timer += 0.2;
        else this.timer = 0;
        this.timer %= 3;
        if(this.vx < 0)
            this.img.src = "img\\unicorn_flip.png";
        else
            this.img.src = "img\\unicorn.png";

        screen.context.drawImage(this.img, Math.floor(this.timer)*32, 0, 31.5, 32, this.x - cam_x, this.y, this.w, this.h);
    }
}
function Direction(key1, key2, speed)
{
    if(key1)
        return speed;
    if(key2)
        return -speed;
    return 0;
}
window.addEventListener("keydown", function (event) {
    keypresses[event.key] = true;
    event.preventDefault(); //Cancel the default action to avoid it being handled twice
}, true);
  window.addEventListener("keyup", function (event) {
    keypresses[event.key] = false;
    event.preventDefault(); //Cancel the default action to avoid it being handled twice
}, true);
