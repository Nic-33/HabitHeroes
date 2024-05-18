import TodoInfo from "./TodoInfo"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetTodos, thunkCreateTodos } from "../../redux/todos"
import { useEffect, useState } from "react"
import CreateTodoForm from "../CreateTodoForm/CreateTodoForm"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";

const TodoSection = () => {
    const dispatch = useDispatch()
    const todoSlice = useSelector(state => state.todos)
    const [todoInput, setTodoInput] = useState('');

    const handleTodoInput = (e) => {
        setTodoInput(e)
    }

    const handleKeyPressEnter = async (e) => {
        if (e.key === 'Enter') {
            const title = todoInput.slice()
            const description = 'desc'
            const difficulty = 1
            const due_date = new Date(Date.now());
            const obj = { title, description, difficulty, due_date }

            await dispatch(thunkCreateTodos(obj))
        }
    }

    useEffect(() => {
        dispatch(thunkGetTodos());
    }, [dispatch])
    return <div className="section_container">
        <h2>To Do&apos;s</h2>
        <div className="section">
        <li><OpenModalMenuItem
                itemText="Create New To Do's"
                modalComponent={<CreateTodoForm />}
            /></li>
            <input className="quick_input hoverable" type="text" value={todoInput} placeholder="Add a todo" onChange={(e) => handleTodoInput(e.target.value)} onKeyUpCapture={(e) => handleKeyPressEnter(e)}></input>
            {Object.keys(todoSlice).map(element => {
                return (<div  key={element}> <TodoInfo info_id={element} /></div>)
            })}
        </div>
    </div>
}

export default TodoSection
