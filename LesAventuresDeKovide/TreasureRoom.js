function TreasureRoom() {
    this.backgroundImg = treasure_background;
    this.name = 'Trésor';
    this.items = [];
    // Create a bunch of dialogue boxes and link them with the right objects
    // one dialogue box per object should do the trick see DialogueBox.js
    var dialogue_w = 900;
    var dialogue_h = 500;
    basic_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'whatever', null);
    var pickup_func = function (old_item) {
        console.log(old_item);
        inventory.addItem(old_item);
        index = currentRoom.items.indexOf(old_item);
        currentRoom.items.splice(index, 1);
        //close dialogue
        currentDialogue = null;
    };


    this.show = function () {
        image(this.backgroundImg, 0, 0);
    };

    this.mouseOver = function (mouseX, mouseY) {
        // method called everytime a mouse is moved. 
        // Every office object needs to hve it. maybe should of made a base class ...

        var something_is_hovered = false;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].contains(mouseX, mouseY)) {
                cursorObj.setState(1);
                this.items[i].is_hovered = true;
                something_is_hovered = true;
            } else {
                this.items[i].is_hovered = false;
            }


        }

        if (!something_is_hovered) {
            cursorObj.setState(0);
        }
    }

    this.mouseReleased = function (mouseX, mouseY) {

    }
}
