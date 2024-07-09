import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function ProfileButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        closeMenu();
    };

    return (
        <>
            {/* 
          <button className="menu" style={{ cursor: "pointer" }} onClick={toggleMenu}>
            <FaUserCircle /> */}

            {!user ||
                (user?.message === "user: null" && (
                    <div className="rightNavButtons">
                        <OpenModalButton
                            buttonText="Log In"
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalButton
                            buttonText="Sign Up"
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                ))}
            <div>
                {user?.user_image_url ? (
                    <img className="profileAvatar" src={user.user_image_url} />
                ) : (
                    <i className="fa-regular fa-user" onClick={toggleMenu} />
                )}
            </div>

            {showMenu && (
                <ul className={"profile-dropdown"} ref={ulRef}>
                    {user || user?.message !== "user: null" ? (
                        <>
                            <div style={{ color: "black", fontSize: 24 }}>
                                {user.username}
                            </div>
                            <div style={{ color: "black", fontSize: 24 }}>
                                {user.email}
                            </div>
                            <>
                                <button
                                    className="login-signup-button"
                                    onClick={logout}
                                >
                                    Log Out
                                </button>
                            </>
                        </>
                    ) : (
                        <>
                            <OpenModalMenuItem
                                className="login-signup-button"
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                className="login-signup-button"
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </>
                    )}
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
