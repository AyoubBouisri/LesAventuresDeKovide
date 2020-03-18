function OfficeRoom() {
    this.backgroundImg = office_background;

    // define items hardcoded the fuck out
    this.screwdriver = new Item(830, 430, 120, 100, screwdriver_img);
    this.rope = new Item(350, 620, 200, 100, rope_img);
    this.lock = new Item(180, 360, 80, 80, lock_img)
    this.items = [this.screwdriver, this.rope, this.lock];

    this.show = function() {

        image(this.backgroundImg, 0, 0);

        for (var i = 0; i < this.items.length; i++) {
            this.items[i].show();
        }
    }

    this.mouseOver = function(mouseX, mouseY) {
        // method called everytime a mouse is moved. 
        // Every office object needs to hve it. maybe should of made a base class ...


        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].contains(mouseX, mouseY)) {
                cursorObj.setState(1);
                this.items[i].is_hovered = true;
                return;
            }
            // set the item back to its form. shitty way to do it but it works : 2:15 am
            // Now that I think of it this isnt shitty, its genius : 2:43 am
            this.items[i].is_hovered = false;
        }

        // set the cursor back to its original form. Shitty way but ey what can you do
        // see line 31 : 2:43 am
        cursorObj.setState(0);
    }
}