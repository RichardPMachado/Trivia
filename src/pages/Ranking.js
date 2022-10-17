import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Header from '../components/Header';
// import './CSS/ranking.css';

class Ranking extends React.Component {
  // componentDidMount() {
  //   const { restartGameDispatch } = this.props;
  //   restartGameDispatch();
  // }

  toHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const RANKING = 'RANKING';
    // const { playerName, gravatarEmail, score } = this.props;
    // const profile = criarImg(gravatarEmail);
    // // restartGameDispatch();
    // addRanking({ score, playerName, profile });
    const readRanking = JSON.parse(localStorage.getItem(RANKING));
    return (

      <div>
        {/* <Header /> */}
        <div className="ranking">
          <h1 data-testid="ranking-title">Ranking</h1>
          { readRanking.map((e, i) => (
            <div key={ i }>
              <img
                src={ e.profile }
                alt={ `Imagem do jogador ${e.playerName}` }
              />
              <h3 data-testid={ `player-name-${i}` }>{ e.playerName }</h3>
              <h3 data-testid={ `player-score-${i}` }>{ e.score }</h3>

            </div>
          ))}
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.toHome }
        >
          Home
        </button>
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
