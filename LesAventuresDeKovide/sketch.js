HEIGHT = 923;
WIDTH = 1000;
// define the cursor
var cursorObj;
let cursor_basic, cursor_info;

var itemHeld = null;

// global variables for the first room (office room). disgusting js
var officeRoom, petshopRoom, treasureRoom;
let office_background;
let screwdriver_img, rope_img, lock_img, inventory_img;

var currentRoom = null;
var currentDialogue = null;
//INVENTORY
var inventory;

function preload() {
    // * for some reason these end up as global variables used in the defined class 
    // so maybe we dont need to define global variables up there ?? investigate
    office_background = loadImage("assets/officeBackground.png");
    petshop_background = loadImage("assets/petshopBackground.png");
    treasure_background = loadImage("assets/treasureBackground.png");
    screwdriver_img = loadImage("assets/screwDriver.png");
    rope_img = loadImage("assets/rope.png");
    lock_img = loadImage("assets/lock.png");
    grille_img = loadImage("assets/grille.png");
    inventory_img = loadImage("assets/inventory.png");

    dialogue_img = loadImage("assets/dialogue.png");
    closeBtn_img = loadImage("assets/closeBtn.png");
    button_img = loadImage("assets/button.png");

    cursor_basic = loadImage("assets/handCursor.png");
    cursor_info = loadImage("assets/magnifier.png");

}

function setup() {
    // METHOD RUN ONCE WHEN THE PROGRAM IS STARTED
    // set up canvas and base variables
    createCanvas(WIDTH, HEIGHT);

    //setup inventory
    inventory = new Inventory();

    // setup rooms and current room
    officeRoom = new OfficeRoom();
    petshopRoom = new PetshopRoom();
    treasureRoom = new TreasureRoom();
    currentRoom = officeRoom;

    dragMode = false;


    // set up cursor
    cursorObj = new CursorObj();
    cursorObj.show();

}

function draw() {
    // METHOD RUN MANY TIMES PER SECOND INFINTE LOOP
    // put drawing code here
    background(100);
    currentRoom.show();

    if (currentDialogue != null) {
        // defonce les fps for some reason
        //filter(BLUR, 3);
        currentDialogue.show();
    }
    this.inventory.show();

}


function mouseMoved() {
    if (currentRoom != null) {
        if (currentDialogue != null) {
            // A dialogue box is open, interact with that and the inventory nothing else
            // Aniomation for the dialogue box and inventory. Could be in an if (contains) but whatever
            currentDialogue.mouseOver(mouseX, mouseY);

        } else {
            currentRoom.mouseOver(mouseX, mouseY);
        }

    }
}

function mouseClicked() {
    // interaction outside the inventory
    var itemsTemp = currentRoom.items;

    if (currentDialogue != null) {
        // A dialogue box is open, interact with that and the inventory nothing else
        // Aniomation for the dialogue box and inventory. Could be in an if (contains) but whatever
        currentDialogue.click(mouseX, mouseY);

    } else {
        for (var i = 0; i < itemsTemp.length; i++) {
            if (itemsTemp[i].contains(mouseX, mouseY)) {
                // Add an item in the inventory on mouseClick (temporary)
                // if (itemsTemp[i].pickable) {
                //     const item = new Item(itemsTemp[i].posX, itemsTemp[i].posY, 145, 100, itemsTemp[i].base_image, itemsTemp[i].name);
                //     inventory.addItem(item);
                //     itemsTemp.splice(i, 1);
                // }
                currentDialogue = itemsTemp[i].dialogueBox;
                cursorObj.setState(0);
                // TODO : Interaction with other objects
            }
        }
    }
}

function mouseDragged() {
    var itemsTemp = inventory.items;
    var offset = {
        x: 50,
        y: 10
    };
    if (itemHeld === null) {
        for (let item of itemsTemp) {
            if (item.contains(mouseX, mouseY)) {
                itemHeld = item;
                return;
            }
        }
    } else {
        itemHeld.setPositions(mouseX - offset.x, mouseY - offset.y);
    }


}

// This function will be call after mouseDragged
function mouseReleased() {
    if (itemHeld) {
        currentRoom.mouseReleased(mouseX, mouseY);
        itemHeld = null;
    }
}

function keyReleased() {
    if (currentRoom.name === 'Bureau') {
        currentRoom.keyReleased(event);
    }
}
