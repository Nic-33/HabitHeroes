const SET_HABITS = 'habits/setHabits'
const CREATE_HABITS = 'habits/createHabits'
const UPDATE_HABITS = 'habits/updateHabits'

const setHabits = (habits) => ({
    type: SET_HABITS,
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

export const thunkGetHabits = () => async (dispatch) => {
    const response = await fetch("/api/habits/");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        console.log("data:",data)
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
    if (response.ok){
        const habit =await response.json()
        dispatch(createHabits(habit))
    }

}

export const thunkUpdateHabits = (payload, habit_id) => async (dispatch) => {
    const response = await fetch(`api/habits/${habit_id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
    })
    if (response.ok){
        const habit = await response.json()
        dispatch(updateHabits(habit))
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
        case SET_HABITS:
            obj = {}
            action.payload.habits.forEach(element => {
                obj[element.id]=element;
            });
            return { ...obj}

            case UPDATE_HABITS:{
                return {
                    ...state,
                    [action.habits.id]: {
                        ...state[action.habits.id],
                        ...action.habits
                    }
                }
            }

            case CREATE_HABITS:{
                return {
                    ...state,
                    [action.habits.Id]: {
                        ...state[action.habits.Id],
                        habits: [...state[action.habits.id],action.habits]
                    }
                }
            }

            default:
                return state;
        }
    }

    export const deleteHabits = (habit_id) => async (dispatch) => {
        const response = await fetch(`/api/habits/${habit_id}`, {
            method: 'DELETE'
        });
        dispatch(deleteHabits());
        return response;
    };

export default habitReducer;
