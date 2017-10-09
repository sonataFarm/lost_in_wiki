import React from 'react';
import _ from 'lodash';
import LinkList from './link-list';


// link placeholders pending DB integration
const titles = [
  'Elizabeth II',
  'Pederasty in ancient Greece',
  'Corgis',
  'N-N-Dimethyltryptamine',
  'Necrophilia'
];

const links = titles.map(
  title => ({ title, id: _.random(0, 10000) })
);

const Page = () => (
  <div className="page-container">
    <LinkList links={ links } />
  </div>
);

export default Page;
