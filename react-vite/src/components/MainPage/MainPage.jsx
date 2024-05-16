import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import HabitSection from '../Habit/HabitSection';
import TodoSection from '../Todo/TodoSection';
import DailySection from '../Daily/DailySection';
import './MainPage.css'
// import Avatar from "../Avatar/Avatar";
// import EditAvatar from "../Avatar/EditAvatar";


const MainPage = () => {

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Navigate to="landing" replace={true} />;

    return <div>
        <h1>Hello {sessionUser.username}</h1>
        {/* <Avatar />
        <EditAvatar edit={true}/> */}
        <div className="task_sections">
            <HabitSection />
            <DailySection />
            <TodoSection />
        </div>
    </div>
}

export default MainPage
