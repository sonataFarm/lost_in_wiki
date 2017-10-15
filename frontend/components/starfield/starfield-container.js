import {connect} from 'react-redux';
import {
  requestBackendPage,
  requestPageLinks,
  getUsableLinks
} from '../../actions/page-actions.js';
import StarField from './starfield';

const mapStateToProps = state => ({
  pages: state.pages,
  currentPage: state.pages[state.game.currentPage],
  focusPage: state.pages[state.game.focusPage]
});

const mapDispatchToProps = dispatch => ({
  requestBackendPage: title => dispatch(requestBackendPage(title)),
  requestPageLinks: title => dispatch(requestPageLinks(title)),
  getUsableLinks: (title, difficulty) => dispatch(
    getUsableLinks(title, difficulty)
  )
});


export default connect(mapStateToProps, mapDispatchToProps)(StarField);
