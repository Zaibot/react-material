import React from 'react';
import Entry from '../animationroot/entry';
import EntryView from './Entry';

export default ({ entries }: { entries: Entry[] }) => {
  return (
    <div>
      {entries.map((entry, idx) => <EntryView key={idx} entry={entry} />)}
    </div>
  );
};
