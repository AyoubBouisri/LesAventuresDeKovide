function DialogueBox(w, h, message, img, button_on_click_func, button_text) {
    // DialogueBox object. Free for all, add buttons texts animations what ever you feel like
    this.message = message;
    this.w = w;
    this.h = h;
    this.image = img;
    this.item;

    this.bg_img = dialogue_img.get();
    this.bg_img.resize(this.w, this.h);

    this.button_on_click_func = button_on_click_func;
    this.button_text = button_text;

    // find the center of the screen depending on the height big algo
    var inventoryY = inventory.posY;
    this.y = (HEIGHT - (HEIGHT - inventoryY)) / 2 - this.h / 2;
    this.x = WIDTH / 2 - this.w / 2;

    this.buttonClose = new ButtonClose(this.x + this.w - 100, this.y + 30, this.item);
    if (this.button_on_click_func != null) {
        var btn_w = 250;
        var btn_h = 100;

        var btn_x = this.x + this.w / 2 - btn_w / 2;
        var btn_y = this.y + this.h - btn_h;
        this.button = new Button(btn_x, btn_y, btn_w, btn_h, this.button_on_click_func, null, button_text);

    } else {
        this.button = null;
    }

    this.show = function () {

        image(this.bg_img, this.x, this.y);
        this.buttonClose.show();
        if (this.image != null || this.message.startsWith('Kovide entre ses mains') || this.message.startsWith('On dirait') || this.message.startsWith('C\'est la direction')) {
            // draw image on the left and text on the right
            var barrel = ['greenbarrel', 'redbarrel', 'yellowbarrel'];
            if (this.item && this.item.name === 'usb') {
                this.image = img.get();
                var img_w = this.w / 3;
                var img_h = this.h / 2;
                this.image.resize(img_w, img_h);
                var img_x = this.x + 70;
                var img_y = this.y + this.h / 2 - this.image.height / 2 + 10;
                image(this.image, img_x, img_y);
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


             } else if (this.message.startsWith('Kovide entre ses mains') || this.message.startsWith('On dirait') || this.message.startsWith('C\'est la direction')) {
                // show only text 

                var text_width = this.w - 200;
                var text_height = this.h / 2;
                var text_x = this.x + this.w / 2 - text_width / 2;
                var text_y = this.y + this.h / 2 - text_height / 2;

            } else if (this.item != null && this.item.name === 'book' || this.item.name === 'tableau') {
                // show big image with text under
                this.image = img.get();
                if (this.item.name === 'book') {
                    var img_w = this.w - 400;
                    var img_h = this.h / 2;
                    this.image.resize(img_w, img_h);
                    var img_x = this.x + this.w / 2 - img_w / 2;
                    var img_y = this.y + 90;
                } else {
                    var img_w = this.w - 200;
                    var img_h = this.h - 250;
                    this.image.resize(img_w, img_h);
                    var img_x = this.x + this.w / 2 - img_w / 2;
                    var img_y = this.y + 90;
                }

                image(this.image, img_x, img_y);

                var text_width = this.w - 150;
                var text_height = this.h / 7;
                var text_x = this.x + 70;
                if (this.item.name === 'tableau') {
                    var text_y = img_y + img_h - 40;
                } else {
                    var text_y = img_y + img_h;

                }



            } else if (this.item && this.item.name === 'keypad') {
                this.image = img.get();
                var img_w = this.w / 3;
                var img_h = this.h / 2;
                this.image.resize(img_w, img_h);
                var img_x = this.x + 70;
                var img_y = this.y + this.h / 2 - this.image.height / 2 + 10;
                image(this.image, img_x, img_y);
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
            } else if (this === machine_explosion_dialogue) {
                this.image = img.get();
                var img_w = this.w / 3;
                var img_h = this.h / 2;
                this.image.resize(img_w, img_h);
                var img_x = this.x + 80;
                var img_y = this.y + this.h / 2 - this.image.height / 2;
                image(this.image, img_x, img_y);
                textSize(25);
                var text_width = 250;
                var text_height = 250;
                var text_x = 525;
                var text_y = 200;
                textAlign(CENTER, CENTER);
                fill(254, 229, 153);
                rect(500, text_y, text_width + 30, text_height);
                fill(0, 0, 0);
                text(this.message, text_x, text_y, text_width, text_height);


            } else if (this.item && this.item.name === 'machine') {
                this.image = img.get();
                var img_w = this.w * 0.45;
                var img_h = this.h * 0.75;
                this.image.resize(img_w, img_h);
                var img_x = this.x + 30;
                var img_y = this.y + this.h / 2 - this.image.height * 0.55;
                image(this.image, img_x, img_y);
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
            } else if (this.item && barrel.includes(this.item.name)) {
                this.image = img.get();
                var img_w = this.w / 5;
                var img_h = this.h / 2;
                this.image.resize(img_w, img_h);
                var img_x = this.x + 125;
                var img_y = this.y + this.h / 2 - this.image.height / 2;
                image(this.image, img_x, img_y);
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

            } else if (this.item && this.item.name === 'computer') {
                this.image = img.get();
                var img_w = this.w / 2;
                var img_h = this.h / 2;
                this.image.resize(img_w, img_h);

                var img_x = this.x + 60;
                var img_y = this.y + this.h / 2 - this.image.height / 2;
                image(this.image, img_x, img_y);
                textSize(25);
                var text_width = 250;
                var text_height = 300;
                var text_x = 590;
                var text_y = 180;
                textAlign(CENTER, CENTER);

                // var red_words = ['Est', 'N-O', 'Nord', 'Extrême Sud'];  // Add red words         
                if (this === computer_usb_dialogue) {
                    var screen_text = 'La maladie vient de l’Est, mais cela n’a pas pris beaucoup de temps pour se rendre au N-O. Heureusement que le Nord n’est pas encore touché, ni l’Extrême Sud.';
                    var screen_text_width = this.w / 2.5;
                    var screen_text_height = this.h / 2.5;
                    var screen_text_x = 165;
                    var screen_text_y = 225;
                    textAlign(LEFT);
                    fill(0, 0, 0);
                    text(screen_text, screen_text_x, screen_text_y, screen_text_width, screen_text_height);
                }

                fill(254, 229, 153);
                rect(text_x - 25, text_y, text_width + 50, text_height);
                fill(0, 0, 0);
                text(this.message, text_x, text_y, text_width, text_height);


            } else {
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

        if (this.button != null) {
            // show the button
            this.button.show();
        }


    };

    this.mouseOver = function (mouseX, mouseY) {
        if (this.buttonClose.contains(mouseX, mouseY)) {
            this.buttonClose.is_hovered = true;

        } else {
            this.buttonClose.is_hovered = false;
        }
        if (this.button != null) {
            if (this.button.contains(mouseX, mouseY)) {
                this.button.is_hovered = true;
            } else {
                this.button.is_hovered = false;
            }
        }

        if (this.buttonClose.is_hovered || this.button != null && this.button.is_hovered) {
            cursorObj.setState(2);
        } else {
            cursorObj.setState(0);
        }
    };

    this.click = function (mouseX, mouseY) {
        if (this.contains(mouseX, mouseY)) {
            // if on close button close the dialogue
            if (this.buttonClose.contains(mouseX, mouseY)) {
                currentDialogue = null;
                this.buttonClose.is_hovered = false;
            } else if (this.button != null && this.button.contains(mouseX, mouseY)) {
                this.button.click();
            }
        }
    };

    this.contains = function (x, y) {
        if (x >= this.x && x <= (this.x + this.w) && y >= this.y && y <= this.y + this.h)
            return true;
        return false;
    };

    this.setItem = function (item) {
        this.item = item;
        if (this.button != null) {
            this.button.item = item;
        }
    };

}