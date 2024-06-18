const GET_HABITS = 'habits/setHabits'
const CREATE_HABITS = 'habits/createHabits'
const UPDATE_HABITS = 'habits/updateHabits'
const DELETE_HABIT = 'habits/deleteHabits'

const INCREMENT_HABIT_POS = 'habits/incrementHabitPos'
const INCREMENT_HABIT_NEG = 'habits/incrementHabitNeg'


const setHabits = (habits) => ({
    type: GET_HABITS,
    payload: habits
});

const createHabits = (habits) => ({
    type: CREATE_HABITS,
    payload: habits
});

const updateHabits = (habits) => ({
    type: UPDATE_HABITS,
    payload: habits
})

const deleteHabits = (habit_id) => ({
    type: DELETE_HABIT,
    payload: habit_id
})

const incrementHabitPos = (habit) => ({
    type: INCREMENT_HABIT_POS,
    payload: habit
})
const incrementHabitNeg = (habit) => ({
    type: INCREMENT_HABIT_NEG,
    payload: habit
})




export const thunkGetHabits = () => async (dispatch) => {
    const response = await fetch("/api/habits/");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(setHabits(data));
    }
}

export const thunkCreateHabits = (payload) => async (dispatch) => {
    const response = await fetch(`/api/habits`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const habit = await response.json()
        dispatch(createHabits(habit))
    }

}

export const thunkUpdateHabits = (payload, habit_id) => async (dispatch) => {
    const response = await fetch(`api/habits/${habit_id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const habit = await response.json()
        dispatch(updateHabits(habit))
    }
}

export const thunkIncrementHabitPos = (habit_id) => async (dispatch) => {
    const response = await fetch(`api/habits/${habit_id}/pos`, { method: "PUT" })
    if (response.ok) {
        const habit = await response.json()
        dispatch(incrementHabitPos(habit))
    }
}
export const thunkIncrementHabitNeg = (habit_id) => async (dispatch) => {
    const response = await fetch(`api/habits/${habit_id}/neg`, { method: "PUT" })
    if (response.ok) {
        const habit = await response.json()
        dispatch(incrementHabitNeg(habit))
    }
}

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
function habitReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HABITS:
            obj = {}
            action.payload.habits.forEach(element => {
                obj[element.id] = element;
            });
            return { ...obj }

        case UPDATE_HABITS: {
            return {
                ...state, [action.payload.id]: action.payload
            }
        }

        case CREATE_HABITS: {
            return {
                ...state, [action.payload.id]: action.payload
            }
        }

        case DELETE_HABIT: {
            obj = { ...state }
            delete obj[action.payload]
            return { ...obj }
        }

        case INCREMENT_HABIT_POS: {

            return { ...state, [action.payload.id]: action.payload }
        }
        case INCREMENT_HABIT_NEG: {

            return { ...state, [action.payload.id]: action.payload }
        }

        default:
            return state;
    }
}

export const thunkDeleteHabits = (habit_id) => async (dispatch) => {
    const response = await fetch(`/api/habits/${habit_id}/delete`, {
        method: 'POST'
    });
    dispatch(deleteHabits(habit_id));
    return response;
};




export default habitReducer;
