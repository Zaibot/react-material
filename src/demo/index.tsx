// tslint:disable-next-line
/// <reference path="../material-design-color-palette.d.ts" />
import '@zaibot/css-reset';
import React from 'react';
import ReactDOM from 'react-dom';
import { AnimationRoot } from '..';
import { CardSurface } from './cardSurface';
import Debug from '../debug';
import { Form } from './form';
import { Static } from './static';
import { Breakdown } from './breakdown';
import { SurfacePlayground } from './surface';
import cx from './style.less';

// tslint:disable max-classes-per-file
// tslint:disable no-unsafe-any
// tslint:disable no-magic-numbers

const Demo = ({ fps, core, coreJitter, dropped, onChange }: { fps: number, core: number, coreJitter: number, dropped: number, onChange: (duration: number, since: number, dropped: number) => void }) => (
  <AnimationRoot onFrame={onChange} rate={2.5}>
    <div className={cx(`debugged`)}>
      <div className={cx(`debug`)}>
        <Debug />
      </div>
      <div className={cx(`stats`)}>
        <div className={cx(`fps`)}>
          {fps.toFixed(0)}fps
        </div>
        <div className={cx(`core`)}>
          {core.toFixed(1)}ms &plusmn;{(100 * coreJitter).toFixed(2)}% (max {(1000 / core).toFixed(1)}fps, {dropped} dropped)
        </div>
      </div>
      <div style={{ margin: '5rem' }}>
        <Breakdown />
      </div>
      <div style={{ margin: '5rem' }}>
        <Static />
      </div>
      <div style={{ margin: '5rem' }}>
        <SurfacePlayground />
      </div>
      <div style={{ margin: '5rem' }}>
        <CardSurface />
      </div>
      <div style={{ margin: '5rem' }}>
        <h2>Form</h2>
        <Form />
      </div>
    </div>
  </AnimationRoot>
);
const array = (n: number) => { const r = []; while (n--) { r.push(0); } return r; };
let fpsIndex = 0;
const fpsCount = 5;
const fpsRecords = array(fpsCount);
let coreIndex = 0;
const coreCount = 120;
const coreRecords = array(coreCount);
let lastDropped = 0;

function onChange(duration: number, sinceLast: number, dropped: number) {
  fpsRecords[fpsIndex++ % fpsCount] = 1000 / sinceLast;
  coreRecords[coreIndex++ % coreCount] = duration;
  lastDropped = dropped;
}

function update(fps: number, core: number, jitter: number) {
  ReactDOM.render(<Demo fps={fps} core={core} coreJitter={jitter} dropped={lastDropped} onChange={onChange} />, document.querySelector('app'));
}
document.addEventListener('DOMContentLoaded', () => {
  update(0, 0, 0);
  setInterval(() => {
    const fps = fpsRecords.reduce((state, cur) => state < cur ? state : cur, fpsRecords[0]);
    const core = coreRecords.reduce((state, cur) => state + cur, 0) / coreCount;
    const coreMin = coreRecords.reduce((state, cur) => state < cur ? state : cur, coreRecords[0]);
    const coreMax = coreRecords.reduce((state, cur) => state > cur ? state : cur, coreRecords[0]);
    const coreJitter = ((coreMax - coreMin) / core) - 1;
    // const fps = fpsRecords.reduce((state, cur) => state + (cur || 0), 0) / fpsCount;
    // const core = coreRecords.reduce((state, cur) => state + (cur || 0), 0) / coreCount;
    update(fps, core, coreJitter);
  }, 500);
});
/*

          <h2>MaterialSurfaceTest</h2>
          <MaterialSurfaceTest />

          <h2>Rounded Card</h2>
          <Material
              className={mdc(colors.bg.grey.n50, colors.text.black.dark)}
              rippleClassName={mdc(colors.bg.grey.n500)}
              rounded card>Panel</Material>

          <h2>Rounded Ripple Card</h2>
          <Material
              className={mdc(colors.bg.grey.n50, colors.text.black.dark)}
              rippleClassName={mdc(colors.bg.grey.n500)}
              rounded ripple card>Panel</Material>

          <h2>Rounded Ambient Ripple Card</h2>
          <Material
              className={mdc(colors.bg.grey.n50, colors.text.black.dark)}
              rippleClassName={mdc(colors.bg.grey.n500)}
              rounded ambient ripple card>Panel</Material>

          <h2>Input</h2>
          <Input label="Label" value="Hello" />

          <h2>Login</h2>
          <Login />

          <h2>Login</h2>
          <Login2 />

          <h2>Button</h2>
          <Button className={mdc(colors.bg.indigo.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.indigo.n100)}>Button</Button>
          &nbsp;
          <Button className={mdc(colors.bg.indigo.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.indigo.n100)} accent>Button</Button>

          <h2>Raised Button</h2>
          <Button className={mdc(colors.bg.cyan.n600, colors.text.white.darker)} rippleClassName={mdc(colors.bg.cyan.n100)} raised>Button</Button>
          &nbsp;
          <Button className={mdc(colors.bg.cyan.n600, colors.text.white.darker)} rippleClassName={mdc(colors.bg.cyan.n100)} raised accent>Button</Button>

          <h2>Raised Ambient Button</h2>
          <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} raised ambient>Button</Button>
          &nbsp;
          <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} raised ambient accent>Button</Button>

          <h2>Floating Button</h2>
          <Button className={mdc(colors.bg.cyan.n600, colors.text.white.darker)} rippleClassName={mdc(colors.bg.cyan.n100)} floating>Button</Button>
          &nbsp;
          <Button className={mdc(colors.bg.cyan.n600, colors.text.white.darker)} rippleClassName={mdc(colors.bg.cyan.n100)} floating accent>Button</Button>

          <h2>Floating Ambient Button</h2>
          <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} floating ambient>Button</Button>
          &nbsp;
          <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} floating ambient accent>Button</Button>

          <h2>Round Button</h2>
          <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} round>B</Button>
          &nbsp;
          <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} round accent>B</Button>

          <h2>Floating Round Button</h2>
          <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} round floating>B</Button>&nbsp;
          <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} round floating big>B</Button>&nbsp;
          <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} round floating accent>B</Button>&nbsp;
          <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} round floating big accent>B</Button>&nbsp;

          <h2>Nav Button</h2>
          <NavButton>B</NavButton>&nbsp;
          <NavButton raised>B</NavButton>&nbsp;
          <NavButton accent>B</NavButton>&nbsp;
          <NavButton raised accent>B</NavButton>&nbsp;

          <h2>Menu</h2>
          <div style={{ height: 300 }}>
              <Menu open>
                  <NavButton>Option 1</NavButton>
                  <NavButton>Option 2</NavButton>
                  <NavButton>Option 3</NavButton>
                  <NavButton>Option 4</NavButton>
              </Menu>
          </div>

          <h2>Toggle Menu</h2>
          <div style={{ height: 300 }}>
              <ToggleMenu focus={FocusTopLeft} menu={(e) => (
                  <Menu open>
                      <NavButton onClick={e}>Option 1</NavButton>
                      <NavButton onClick={e}>Option 2</NavButton>
                      <NavButton onClick={e}>Option 3</NavButton>
                      <NavButton onClick={e}>Option 4</NavButton>
                  </Menu>
              )}>
                  ...
              </ToggleMenu>
          </div>

          <h2>Dialog</h2>
          <div style={{ height: 200 }}>
              <Material className={cx(`dialog`, mdc(`mdc-bg-grey-50`))} dialog ripple style={{ position: 'absolute', left: '50%', transform: `translate(-50%, 0)` }}>
                  <h2 className={cx(`dialogtitle`, mdc(`mdc-text-black-darker`))}>Title goes here</h2>
                  <p className={cx(`dialogcontent`, mdc(`mdc-text-black-dark`))}>
                      I'm a thing. But like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making.
              </p>
              </Material>
          </div>

          <h2>Dialog Ambient</h2>
          <div style={{ height: 200 }}>
              <Material className={cx(`dialog`, mdc(`mdc-bg-grey-50`))} dialog ripple ambient style={{ position: 'absolute', left: '50%', transform: `translate(-50%, 0)` }}>
                  <h2 className={cx(`dialogtitle`, mdc(`mdc-text-black-darker`))}>Title goes here</h2>
                  <p className={cx(`dialogcontent`, mdc(`mdc-text-black-dark`))}>
                      I'm a thing. But like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making.
              </p>
              </Material>
          </div>

          <h2>Elevations</h2>
          <div style={{ height: 200 }}>
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round>0</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={1}>1</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={2}>2</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={3}>3</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={4}>4</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={6}>6</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={8}>8</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={9}>9</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={12}>12</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={16}>16</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={24}>24</Material>&nbsp;
          </div>
          <h2>Ambient Elevations</h2>
          <div style={{ height: 200 }}>
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round>0</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={1}>1</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={2}>2</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={3}>3</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={4}>4</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={6}>6</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={8}>8</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={9}>9</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={12}>12</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={16}>16</Material>&nbsp;
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={24}>24</Material>&nbsp;
          </div>
      </div>
  </AnimationRoot>
);
/***/
