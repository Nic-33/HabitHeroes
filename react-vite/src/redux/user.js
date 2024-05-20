const GET_USER_INFO = 'user/getUserInfo'
const REMOVE_USER_INFO = 'user/removeUserInfo'
const UPDATE_USER_INFO = 'user/updateUserInfo'
const CREATE_USER_AVATAR = 'user/createUserAvatar'
const UPDATE_USER_AVATAR = 'user/updateUserAvatar'


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

const createUserAvatar = (user) => ({
    type: CREATE_USER_AVATAR,
    payload: user
})

const updateUserAvatar = (user) => ({
    type: CREATE_USER_AVATAR,
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

export const thunkCreateUserAvatar = (payload) => async (dispatch) => {
    const response = await fetch('api/users/avatar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const avatar = await response.json()
        dispatch(createUserAvatar(avatar))
    }
}

export const thunkUpdateUserAvatar = (payload) => async (dispatch) => {
    const response = await fetch('api/users/avatar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const avatar = await response.json()
        dispatch(updateUserAvatar(avatar))
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
            return action.payload
        }
        case CREATE_USER_AVATAR: {
            return action.payload
        }
        case UPDATE_USER_AVATAR: {
            return action.payload
        }

        case REMOVE_USER_INFO:
            return {}

        default:
            return state;
    }
}

export default userReducer
