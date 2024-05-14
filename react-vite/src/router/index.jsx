import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
// import HabitInfo from '../components/Habit/HabitInfo';
import HabitSection from '../components/Habit/HabitSection';
<<<<<<< HEAD
// import TodoSection from '../components/Todo/TodoSection';
// import DailySection from '../components/Daily/DailySection';
=======
import TodoSection from '../components/Todo/TodoSection';
import DailySection from '../components/Daily/DailySection';
>>>>>>> 61594d71473aad1964b242cd276a5c34fa147326
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
        // element: <div>
        // <h1>Hello World!</h1>
        // <HabitSection />
        // <DailySection />
        // <TodoSection  />
        // </div>
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
