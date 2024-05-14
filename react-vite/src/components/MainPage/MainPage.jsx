import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import HabitSection from '../Habit/HabitSection';
import TodoSection from '../Todo/TodoSection';
import DailySection from '../Daily/DailySection';
import './MainPage.css'


const MainPage = () => {

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Navigate to="landing" replace={true} />;

    return <div>
<<<<<<< HEAD
        <h1>Hello World!</h1>
        <div className="task_sections">
            <HabitSection />
            <DailySection />
            <TodoSection />
        </div>

=======
    <h1>Hello World!</h1>
    <HabitSection />
    <DailySection />
    <TodoSection  />
>>>>>>> 61594d71473aad1964b242cd276a5c34fa147326
    </div>
}

export default MainPage
