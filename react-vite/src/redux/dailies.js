const SET_DAILIES = 'dailies/setDailies'

const setDailies = (dailies) => ({
    type: SET_DAILIES,
    payload: dailies
});

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
        default:
            return state;
    }
}

export default dailyReducer;
