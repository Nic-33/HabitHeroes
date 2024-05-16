
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { thunkGetUserInfo } from "../../redux/user"
import Avatar from "../Avatar/Avatar"



const UserInfo = () => {
    const dispatch = useDispatch()
    const userSlice = useSelector(state => state.user)


    useEffect(() => {
        dispatch(thunkGetUserInfo());
    }, [dispatch])

    return <div className="userinfo_container">
        < Avatar />
        <div id="userInfo">{userSlice.first_name} {userSlice.last_name} ({userSlice.username})</div>
    </div>

}

export default UserInfo
