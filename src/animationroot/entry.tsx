import React from 'react';
import IAnimatable from './animatable';

class Entry {
    public static create(
        component: React.Component<any, any> & IAnimatable<any>,
        always: boolean,
    ) {
        return new Entry(component, always, undefined, 0, 0, false);
    }

    private _status = 0;
    private _outPrepAdvance = 0;
    private _outAnimateAdvance = 0;

    public get status() { return this._status; }
    public get outPrepAdvance() { return this._outPrepAdvance; }
    public get outAnimateAdvance() { return this._outAnimateAdvance; }
    public get state() { return this._state; }
    public get last() { return this._last; }
    public get lastChange(): number { return this._lastChange; }
    public get changed() { return this._changed; }

    public constructor(
        public readonly component: React.Component<any, any> & IAnimatable<any>,
        public readonly always: boolean,
        private _state: any,
        private _last: number,
        private _lastChange: number,
        private _changed: boolean,
    ) { }

    public beforePre(advance: number) {
        this._status = 0;
        this._outPrepAdvance += advance;
    }
    public afterPre(state: any) {
        this._status = 1;
        this._changed = this.changed || this.state !== state;
        this._lastChange = this.state !== state ? Date.now() : this._lastChange;
        this._outPrepAdvance = 0;
        this._state = state;
    }
    public beforeAnimate(advance: number) {
        this._outAnimateAdvance += advance;
    }
    public afterAnimate(time: number, state: any) {
        this._status = 0;
        this._changed = this.state !== state;
        this._outAnimateAdvance = 0;
        this._last = time;
        this._lastChange = this.state !== state ? Date.now() : this._lastChange;
        this._state = state;
    }

    public afterApplied() {
        this._changed = false;
    }

    public isPrepped() {
        return this.status === 1;
    }
    public reset() {
        this._status = 0;
    }

    public changeState(state: any) {
        this._changed = this.changed || this.state !== state;
        this._lastChange = this.state !== state ? Date.now() : this._lastChange;
        this._state = state;
    }
}
export default Entry;
