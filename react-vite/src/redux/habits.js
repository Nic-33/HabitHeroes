const GET_HABITS = 'habits/setHabits'
const CREATE_HABITS = 'habits/createHabits'
const UPDATE_HABITS = 'habits/updateHabits'
const REMOVE_HABITS = 'habits/removeHabits'

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

export const removeHabits = () =>({
    type:REMOVE_HABITS
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
    if (response.ok){
        const habit =await response.json(
         
        )   

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
        case GET_HABITS:
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
                   ...state,[action.payload.id]:action.payload  
                }
            }

            case REMOVE_HABITS:
                return {}

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
