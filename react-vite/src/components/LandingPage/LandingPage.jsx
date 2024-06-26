import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal.jsx";
import OpenModalMenuItem from "./OpenModalMenuItem.jsx";
import "./LandingPage.css";


function LandingPage() {
  const sessionUser = useSelector((state) => state.session.user);


  if (sessionUser) return <Navigate to="/" replace={true} />;


  return (
    <>
      <div className="landingPage">
        <div id='landing_page_container'>
          <div id='left'>
            <div id='upper_left_side'>
              <h3>Welcome To</h3>
            </div>
            <div id='middle'>
              <h1> HabitHeroes</h1>
            </div>
            <div id='lower_left_side'>
              <h3>Your Journey Starts Now</h3>
            </div>
          </div>
          <div id='right'>
            <div id='upper_right_side'>
              <OpenModalMenuItem
                itemText="Join us"
                modalComponent={<SignupFormModal />} />
            </div>
            <div id="lower_right_side">
              <OpenModalMenuItem
                itemText="Welcome Back"
                modalComponent={<LoginFormModal />} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
