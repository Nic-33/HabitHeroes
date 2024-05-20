import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkCreateHabits } from "../../redux/habits";
import "./CreateHabitForm.css";

function CreateHabitForm(create = true) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [difficulty, setDifficulty] = useState(1);
    const [pos, setPos] = useState();
    const [neg, setNeg] = useState();
    const [pos_count, setPosCount] = useState(0);
    const [neg_count, setNegCount] = useState(0);
    const [advanced, setAdvanced] = useState(false);
    const [errs, setErrs] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!title.length) {
            errors.title = "Title cannot be empty";
            setErrs(errors);
            return;
        }

        const data = {
            title,
            description,
            difficulty,
            pos_count,
            neg_count,
            pos,
            neg,
        };

        if (create) {
            await dispatch(thunkCreateHabits(data));
        } else {
        }
        closeModal();
    };

    return (
        <div className="habit-create-ctn">
            <form className="create-habit-form" onSubmit={handleSubmit}>
                <div className="create-form-top">
                    <div className="habit-title-and-btn">
                        <div><p className="create-habit-p">Create Habit</p></div>

                        <div className="btn-save-cancel">
                            <button
                                className="habit-create cancel"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>

                            <button
                                className="habit-create save"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="create-form-input">
                        <label>Title*</label>
                        <input
                            className="create-form-top-input"
                            type="text"
                            value={title}
                            placeholder="Add a title..."
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errs.title}
                    </div>

                    <div className="habit-create-input-ctn">
                        <label>Notes</label>
                        <textarea
                            className="create-form-top-input"
                            type="text"
                            value={description}
                            placeholder="Add notes"
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="create-form-bottom">
                    <div className="create-habit-plus-and-minus">
                        <div className="habit-btn-ctn">
                            <button
                                className={`create-pos-neg-habit-btn ${
                                    pos ? "selected" : null
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPos(!pos);
                                }}
                            > +
                                <i className="fa-solid fa-plus"></i>
                            </button>
                            <div>Positive</div>
                        </div>

                        <div className="habit-btn-ctn">
                            <button
                                className={`create-pos-neg-habit-btn ${
                                    neg ? "selected" : null
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setNeg(!neg);
                                }}
                            > -
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <div>Negative</div>
                        </div>
                    </div>

                    <div className="create-habit-select-ctn">
                        <label>Difficulty</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value={1}>Trivial</option>
                            <option value={2}>Easy</option>
                            <option value={3}>Medium</option>
                            <option value={4}>Hard</option>
                        </select>
                    </div>

                    {/* Future Implementation */}
                    {/* <div className="create-habit-select-ctn">
                    <label>Tags</label>
                    <select>
                        <option>Need</option>
                        <option>To</option>
                        <option>Query</option>
                        <option>Tags</option>
                    </select>
                </div> */}

                    {/* <div className="create-habit-select-ctn">
                        <label>Reset Counter</label>
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div> */}

                    {/* In order to show advanced options, habit must have at leaast one trait */}
                    {(pos || neg) && (
                        <div
                            className="advanced-options-ctn"
                            onClick={() => setAdvanced(!advanced)}
                        >
                            <div className="advanced-options-chevron">
                                <div>Advanced Settings</div>
                                {advanced ? (
                                    <i className="fa-solid fa-caret-up"></i>
                                ) : (
                                    <i className="fa-solid fa-caret-down"></i>
                                )}
                            </div>
                        </div>
                    )}
                    {(pos || neg) && advanced && (
                        <div className="advanced-options-menu">
                            <label>Adjust Counter</label>
                            <div className="advanced-counters">
                                {pos && (
                                    <div>
                                        <i className="fa-regular fa-square-plus"></i>
                                        <input
                                            type="number"
                                            value={pos_count}
                                            min={0}
                                            onChange={(e) =>
                                                setPosCount(e.target.value)
                                            }
                                        />
                                    </div>
                                )}
                                {neg && (
                                    <div>
                                        <i className="fa-regular fa-square-minus"></i>
                                        <input
                                            type="number"
                                            value={neg_count}
                                            min={0}
                                            onChange={(e) =>
                                                setNegCount(e.target.value)
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </form>

            {/* <div className="create-habit-del">
                {create && (
                    <button
                        className="create-habit-del-btn"
                        onClick={() => {
                            if (
                                window.confirm(
                                    "Are you sure you want to delete this habit?"
                                )
                            ) {
                                dispatch(thunkDeleteHabits(habit.id));
                                closeModal();
                            }
                        }}
                    >
                        <i className="fa-solid fa-trash-can"></i>
                        Delete This Habit
                    </button>
                )}
            </div> */}
        </div>
    );
}

export default CreateHabitForm;
