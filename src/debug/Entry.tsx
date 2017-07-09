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

const Group = (obj: any): React.ReactNode[] => {
  return Object.keys(obj).map((k) => Field(k, obj[k]));
};
const Field = (key: string, value: any) => {
  if (value instanceof Array) {
    return <dd className={cx(`item`, `array`)} key={key}><dl>{value.map((x, idx) => [<dt>{key}[{idx}]</dt>, ...Group(x)])}</dl></dd>;
  }
  if (value instanceof Spring) {
    return <dd className={cx(`item`, `spring`)} key={key}>{key} {value.target.toFixed(2)} @{value.velocity.toFixed(2)} ({(value.current).toFixed(2)})</dd>;
  }
  if (typeof value === 'string') {
    return <dd className={cx(`item`, `string`)} key={key}>{key} {value}</dd>;
  }
  if (typeof value === 'number') {
    return <dd className={cx(`item`, `number`)} key={key}>{key} {value.toFixed(2)}</dd>;
  }
  if (typeof value === 'boolean') {
    return <dd className={cx(`item`, `boolean`)} key={key}>{key} {value ? 'true' : 'false'}</dd>;
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
        {Group(state)}
      </dl>
    </div>
  );
};
