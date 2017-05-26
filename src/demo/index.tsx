// tslint:disable-next-line
/// <reference path="../material-design-color-palette.d.ts" />

import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AnimationRoot, Button, Material, Menu, NavButton, ToggleMenu } from '..';
import colors from '../colors';
import cx from './style.less';

const Demo = () => (
    <AnimationRoot>
        <div>
            <h2>Rounded Card</h2>
            <Material rounded card>Panel</Material>

            <h2>Rounded Ripple Card</h2>
            <Material rounded ripple card>Panel</Material>

            <h2>Rounded Ambient Ripple Card</h2>
            <Material rounded ambient ripple card>Panel</Material>

            <h2>Button</h2>
            <Button className={mdc(colors.bg.indigo.n500, colors.text.white)}>Button</Button>
            <Button className={mdc(colors.bg.indigo.n500, colors.text.white)} accent>Button</Button>

            <h2>Floating Button</h2>
            <Button className={mdc(colors.bg.cyan.n600, colors.text.white)} floating>Button</Button>
            <Button className={mdc(colors.bg.cyan.n600, colors.text.white)} floating accent>Button</Button>

            <h2>Floating Ambient Button</h2>
            <Button className={mdc(colors.bg.red.n500, colors.text.white)} floating ambient>Button</Button>
            <Button className={mdc(colors.bg.red.n500, colors.text.white)} floating ambient accent>Button</Button>

            <h2>Round Button</h2>
            <Button className={mdc(colors.bg.red.n500, colors.text.white)} round>B</Button>
            <Button className={mdc(colors.bg.red.n500, colors.text.white)} round accent>B</Button>

            <h2>Floating Round Button</h2>
            <Button className={mdc(colors.bg.red.n500, colors.text.white)} round floating>B</Button>
            <Button className={mdc(colors.bg.red.n500, colors.text.white)} round floating big>B</Button>
            <Button className={mdc(colors.bg.red.n500, colors.text.white)} round floating accent>B</Button>
            <Button className={mdc(colors.bg.red.n500, colors.text.white)} round floating big accent>B</Button>

            <h2>Nav Button</h2>
            <NavButton>B</NavButton>
            <NavButton raised>B</NavButton>
            <NavButton accent>B</NavButton>
            <NavButton raised accent>B</NavButton>

            <h2>Menu</h2>
            <div style={{ height: 200 }}>
                <Menu open>
                    <NavButton>Option 1</NavButton>
                    <NavButton>Option 2</NavButton>
                    <NavButton>Option 3</NavButton>
                    <NavButton>Option 4</NavButton>
                </Menu>
            </div>

            <h2>Menu</h2>
            <div style={{ height: 200 }}>
                <ToggleMenu menu={(
                  <Menu open>
                    <NavButton>Option 1</NavButton>
                    <NavButton>Option 2</NavButton>
                    <NavButton>Option 3</NavButton>
                    <NavButton>Option 4</NavButton>
                  </Menu>
                )}>
                Test
                </ToggleMenu>
            </div>

            <h2>Dialog</h2>
            <div style={{ height: 200 }}>
              <Material className={cx(`dialog`)} dialog style={{position: 'absolute', left: '50%', transform: `translate(-50%, 0)` }}>
                <h2 className={cx(`dialogtitle`)}>Title goes here</h2>
                <p className={cx(`dialogcontent`)}>
                  I'm a thing. But like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making.
                </p>
              </Material>
            </div>

            <h2>Dialog Ambient</h2>
            <div style={{ height: 200 }}>
              <Material className={cx(`dialog`)} dialog ambient style={{position: 'absolute', left: '50%', transform: `translate(-50%, 0)` }}>
                <h2 className={cx(`dialogtitle`)}>Title goes here</h2>
                <p className={cx(`dialogcontent`)}>
                  I'm a thing. But like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making.
                </p>
              </Material>
            </div>

            <h2>Elevations</h2>
            <div style={{ height: 200 }}>
              <Material style={{width: 40, height: 40}} inline round>0</Material>
              <Material style={{width: 40, height: 40}} inline round elevation={1}>1</Material>
              <Material style={{width: 40, height: 40}} inline round elevation={2}>2</Material>
              <Material style={{width: 40, height: 40}} inline round elevation={3}>3</Material>
              <Material style={{width: 40, height: 40}} inline round elevation={4}>4</Material>
              <Material style={{width: 40, height: 40}} inline round elevation={6}>6</Material>
              <Material style={{width: 40, height: 40}} inline round elevation={8}>8</Material>
              <Material style={{width: 40, height: 40}} inline round elevation={9}>9</Material>
              <Material style={{width: 40, height: 40}} inline round elevation={12}>12</Material>
              <Material style={{width: 40, height: 40}} inline round elevation={16}>16</Material>
              <Material style={{width: 40, height: 40}} inline round elevation={24}>24</Material>
            </div>
            <h2>Elevations</h2>
            <div style={{ height: 200 }}>
              <Material style={{width: 40, height: 40}} ambient inline round>0</Material>
              <Material style={{width: 40, height: 40}} ambient inline round elevation={1}>1</Material>
              <Material style={{width: 40, height: 40}} ambient inline round elevation={2}>2</Material>
              <Material style={{width: 40, height: 40}} ambient inline round elevation={3}>3</Material>
              <Material style={{width: 40, height: 40}} ambient inline round elevation={4}>4</Material>
              <Material style={{width: 40, height: 40}} ambient inline round elevation={6}>6</Material>
              <Material style={{width: 40, height: 40}} ambient inline round elevation={8}>8</Material>
              <Material style={{width: 40, height: 40}} ambient inline round elevation={9}>9</Material>
              <Material style={{width: 40, height: 40}} ambient inline round elevation={12}>12</Material>
              <Material style={{width: 40, height: 40}} ambient inline round elevation={16}>16</Material>
              <Material style={{width: 40, height: 40}} ambient inline round elevation={24}>24</Material>
            </div>
        </div>
    </AnimationRoot>
);
document.addEventListener('DOMContentLoaded', () => { ReactDOM.render(<Demo />, document.body); });
