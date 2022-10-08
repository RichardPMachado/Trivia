import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { criarImg } from '../redux/actions/index';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail } = this.props;
    const profile = criarImg(gravatarEmail);

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ profile }
          alt="imagen do jogador"
        />
        <h1 data-testid="header-player-name">{ name }</h1>
        <h1 data-testid="header-score">0</h1>
      </header>

    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  gravatarEmail: state.user.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
