import PlayerClass from "./PlayerClass";

class Magus implements PlayerClass {
    get bab() {
        return this._bab;
    }

    set bab(value) {
        this._bab = value;
    }

    private _bab;

    constructor()
    {
        this._bab = new Map();
        this._bab.set(1, [0]);
        this._bab.set(2, [1]);
        this._bab.set(3, [2]);
        this._bab.set(4, [3]);
        this._bab.set(5, [3]);
        this._bab.set(6, [4]);
        this._bab.set(7, [5]);
        this._bab.set(8, [6, 1]);
    }

}

export default Magus;