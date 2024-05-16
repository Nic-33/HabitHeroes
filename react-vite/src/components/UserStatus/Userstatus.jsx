
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { thunkGetUserInfo } from "../../redux/user"


const UserInfo = () => {
    const dispatch = useDispatch()
    const userSlice = useSelector(state => state.user)

    useEffect(() => {
        dispatch(thunkGetUserInfo());
    }, [dispatch])

    return <div className="userinfo_container">
        <img id="profile_avatar" src={userSlice.avatar_url} alt='profile_avatar' />
        <div id="userInfo">{userSlice.first_name} {userSlice.last_name} ({userSlice.username})</div>
    </div>

}

export default UserInfo
