function TreasureRoom() {
    this.backgroundImg = treasure_background;
    this.name = 'Trésor';
    this.items = [];
    this.message = 
        'FÉLICITATION!!!\n' +
        'Tu as réussi à trouver le trésor du médecin. L\’ultime papier de toilette en feuille d\’or.\n' +
        ' Mais au final, ça demeure que du papier de toilette, sans réel intérêt pour un super scout comme Kovide.\n'+
        'Il retourne vers la salle d’attente, satisfait d\’avoir relevé le défi du laboratoire.';

    this.show = function () {
        inventory.isOpened = false;
        image(this.backgroundImg, 0, 0);

        // INSERT DIALOG BOX HERE
    };


    this.mouseOver = function (mouseX, mouseY) {
    }

    this.mouseReleased = function (mouseX, mouseY) {

    }
}
