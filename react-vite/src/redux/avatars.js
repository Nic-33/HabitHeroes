const GET_AVATAR = 'avatar/getAvatar'
const UPDATE_AVATAR = 'avatar/updateAvatar'

const getAvatar = (avatar) => ({
    type: GET_AVATAR,
    payload: avatar
})

const updateAvatar = (avatar) => ({
    type: UPDATE_AVATAR,
    payload: avatar
})


export const thunkGetAvatar = () => async (dispatch) => {
    console.log('thunkGetAvatar running')
    const response = await fetch(`/api/users/avatars`);
    console.log('response:', response)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            console.log('Errors!!!!!!:', data.errors)
            return;
        }
        console.log('No Errors!!!!!')
        dispatch(getAvatar(data));
    }
}

export const thunkUpdateAvatar = (payload) => async (dispatch) => {
    const response = await fetch(`/api/avatars`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(updateAvatar(data));
    }
}

const initialState = {}
// let obj = {}

function avatarReducer(state = initialState, action) {
    switch (action.type) {
        case GET_AVATAR: {
            return { ...action.payload }
        }
        case UPDATE_AVATAR: {
            return { ...action.payload }
        }
        default:
            return { ...state }
    }
}


export default avatarReducer;
