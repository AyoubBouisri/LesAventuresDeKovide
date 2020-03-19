// define the cursor
var cursorObj;
let cursor_basic, cursor_info;

// global variables for the first room (office room). disgusting js
var officeRoom;
let office_background;
let screwdriver_img, rope_img, lock_img, inventory_img;

var currentRoom = null;

//INVENTORY
var inventory;

function preload() {
    // * for some reason these end up as global variables used in the defined class 
    // so maybe we dont need to define global variables up there ?? investigate
    office_background = loadImage("assets/officeBackground.png");
    screwdriver_img = loadImage("assets/screwDriver.png");
    rope_img = loadImage("assets/rope.png");
    lock_img = loadImage("assets/lock.png");
    inventory_img = loadImage("assets/inventory.png");

    cursor_basic = loadImage("assets/handCursor.png");
    cursor_info = loadImage("assets/magnifier.png");

}

function setup() {
    // METHOD RUN ONCE WHEN THE PROGRAM IS STARTED
    // set up canvas and base variables
    createCanvas(1000, 923);

    //setup inventory
    inventory = new Inventory();

    // setup rooms and current room
    officeRoom = new OfficeRoom();
    currentRoom = officeRoom;


    // set up cursor
    cursorObj = new CursorObj();
    cursorObj.show();

}

function draw() {
    // METHOD RUN MANY TIMES PER SECOND INFINTE LOOP
    // put drawing code here
    background(100);
    currentRoom.show();


    this.inventory.show();

}


function mouseMoved() {
    if (currentRoom != null) {
        currentRoom.mouseOver(mouseX, mouseY);
    }
}

function mouseClicked() {
    // interaction outside the inventory
    var itemsTemp = currentRoom.items
    for (var i = 0; i < itemsTemp.length; i++) {
        if (itemsTemp[i].contains(mouseX, mouseY)) {
            // Add an item in the inventory on mouseClick (temporary)
            if (itemsTemp[i].pickable) {
                const item = new Item(itemsTemp[i].posX, itemsTemp[i].posY, 145, 100, itemsTemp[i].base_image, itemsTemp[i].name);
                inventory.addItem(item);
                itemsTemp.splice(i, 1);
            }
            // TODO : Interaction with other objects
        }
    }
}