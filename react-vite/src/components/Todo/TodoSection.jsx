import TodoInfo from "./TodoInfo"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetTodos } from "../../redux/todos"
import { useEffect } from "react"

const TodoSection = () => {
    const dispatch = useDispatch()
    const todoSlice = useSelector(state => state.todos)
    useEffect(() => {
        dispatch(thunkGetTodos());
    }, [dispatch])
    return <div>
        <h2>To Do&apos;s</h2>
        <div className="section">
            <input type="text" placeholder="Add a todo"></input>
            {Object.keys(todoSlice).map(element => {
                return (<div key={element}> <TodoInfo info_id={element} /></div>)
            })}
        </div>
    </div>
}

export default TodoSection
