import { thunkDeleteHabits } from '../../redux/habits'
import { thunkDeleteTodos } from '../../redux/todos'
import { thunkDeleteDailies } from '../../redux/dailies'
import { useDispatch } from 'react-redux'


const EditMenu = ({ type, id }) => {

    const dispatch = useDispatch()

    const handleDeleteClick = () => {
        if (type === 'Habit') dispatch(thunkDeleteHabits(id))
        if (type === 'Daily') dispatch(thunkDeleteDailies(id))
        if (type === 'Todo') dispatch(thunkDeleteTodos(id))
    }

    return (
        <ul>
            <li><button>Edit</button></li>
            <li><button onClick={() => handleDeleteClick()}>Delete</button></li>
        </ul>
    )
}

export default EditMenu;
