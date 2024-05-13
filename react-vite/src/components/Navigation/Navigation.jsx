import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    const loggedInLinks = (
        <>
            <NavLink className="nav-links" exact to="/">Tasks</NavLink>
            <NavLink className="nav-links" exact to="/inventory">Inventory</NavLink>
            <NavLink className="nav-links" exact to="/shops">Shops</NavLink>
            <NavLink className="nav-links" exact to="/party">Party</NavLink>
            <NavLink className="nav-links" exact to="/groups">Group</NavLink>
            <NavLink className="nav-links" exact to="/challenges">Challenges</NavLink>
            <NavLink className="nav-links" exact to="/help">Help</NavLink>
        </>
    );

    const loggedOutLinks = (
        <>
            <NavLink className="nav-links" to="/">
                Get Started
            </NavLink>
            <NavLink className="nav-links" to="/">
                Mobile Apps
            </NavLink>
            <NavLink className="nav-links" to="/">
                Learn More
            </NavLink>
        </>
    );

    return (
        <nav>
            <div className="nav-bar">
                <div className="nav-links-ctn">
                    <NavLink exact to="/" className="nav-home">
                        Habitica Clone
                    </NavLink>
                    {sessionUser ? loggedInLinks : loggedOutLinks}
                    {isLoaded && <ProfileButton user={sessionUser} />}

                </div>
            </div>
        </nav>
    );
}

export default Navigation;
