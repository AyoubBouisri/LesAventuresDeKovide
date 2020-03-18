function Inventory(allItems) {

    this.allItems = allItems; // All the items in the game
    this.items = [];
    this.isOpened = false;

    this.addItem = function(item) {
        this.items.push(item);
    }
    
    this.removeItem = function(item) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    this.show = function() {
        image(inventory_img, 60, 650);

       // TODO: Show item in the inventory
    }

}