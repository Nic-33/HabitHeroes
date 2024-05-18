const SET_TODOS = 'todos/setTodos'
const CREATE_TODOS = 'todos/createTodos'
const UPDATE_TODOS = 'todos/updateTodos'
const DELETE_TODOS = 'todos/deleteTodos'

const COMPLETE_TODO = 'todos/completeTodo'

const completeTodo = (todo_id) => ({
    type: COMPLETE_TODO,
    payload: todo_id
});

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

const deleteTodos = (todo_id) => ({
    type: DELETE_TODOS,
    payload: todo_id
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
    console.log(todo_id)
    const response = await fetch(`api/todo/${todo_id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log('response!!!!:', response)
    if (response.ok) {
        const todo = await response.json()
        dispatch(updateTodos(todo))
    }
}

export const thunkCompleteTodo = (todo_id) => async (dispatch) => {
    const response = await fetch(`api/todo/${todo_id}/complete`)
    if (response.ok) {
        const todo = await response.json()
        dispatch(completeTodo(todo))
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

        case CREATE_TODOS: {
            return {
                ...state, [action.payload.id]: action.payload
            }
        }
        case DELETE_TODOS: {
            obj = { ...state }
            delete obj[action.payload]
            return { ...obj }
        }

        case COMPLETE_TODO: {
            return { ...state, [action.payload.id]: action.payload }
        }

        default:
            return state;
    }
}

export const thunkDeleteTodos = (todo_id) => async (dispatch) => {
    const response = await fetch(`/api/todo/${todo_id}/delete`, {
        method: 'DELETE'
    });
    dispatch(deleteTodos(todo_id));
    return response;
};

export default todoReducer;
