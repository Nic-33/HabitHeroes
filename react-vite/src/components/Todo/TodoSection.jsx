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
    const [toggleCompleted, setToggleCompleted] = useState(false)
    const [showAll, setShowAll] = useState(true)

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
        <button className="filter_button" style={{ color: showAll ? "black" : "grey" }} onClick={() => setShowAll(true)}>Show All</button>
        <button className="filter_button" style={{ color: !showAll && !toggleCompleted  ? "black" : "grey" }} onClick={() => {
            setToggleCompleted(false)
            setShowAll(false)
        }}>Not Completed</button>
        <button className="filter_button" style={{ color: !showAll && toggleCompleted  ? "black" : "grey" }} onClick={() => {
            setToggleCompleted(false)
            setToggleCompleted(true)
        }}>Completed</button>
        <span className="create_button"> <OpenModalMenuItem
            itemText="Create New To Do's"
            modalComponent={<CreateTodoForm />}
        /></span>
        <div className="section">
            <input className="quick_input hoverable" type="text" value={todoInput} placeholder="Add a todo" onChange={(e) => handleTodoInput(e.target.value)} onKeyUpCapture={(e) => handleKeyPressEnter(e)}></input>
            {showAll ? Object.keys(todoSlice).map(element => {
                return (<div key={element}> <TodoInfo info_id={element} /></div>)
            }) : Object.keys(todoSlice).map(element => {
                if (todoSlice[element].completed === toggleCompleted) return (<div key={element}> <TodoInfo info_id={element} /></div>)
            })}
        </div>
    </div>
}

export default TodoSection
