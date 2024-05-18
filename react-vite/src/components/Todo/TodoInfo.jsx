import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import EditMenu from "../EditMenu/EditMenu"
import { thunkCompleteTodo } from "../../redux/todos"

const TodoInfo = ({ info_id }) => {


    const dispatch = useDispatch()

    const todoSlice = useSelector(state => state.todos)
    const [todo, setTodo] = useState(todoSlice[info_id])
    const [showDropMenu, setShowDropMenu] = useState(false)

    useEffect(() => {
        setTodo(todoSlice[info_id])
    }, [todoSlice, info_id])

    const completeTodo = async (e) => {
        dispatch(thunkCompleteTodo(info_id))
    }

    return <div className="item_section hoverable">
        <div className="checkbox_container">
        <input type="checkbox" className="select_box" checked={todoSlice[info_id].completed} onChange={(e) => completeTodo(e)}>
        </input>
        </div>
        {todo && <div className="item_content">
            <div className="item_details">
                <div>
                    <p>{todo.title} </p>
                    <p>{todo.description}</p>
                </div>
                <div className="options_button">
                    <button onClick={() => setShowDropMenu(!showDropMenu)}>b</button>
                    {showDropMenu ? <EditMenu type='Todo' id={info_id} /> : null}
                </div>

            </div>
            <p>{todo.due_date} </p>
        </div>
        }
    </div>
}

export default TodoInfo
