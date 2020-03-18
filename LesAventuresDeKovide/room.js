function Room(backgroundImage) {

    this.backgroundImg = backgroundImage;

    this.show = function() {
        image(this.backgroundImg, 0, 0);
    }
}