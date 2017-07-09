import React from 'react';
import ReactDOM from 'react-dom';
import Entry from '../animationroot/entry';
import Registration from './Registration';
import View from './View';
import cx from './style.less';

class Debug extends React.Component<any, any> {
  public state = {
    scope: null as Element,
    scoping: false,
    update: false,
  };

  private _live: HTMLElement;
  private _trigger: any = null;

  public componentDidMount() {
    this._live = document.createElement('div');
    this._live.className = cx(`scope-overlay`);
    document.body.appendChild(this._live);
    this.trigger();
    window.addEventListener('mousedown', (e) => {
      if (this.state.scoping) {
        this.setState({ update: true, scoping: false, scope: e.target }, () => this.trigger());
      }
    }, true);
  }

  public shouldComponentUpdate(nextProps: any, nextState: any) {
    return nextState.update || nextState.scoping;
  }

  public componentDidUpdate() {
    const { scope } = this.state;
    if (scope) {
      const rect = scope.getBoundingClientRect();
      this._live.style.position = `fixed`;
      this._live.style.left = `${rect.left - 2}px`;
      this._live.style.top = `${rect.top - 2}px`;
      this._live.style.width = `${rect.width + 4}px`;
      this._live.style.height = `${rect.height + 4}px`;
    }
  }

  public render() {
    const { scoping, scope, update } = this.state;
    let entries = Registration.entries();
    if (scope) {
      entries = entries.filter((e) => {
        try {
          for (let current = ReactDOM.findDOMNode(e.component); current; current = current.parentNode as Element) {
            if (current === scope) { return true; }
          }
        } catch (ex) {
          // Swallow
        }
        return false;
      });
    }
    return (
      <div>
        <label className={cx(`toggle`, { live: update })}><input type="checkbox" onChange={this.toggle} checked={this.state.update} /> Live</label>
        <label className={cx(`toggle`, { scoping })}><input type="checkbox" onChange={this.onScope} checked={!!this.state.scope} /> {this.state.scoping ? `Scoping` : `Scope`}</label>
        <View entries={entries} />
      </div>
    );
  }

  private trigger = () => {
    this.forceUpdate(() => {
      this._trigger = null;
      if (!this._trigger && this.state.update && !this.state.scoping) {
        this._trigger = window.requestAnimationFrame(this.trigger);
      }
    });
  }
  private toggle = () => {
    this.setState({ update: !this.state.update }, () => {
      this.trigger();
    });
  }
  private onScope = () => {
    this.setState({ scoping: true });
  }
}
export default Debug;
