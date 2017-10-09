import React from 'react';
import _ from 'lodash';
import Color from '../util/color';
import { Link } from 'react-router-dom';

const LINK_LIST_ITEM_WIDTH = 200; // width in px
const LINK_LIST_ITEM_HEIGHT = 30; // height in px

const generateStyles = () => {
  let styles = {
    top: _.random(0, window.innerHeight - LINK_LIST_ITEM_HEIGHT),
    left: _.random(0, window.innerWidth - LINK_LIST_ITEM_WIDTH),
    background: Color.random()
  };

  let fontColor = styles.background.getContrastYIQ();

  return { ...styles, color: fontColor };
}

const LinkListItem = ({ link }) => {

  const styles = generateStyles();

  return (
    <Link to={ link.id }>
      <div className="link-list-item-container" style={ styles }>
          { link.title }
      </div>
  </Link>
  );
}

export default LinkListItem;
