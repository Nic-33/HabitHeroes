import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetUserInfo } from "../../redux/user";
import EditMenu from "../EditMenu/EditMenu.jsx";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import OpenModalButton from "../OpenModalButton/OpenModalButton.jsx";
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

                    <div id="about"> <span style={{fontWeight:800}}>About Me:</span> {userSlice.about}</div>

                    <div id="details-time" className="details-indiv">
                        <div className="member-word">Member Since:</div>
                        <div className="date">
                            {getDate(userSlice.created_at)}
                        </div>
                    </div>

                    <div className="edit-avatar">
                        {/* <button
                            className="edit-avatar-button"
                            onClick={() => setShowDropMenu(!showDropMenu)}
                        >
                            <div>My Avatar</div>
                            <svg
                                className="option_icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 128 512"
                            >
                                <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                            </svg>
                        </button> */}
                        <div className="edit-avatar-menu">
                            <OpenModalMenuItem
                                itemText="Edit Profile"
                                modalComponent={<EditUserForm />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
