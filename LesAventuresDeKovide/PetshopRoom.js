function PetshopRoom() {
    this.backgroundImg = petshop_background;
    this.name = 'Animalerie';
    this.enter_petshop = false;

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

    var goto_office_func = function () {
        currentRoom = officeRoom;
        currentDialogue = null;
    }

    var has_rope_func = function () {
        currentDialogue = boatman_knot_dialogue;
    }

    var boatman_knot_func = function () {
        currentDialogue = null;
        inventory.removeItem(inventory[0]);
    }

    rope_missing_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'J\'ai réussi à atteindre la nouvelle salle! Oh non.. la grille est trop haute pour sortir, mais comment descendre? Je pense avoir aperçu une corde dans le bureau. Je devrais y retourner pour le prendre!', grille_img , goto_office_func);
    grille_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'J\'ai réussi à atteindre la nouvelle salle! Oh non.. la grille est trop haute pour sortir, mais comment descendre? Ah oui, la corde! Étant un bon louveteau, je suis capable de faire un noeud de batelier pour fixer la corde.', rope_img, has_rope_func);
    boatman_knot_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Défi : Utilise ta corde à noeud pour faire un noeud de batelier.\n Quand tu as réussis, clique sur le bouton et poursuis l’aventure.', rope_img, boatman_knot_func);
    grille_goback_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Je peux retourner au bureau grâce à mon noeud de batelier! Devrais-je y retourner ? ', grille_img, goto_office_func);

    this.greenBarrel = new Item(220, 270, 110, 150, green_barrel_img, 'baril biologique', true, basic_dialogue);
    this.redBarrel = new Item(350, 270, 110, 150, red_barrel_img, 'baril chimique', true, basic_dialogue);
    this.yellowBarrel = new Item(280, 310, 110, 150, yellow_barrel_img, 'baril radioactif', true, basic_dialogue);
    this.computer = new Item(630, 590, 210, 130, null, 'ordinateur', false, basic_dialogue);
    this.grille = new Item(730, 40, 190, 100, null, 'grille', false, rope_missing_dialogue);

    this.items = [this.grille, this.greenBarrel, this.redBarrel, this.yellowBarrel, this.computer];


    this.show = function () {
        image(this.backgroundImg, 0, 0);
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].show();
        }

        this.ropeChallenge();
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

    }

    this.ropeChallenge = function () {
        if (!this.enter_petshop) {
            // Boatman's knot challenge
            if (inventory.contains_item_name('rope')){
                this.grille.dialogueBox = grille_dialogue;
                this.enter_petshop = true;
            } else {
                this.grille.dialogueBox = rope_missing_dialogue;
            }
            currentDialogue = this.grille.dialogueBox;
        } else {
            // Return to the office room if challenge successfull
            if (!inventory.contains_item_name('rope')) {
                this.grille.dialogueBox = grille_goback_dialogue;
            }
        }
    }

}
