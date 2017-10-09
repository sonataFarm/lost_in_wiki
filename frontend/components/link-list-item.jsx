import React from 'react';
import _ from 'lodash';
import Color from '../util/color';

const LINK_LIST_ITEM_WIDTH = 200; // width in px
const LINK_LIST_ITEM_HEIGHT = 30; // height in px

const LinkListItem = ({ link }) => {

  styles = {
    top: _.random(0, window.innerWidth),
    left: _.random(0, window.innerHeight),
    color: Color.random(),
    background: Color.random()
  };

  return (
    <div className="link-list-item-container" { ...styles }>
      { link.title }
    </div>
  );
}

export default LinkListItem;
