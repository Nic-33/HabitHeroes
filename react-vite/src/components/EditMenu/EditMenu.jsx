import { thunkDeleteHabits } from '../../redux/habits'
import { thunkDeleteTodos } from '../../redux/todos'
import { thunkDeleteDailies } from '../../redux/dailies'
import { useDispatch } from 'react-redux'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import EditTodoForm from '../TodoFormModal/TodoForm'



const EditMenu = ({ type, id }) => {
    let modalComp
    const dispatch = useDispatch()

    const handleDeleteClick = () => {
        if (type === 'Habit') dispatch(thunkDeleteHabits(id))
        if (type === 'Daily') dispatch(thunkDeleteDailies(id))
        if (type === 'Todo') dispatch(thunkDeleteTodos(id))
    }
    // if (type === 'Habit') modalComp = <EditHabitsForm props={id}/>
    // if (type === 'Daily') modalComp = <EditDailiesForm props={id}/>
    if (type === 'Todo') modalComp = <EditTodoForm props={id} />

    return (
        <ul>
            <li><OpenModalMenuItem
                itemText="edit"
                modalComponent={modalComp}
            /></li>
            <li><button onClick={() => handleDeleteClick()}>Delete</button></li>
        </ul>
    )
}

export default EditMenu;
