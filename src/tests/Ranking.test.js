import React from 'react';
import Ranking from '../pages/Ranking';
import { render, screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import Header from '../components/Header'
import player from '../redux/reducers/player';

describe('Verifica tela de Ranking', () => {
    test('verifica o boltão home', () => {
       const {history} = renderWithRouterAndRedux(<App />, {}, '/ranking');
       const buttonHome = screen.getByTestId('btn-go-home')
        userEvent.click(buttonHome);
        expect(history.location.pathname).toBe('/');
    })
    test('verifica elementos na tela de ranking', () => {
        renderWithRouterAndRedux(<Header />);
        const playerImage = screen.getByTestId('header-profile-picture');
        expect(playerImage).toBeInTheDocument();
    })
});