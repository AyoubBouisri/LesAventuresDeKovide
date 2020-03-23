function LaboratoryRoom() {
    this.backgroundImg = laboratory_background;
    this.name = 'Laboratoire';

    var dialogue_w = 900;
    var dialogue_h = 500;
    this.items = [];

    function reussir_defi() {
        currentDialogue = fiole_dialogue;
        // set the dialogue for the item
        currentRoom.hotte.dialogueBox = fiole_dialogue;
        currentRoom.hotte.dialogueBox.setItem(currentRoom.hotte);
    }



    function ramasser_fiole() {
        // ajouter fiole a linventaire
        basic_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'whatever', null);
        this.fiole = new Item(0, 0, 100, 100, fiole_img, 'fiole', false, basic_dialogue);

        inventory.addItem(this.fiole);

        currentRoom.hotte.dialogueBox = hotte_vide_dialogue;
        currentRoom.hotte.dialogueBox.setItem(currentRoom.hotte);
        currentDialogue = hotte_vide_dialogue;
    }

    function retourner_animalerie() {
        currentRoom = petshopRoom;
    }

    sortie_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'C\'est la direction pour retourner à l\'animalerie ou le médecin garde ses rats.', null, retourner_animalerie, 'Sortir');
    defi_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Kovide entre ses mains dans les gants en caoutchouc, mais ses bras sont trop petits pour atteindre la fiole. Mets tes mitaineset fait un noeud coulant dans ta corde à noeud. Quand tu as réussis, clique sur <<Réussi>> !', null, reussir_defi, 'Réussi');
    fiole_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Avec le noeud coulant, Kovide a précipité la fiole dans le bac pour récupération. Wow aucune goute n\'a été perdu. Kovide est un super scout !', fiole_img, ramasser_fiole, 'Ramasser');
    hotte_vide_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'On dirait bien une hotte de laboratoire qui permet l\'extraction des vapeurs toxiques des produits utilisés lors des manipulations du médecin.');

    book_dialogue = new DialogueBox(dialogue_w, dialogue_h, 'Hein ! Il a donné un nom à chaque rat, mais il est fou ce médecin', book_img);
    tableau_dialogue = new DialogueBox(dialogue_w, 650, 'Tous ces symboles me rappelle un certain tableau. En tout cas, on dirait que le bon c\'est le Si. Je me demande cela fait référence à quel numéro...', tableau_img);

    this.book = new Item(230, 650, 75, 75, null, 'book', false, book_dialogue);
    this.tableau = new Item(600, 200, 350, 200, null, 'tableau', false, tableau_dialogue);
    this.hotte = new Item(100, 100, 350, 300, null, 'hotte', false, defi_dialogue);
    this.sortie = new Item(850, 40, 100, 50, null, 'sortie', false, sortie_dialogue);


    this.items = [this.book, this.tableau, this.hotte, this.sortie];


    this.show = function() {
        image(this.backgroundImg, 0, 0);
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].show();
        }


    }


    this.mouseOver = function(mouseX, mouseY) {
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