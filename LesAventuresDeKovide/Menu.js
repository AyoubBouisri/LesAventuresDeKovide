function Menu() {
    this.blackboard = blackboard_img;
    this.character = kovide_img;
    var dialogue_w = 900;
    var dialogue_h = 500;
    this.game = 'Les aventures de Kovide – 1';
    this.subtitle = 'Le laboratoire';
    this.description = 'Introduction  – En attendant dans une clinique de dépistage, Kovide, le jeune louveteau aventurier, entend un médecin parler d’un trésor incroyable qu’il cache dans son bureau. Il n’en fallait pas plus à Kovide pour partir à l’aventure.';
    

    var play_game_func = function () {
        currentDialogue = null;
        currentRoom = officeRoom;
        inventory.isOpened = true;
    }

    begin_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Appuie sur le bouton « Jouer » pour commencer l\'aventure. ', null, play_game_func, 'Jouer');


    this.begin = new Item(740, 165, 150, 150, exit_img, 'commencer', false, begin_dialogue);
    this.items = [this.begin];

    this.show = function() {
        inventory.isOpened = false; 

        background('white');
        this.blackboard.resize(800, 800);
        image(this.blackboard, 185, 30);
        image(this.character, 0, 20);
        this.addText(this.game, 320, 245, 350, 40, 25, 255);
        this.addText(this.subtitle, 400, 350, 400, 80, 60, 255);
        this.addText(this.description, 315, 460, 550, 150, 25, 255);

        this.begin.dialogueBox = null;
        this.begin.show();

    }

    this.addText = function(message, x, y, width, height, size, color) {
        fill(color);
        textSize(size);
        text(message, x, y, width, height);
    }

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

    this.mouseClicked = function (mouseX, mouseY) {
        if (this.begin.contains(mouseX, mouseY)) {
           play_game_func();
        }
    }


    this.keyReleased = function (key) {

    }
}