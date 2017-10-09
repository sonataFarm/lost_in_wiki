import React from 'react';
import LinkList from './link-list';

const Page = ({ links }) => (
  <div className="page-container">
    <LinkList links={ links } />
  </div>
);

export default Page;
