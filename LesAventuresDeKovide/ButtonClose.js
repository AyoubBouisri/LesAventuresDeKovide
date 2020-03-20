function ButtonClose(x, y) {

    this.w = 50;
    this.x = x;
    this.y = y;

    this.is_hovered = false;
    this.image = closeBtn_img;
    this.hovered_img = this.image.get();
    this.hovered_img.resize(60, 60);
    this.show = function () {
        if (this.is_hovered) {

            var x = this.x - 5;
            var y = this.y - 5;
            image(this.hovered_img, x, y);
            this.w = 60;
        } else {
            this.w = 50;
            image(this.image, this.x, this.y);
        }

    };

    this.contains = function (x, y) {
        if (x >= this.x && x <= (this.x + this.w) && y >= this.y && y <= this.y + this.w) {
            return true;
        }
        return false;
    };
}
