const GET_USER_INFO = 'user/getUserInfo'
const REMOVE_USER_INFO = 'user/removeUserInfo'
const UPDATE_USER_INFO = 'user/updateUserInfo'

const getUserInfo = (user) => ({
    type: GET_USER_INFO,
    payload: user
})

export const removeUserInfo = () => ({
    type: REMOVE_USER_INFO
})

const updateUserInfo = (user) => ({
    type: UPDATE_USER_INFO,
    payload: user
})

export const thunkGetUserInfo = () => async (dispatch) => {
    const response = await fetch("/api/users/");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getUserInfo(data));
    }
}

export const thunkUpdateUserInfo = (payload) => async (dispatch) => {
    const response = await fetch('/api/users/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const user = await response.json()
        dispatch(updateUserInfo(user))
    }
}

const initialState = {}
let obj = {}
function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO:
            return action.payload

        case UPDATE_USER_INFO: {
            return {
                ...state,
                [action.habits.id]: {
                    ...state[action.habits.id],
                    ...action.payload
                }
            }
        }

        case REMOVE_USER_INFO:
            return {}

        default:
            return state;
    }
}

export default userReducer
