function DialogueBox(w, h, message, img) {
    // DialogueBox object. Free for all, add buttons texts animations what ever you feel like
    this.message = message;
    this.w = w;
    this.h = h;
    this.image = img;

    this.bg_img = dialogue_img;
    this.bg_img.resize(this.w, this.h);

    // find the center of the screen depending on the height big algo
    var inventoryY = inventory.posY;
    this.y = (HEIGHT - (HEIGHT - inventoryY)) / 2 - this.h / 2;
    this.x = WIDTH / 2 - this.w / 2;

    this.buttonClose = new ButtonClose(this.x + this.w - 100, this.y + 30);

    this.show = function() {

        image(this.bg_img, this.x, this.y);
        this.buttonClose.show();
        if (this.image != null) {
            // draw image on the left and text on the right

            this.image = img.get();
            this.image.resize(this.w / 3, this.h / 3);

            var img_x = this.x + 60;
            var img_y = this.y + this.h / 2 - this.image.height / 2;
            image(this.image, img_x, img_y);

            // draw text on the right sidfe of the image
            var text_width = this.w / 2 - 70;
            var text_height = this.h / 2;
            var text_x = this.x + this.w / 2 - 70;
            var text_y = this.y + this.h / 2 - text_height / 2;

            fill(254, 229, 153);
            rect(text_x, text_y, text_width, text_height);
            rectMode(CENTER);
            fill(0);
            textSize(25);
            textAlign(CENTER, CENTER);
            text(this.message, text_x + text_width / 2, text_y + text_height / 2, text_width, text_height);
            rectMode(CORNER);

        }


    }

    this.mouseOver = function(mouseX, mouseY) {
        if (this.buttonClose.contains(mouseX, mouseY)) {
            this.buttonClose.is_hovered = true;
        } else {
            this.buttonClose.is_hovered = false;
        }

    }

    this.click = function(mouseX, mouseY) {
        if (this.contains(mouseX, mouseY)) {
            // if on close button close the dialogue
            if (this.buttonClose.contains(mouseX, mouseY)) {
                currentDialogue = null;
            }
        }
    }

    this.contains = function(x, y) {
        if (x >= this.x && x <= (this.x + this.w) && y >= this.y && y <= this.y + this.h)
            return true;
        return false;
    }

}