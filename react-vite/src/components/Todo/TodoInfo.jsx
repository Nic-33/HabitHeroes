import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import EditMenu from "../EditMenu/EditMenu"

const TodoInfo = ({ info_id }) => {

    const todoSlice = useSelector(state => state.todos)
    const [todo, setTodo] = useState(todoSlice[info_id])
    const showDropMenu = false;

    useEffect(() => {
        setTodo(todoSlice[info_id])
    }, [todoSlice, info_id])
    return <div className="item_section">
        <input type="checkbox" >
        </input>
        {todo && <div className="item_content">
            <div className="item_details">
                <div>
                    <p>{todo.title} </p>
                    <p>{todo.description}</p>
                </div>
                <div className="options_button">
                    <button>b</button>
                    {showDropMenu ? <EditMenu /> : null}
                </div>

            </div>
            <p>{todo.due_date} </p>
        </div>
        }
    </div>
}

export default TodoInfo
