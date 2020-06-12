import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { Navbar } from './components/Navbar';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { THEME } from './theme';
import { TodoContext } from './context/todo/todoContext';
import { ScreenContext } from './context/screen/screenContex';

export const MainLayout = () => {
    // const { todos,
    //     addTodo,
    //     removeTodo,
    //     updateTodo
    // } = useContext(TodoContext);
    const { screenChange, todoId } = useContext(ScreenContext)
    // const [todoId, setTodoId] = useState(null);
    // const [todos, setTodos] = useState([]);

    // const addTodo = title => {
    //     setTodos(prev => [
    //         ...prev,
    //         {
    //             id: Date.now().toString(),
    //             title
    //         }
    //     ])
    // }

    // const removeTodo = id => {
    //     const todo = todos.find(t => t.id === id)
    //     Alert.alert(
    //         'Удаление элемента',
    //         `Вы уверены, что хотите удалить "${todo.title}"?`,
    //         [
    //             {
    //                 text: 'Отмена',
    //                 style: 'cancel'
    //             },
    //             {
    //                 text: 'Удалить',
    //                 style: 'destructive',
    //                 onPress: () => {
    //                     setTodoId(null)
    //                     setTodos(prev => prev.filter(todo => todo.id !== id))
    //                 }
    //             }
    //         ],
    //         { cancelable: false }
    //     )
    // }

    // const updateTodo = (id, title) => {
    //     setTodos(old =>
    //         old.map(todo => {
    //             if (todo.id === id) {
    //                 todo.title = title
    //             }
    //             return todo
    //         })
    //     )
    // }

    // let content = (
    //     <MainScreen
    //     // todos={todos}
    //     // addTodo={addTodo}
    //     // removeTodo={removeTodo}
    //     // openTodo={screenChange}
    //     />
    // )

    // if (todoId) {
    //     // const selectedTodo = todos.find(todo => todo.id === todoId)
    //     content = (
    //         <TodoScreen
    //         // onRemove={removeTodo}
    //         // goBack={() => screenChange(null)}
    //         // todo={selectedTodo}
    //         // onSave={updateTodo}
    //         />
    //     )
    // }

    return (
        <View style={styles.wrapper}>
            <Navbar title='Todo App!' />
            {/* <View style={styles.container}>{content}</View> */}
            <View style={styles.container}>
                { todoId ? <TodoScreen/> : <MainScreen/>}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20,
    },
    wrapper: {
        flex: 1,
    }
});