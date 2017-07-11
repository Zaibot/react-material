import React from 'react';
import Entry from '../animationroot/entry';
import DebugEntry from './Entry';
import EntryView from './EntryView';

export default ({ entries, onHover, onLeave }: { entries: DebugEntry[], onHover?: (entry: DebugEntry) => void, onLeave?: (entry: DebugEntry) => void }) => {
  return (
    <div>
      {entries.map((entry, idx) => <EntryView key={idx} entry={entry} onHover={onHover} onLeave={onLeave} />)}
    </div>
  );
};
