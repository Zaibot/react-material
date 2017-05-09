import React from 'react';
import ReactDOM from 'react-dom';
import { Material, Button, NavButton, Menu, AnimationRoot, ToggleMenu } from '..';
import './style.less';
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
            <Button>Button</Button>
            <Button accent>Button</Button>

            <h2>Floating Button</h2>
            <Button floating>Button</Button>
            <Button floating accent>Button</Button>

            <h2>Floating Ambient Button</h2>
            <Button floating ambient>Button</Button>
            <Button floating ambient accent>Button</Button>

            <h2>Round Button</h2>
            <Button round>B</Button>
            <Button round accent>B</Button>

            <h2>Floating Round Button</h2>
            <Button round floating>B</Button>
            <Button round floating big>B</Button>
            <Button round floating accent>B</Button>
            <Button round floating big accent>B</Button>

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
        </div>
    </AnimationRoot>
);
document.addEventListener('DOMContentLoaded', () => { ReactDOM.render(<Demo />, document.body); });
