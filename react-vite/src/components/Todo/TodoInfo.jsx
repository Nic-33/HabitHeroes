import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import EditMenu from "../EditMenu/EditMenu"

const TodoInfo = ({ info_id }) => {

    const todoSlice = useSelector(state => state.todos)
    const [todo, setTodo] = useState(todoSlice[info_id])

    useEffect(() => {
        setTodo(todoSlice[info_id])
    }, [todoSlice, info_id])
    return <div>
        <input type="checkbox" >
        </input>
        {todo && <div>
            <p>{todo.title} </p>
            <p>{todo.description}</p>
            <p>{todo.due_date} </p>
            <div>
                <button>b</button>
                <EditMenu />
            </div>
        </div>
        }
    </div>
}

export default TodoInfo
