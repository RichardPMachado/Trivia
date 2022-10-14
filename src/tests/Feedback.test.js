
import React from "react";
import Feedback from "../pages/Feedback";
import { screen } from "@testing-library/react";
import App from '../App';
import Header from "../components/Header";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const INITIAL_STATE = {
    name: '', // nome-da-pessoa
    score: 0, // pontuação
    gravatarEmail: '', // email-da-pessoa
    token: '',
    isLoading: false,
    isRedirect: false,
    ranking: [],
    player: {
        assertions: 4, // número-de-acertos
    }
  };

describe('Verifica tela de Feedback', () => {
    test('veridica se o Título existe', () => {
        renderWithRouterAndRedux(<Feedback />);
        const titleFeedback = screen.getByTestId('feedback-text');
        expect(titleFeedback).toBeInTheDocument();
    });
    test('Verifica se o gravatar é renderizado na tela de feedback', () => {
        const { history } = renderWithRouterAndRedux(<Header />);
        act(() => {
        history.push('feedback')
        })
        const image = screen.getByTestId('header-profile-picture') 
        expect(image).toBeInTheDocument(); 
        });
    test('Verifica nome', () => {
        renderWithRouterAndRedux(<Header/>);
        const playerName = screen.getByTestId('header-player-name');
        expect(playerName).toBeInTheDocument(); 
        })
    test('Verifica nome e score na tela', () => {
        renderWithRouterAndRedux(<Header/>);
        const scoreHeader = screen.getByTestId('header-score');
        expect(scoreHeader).toBeInTheDocument();
        })
    test('Verifica se todos os elementos da tela feeedback são renderizados', () => {
        renderWithRouterAndRedux(<Feedback />);
        
        const questions = screen.getByTestId('feedback-total-question');
        const scores = screen.getByTestId('feedback-total-score');
        const buttonPlay = screen.getByTestId('btn-play-again');
        const buttonRanking = screen.getByTestId('btn-ranking');
        
        expect(questions).toBeInTheDocument();
        expect(scores).toBeInTheDocument(); ;
        expect(buttonPlay).toBeInTheDocument();
        expect (buttonRanking).toBeInTheDocument();
    });
    test('Verifica mensagem de feedbak na tela', () => {
        renderWithRouterAndRedux(<Feedback />);
        const feedbackText = screen.getByTestId('feedback-text');
        expect(feedbackText).toBeInTheDocument()
        }); 
    test('Verifica mensagens da tela feedback', () => {
        renderWithRouterAndRedux(<Feedback />);
        const mensage = screen.getByTestId('feedback-text');
        expect(mensage).toContainHTML('Could be better...');    
    });
    test('Verifica mensagens da tela feedback', () => {
        renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
        const mensage = screen.getByTestId('feedback-text');
        expect(mensage).toContainHTML('Well Done!');    
    });
    test('verifica botão de ranking', () => {
        const {history} = renderWithRouterAndRedux(<Feedback />);
        const buttonRanking = screen.getByTestId('btn-ranking');
        
        userEvent.click(buttonRanking);
        expect(history.location.pathname).toBe('/ranking');
    })
    test('verifica botão de play again', () => {
        const {history} = renderWithRouterAndRedux(<Feedback />);
        const buttonPlay = screen.getByTestId('btn-play-again');

        userEvent.click(buttonPlay);
        expect(history.location.pathname).toBe('/');
    })
    test('verifica a página de login', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
        history.push('/feedback')
        })
        const { pathname } = history.location;
        expect(pathname).toBe('/feedback');
    })
 });