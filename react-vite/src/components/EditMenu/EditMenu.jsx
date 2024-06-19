import { thunkDeleteHabits } from '../../redux/habits'
import { thunkDeleteTodos } from '../../redux/todos'
import { thunkDeleteDailies } from '../../redux/dailies'
import { useDispatch, useSelector, useStore } from 'react-redux'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import EditTodoForm from '../TodoFormModal/TodoForm'
import EditUserForm from '../EditUserFormModal/EditUserForm.jsx';
import EditDailyForm from '../DailyFormModal/DailyForm.jsx'
import { useNavigate } from 'react-router-dom';
import EditHabitForm from '../EditHabitForm/EditHabitForm.jsx'
import { thunkDeleteUser } from '../../redux/session.js';
import { useState } from 'react';



const EditMenu = ({ type, id }) => {
    const navigate = useNavigate()
    let modalComp
    const dispatch = useDispatch()
    const [state, setState] = useState()
    const session = useSelector((state) => state.session)


    const handleDeleteClick = async () => {
        if (type === 'Habit') await dispatch(thunkDeleteHabits(id))
        if (type === 'Daily') await dispatch(thunkDeleteDailies(id))
        if (type === 'Todo') await dispatch(thunkDeleteTodos(id))
        if (type === 'user') {
            await dispatch(thunkDeleteUser())
        }
        navigate('/landing')

    }
    if (type === 'Habit') modalComp = <EditHabitForm props={id} />
    // // if (type === 'Daily') modalComp = <EditDailiesForm props={id}/>



    if (type === 'Daily') modalComp = <EditDailyForm props={id} />



    if (type === 'Todo') modalComp = <EditTodoForm props={id} />

    if (type === 'user') modalComp = <EditUserForm />


    return (
        // <div className='task_option_menu_container'>
        <ul className='task_option_menu'>
            <li><OpenModalMenuItem
                itemText="Edit"
                modalComponent={modalComp}
            /></li>
            <li><button onClick={() => handleDeleteClick()}>Delete</button></li>
        </ul>
        /* </div> */
    )
}

export default EditMenu;
