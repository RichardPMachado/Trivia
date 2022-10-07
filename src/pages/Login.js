import React from 'react';
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

  handleClick = () => {
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
              placeholder="Digite seu nome"
              onChange={ this.handleInput }
              value={ email }
            />
          </label>
          <button
            className="BTN_login"
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.handleClick }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
