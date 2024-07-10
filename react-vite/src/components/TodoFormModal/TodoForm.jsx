import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkUpdateTodos } from '../../redux/todos'
// import './TodoForm.css'

const EditTodoForm = (props) => {
    const todo_Id = props.props
    const dispatch = useDispatch()
    let allTodos = useSelector((state) => state.todos)
    allTodos = Object.values(allTodos)
    const todo = allTodos.filter(info => info.id == todo_Id).pop()

    const [description, setDescription] = useState(todo.description)
    const [difficulty, setDifficulty] = useState(todo.difficulty)
    const [title, setTitle] = useState(todo.title)
    // const [dueDate, setDueDate] = useState(todo.due_date)
    const [descriptionError, setDescriptionError] = useState("hidden")
    const { closeModal } = useModal();


    const [errors, setErrors] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Build a dummy error object then set it when all the conditions are checked
        const issues = {};
        if (!title.length) {
            issues.title = "Title is required";
        }
        if (title && (title.length < 3 || title.length > 50)) {
            issues.title = "Title must be between 3 and 50 characters";
        }
        if (Object.values(issues).length) {
            setErrors(issues);
            return;
        } else {
            setErrors({});
        }

        // build a daily object with all the information gathered from the form. +streak ensures streak is an integer
        const updateTodo = {
            title: title,
            description: description,
            difficulty: difficulty,
            repeat_days: "0123",
            // repeats_frame,
            // repeats_frequency,
            // streak: +streak,
        };

        // check if there are errors before dispatching
        if (!Object.values(issues).length) {
            await dispatch(thunkUpdateTodos(updateTodo, todo_Id));
            closeModal();
        }
    };

    return (
        <div className="daily-edit-ctn">
        <form className="edit-daily-habit-form" onSubmit={handleSubmit}>
            {/* this div covers the top section to give it its styling */}
            <div className="daily-edit-form-top">
                <div className="edit-daily-title-and-btns">
                    {/* Title */}
                    <div>
                        <p className="edit-daily-p">Edit To Do</p>
                    </div>

                    {/* Buttons */}
                    <div className="edit-daily-btn-save-cancel">
                        <button
                            className="daily-edit cancel"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={(e) => {
                                handleSubmit(e);
                            }}
                            className="daily-edit save"
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className="daily-edit-input-ctn">
                    {/* This div is for the title input */}
                    <label>Title</label>

                    <input
                        type="text"
                        value={title}
                        placeholder="Add a title"
                        className="daily-edit-form-top-input"
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div className="errors">{errors?.title}</div>
                </div>

                <div className="daily-edit-input-ctn">
                    {/* This div is for the description input */}
                    <label>Notes</label>

                    <textarea
                        placeholder="Add notes"
                        className="daily-edit-form-top-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="errors">{errors?.description}</div>
                </div>

                {/* End of top of form */}
            </div>

            <div className="daily-edit-form-bottom">
                {/* This is where checklist input will go in the future */}

                <div className="edit-daily-select-ctn">
                    {/* Difficulty selector div */}
                    <label id="gap">Difficulty</label>

                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value={1}>Trivial</option>
                        <option value={2}>Easy</option>
                        <option value={3}>Medium</option>
                        <option value={4}>Hard</option>
                    </select>

                    <div className="errors">{errors?.difficulty}</div>
                </div>

            </div>
        </form>

    </div>
    )
}

export default EditTodoForm
