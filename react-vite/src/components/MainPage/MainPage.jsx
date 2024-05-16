import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import HabitSection from '../Habit/HabitSection';
import TodoSection from '../Todo/TodoSection';
import DailySection from '../Daily/DailySection';
import UserInfo from "../UserStatus/Userstatus";
import './MainPage.css'
import Avatar from "../Avatar/Avatar";
import EditAvatar from "../Avatar/EditAvatar";


const MainPage = () => {

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Navigate to="/landing" replace={true} />;

    return <div>
<<<<<<< HEAD
        <h1>Hello {sessionUser.username}</h1>
        <Avatar />
        <div className="task_sections">
            <HabitSection />
            <DailySection />
            <TodoSection />
=======
        <div className="Main_page_Container">
            <div className="user_info_bar"><UserInfo /></div>
            {/* <Avatar />
            <EditAvatar edit={true}/> */}
            <div className="task_sections">
                <HabitSection />
                <DailySection />
                <TodoSection />
            </div>
>>>>>>> e5438bb2beb63e4a09b639dfc5397f7b5019789f
        </div>
    </div>
}

export default MainPage
