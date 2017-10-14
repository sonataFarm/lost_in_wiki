import {connect} from 'react-redux';
import {
  requestBackendPage,
  requestPageLinks,
} from '../../actions/page-actions.js';
import StarField from './starfield';

const mapStateToProps = state => ({
  pages: state.pages,
  game: state.game
});

const mapDispatchToProps = dispatch => ({
  requestBackendPage: title => dispatch(requestBackendPage(title)),
  requestPageLinks: title => dispatch(requestPageLinks(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(StarField);
