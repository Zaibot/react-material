import Entry from '../animationroot/entry';
import DebugEntry from './entry';

let counter = 0;

export class Registration {
  private _list: DebugEntry[] = [];

  public register(entry: Entry) {
    this._list = [...this._list, new DebugEntry(entry, ++counter)];
  }

  public unregister(entry: Entry) {
    this._list = this._list.filter((x) => x.entry !== entry);
  }

  public entries() {
    return this._list;
  }
}

export default new Registration();
