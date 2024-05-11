import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
// import HabitInfo from '../components/Habit/HabitInfo';
import HabitSection from '../components/Habit/HabitSection';
import TodoSection from '../components/Todo/TodoSection';
import DailySection from '../components/Daily/DailySection';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div>
          <h1>Hello World!</h1>
          <HabitSection />
          <DailySection />
          <TodoSection  />
          </div>
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
