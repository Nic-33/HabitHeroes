
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { thunkGetUserInfo } from "../../redux/user"
import EditMenu from "../EditMenu/EditMenu.jsx";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import EditUserForm from "../EditUserFormModal/EditUserForm.jsx";

// import Avatar from "../Avatar/Avatar"
import Avatar from "../Avatar/Avatar.jsx";




const UserInfo = () => {
    const dispatch = useDispatch()
    const userSlice = useSelector(state => state.user)
    const [showDropMenu, setShowDropMenu] = useState(false)


    useEffect(() => {
        dispatch(thunkGetUserInfo());
    }, [dispatch])

    return <div className="userinfo_container">
        <img className="avatar" src={userSlice.avatar_url} ></img>
        <div id="userInfo">{userSlice.first_name} {userSlice.last_name} ({userSlice.username})</div>
        <div id="about">About: {userSlice.about}</div>
        <div className="options_button">
            <button className="options_button" onClick={() => setShowDropMenu(!showDropMenu)}>
                <svg className="option_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>
            </button>
            {showDropMenu ? <EditMenu type='user' /> : null}
        </div>

    </div>

}

export default UserInfo
