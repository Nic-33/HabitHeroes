const SET_TODOS = 'todos/setTodos'
const CREATE_TODOS = 'todos/createTodos'
const UPDATE_TODOS = 'todos/updateTodos'

const setTodos = (todos) => ({
    type: SET_TODOS,
    payload: todos
});

const createTodos = (todos) => ({
    type: CREATE_TODOS,
    payload: todos
});

const updateTodos = (todos) => ({
    type: UPDATE_TODOS,
    payload: todos
})

export const thunkGetTodos = () => async (dispatch) => {
    const response = await fetch("/api/todo/");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        console.log("data:", data)
        dispatch(setTodos(data));
    }
}

export const thunkCreateTodos = (payload) => async (dispatch) => {
    const response = await fetch(`/api/todo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const todo = await response.json()
        dispatch(createTodos(todo))
    }

}

export const thunkUpdateTodos = (payload, todo_id) => async (dispatch) => {
    const response = await fetch(`api/todo/${todo_id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const todo = await response.json()
        dispatch(updateTodos(todo))
    }
}


// const SET_TODO = 'todos/setTodo';
// const REMOVE_TODO = 'todos.removeTodo'

// const setTodo = (todo) => ({
//     type: SET_TODO,
//     payload: todo
// });

// const removeTodo = () => ({
//     type: REMOVE_TODO
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
            return { ...obj }

        case UPDATE_TODOS: {
            return {
                ...state,
                [action.todos.id]: {
                    ...state[action.todos.id],
                    ...action.todos
                }
            }
        }

<<<<<<< HEAD
        case CREATE_TODOS: {
            return {
                ...state,
                [action.todos.Id]: {
                    ...state[action.todos.Id],
                    todos: [...state[action.todos.id], action.todos]
                }
            }
        }

        default:
            return state;
    }
}

export const deleteTodos = (todo_id) => async (dispatch) => {
    const response = await fetch(`/api/todos/${todo_id}`, {
        method: 'DELETE'
    });
    dispatch(deleteTodos());
    return response;
};
=======
    export const deleteTodos = (todo_id) => async (dispatch) => {
        const response = await fetch(`/api/todo/${todo_id}`, {
            method: 'DELETE'
        });
        dispatch(deleteTodos());
        return response;
    };
>>>>>>> 61594d71473aad1964b242cd276a5c34fa147326

export default todoReducer;
