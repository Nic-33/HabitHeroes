
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { thunkGetUserInfo } from "../../redux/user"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import EditUserForm from "../EditUserFormModal/EditUserForm.jsx";
<<<<<<< HEAD
<<<<<<< HEAD
// import Avatar from "../Avatar/Avatar"
import Avatar from "../Avatar/Avatar.jsx";
=======
>>>>>>> ea58ddb0d717e388de806789c72a4b0daab09ba8
=======
import Avatar from "../Avatar/Avatar.jsx"
>>>>>>> ed1ec09d1fd9b11d6a895944004e5f71cabdd045



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
