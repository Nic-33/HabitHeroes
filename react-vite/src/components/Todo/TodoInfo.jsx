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
            {/* <input type="checkbox" className="select_box" checked={todoSlice[info_id].completed} onChange={(e) => completeTodo(e)}>

            </input> */}
            {todoSlice[info_id].completed ?

                <svg onClick={(e) => completeTodo(e)} className="checkbox_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>
                : <svg onClick={(e) => completeTodo(e)} className="checkbox_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg>
            }
        </div>
        {todo && <div className="item_content">
            <div className="item_details">
                <div>
                    <p>{todo.title} </p>
                    <p>{todo.description}</p>
                </div>
                <div className="options_button">
                    <button className="options_button" onClick={() => setShowDropMenu(!showDropMenu)}>
                    <svg className="option_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
                    {/* <svg onClick={(e) => completeTodo(e)} className="checkbox_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg> */}
                    </button>
                    {showDropMenu ? <EditMenu type='Todo' id={info_id} /> : null}
                </div>

            </div>
            <p>{todo.due_date} </p>
        </div>
        }
    </div>
}

export default TodoInfo
