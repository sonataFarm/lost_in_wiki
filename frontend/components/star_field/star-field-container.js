import {connect} from 'react-redux';
import {
  requestBackendPage,
  requestPageLinks,
} from '../../actions/page-actions.js';
import StarField from './star-field';

const mapStateToProps = state => ({
  pages: state.pages,
  currentPage: state.pages[state.game.currentPage],
  focusPage: state.pages[state.game.focusPage]
});

const mapDispatchToProps = dispatch => ({
  requestBackendPage: title => dispatch(requestBackendPage(title)),
  requestPageLinks: title => dispatch(requestPageLinks(title))
});


export default connect(mapStateToProps, mapDispatchToProps)(StarField);
