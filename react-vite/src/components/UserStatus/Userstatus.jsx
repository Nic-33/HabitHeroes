
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { thunkGetUserInfo } from "../../redux/user"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import EditUserForm from "../EditUserFormModal/EditUserForm.jsx";



const UserInfo = () => {
    const dispatch = useDispatch()
    const userSlice = useSelector(state => state.user)


    useEffect(() => {
        dispatch(thunkGetUserInfo());
    }, [dispatch])

    return <div className="userinfo_container">
        <img className="avatar" src={userSlice.avatar_url} ></img>
        <div id="userInfo">{userSlice.first_name} {userSlice.last_name} ({userSlice.username})</div>
        <div id="about">About: {userSlice.about}</div>
        <OpenModalMenuItem
            itemText="edit"
            modalComponent={<EditUserForm />}
        />
    </div>

}

export default UserInfo
