import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateTodos } from '../../redux/todos'
// import './TodoForm.css'

const CreateTodoForm = () => {
    const dispatch = useDispatch()
    const [description, setDescription] = useState()
    const [difficulty, setDifficulty] = useState(1)
    const [title, setTitle] = useState()
    // const [dueDate, setDueDate] = useState(todo.due_date)
    const [descriptionError, setDescriptionError] = useState("hidden")
    const { closeModal } = useModal();


    const updateDescription = (e) => setDescription(e.target.value)
    const updateDifficulty = (e) => setDifficulty(e.target.value)
    const updateTitle = (e) => setTitle(e.target.value)
    const updateDueDate = (e) => setDueDate(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let updateTodo = {
            title,
            description,
            difficulty,
            // dueDate,
        }

        let error = true
        setDescriptionError("hidden")


        // if (description.length < 1) {
        //     setDescriptionError('visible')
        //     error = false
        // }


        if (error) {
            const serverResponse1 = await dispatch(thunkCreateTodos(updateTodo))

            closeModal()
        }

    }

    return (
        <>
            <form className="updateTodoForm" onSubmit={handleSubmit}>
                <div id='updateTodo'>Update Todo</div>
                <div id='title'>Title</div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={updateTitle} />
                <div>Difficulty</div>
                <select name="difficultySelector">
                    <option value={1} onChange={updateDifficulty}>1</option>
                    <option value={2} onChange={updateDifficulty}>2</option>
                    <option value={3} onChange={updateDifficulty}>3</option>
                    <option value={4} onChange={updateDifficulty}>4</option>
                    <option value={5} onChange={updateDifficulty}>5</option>
                </select>
                {/* <div id='dueDate'>Due Date</div>
            <input
                type="text"
                placeholder="Due Date"
                value={dueDate}
                onChange={updateDueDate} /> */}
                <div id='description'>Description</div>
                <div className="error" style={{ visibility: descriptionError }}>Description needs a minimum of 30 characters</div>
                <textarea
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={updateDescription} />
                <div id="submitButton">
                    <button type="submit">Update Todo</button>
                </div>
            </form>
            <div id="CancelButton">
                <button onClick={closeModal}>Cancel</button>
            </div>
        </>
    )
}

export default CreateTodoForm
