import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
// import HabitInfo from '../components/Habit/HabitInfo';
import HabitSection from '../components/Habit/HabitSection';
// import TodoSection from '../components/Todo/TodoSection';
// import DailySection from '../components/Daily/DailySection';
import LandingPage from '../components/LandingPage';
import MainPage from '../components/MainPage/MainPage';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        // element: <Layout />
        element: <MainPage />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: 'landing',
        // element: <Layout />
        element: <LandingPage />
      },
      {
        path:'test',
        element:<HabitSection />
      }

    ],
  },
]);
