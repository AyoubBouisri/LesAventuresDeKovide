function RatsRoom() {
    this.backgroundImg = cage_background;
    this.name = 'Cage';
    this.gameOver = false;
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
    }

    var goto_petshop_func = function () {
        currentRoom = petshopRoom;
        currentDialogue = null;
    }

    var reset_game_func = function() {
        setup();
        currentDialogue = null;
    }

    rat_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Quel rat devrais-je donner à boire avec ma fiole ? ', null);
    rat_after_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Et si j\'avais nourrit une autre souris, que serait-il passé ? ', null);
    kim_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Wow! La souris va super bien. Le vaccin a fonctionné. Quel indice permettrait d\'ouvrir la salle au trésor.', kim_img, goto_petshop_func, 'Retourner');
    dead_rat_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Ouff... ce n’était pas la bonne souris. Il n’y a plus de vaccin. Ne reste plus qu’à retourner dans la salle d’attente, mais pas de trésor.', dead_mouse_img, reset_game_func, 'Réessayer');

    exit_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'C\'est la direction pour retourner à l\'animalerie', null, goto_petshop_func, 'Retourner');


    this.rat7 = new Item(60, 220, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat8 = new Item(200, 220, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat9 = new Item(360, 220, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat10 = new Item(510, 220, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat11 = new Item(650, 220, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat12 = new Item(790, 220, 130, 100, null, 'dead', false, rat_dialogue);

    this.rat13 = new Item(60, 380, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat14 = new Item(200, 380, 100, 100, null, 'alive', false, rat_dialogue);
    this.rat15 = new Item(360, 380, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat16 = new Item(510, 380, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat17 = new Item(650, 380, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat18 = new Item(790, 380, 130, 100, null, 'dead', false, rat_dialogue);

    this.rat19 = new Item(60, 530, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat20 = new Item(200, 530, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat21 = new Item(360, 530, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat22 = new Item(510, 530, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat23 = new Item(650, 530, 100, 100, null, 'dead', false, rat_dialogue);
    this.rat24 = new Item(790, 530, 130, 100, null, 'dead', false, rat_dialogue);

    this.exit = new Item(820, 40, 150, 150, exit_img, 'sortie', false, exit_dialogue);
    this.alldeadrats = [this.rat7, this.rat8, this.rat9, this.rat10, this.rat11, this.rat12, this.rat13, this.rat15, this.rat16, this.rat17, this.rat18, this.rat19, this.rat20, this.rat21, this.rat22, this.rat23, this.rat24];
    this.items = [this.exit];


    this.show = function () {
        image(this.backgroundImg, 0, 0);
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].show();
        }
        if (has_fiole) {
            this.activeInteractions();
        }

        if (this.gameOver) {
            currentDialogue = dead_rat_dialogue;
        }
    }

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
        let kim_index = this.items.indexOf(this.rat14);
        if (itemHeld.name === 'fiole') {
            if (this.items[kim_index].contains(mouseX, mouseY)) {
                this.items[kim_index].dialogueBox = kim_dialogue;
                this.changeRatDialog();
                inventory.removeItem(itemHeld);
            } else if (this.feedBadRat()){
                this.gameOver = true;
                inventory.removeItem(itemHeld);
            }
        }
    }

    this.activeInteractions = function () {
        for (let rat of this.alldeadrats) {
            this.items.push(rat);
        }
        this.items.push(this.rat14);
        has_fiole = false;
    }

    this.feedBadRat = function () {
        for (let rat of this.alldeadrats) {
            if (rat.contains(mouseX, mouseY)) {
                let index = this.items.indexOf(rat);
                this.items[index].dialogueBox = dead_rat_dialogue;
                return true;
            }
        }
        return false;
    }

    this.changeRatDialog = function () {
        for (let rat of this.alldeadrats) {
            let index = this.items.indexOf(rat);
            this.items[index].dialogueBox = rat_after_dialogue;
        }

    }

    this.keyReleased = function(key) {
    }


}