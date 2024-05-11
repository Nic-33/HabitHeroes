const SET_HABITS = 'habits/setHabits'
const REMOVE_HABITS = 'habits/removeHabits'

const setHabits = (habits) => ({
    type: SET_HABITS,
    payload: habits
});

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
        console.log("data:",data)
        dispatch(setHabits(data));
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
        case REMOVE_HABITS:
            return {}
        default:
            return state;
    }
}

export default habitReducer;
