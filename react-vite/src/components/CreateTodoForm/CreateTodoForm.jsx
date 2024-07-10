import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateTodos } from "../../redux/todos";
// import './TodoForm.css'

const CreateTodoForm = () => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState();
    const [difficulty, setDifficulty] = useState(1);
    const [title, setTitle] = useState();
    // const [dueDate, setDueDate] = useState(todo.due_date)
    const [descriptionError, setDescriptionError] = useState("hidden");
    const { closeModal } = useModal();

    // const updateDescription = (e) => setDescription(e.target.value);
    // const updateDifficulty = (e) => setDifficulty(e.target.value);
    // const updateTitle = (e) => setTitle(e.target.value);
    // const updateDueDate = (e) => setDueDate(e.target.value);

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
        const newTodo= {
            title: title,
            description: description,
            difficulty: difficulty,

        };

        // check if there are errors before dispatching
        if (!Object.values(issues).length) {
            await dispatch(thunkCreateTodos(newTodo));
            closeModal();
        }
    };

    return (
        <div className="daily-create-ctn">
            <form className="create-daily-habit-form" onSubmit={handleSubmit}>
                {/* this div covers the top section to give it its styling */}
                <div className="daily-create-form-top">
                    <div className="create-daily-title-and-btns">
                        {/* Title */}
                        <div><p className="create-daily-p">Create To Do</p></div>

                        {/* Buttons */}
                        <div className="create-daily-btn-save-cancel">
                            <button
                                className="daily-create cancel"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={(e) => {
                                    handleSubmit(e);
                                }}
                                className="daily-create save"
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    <div className="daily-create-input-ctn">
                        {/* This div is for the title input */}
                        <label>Title</label>

                        <input
                            type="text"
                            value={title}
                            placeholder="Add a title"
                            className="daily-create-form-top-input"
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <div className="errors">{errors?.title}</div>
                    </div>

                    <div className="daily-create-input-ctn">
                        {/* This div is for the description input */}
                        <label>Notes</label>

                        <textarea
                            placeholder="Add notes"
                            className="daily-create-form-top-input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <div className="errors">{errors?.description}</div>
                    </div>

                    {/* End of top of form */}
                </div>

                <div className="daily-create-form-bottom">
                    {/* This is where checklist input will go in the future */}

                    <div className="create-daily-select-ctn">
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
    );
};

export default CreateTodoForm;
