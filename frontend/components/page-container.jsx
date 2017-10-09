import { connect } from 'react-redux';
import Page from './page';

const mapStateToProps = state => ({
  links: selectPageLinks(state)
});

export default connect(mapStateToProps)(Page);
