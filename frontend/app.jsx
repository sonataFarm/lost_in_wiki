import React from 'react';
import Page from './components/page';

const links = [
   // placeholders pending DB integration
  { title: 'Elizabeth II' },
  { title: 'Pederasty in ancient Greece' },
  { title: 'Corgis' },
  { title: 'N-N-Dimethyltryptamine' },
  { title: 'Necrophilia' }
];

const App = () => (
  <Page links={ links } />
);

export default App;
