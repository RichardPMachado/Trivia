import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchGame } from '../redux/actions';
import Loading from '../components/Loading';
import './Game.css';

class Game extends React.Component {
  state = {
    questions: [],
    correctAnswer: '',
    answers: [],
    isLoading: true,
    isRedirect: false,
    isDisabled: true,
    borderColorButton: [],
  };

  componentDidMount() {
    this.fetchGameQuest();
  }

  fetchGameQuest = async () => {
    const { results, responseCode } = await fetchGame();
    console.log(results);
    if (responseCode === 0) {
      this.setState({
        correctAnswer: results[0].correct_answer,
      });
      const numberAux = 0.5;
      const toSorted = [
        results[0].correct_answer, ...results[0].incorrect_answers];
      const randomSequence = toSorted.sort(() => Math.random() - numberAux);
      this.setState({
        questions: results,
        answers: randomSequence,
        isLoading: false,
      });
    } else {
      localStorage.clear();
      this.setState({ isRedirect: true });
      // throw new Error('Token Invalid');
    }
  };

  // move = () => {
  //   const id = setInterval(frame, 10);
  //   function frame() {
  //     if (width == 100) {
  //       clearInterval(id);
  //     } else {
  //       width++;
  //       element.style.width = width + '%';
  //     }
  //   }
  // }

  // handleClick = (correctAnswer, answers) => {
  //   let aux = [];
  //   answers.forEach((element) => {
  //     if (correctAnswer === element) {
  //       aux = [...aux, 'correct-answer'];
  //     } else {
  //       aux = [...aux, 'incorrect-answer'];
  //     }
  //   });
  //   this.setState({ borderColorButton: [...aux], isDisabledColorButton: false });
  // };

  handleClick = (correctAnswer, answers) => {
    let test = [];
    answers.forEach((element) => {
      if (correctAnswer === element) {
        test = [...test, 'correct-answer'];
      } else {
        test = [...test, 'incorrect-answer'];
      }
    });
    this.setState({ borderColorButton: [...test], isDisabled: false });
  };

  render() {
    const { questions, correctAnswer, answers,
      isLoading, isRedirect, isDisabled,
      borderColorButton } = this.state;
    // console.log(questions)
    return (
      <div>
        <Header />
        {isLoading ? <Loading />
          : (
            <section>
              <p data-testid="question-category">{questions[0].category}</p>
              <p data-testid="question-text">{ questions[0].question}</p>
              <span data-testid="answer-options">
                {
                  answers.map((answer, index) => (
                    <button
                      type="button"
                      key={ index }
                      className={ isDisabled
                        ? 'button' : borderColorButton[index] }
                      onClick={ () => this.handleClick(correctAnswer, answers) }
                      data-testid={
                        answer === correctAnswer
                          ? 'correct-answer' : `wrong-answer-${index}`
                      }
                    >
                      { answer }
                    </button>
                  ))
                }
              </span>
            </section>
          )}
        {isRedirect && <Redirect to="/" />}
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
// //   emailProps: state.playerReducer.gravatarEmail,
// //   nameProps: state.playerReducer.name,
//   questionsProps: state.gameReducer.questions,
//   isLoadingProps: state.playerReducer.isLoading,
//   // isRedirectProps: state.playerReducer.isRedirect,
// });

// const mapDispatchToProps = (dispatch) => ({
//   // dispatchError: () => dispatch(actLogout()),
//   fetchGameDispatch: () => dispatch(fetchGame()),
// });

export default connect()(Game);

// Game.propTypes = {
//   resultsProps: PropTypes.shape({
//     responseCode: PropTypes.number,
//     questionsProps: PropTypes.shape({
//       results: PropTypes.shape(PropTypes.objectOf),
//       responseCode: PropTypes.number,
//     }),
//   }).isRequired,
//   isLoading: PropTypes.bool,
//   isRedirect: PropTypes.bool,
// }.isRequire;
