function OfficeRoom() {
    this.backgroundImg = office_background;
    this.name = 'Bureau';
    // Create a bunch of dialogue boxes and link them with the right objects
    // one dialogue box per object should do the trick see DialogueBox.js
    var dialogue_w = 900;
    var dialogue_h = 500;
    var password = '';
    basic_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'whatever', null);
    // Dialog buttons
    var pickup_func = function(old_item) {
        console.log(old_item);
        inventory.addItem(old_item);
        index = currentRoom.items.indexOf(old_item);
        currentRoom.items.splice(index, 1);
        //close dialogue
        currentDialogue = null;
    }
    var goto_petshop_func = function() {
        currentRoom = petshopRoom;
        currentDialogue = null;
    }
    var lock_guess_func = function() {
        password.toLowerCase();
        if (password !== 'kim') {
            currentDialogue = lock_guess_dialogue;
        }
    }
    var goto_treasure_func = function() {
        currentRoom = treasureRoom;
        currentDialogue = null;
    }
    screwdriver_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Woah ! Un tournevis étoilé ! Je devrais peut-être le prendre ... on ne sait jamais quand il pourra me servir. Je ne vais pas oublier de le ramener quand j\'aurai terminé ! ', screwdriver_img, pickup_func, 'Ramasser');
    rope_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Je me demande comment cette corde a bien pu finir là ... Quelqu\'un l\'a peut-être oubliée ici. Pourquoi ne pas la prendre et lui redonner plus tard ! ', rope_img, pickup_func, 'Ramasser');
    periodic_table_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'On dirait bien que c’est les 36 premiers éléments qui importe. J’imagine que chaque élément correspond à un numéro.\n Ex: Na = 11 ', periodic_table_img, null);
    library_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Ah, une bien drôle de machine. Je crois que le livre nous indique comment la « nourrir ». ', library_img, null);
    grille_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Une grille! Quel beau moyen de voyager dans une autre salle ni vu ni connu. Mais.. comment l\'ouvrir? ', grille_img, null);
    grille_open_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Ah tiens! J\'ai réussi à retirer la grille avec le tournevis. Mais je n\'arrive pas bien à voir où ce petit couloir sombre va m\'amener.. Devrais-je y aller? ', grille_img, goto_petshop_func, 'Entrer');
    lock_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Le trésor du médecin devrait se trouver derrière cette porte. J\'en suis convaincu! Mmm.. cette porte semble être barrée par un cadenas. Un code à trois lettres?? ', lock_img, lock_guess_func, 'Ouvrir');
    lock_guess_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Entrer un code :\n ____ ____ ____', lock_img, null);
    lock_success_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Entrer un code :\n  K     I     M\n\n Le cadenas est ouvert! ', lock_img, goto_treasure_func, 'Entrer');


    // define items hardcoded the fuck out
    this.screwdriver = new Item(830, 430, 120, 100, screwdriver_img, 'screwdriver', true, screwdriver_dialogue);
    this.rope = new Item(350, 620, 200, 100, rope_img, 'rope', true, rope_dialogue);
    this.lock = new Item(180, 360, 80, 80, lock_img, 'lock', false, lock_dialogue);
    this.library = new Item(260, 200, 130, 370, null, 'library', false, library_dialogue);
    this.periodicTable = new Item(410, 270, 80, 80, null, 'periodic table', false, periodic_table_dialogue);
    this.grille = new Item(800, 530, 120, 40, null, 'grille', false, grille_dialogue);
    this.items = [this.grille, this.screwdriver, this.rope, this.lock, this.library, this.periodicTable];


    this.show = function() {
        image(this.backgroundImg, 0, 0);

        for (var i = 0; i < this.items.length; i++) {
            this.items[i].show();
        }
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
        if (itemHeld.name === 'screwdriver') {
            let grille_index = this.items.indexOf(this.grille);

            if (currentDialogue != null) {
                //if (currentDialogue.message.startsWith('Une')) {
                if (currentDialogue.contains(mouseX, mouseY)) {

                    currentDialogue = grille_open_dialogue;
                    this.items[grille_index].dialogueBox = grille_open_dialogue;
                    inventory.removeItem(itemHeld); // Sh
                }
            }

            if (this.items[grille_index].contains(mouseX, mouseY)) {
                this.items[grille_index].dialogueBox = grille_open_dialogue;
                inventory.removeItem(itemHeld); // Should we remove the item after using it?
            }


        }
    }

    this.keyReleased = function(event) {
        // Lock code dialogue
        if (currentDialogue === lock_guess_dialogue) {

            password += event.key;
            password.toLowerCase();
            if (password !== 'kim') {
                switch (password.length) {
                    case 1:
                        currentDialogue.message = "Entrer un code :\n " + password[0] + " ____ ____";
                        break;
                    case 2:
                        currentDialogue.message = "Entrer un code :\n " + password[0] + "   " + password[1] + "   ____";
                        break;
                    case 3:
                        currentDialogue.message = "Entrer un code :\n " + password[0] + "   " + password[1] + "   " + password[2];
                        break;
                }
                if (password.length >= 3 && password !== 'kim') {
                    currentDialogue.message = "Entrer un code :\n    INCORRECT";
                    password = '';
                }
            } else {
                currentDialogue = lock_success_dialogue;
                let lock_index = this.items.indexOf(this.lock);
                this.items[lock_index].dialogueBox = lock_success_dialogue;
            }
        }
    }
}