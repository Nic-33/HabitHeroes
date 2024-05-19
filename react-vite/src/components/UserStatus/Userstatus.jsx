
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { thunkGetUserInfo } from "../../redux/user"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import EditUserForm from "../EditUserFormModal/EditUserForm.jsx";
// import Avatar from "../Avatar/Avatar"
import Avatar from "../Avatar/Avatar.jsx";



const UserInfo = () => {
    const dispatch = useDispatch()
    const userSlice = useSelector(state => state.user)


    useEffect(() => {
        dispatch(thunkGetUserInfo());
    }, [dispatch])

    return <div className="userinfo_container">
        < Avatar />
        <div id="userInfo">{userSlice.first_name} {userSlice.last_name} ({userSlice.username})</div>
        <div id="about">About: {userSlice.about}</div>
        <OpenModalMenuItem
            itemText="edit"
            modalComponent={<EditUserForm />}
        />
    </div>

}

export default UserInfo
