import React from 'react';
import Spring from '../animation/spring';
import Entry from '../animationroot/entry';
import DebugEntry from './Entry';
import cx from './style.less';

const getDisplayName = (component: any) => (
  component.displayName ||
  component.name ||
  (typeof component === 'string' ? component : 'Component')
);

// tslint:disable no-magic-numbers
const borderWidth = (time: number) => 1 - (Math.min(1, (Date.now() - time) * 0.001));

const Group = (obj: any): React.ReactNode[] => {
  if (!obj) {
    return null;
  }
  return Object.keys(obj).map((k) => Field(k, obj[k]));
};
const Field = (key: string, value: any) => {
  // if (key === `children` && value instanceof Array) {
  //   return <dd className={cx(`item`, `array`)} key={key}><dl>{value.map((x, idx) => [<dt>{key}[{idx}]</dt>, ...Group(x.props)])}</dl></dd>;
  // }
  if (value instanceof Array) {
    if (value.length) {
      return <dd className={cx(`item`, `array`)} key={key}><dl>{value.map((x, idx) => [<dt>{key}[{idx}]</dt>, ...Group(x)])}</dl></dd>;
    } else {
      return <dd className={cx(`item`, `array`)} key={key}>{key}[]</dd>;
    }
  }
  if (value instanceof Spring) {
    return <dd className={cx(`item`, `spring`, { idle: value.velocity === 0.0 })} key={key}>{key} {value.target.toFixed(2)} @{value.velocity.toFixed(2)} ({(value.current).toFixed(2)})</dd>;
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

export default ({ entry, onHover, onLeave }: { entry: DebugEntry, onHover?: (entry: DebugEntry) => void, onLeave?: (entry: DebugEntry) => void }) => {
  const state = entry.entry.state;
  const props = entry.entry.component.props;
  const borderLeft = `5px solid rgba(255,0,0,${borderWidth(entry.entry.lastChange).toFixed(1)})`;
  return (
    <div style={{ borderLeft }} onMouseEnter={onHover ? () => onHover(entry) : null} onMouseLeave={onLeave ? () => onLeave(entry) : null}>
      <dl>
        <dt className={cx(`name`)}>#{entry.id} {getDisplayName(entry.entry.component)}</dt>
        {Group(state)}
      </dl>
    </div>
  );
};
