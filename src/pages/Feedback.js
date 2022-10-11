import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const num = 3;
class feedback extends React.Component {
  render() {
    const { score } = this.props;
    let text = '';
    if (score < num) {
      text = 'Could be better...';
    } else {
      text = 'Well Done!';
    }
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{ text }</h1>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(feedback);
