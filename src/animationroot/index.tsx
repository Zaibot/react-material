import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import partialUpdate from '../animation/partialUpdate';
import IAnimatable from '../animationroot/animatable';
import Debug from '../debug/Registration';

// tslint:disable no-magic-numbers
const maximumDelay = 500;
const maximumCycleTime = 1000 / 15; /* 15fps */
const timeout = 500;
// tslint:enable no-magic-numbers

// tslint:disable no-console

export const RootSymbol = `@zaibot/material/animationroot`;

const getTime = window.performance ? () => window.performance.now() : () => Date.now();

export const GetAnimationRoot = (e: React.Component<any, any>) => e.context[RootSymbol] as AnimationRoot;

const isWithinTime = (time: number, last: number, t: number) => time - last - t <= 0;
const isTimedOut = (time: number, last: number, t: number) => time - last - t > 0;

import Registration from './entry';

export interface IAnimationRootProps {
  rate?: number;
  onFrame?: (duration: number, sinceLast: number, dropped: number) => void;
}
export class AnimationRoot extends React.Component<IAnimationRootProps, {}> {
  public static childContextTypes = {
    [RootSymbol]: PropTypes.any,
  };
  private static _warned = false;

  private _registrations: Registration[] = [];
  private _timer: any = null;
  private _last: number = Date.now();
  private _dropped: number = 0;

  public add(component: React.Component<any, any> & IAnimatable<any>, always: boolean) {
    if (this._registrations.some((x) => x.component === component)) { return; }
    const entry = Registration.create(component, always);
    this._registrations = [...this._registrations, entry];
    this.runSingle(component, this.getAnimationTime(), 0);
    if (process.env.NODE_ENV === 'development') {
      Debug.register(entry);
    }
  }

  public remove(component: React.Component<any, any> & IAnimatable<any>) {
    if (process.env.NODE_ENV === 'development') {
      Debug.unregister(this._registrations.filter((x) => x.component === component)[0]);
    }
    this._registrations = this._registrations.filter((x) => x.component !== component);
  }

  public update<T>(component: React.Component<any, any> & IAnimatable<T>, callback: (state: T) => T) {
    const regs = this._registrations;
    const ii = regs.length;
    for (let i = 0; i < ii; i++) {
      const reg = regs[i];
      if (reg.component !== component) { continue; }
      reg.changeState(callback(reg.state));
    }
  }

  public render() {
    return this.props.children as JSX.Element;
  }

  public getAnimationTime() {
    return this._last;
  }

  public iterate() {
    this.iterateCore();
    this.beginTrigger();
  }

  public getChildContext() {
    return { [RootSymbol]: this as AnimationRoot };
  }

  public componentDidMount() {
    this.beginTrigger();
  }

  public componentWillUnmount() {
    this.cancelTrigger();
  }

  private iterateCore() {
    const start = getTime();
    // tslint:disable-next-line no-magic-numbers
    const advance = (this.props.rate > 0 && this.props.rate < 10 ? ((start - this._last) * this.props.rate) : (start - this._last)) * 0.001;
    ReactDOM.unstable_batchedUpdates(() => this.run(start, advance));
    if (this.props.onFrame) {
      const end = getTime();
      const duration = end - start;
      const sinceLast = start - this._last;
      const dropped = this._dropped;
      this.props.onFrame(duration, sinceLast, dropped);
    }
    this._last = start;
  }

  private runSingle(component: IAnimatable<any>, time: number, advance: number) {
    const regs = this._registrations;
    const ii = regs.length;
    for (let i = 0; i < ii; i++) {
      if (regs[i].component !== component) { continue; }
      this.runComponentPre(regs[i], time, advance);
    }
    for (let i = 0; i < ii; i++) {
      if (regs[i].component !== component) { continue; }
      this.runComponentAnimation(regs[i], time, advance);
    }
  }

  private run(time: number, advance: number) {
    const regs = this._registrations;
    const ii = regs.length;
    for (let i = 0; i < ii; i++) {
      this.runComponentPre(regs[i], time, advance);
    }
    for (let i = 0; i < ii; i++) {
      this.runComponentAnimation(regs[i], time, advance);
    }
  }
  private runComponentPre(reg: Registration, time: number, advance: number) {
    reg.beforePre(advance);
    try {
      if (reg.always || isTimedOut(getTime(), reg.last, maximumDelay) || isWithinTime(getTime(), time, maximumCycleTime)) {
        // always? component timeout? spare time?
        reg.afterPre(reg.component.onPreAnimate(time, reg.outPrepAdvance, reg.state));
      } else {
        this._dropped++;
        if (!AnimationRoot._warned) {
          AnimationRoot._warned = true;
          console.warn(`[animation] stopped one or more animations due to low performance (${(getTime() - time).toFixed(1)}ms)`);
          setTimeout(() => AnimationRoot._warned = false, 1000);
        }
      }
    } catch (ex) {
      console.error(`Material Pre Animation`, ex);
    }
  }
  private runComponentAnimation(reg: Registration, time: number, advance: number) {
    if (!reg.isPrepped()) { return; }
    reg.beforeAnimate(advance);
    try {
      if (reg.always || isWithinTime(getTime(), time, maximumCycleTime)) {
        reg.afterAnimate(time, reg.component.onAnimate(time, reg.outAnimateAdvance, reg.state));
        if (reg.changed) {
          if (reg.component.applyAnimation) {
            reg.component.applyAnimation(reg.state);
            reg.afterApplied();
          } else {
            const changes = partialUpdate(reg.component.state, reg.state);
            if (changes !== undefined) {
              reg.component.setState(changes);
              reg.afterApplied();
            }
          }
        }
      } else {
        this._dropped++;
        if (!AnimationRoot._warned) {
          AnimationRoot._warned = true;
          console.warn(`[animation] stopped one or more animations due to low performance (${(getTime() - time).toFixed(1)}ms)`);
          setTimeout(() => AnimationRoot._warned = false, 1000);
        }
      }
    } catch (ex) {
      console.error(`Material Animation`, ex);
    }
  }

  private beginTrigger() {
    if (!this._timer) { this._timer = window.requestAnimationFrame(this.onTrigger); }
  }

  private cancelTrigger() {
    if (this._timer) { window.cancelAnimationFrame(this._timer); this._timer = null; }
  }

  private onTrigger = () => {
    this._timer = null;
    this.iterateCore();
    this.beginTrigger();
  }
}
export default AnimationRoot;
