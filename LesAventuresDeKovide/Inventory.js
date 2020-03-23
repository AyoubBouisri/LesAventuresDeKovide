function Inventory() {

    var barrels = ['greenbarrel', 'redbarrel', 'yellowbarrel'];

    this.items = [];
    this.isOpened = true;
    this.posY = 650;

    this.contains_item = function(item) {
        if (this.items.includes(item)) {
            return true;
        }
        return false;
    };

    this.contains_item_name = function(name) {
        for (let item of this.items) {
            if (item.name === name) {
                return item;
            }
        }
        return null;
    };

    this.addItem = function(item) {
        if (!this.contains_item(item)) {
            if (item.name === 'rope') {
                item.is_hovered = false;
                item.w = item.w - 55;
                item.h = item.h - 10;
            }
            if (barrels.includes(item.name)) {
                item.is_hovered = false;
                item.w = item.w - 15;
                item.h = item.h - 15;
            }

            if (item.name === 'usb') {
                item = new Item(740, 355, 120, 120, usb_img, 'usb', true, usb_dialogue);
            }
            this.items.push(item);
        }

    };

    this.removeItem = function(item) {
        this.items.splice(this.items.indexOf(item), 1);
    };

    this.interact = function(item) {
        // Interact with an item currently in the inventory
        if (this.items.includes(item)) {
            console.log('You are interacting with a ' + item.name);
        }
    };

    this.show = function() {
        if (this.isOpened) {

            fill(254, 229, 153, 200);
            rect(50, this.posY + 30, 300, 50);
            image(inventory_img, 20, this.posY);

            for (let item of this.items) {
                const index = this.items.indexOf(item);
                if (itemHeld === null) {
                    this.getInventoryPosition(index, item);
                }
                item.show();
            }


        }
    };

    // Hardcoded item position in the inventory
    this.getInventoryPosition = function(index, item) {
        const height = 770;
        switch (index) {
            case 0:
                if (barrels.includes(item.name)) {
                    item.setPositions(160, 760);
                } else {
                    item.setPositions(130, height);
                }
                break;
            case 1:
                item.setPositions(285, height);
                break;
            case 2:
                item.setPositions(435, height);
                break;
            case 3:
                item.setPositions(590, height);
                break;
            case 4:
                item.setPositions(740, height);
                break;
        }
    };

}