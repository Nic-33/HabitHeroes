import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal.jsx";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import "./LandingPage.css";


function LandingPage() {
  const sessionUser = useSelector((state) => state.session.user);


  if (sessionUser) return <Navigate to="/" replace={true} />;


  return (
    <>
        <h1>landing page</h1>
        <OpenModalMenuItem
                itemText="Log In"
                modalComponent={<LoginFormModal />}
              />
        <OpenModalMenuItem
                itemText="Sign up"
                modalComponent={<SignupFormModal />}
              />
    </>
  )
}

export default LandingPage
