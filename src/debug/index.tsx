import React from 'react';
import ReactDOM from 'react-dom';
import Entry from '../animationroot/entry';
import DebugEntry from './Entry';
import Registration from './Registration';
import View from './View';
import cx from './style.less';

const getElementByComponent = (component: React.ReactInstance) => {
  try { return ReactDOM.findDOMNode(component); } catch (ex) { return null; }
};

class Debug extends React.Component<any, any> {
  public state = {
    scope: null as Element,
    hovering: null as Element,
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
        this.setState({ update: true, scoping: false, scope: e.target, hovering: null }, () => this.trigger());
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    }, true);
    window.addEventListener('mouseover', (e) => {
      if (this.state.scoping) {
        this.setState({ hovering: e.target }, () => this.trigger());
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    }, true);
    window.addEventListener('mouseout', (e) => {
      if (this.state.scoping) {
        this.setState({ hovering: null }, () => this.trigger());
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    }, true);
  }

  public shouldComponentUpdate(nextProps: any, nextState: any) {
    return nextState.update || nextState.scoping;
  }

  public componentDidUpdate() {
    const { scope, hovering } = this.state;
    const el = hovering || scope;
    if (el) {
      const rect = el.getBoundingClientRect();
      this._live.style.position = `fixed`;
      this._live.style.left = `${rect.left - 1}px`;
      this._live.style.top = `${rect.top - 1}px`;
      this._live.style.width = `${rect.width + 2}px`;
      this._live.style.height = `${rect.height + 2}px`;
    }
  }

  public render() {
    const { scoping, scope, update } = this.state;
    const inputEntries = Registration.entries();
    let entries = inputEntries;
    if (scope) {
      entries = entries.filter((e) => {
        try {
          for (let current = getElementByComponent(e.entry.component); current; current = current.parentNode as Element) {
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
        <label className={cx(`toggle`, { live: update })}><input type="checkbox" onChange={this.toggle} checked={this.state.update} /> Live ({inputEntries.length})</label>
        <label className={cx(`toggle`, { scoping })}><input type="checkbox" onChange={this.onScope} checked={!!this.state.scope} /> {this.state.scoping ? `Scoping` : `Scope`} ({entries.length})</label>
        <View entries={entries} onHover={this.onHover} onLeave={this.onLeave} />
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
  private onHover = (entry: DebugEntry) => {
    this.setState({ hovering: getElementByComponent(entry.entry.component) });
  }
  private onLeave = (entry: DebugEntry) => {
    this.setState({ hovering: null });
  }
}
export default Debug;
