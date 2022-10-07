import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  handleClickConfig = () => {
    const { history } = this.props;
    history.push('/config');
  };

  verifyBtn = () => {
    const { name, email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const nameVerify = name.length > 0;
    const btnState = verifyEmail && nameVerify;
    this.setState({ isDisabled: !btnState });
  };

  handleClick = (e) => {
    e.prenventDefault();
    const { addUser } = this.props;
    // const { email, user } = this.state;
    addUser(this.state);
  };

  render() {
    const { name, email, isDisabled } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="name">
            <input
              className="input-player-name"
              data-testid="input-player-name"
              type="text"
              name="name"
              placeholder="Digite seu nome"
              onChange={ this.handleInput }
              value={ name }
            />
          </label>
          <label htmlFor="email">
            <input
              className="input-gravatar-email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              placeholder="Digite seu email"
              onChange={ this.handleInput }
              value={ email }
            />
          </label>
          <button
            className="BTN_login"
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.handleClickConfig }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (state) => dispatch(getUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);
Login.propTypes = {
  addUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
