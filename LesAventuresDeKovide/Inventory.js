function Inventory() {

    this.items = [];
    this.isOpened = false;
    this.posY = 650;

    this.contains_item = function (item) {
        if (this.items.includes(item)) {
            return true;
        }
        return false;
    };

    this.addItem = function (item) {
        if (!this.contains_item(item)) {
            if (item.name === 'rope') {
                console.log('XD');
                item.is_hovered = false;
                item.w = item.w - 55;
                item.h = item.h - 10;
            }
            this.items.push(item);
        }

    };

    this.removeItem = function (item) {
        this.items.splice(this.items.indexOf(item), 1);
    };

    this.interact = function (item) {
        // Interact with an item currently in the inventory
        if (this.items.includes(item)) {
            console.log('You are interacting with a ' + item.name);
        }
    };

    this.show = function () {
        image(inventory_img, 20, this.posY);

        for (let item of this.items) {
            const index = this.items.indexOf(item);
            if (itemHeld === null) {
                this.getInventoryPosition(index, item);
            }
            item.show();
        }
    };

    // Hardcoded item position in the inventory
    this.getInventoryPosition = function (index, item) {
        const height = 770;
        switch (index) {
            case 0:
                item.setPositions(130, height);
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
