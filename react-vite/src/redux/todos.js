const SET_TODOS = 'todos/setTodos'

export const thunkGetTodos = () => async (dispatch) => {
    const response = await fetch("/api/todos");
    if (response.ok) {
        const data = response.json();
        if (data.errors) {
            return;
        }
        dispatch(setTodos(data));
    }
}

const setTodos = (todos) => ({
    type: SET_TODOS,
    payload: todos
});

// const SET_HABIT = 'habits/setHabit';
// const REMOVE_HABIT = 'habits.removeHabit'

// const setHabit = (habit) => ({
//     type: SET_HABIT,
//     payload: habit
// });

// const removeHabit = () => ({
//     type: REMOVE_HABIT
// })

const initialState = {}
let obj = {}
function todoReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TODOS:
            obj = {}
            action.payload.todos.forEach(element => {
                obj[element.id] = element;
            });
            return { ...action.payload }
        default:
            return state;
    }
}

export default todoReducer;
