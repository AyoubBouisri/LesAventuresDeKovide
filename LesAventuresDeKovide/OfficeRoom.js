function OfficeRoom() {
    this.backgroundImg = office_background;
    // Create a bunch of dialogue boxes and link them with the right objects
    // one dialogue box per object should do the trick see DialogueBox.js
    var dialogue_w = 900;
    var dialogue_h = 500;
    basic_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'whatever', null);
    screwdriver_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Woah ! Un tournevis étoilé ! Je devrais peut-être le prendre ... on sait jamais quand il pourra me servir. Je vais pas oublier de le ramener quand j\'aurais terminé ! ', screwdriver_img);
    rope_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Je me demande comment cette corde a bien pu finir la ... Quelqu\'un l\'a peut-être oublié ici. Pourquoi pas la prendre et lui redonner plus-tard ! ', rope_img);

    // define items hardcoded the fuck out
    this.screwdriver = new Item(830, 430, 120, 100, screwdriver_img, 'screwdriver', true, screwdriver_dialogue);
    this.rope = new Item(350, 620, 200, 100, rope_img, 'rope', true, rope_dialogue);
    this.lock = new Item(180, 360, 80, 80, lock_img, 'lock', false, basic_dialogue)

    this.library = new Item(260, 200, 130, 370, null, 'library', false, basic_dialogue);
    this.periodicTable = new Item(410, 270, 80, 80, null, 'periodic table', false, basic_dialogue);
    this.grille = new Item(800, 530, 120, 40, null, 'grille', false, basic_dialogue);

    this.items = [this.grille, this.screwdriver, this.rope, this.lock, this.library, this.periodicTable];




    this.show = function() {

        image(this.backgroundImg, 0, 0);

        for (var i = 0; i < this.items.length; i++) {
            this.items[i].show();
        }


    }

    this.mouseOver = function(mouseX, mouseY) {
        this.mouseOver = function(mouseX, mouseY) {
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
    }


    this.keyReleased = function() {

    }
}