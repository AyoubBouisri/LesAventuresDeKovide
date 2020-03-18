// first room of the game

let office_background;

function preload() {
    office_background = loadImage("assets/bureau-background.png");
    officeRoom = new Room(office_background)
}

function setup() {
    // put setup code here
    createCanvas(1000, 923)

}

function draw() {
    // put drawing code here
    background(100);
    officeRoom.show();
}