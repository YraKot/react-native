import React, { useReducer } from 'react';
import { ScreenContext } from './screenContex';
import { screenReducer } from './screenReducer';
import { CHANGE_SCREEN } from '../types';

export const ScreenState = ({ children }) => {
    const [state, dispatch] = useReducer(screenReducer, null);

    const screenChange = (id) => dispatch({ type: CHANGE_SCREEN, payload: id })

    return (
        <ScreenContext.Provider value={{ screenChange, todoId: state }}>
            {children}
        </ScreenContext.Provider>
    )
}