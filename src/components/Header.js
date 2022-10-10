import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { criarImg } from '../redux/actions/index';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const profile = criarImg(gravatarEmail);

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ profile }
          alt="imagen do jogador"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">{ score }</h2>
      </header>

    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  gravatarEmail: state.playerReducer.gravatarEmail,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps)(Header);
