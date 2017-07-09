import React from 'react';
import Entry from '../animationroot/entry';
import EntryView from './Entry';

export default ({ entries, onHover, onLeave }: { entries: Entry[], onHover?: (entry: Entry) => void, onLeave?: (entry: Entry) => void }) => {
  return (
    <div>
      {entries.map((entry, idx) => <EntryView key={idx} entry={entry} onHover={onHover} onLeave={onLeave} />)}
    </div>
  );
};
