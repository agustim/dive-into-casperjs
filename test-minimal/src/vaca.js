function Vaca() {
    this.mugeix = false;
    this.diu = function diu() {
        this.mugeix = true; // esta mugint
        return 'muuu!';
    };
}
