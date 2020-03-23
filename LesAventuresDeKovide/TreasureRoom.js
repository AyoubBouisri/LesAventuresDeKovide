function TreasureRoom() {
    this.backgroundImg = treasure_background;
    this.name = 'Trésor';
    this.items = [];
    this.message =
        'FÉLICITATION!!!\nTu as réussi à trouver le trésor du médecin. L\’ultime papier de toilette en feuille d\’or. Mais au final, ça demeure que du papier de toilette, sans réel intérêt pour un super scout comme Kovide. Il retourne vers la salle d’attente, satisfait d\’avoir relevé le défi du laboratoire.';

    this.show = function () {
        inventory.isOpened = false;
        image(this.backgroundImg, 0, 0);
        var text_width = 700;
        var text_height = 300;
        var text_x = 150;
        var text_y = 550;
        fill(254, 229, 153);
        rect(text_x, text_y, text_width, text_height);
        rectMode(CENTER);
        fill(0);
        textSize(25);
        textAlign(CENTER, CENTER);
        text(this.message, text_x + text_width / 2, text_y + text_height / 2, text_width, text_height);
        rectMode(CORNER);
    };


    this.mouseOver = function (mouseX, mouseY) {
    }

    this.mouseReleased = function (mouseX, mouseY) {
    }

    this.keyReleased = function (key) {
    }

}
