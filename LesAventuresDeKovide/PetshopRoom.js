function PetshopRoom() {
    this.backgroundImg = petshop_background;
    this.name = 'Animalerie';
    this.enter_petshop = false;
    var password = '';
    // Create a bunch of dialogue boxes and link them with the right objects
    // one dialogue box per object should do the trick see DialogueBox.js
    var dialogue_w = 900;
    var dialogue_h = 500;
    basic_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'whatever', null);

    var pickup_func = function(old_item) {
        console.log(old_item);
        inventory.addItem(old_item);
        index = currentRoom.items.indexOf(old_item);
        currentRoom.items.splice(index, 1);
        //close dialogue
        currentDialogue = null;
    }

    var pickup_barrel_func = function(old_item) {
        inventory.addItem(old_item);
        index = currentRoom.items.indexOf(old_item);
        currentRoom.items.splice(index, 1);
        currentDialogue = null;
    }

    var goto_office_func = function() {
        currentRoom = officeRoom;
        currentDialogue = null;
    }

    var has_rope_func = function() {
        currentDialogue = boatman_knot_dialogue;
        inventory.removeItem(inventory[0]);
    }


    var close_dialogue_func = function() {

        currentDialogue = null;
    }

    var keypad_guess_func = function() {
        password.toLowerCase();
        if (password !== '6780') {
            currentDialogue = keypad_guess_dialogue;
        }
    }
    var goto_lab_func = function() {
        currentRoom = laboratoryRoom;
        currentDialogue = null;
    }

    var reset_game_func = function() {
        setup();
        currentDialogue = null;

    }

    rope_missing_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'J\'ai réussi à atteindre la nouvelle salle! Oh non.. la grille est trop haute pour sortir, mais comment descendre? Je pense avoir aperçu une corde dans le bureau. Je devrais y retourner pour le prendre!', grille_img, goto_office_func, 'Retourner');
    grille_rope_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'J\'ai réussi à atteindre la nouvelle salle! Oh non.. la grille est trop haute pour sortir, mais comment descendre? Ah oui, la corde! Étant un bon louveteau, je suis capable de faire un noeud de batelier pour fixer la corde.', rope_img, has_rope_func, 'Continuer');
    boatman_knot_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Défi : Utilise ta corde à noeud pour faire un noeud de batelier.\n Quand tu as réussis, clique sur\n « Réussi » pour poursuivre l’aventure.', rope_img, close_dialogue_func, 'Réussi');
    grille_goback_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Je peux retourner au bureau grâce à mon noeud de batelier! Devrais-je y retourner ? ', grille_img, goto_office_func, 'Retourner');

    green_barrel_pick_up_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Je pense avoir déjà vu ces barils dans un des livres de la bibliothèque du docteur. Si je me souviens bien, il fallait verser un baril dans la machine, mais lequel ? Ce baril biologique ?', green_barrel_img, pickup_barrel_func, 'Ramasser');
    red_barrel_pick_up_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Je pense avoir déjà vu ces barils dans un des livres de la bibliothèque du docteur. Si je me souviens bien, il fallait verser un baril dans la machine, mais lequel ? Ce baril chimique ?', red_barrel_img, pickup_barrel_func, 'Ramasser');
    yellow_barrel_pick_up_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Je pense avoir déjà vu ces barils dans un des livres de la bibliothèque du docteur. Si je me souviens bien, il fallait verser un baril dans la machine, mais lequel ? Ce baril radioactif ?', yellow_barrel_img, pickup_barrel_func, 'Ramasser');
    green_barrel_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Je n\'ai pas la force de prendre un autre baril. Je devrais peut-être essayer de vider le contenu de celui que je tiens en ce moment dans la machine. ', green_barrel_img, null);
    red_barrel_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Je n\'ai pas la force de prendre un autre baril. Je devrais peut-être essayer de vider le contenu de celui que je tiens en ce moment dans la machine. ', red_barrel_img, null);
    yellow_barrel_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Je n\'ai pas la force de prendre un autre baril. Je devrais peut-être essayer de vider le contenu de celui que je tiens en ce moment dans la machine. ', yellow_barrel_img, null);

    machine_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'J’ai déjà vu cette machine à quelque part. La machine a l’air de manquer de carburant. L’entonnoir sur le côté doit servir à remplir la machine. ', machine_img, null);
    machine_open_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Avec le carburant vert, la machine s’active et la porte s’ouvre. Une clé USB se trouve à l’intérieur.', machine_open_img, null);
    machine_explosion_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Oh non! Tu as vider le mauvais carburant dans la machine! Cela a engendré une énorme explosion. ', explosion_img, reset_game_func, 'Recommencer');

    computer_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'L\'ordinateur semble être éteint.. Il y a une fente ouverte pour brancher une clé USB. ', computer_screen_img, null);
    usb_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Une clé USB! Je me demande bien ce qu\'il contient.', usb_img, pickup_func, 'Ramasser');
    computer_usb_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Une rose des vents… un clavier sur la porte… mais quel est le rapport. Je crois que la solution sont dans les points cardinaux.', computer_screen_img, null);

    keypad_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Quelle est la combinaison? Me semble que j’ai déjà vu un clavier comme cela à quelque part.', keypad_img, keypad_guess_func, 'Taper');
    keypad_guess_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Entrer un code :\n ____ ____ ____ ____', keypad_img, null);
    keypad_success_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Entrer un code :\n  6     7     8     0\n\n Le cadenas est ouvert! ', keypad_img, goto_lab_func, 'Entrer');


    this.grille = new Item(730, 40, 190, 100, null, 'grille', false, rope_missing_dialogue);
    this.greenBarrel = new Item(220, 270, 110, 150, green_barrel_img, 'greenbarrel', true, green_barrel_pick_up_dialogue);
    this.redBarrel = new Item(350, 270, 110, 150, red_barrel_img, 'redbarrel', true, red_barrel_pick_up_dialogue);
    this.yellowBarrel = new Item(280, 310, 110, 150, yellow_barrel_img, 'yellowbarrel', true, yellow_barrel_pick_up_dialogue);
    this.machine = new Item(580, 100, 470, 460, machine_img, 'machine', false, machine_dialogue);
    this.machine_open = new Item(580, 100, 470, 460, machine_open_img, 'machine', false, machine_open_dialogue);
    this.computer = new Item(630, 590, 210, 130, null, 'computer', false, computer_dialogue);
    this.usb = new Item(740, 355, 55, 55, usb_img, 'usb', true, usb_dialogue);
    this.keypad = new Item(560, 175, 70, 95, null, 'keypad', false, keypad_dialogue);

    this.items = [this.grille, this.greenBarrel, this.redBarrel, this.yellowBarrel, this.machine, this.computer, this.keypad];


    this.show = function() {
        image(this.backgroundImg, 0, 0);
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].show();
        }

        this.ropeChallenge();
        this.takeBarrel();

        // Fix dialogue picture
        grille_goback_dialogue.setItem(this.grille);
        green_barrel_dialogue.setItem(this.greenBarrel);
        red_barrel_dialogue.setItem(this.redBarrel);
        yellow_barrel_dialogue.setItem(this.yellowBarrel);
        keypad_guess_dialogue.setItem(this.keypad);
        keypad_success_dialogue.setItem(this.keypad);
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

    this.mouseReleased = function(mouseX, mouseY) {
        // Barrel + Machine
        let machine_index = this.items.indexOf(this.machine);
        if (currentDialogue === machine_dialogue && currentDialogue.contains(mouseX, mouseY) || this.items[machine_index] && this.items[machine_index].contains(mouseX, mouseY)) {
            if (itemHeld.name === 'greenbarrel') {
                currentDialogue = machine_open_dialogue;
                this.items[machine_index] = this.machine_open;
                red_barrel_dialogue.message = 'Je me demande qu\'est-ce qui serait passé si j\'avais verser ce baril chimique au lieu du baril biologique ?';
                yellow_barrel_dialogue.message = 'Je me demande qu\'est-ce qui serait passé si j\'avais verser ce baril radioactif au lieu du baril biologique ?';
                this.items.push(this.usb);
                inventory.removeItem(itemHeld);
            } else if (itemHeld.name === 'redbarrel' || itemHeld.name === 'yellowbarrel') {
                currentDialogue = machine_explosion_dialogue;
                this.items[machine_index].dialogueBox = machine_explosion_dialogue;
                inventory.removeItem(itemHeld);
            }
        }

        // USB + Computer
        let computer_index = this.items.indexOf(this.computer);
        if (currentDialogue === computer_dialogue && currentDialogue.contains(mouseX, mouseY) || this.items[computer_index].contains(mouseX, mouseY)) {
            if (itemHeld.name === 'usb') {
                this.items[computer_index].dialogueBox = computer_usb_dialogue;
                computer_usb_dialogue.setItem(this.computer);
                currentDialogue = computer_usb_dialogue;
                inventory.removeItem(itemHeld);
            }
        }

    }

    this.ropeChallenge = function() {
        if (!this.enter_petshop) {
            // Boatman's knot challenge
            if (inventory.contains_item_name('rope')) {
                this.grille.dialogueBox = grille_rope_dialogue;
                this.enter_petshop = true;
            } else {
                this.grille.dialogueBox = rope_missing_dialogue;
            }
            currentDialogue = this.grille.dialogueBox;
        } else {
            // Return to the office room if challenge successfull
            if (!inventory.contains_item_name('rope')) {
                this.grille.dialogueBox = grille_goback_dialogue;
            } else {
                currentDialogue = grille_rope_dialogue;
            }
        }
    }

    this.takeBarrel = function() {
        // Force user to take one barrel only
        if (inventory.contains_item(this.greenBarrel) || inventory.contains_item(this.redBarrel) || inventory.contains_item(this.yellowBarrel)) {
            this.greenBarrel.dialogueBox = green_barrel_dialogue;
            this.redBarrel.dialogueBox = red_barrel_dialogue;
            this.yellowBarrel.dialogueBox = yellow_barrel_dialogue;
        }
    }


    this.keyReleased = function(key) {
        // Keypad code dialogue
        let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        if (currentDialogue === keypad_guess_dialogue && numbers.includes(key)) {
            password += key;
            if (password !== '6780') {
                switch (password.length) {
                    case 1:
                        currentDialogue.message = "Entrer un code :\n " + password[0] + " ____ ____ ____";
                        break;
                    case 2:
                        currentDialogue.message = "Entrer un code :\n " + password[0] + "   " + password[1] + "   ____ ____";
                        break;
                    case 3:
                        currentDialogue.message = "Entrer un code :\n " + password[0] + "   " + password[1] + "   " + password[2] + "   ____";
                        break;
                    case 4:
                        currentDialogue.message = "Entrer un code :\n " + password[0] + "   " + password[1] + "   " + password[2] + "   " + password[3];
                        break;
                }
                if (password.length >= 4 && password !== '6780') {
                    currentDialogue.message = "Entrer un code :\n    INCORRECT";
                    password = '';
                }
            } else {
                currentDialogue = keypad_success_dialogue;
                let keypad_index = this.items.indexOf(this.keypad);
                this.items[keypad_index].dialogueBox = keypad_success_dialogue;
            }
        }
    }

}