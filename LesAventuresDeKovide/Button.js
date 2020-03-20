 function Button(x, y, w, h, func, item) {
     this.x = x;
     this.y = y;
     this.w = w;
     this.h = h;

     this.img = button_img.get();
     this.img.resize(this.w, this.h);

     this.hovered_img = button_img.get();
     this.hovered_img.resize(w + 10, h + 10);

     this.func = func;

     this.item = item;
     this.show = function() {
         if (this.is_hovered) {

             var x = this.x - 5;
             var y = this.y - 5;
             image(this.hovered_img, x, y);
             this.w = w + 10;
             this.h = h + 10;
         } else {
             this.w = w;
             this.h = h;
             image(this.img, this.x, this.y);
         }

     }
     this.click = function() {
         this.func(this.item);
     }

     this.contains = function(x, y) {
         if (x >= this.x && x <= (this.x + this.w) && y >= this.y && y <= this.y + this.h)
             return true;
         return false;
     }

 }