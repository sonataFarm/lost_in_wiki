import React from 'react';
import _ from 'lodash';
import LinkList from './link-list';
import { withRouter } from 'react-router-dom';
import pluralize from 'pluralize';
import Color from '../util/color';

// link placeholders pending DB integration
const titles = [
  'Elizabeth II',
  'Pederasty in ancient Greece',
  'Corgis',
  'N-N-Dimethyltryptamine',
  'Necrophilia',
  'Paper',
  'Tree',
  'Flowering Plant',
  'Torture',
  'San Francisco',

];

const links = titles.map(
  title => ({ title, id: _.random(0, 10000) })
);

const generateStyle = () => {
  let styles = { background: Color.random() };
  let fontColor = styles.background.getContrastYIQ();

  return { ...styles, color: fontColor };
}

const Page = props => (
  <div className="page-container" style={generateStyle()}>
    <LinkList links={ links } />
    <div className="depth-container">
      { pluralize('level', props.history.length - 1, true) } deep
    </div>
  </div>
);

export default withRouter(Page);
