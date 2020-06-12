import {ADD_TODO, UPDATE_TODO, REMOVE_TODO, FETCH_TODOS, SHOW_LOADER, HIDE_LOADER, CLEAR_ERROR, SHOW_ERROR} from '../types';

const handlers = {
    [ADD_TODO]: (state, {title, id}) => ({
        ...state,
        todos: [
            ...state.todos,
            {
                id,
                title: title
            }
        ]
    }),
    [UPDATE_TODO]: (state, {id, title}) => ({
        ...state,
        todos: state.todos.map(todo => {
            if (todo.id === id) {
                todo.title = title
            }
            return todo
        })
    }),
    [REMOVE_TODO]: (state, {id}) => ({
        ...state,
        todos:  state.todos.filter(todo => todo.id !== id)
    }),
    [FETCH_TODOS]: (state, {todos}) => ({
        ...state,
        todos,
    }),
    [SHOW_LOADER]: (state) => ({
        ...state,
        loading: true,
    }),
    [HIDE_LOADER]: (state) => ({
        ...state,
        loading: false,
    }),
    [CLEAR_ERROR]: (state) => ({
        ...state,
        error: null,
    }),
    [SHOW_ERROR]: (state, {error}) => ({
        ...state,
        error
    }),
    DEFAULT: state => state
}

export const todoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}

// export const todoReducer = (state, action) => {
//     switch (action.type) {
//         case ADD_TODO:
//             return {
//                 ...state,
//                 todos: [
//                     ...state.todos,
//                     {
//                         id: Date.now().toString(),
//                         title: action.title
//                     }
//                 ]
//             } 
//         case UPDATE_TODO:
//             return {
//                 ...state,
//                 todos: state.todos.map(todo => {
//                     if (todo.id === action.id) {
//                         todo.title = action.title
//                     }
//                     return todo
//                 })
//             } 
//         case REMOVE_TODO:
//             return {
//                 ...state,
//                 todos:  state.todos.filter(todo => todo.id !== action.id)
//             } 
//         default:
//             return state;
//     }
// }