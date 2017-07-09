import React from 'react';
import Spring from '../animation/spring';
import Entry from '../animationroot/entry';
import cx from './style.less';

const getDisplayName = (component: any) => (
  component.displayName ||
  component.name ||
  (typeof component === 'string' ? component : 'Component')
);

// tslint:disable no-magic-numbers
const borderWidth = (time: number) => 1 - (Math.min(1, (Date.now() - time) * 0.001));

const Field = (key: string, value: any) => {
  if (value instanceof Spring) {
    return <dd className={cx(`item`, `spring`)} key={key}>{key} {value.current.toFixed(2)} @{value.velocity.toFixed(2)} ({(value.target - value.current).toFixed(2)})</dd>;
  }
  if (typeof value === 'string') {
    return <dd className={cx(`item`, `string`)} key={key}>{key} {value}</dd>;
  }
  if (typeof value === 'number') {
    return <dd className={cx(`item`, `number`)} key={key}>{key} {value.toFixed(2)}</dd>;
  }
  return <dd className={cx(`item`, `unknown`)} key={key}>{key}?</dd>;
};

export default ({ entry }: { entry: Entry }) => {
  const state = entry.state;
  const props = entry.component.props;
  const borderLeft = `5px solid rgba(255,0,0,${borderWidth(entry.lastChange).toFixed(1)})`;
  return (
    <div style={{ borderLeft }}>
      <dl>
        <dt className={cx(`name`)}>{getDisplayName(entry.component)}</dt>
        {Object.keys(state).map((k) => Field(k, state[k]))}
      </dl>
    </div>
  );
};
