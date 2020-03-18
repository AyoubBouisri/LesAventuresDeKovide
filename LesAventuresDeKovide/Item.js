function Item(posX, posY, width, height, base_image, name) {
    // find a way to inherit from this 
    // plan is to have it as a base class for basic interaction with the cursor
    // simple hover animations etc.

    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.w = width;
    this.h = height;
    // set up the image
    this.base_image = base_image;

    if (this.base_image != null) {
        this.base_image.resize(this.w, this.h);
        // offset of the difference between hovered and base
        this.offset = 20;
        var w = this.w + this.offset;
        var h = this.h + this.offset;
        // copy basic image and resizes it to bigger 
        this.hovered_image = this.base_image.get();
        this.hovered_image.resize(w, h);
    }


    this.is_hovered = false;

    this.contains = function(x, y) {
        if (x >= this.posX && x <= (this.posX + this.w) && y >= this.posY && y <= this.posY + this.h)
            return true;
        return false;
    }

    this.show = function() {
        // Not very efficient method but as long as it doesnt lag we keep it this way
        if (this.base_image != null) {
            if (this.is_hovered) {
                // make the image bigger 
                var x = this.posX - this.offset / 2;
                var y = this.posY - this.offset / 2;
                image(this.hovered_image, x, y);

            } else {
                this.base_image.resize(this.w, this.h);
                image(this.base_image, this.posX, this.posY);

            }
        }
    }




}