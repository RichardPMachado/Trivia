import React from "react";
import App from '../App';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
//import { fetchApi, fetchQuestions } from "../services";


const validName = 'nomeTeste';
const validEmail = 'email@teste.com';

describe ('Testes da Página Login', () => {
    it('verifica se há um campo de entrada para nome', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
       
    expect(inputName).toBeInTheDocument();
  
    });

    it('verifica se há um campo de entrada para email', () => {
        renderWithRouterAndRedux(<App />);
    
        const inputEmail = screen.getByTestId('input-gravatar-email');
        
        expect(inputEmail).toBeInTheDocument();
        });

    it ('verifica se o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    const playButton = screen.getByTestId('btn-play');

    expect(playButton).toBeDisabled();
    });

    it (' verifica se o botão é habilitado ao inserir nome e email válidos', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');

    userEvent.type(inputName, validName);

    expect(playButton).toBeDisabled();

    userEvent.type(inputEmail, validEmail);

    expect(playButton).toBeEnabled();

    userEvent.click(playButton);
    });

    it ('botão "Settings" redireciona à pagina "/config" ao clicar', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const configButton = screen.getByTestId('btn-settings');

    userEvent.click(configButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/config');
    });

 })