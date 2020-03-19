function OfficeRoom() {
    this.backgroundImg = office_background;

    // define items hardcoded the fuck out
    this.screwdriver = new Item(830, 430, 120, 100, screwdriver_img, 'screwdriver', true);
    this.rope = new Item(350, 620, 200, 100, rope_img, 'rope', true);
    this.lock = new Item(180, 360, 80, 80, lock_img, 'lock', false)

    this.library = new Item(260, 200, 130, 370, null, 'library', false);
    this.periodicTable = new Item(410, 270, 80, 80, null, 'periodic table', false);

    this.items = [this.screwdriver, this.rope, this.lock, this.library, this.periodicTable];



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