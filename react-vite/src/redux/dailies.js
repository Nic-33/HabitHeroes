const SET_DAILIES = 'dailies/setDailies'

export const thunkGetDailes = () => async (dispatch) => {
    const response = await fetch("/api/dailes");
    if (response.ok) {
        const data = response.json();
        if (data.errors) {
            return;
        }
        dispatch(setDailies(data));
    }
}

const setDailies = (dailies) => ({
    type: SET_DAILIES,
    payload: dailies
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
function dailyReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DAILIES:
            obj = {}
            action.payload.dailies.forEach(element => {
                obj[element.id]=element;
            });
            return { ...action.payload}
        default:
            return state;
    }
}

export default dailyReducer;
