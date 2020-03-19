function Inventory() {

    this.items = [];
    this.isOpened = false;

    this.contains_item = function(item) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items.name === item.name) {
                return true;
            }
        }
        return false;
    }
    this.addItem = function(item) {
        if (!this.contains_item(item)) {
            this.items.push(item);
        }

    }

    this.removeItem = function(item) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    this.interact = function(item) {
        // Interact with an item currently in the inventory
        if (this.items.includes(item)) {
            console.log('You are interacting with a ' + item.name);
        }
    }

    this.show = function() {
        image(inventory_img, 10, 650);

        for (let item of this.items) {
            const index = this.items.indexOf(item);
            this.getInventoryPosition(index, item);
            item.show();
        }
    }

    // Hardcoded item position in the inventory
    this.getInventoryPosition = function(index, item) {
        const height = 770;
        switch (index) {
            case 0:
                item.setPositions(120, height);
                break;
            case 1:
                item.setPositions(275, height);
                break;
            case 2:
                item.setPositions(425, height);
                break;
            case 3:
                item.setPositions(580, height);
                break;
            case 4:
                item.setPositions(730, height);
                break;
        }
    }

}