import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "../../images/habitHeroes.png";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const user = useSelector((state) => state.session.user);
    let comingSoon = () => alert("Feature coming soon");

    const loggedInLinks = (
        <>
            <NavLink className="nav-links" exact to="/">
                Tasks
            </NavLink>
            <NavLink className="nav-links" onClick={comingSoon}>
                Inventory
            </NavLink>
            <NavLink className="nav-links" onClick={comingSoon}>
                Shops
            </NavLink>
            <NavLink className="nav-links" onClick={comingSoon}>
                Party
            </NavLink>
            <NavLink className="nav-links" onClick={comingSoon}>
                Group
            </NavLink>
            <NavLink className="nav-links" onClick={comingSoon}>
                Challenges
            </NavLink>
            <NavLink className="nav-links" onClick={comingSoon}>
                Help
            </NavLink>
        </>
    );

    const loggedOutLinks = (
        <>
            <NavLink className="nav-links" onClick={comingSoon}>
                Get Started
            </NavLink>
            <NavLink className="nav-links" onClick={comingSoon}>
                Mobile Apps
            </NavLink>
            <NavLink className="nav-links" onClick={comingSoon}>
                Learn More
            </NavLink>
        </>
    );

    return (
        <nav className="header">
            <div className="nav-bar">
                <div className="nav-links-ctn">
                    <NavLink exact to="/" className="nav-home">
                        <img id="logo" src={logo} alt="home" />
                    </NavLink>
                    {user ? loggedInLinks : loggedOutLinks}
                </div>

                <div className="profile-button">
                    {!user || user?.message === "user: null" ? (
                        <>
                            <div className="rightNavButtons">
                                <OpenModalButton
                                    buttonText="Log In"
                                    modalComponent={<LoginFormModal />}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <ProfileButton />
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
