import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS } from '../types';
import { ScreenContext } from '../screen/screenContex';
import {Http} from '../../http'; 

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null,
    };
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { screenChange } = useContext(ScreenContext);

    const addTodo = async (title) => {
        // const res = await fetch('https://r-adminpanel.firebaseio.com/todos.json', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         title,
        //     })
        // });
        // const data = await res.json();
        clearError();
        try {
            const data = await Http.post('https://r-adminpanel.firebaseio.com/todos.json', {title});
            dispatch({ type: ADD_TODO, title: title, id: data.name })
        } catch (error) {
            showError('Something goes wrong');
            console.log(error);
            
        }
    };

    const removeTodo = (id) => {
        const todo = state.todos.find(t => t.id === id);
        Alert.alert(
            'Delete element',
            `Are you shoore, do you want to delete "${todo.title}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        screenChange(null);
                        // await fetch(`https://r-adminpanel.firebaseio.com/todos/${id}.json`, {
                        //     method: 'DELETE',
                        //     headers: {'Content-Type:': 'application/json'}
                        // })
                        await Http.delete(`https://r-adminpanel.firebaseio.com/todos/${id}.json`);
                        dispatch({ type: REMOVE_TODO, id });
                    }
                }
            ],
            { cancelable: false }
        )

    }

    const updateTodo = async (id, title) => {
        clearError();
        try {
            // await fetch(`https://r-adminpanel.firebaseio.com/todos/${id}.json`, {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json'},
            //     body: JSON.stringify({
            //         title
            //     })
            // })
            await Http.patch(`https://r-adminpanel.firebaseio.com/todos/${id}.json`);
            dispatch({ type: UPDATE_TODO, id, title })
        } catch (error) {
            showError('Something goes wrong');
            console.log(error); 
        }
    };

    const fetchTodos = async () => {
        showLoader();
        clearError();
        try {
            // const response = await fetch('https://r-adminpanel.firebaseio.com/todos.json', {
            //     method: 'GET',
            //     headers: { 'Content-Type': 'application/json' }
            // });

            // const data = await response.json();
            const data = await Http.get('https://r-adminpanel.firebaseio.com/todos.json');
            const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
            dispatch({ type: FETCH_TODOS, todos });
        } catch (error) {
            showError('Something goes wrong');
            console.log(error);   
        } finally {
            hideLoader();
        }
    }

    const showLoader = () => dispatch({ type: SHOW_LOADER });

    const hideLoader = () => dispatch({ type: HIDE_LOADER });

    const showError = (error) => dispatch({ type: SHOW_ERROR, error });

    const clearError = () => dispatch({ type: CLEAR_ERROR });

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            loading: state.loading,
            error: state.error,
            addTodo,
            removeTodo,
            updateTodo,
            fetchTodos
        }}>
            {children}
        </TodoContext.Provider>
    );
};