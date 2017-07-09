import Entry from '../animationroot/entry';

export class Registration {
    private _list: Entry[] = [];

    public register(entry: Entry) {
        this._list = [...this._list, entry];
    }

    public unregister(entry: Entry) {
        this._list = this._list.filter((x) => x !== entry);
    }

    public entries() {
        return this._list;
    }
}

export default new Registration();
