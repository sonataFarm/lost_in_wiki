import React from 'react';
import LinkListItem from './link-list-item';

const LinkList = ({ links }) => {
  const listItems = links.map(
    (link, idx) => <LinkListItem key={idx} link={link} />
  );

  return (
    <div>
      { listItems }
    </div>
  );
};


export default LinkList;
