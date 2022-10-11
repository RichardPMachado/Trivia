import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { criarImg } from '../redux/actions/index';
import Header from '../components/Header';

class Ranking extends React.Component {
  toHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { playerName, gravatarEmail, score } = this.props;
    const profile = criarImg(gravatarEmail);
    return (
      <div>
        <Header />
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          <img
            src={ profile }
            alt={ `Imagem do jogador ${playerName}` }
          />
          <h3>{ playerName }</h3>
          <h3>{ score }</h3>

          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.toHome }
          >
            Home
          </button>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Ranking.propTypes = {
  history: PropTypes.array,
}.isRequired;

// PropTypes.shape({
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// });

export default connect(mapStateToProps)(Ranking);

// class Ranking extends Component {
//   toHome = () => {
//     const { history } = this.props;
//     history.push('/');
//   };

//   render() {
//     const { nameProps } = this.state;
//     return (
//       <div>
//         <Header />
//         <h2 data-testid="ranking-title">Ranking</h2>
//         <table>
//           <tr>
//             <th>Posição</th>
//             <th>Nome</th>
//             <th>Pontuação</th>
//           </tr>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>{ nameProps }</td>
//               <td>3</td>
//               {/* { rankingProps.map((e) => (

//                 <td key={}>{ e }</td>

//               ))} */}
//             </tr>
//           </tbody>
//         </table>
//         <button
//           type="button"
//           data-testid="btn-go-home"
//           onClick={ this.toHome }
//         >
//           Home
//         </button>
//       </div>

//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   rankingProps: state.player.ranking,
//   nameProps: state.player.name,
// });

// export default connect(mapStateToProps)(Ranking);
// Ranking.propTypes = {
//   history: PropTypes.array,
//   nameProps: PropTypes.string,
// }.isRequired;
