function CursorObj() {

    // would be cool tohave custom images for the cursor. couldn't do it for now ): 1:30 am
    // never mind j<ai trouver un moyen 2:24 am
    // TODO : attendre que l'artiste finit les dessins et les integrer


    this.basic = "assets/handCursor.png";
    this.info = "assets/magnifier.png";
    this.interaction = 'pointer';
    // STATES FOR NOW -> 0 : basic
    //	 				 1 : info
    //                   2 : interaction ? To be done
    this.state = 0;

    this.show = function() {

        if (this.state == 0) {
            cursor(this.basic);
        } else if (this.state == 1) {
            cursor(this.info);
        } else if (this.state == 2) {
            cursor(this.interaction);
        }
    }

    this.setState = function(state) {
        this.state = state;
        this.show();
    }

}