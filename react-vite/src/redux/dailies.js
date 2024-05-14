const SET_DAILIES = 'dailies/setDailies'
const CREATE_DAILIES_FOR_USER = 'dailies/createDailiesForUser'
const UPDATE_DAILIES_FOR_USER = 'dailies/updateDailiesForUser'

const setDailies = (dailies) => ({
    type: SET_DAILIES,
    payload: dailies
});

const createDailies = (dailies) => ({
    type: CREATE_DAILIES_FOR_USER,
    payload: dailies
});

const updateDailies = (dailies) => ({
    type: UPDATE_DAILIES_FOR_USER,
    payload: dailies
})

export const thunkGetDailies = () => async (dispatch) => {
    const response = await fetch("/api/daily");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        console.log("Dailies", data)
        dispatch(setDailies(data));
    }
}

export const thunkCreateDailies = (payload) => async (dispatch) => {
    const response = await fetch(`/api/daily`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok){
        const daily =await response.json()
        dispatch(createDailies(daily))
    }

}

export const thunkUpdateDailies = (payload, daily_id) => async (dispatch) => {
    const response = await fetch(`api/daily/${daily_id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
    })
    if (response.ok){
        const daily = await response.json()
        dispatch(updateDailies(daily))
    }
}

export const thunkCompleteDailies = (daily_id) => async (dispatch) => {
    const response = await fetch(`api/daily/${daily_id}/complete`)
    if (response.ok) {
        const daily = await response.json()
        dispatch(updateDailies(daily))
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
function dailyReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DAILIES:
            obj = {}
            action.payload.dailies.forEach(element => {
                obj[element.id]=element;
            });
            return { ...obj}

        case UPDATE_DAILIES_FOR_USER:{
            return {
                ...state,
                [action.dailies.id]: {
                    ...state[action.dailies.id],
                    ...action.dailies
                }
            }
        }

        case CREATE_DAILIES_FOR_USER:{
            return {
                ...state,
                [action.dailies.Id]: {
                    ...state[action.dailies.Id],
                    dailies: [...state[action.dailies.id],action.dailies]
                }
            }
        }

        default:
            return state;
    }
}

export const deleteDailies = (daily_id) => async (dispatch) => {
    const response = await fetch(`/api/daily/${daily_id}`, {
        method: 'DELETE'
    });
    dispatch(deleteDailies());
    return response;
};

export default dailyReducer;
