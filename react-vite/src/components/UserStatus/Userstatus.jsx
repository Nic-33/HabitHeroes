import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetUserInfo } from "../../redux/user";
import EditMenu from "../EditMenu/EditMenu.jsx";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import EditUserForm from "../EditUserFormModal/EditUserForm.jsx";
import "./Userstatus.css";

// import Avatar from "../Avatar/Avatar"
import Avatar from "../Avatar/Avatar.jsx";

const UserInfo = () => {
    const dispatch = useDispatch();
    const userSlice = useSelector((state) => state.user);
    const [showDropMenu, setShowDropMenu] = useState(false);

    useEffect(() => {
        dispatch(thunkGetUserInfo());
    }, [dispatch]);

    const getDate = (date) => {
        const newDate = new Date(date);
        const month = newDate.toLocaleString("default", { month: "short" });
        const day = newDate.getDate();
        const year = newDate.getFullYear();
        return [month, " ", day, ", ", year];
    };

    return (
        <div className="userinfo_container">
            <div className="avatar-info-container">
                <img className="avatar" src={userSlice.avatar_url}></img>
                <div className="about-info">
                    <div id="userInfo">{userSlice.username}</div>
                    <div id="about">About Me: {userSlice.about}</div>
                    <div id="details-time" className="details-indiv">
                        <h4>Member Since</h4>
                        <div>{getDate(userSlice.created_at)}</div>
                    </div>
                    <div className="options_button">
                        <button
                            className="options_button"
                            onClick={() => setShowDropMenu(!showDropMenu)}
                        >
                            <svg
                                className="option_icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 128 512"
                            >
                                <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                            </svg>
                        </button>
                        {showDropMenu ? <EditMenu type="user" /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
