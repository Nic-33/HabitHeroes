import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
    thunkCreateHabits,
    thunkUpdateHabits,
    thunkDeleteHabits,
} from "../../redux/habits";
import "./EditHabitForm.css";

function EditHabitForm(props, edit = true) {
    const habit_Id = props.props
    console.log('habit id:', habit_Id)
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    let allHabits = useSelector((state) => state.habits)
    allHabits = Object.values(allHabits)
    const habit = allHabits.filter(info => info.id == habit_Id).pop()
    console.log('habit:', habit)
    const [title, setTitle] = useState(habit.title);
    const [description, setDescription] = useState(habit.description);
    const [difficulty, setDifficulty] = useState(habit.difficulty);
    // const [frequency, setFrequency] = useState(habit.frequency);
    const [pos, setPos] = useState(habit.pos);
    const [neg, setNeg] = useState(habit.neg);
    const [pos_count, setPosCount] = useState(habit.pos_count);
    const [neg_count, setNegCount] = useState(habit.neg_count);
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
            // frequency,
            pos_count,
            neg_count,
            pos,
            neg
        }

        if (edit) {
            await dispatch(thunkUpdateHabits(data, habit_Id));
        } else {
            await dispatch(thunkCreateHabits(data));
        }
        closeModal();
    };

    return (
        <div className="habit-edit-ctn">
            <div className="habit-title-and-btn">
                <div>Edit Habit</div>

                <div>
                    <button className="habit-edit cancel" onClick={closeModal}>
                        Cancel
                    </button>

                    <button
                        className="habit-edit save"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Save
                    </button>
                </div>
            </div>

            <form className="edit-habit-form" onSubmit={handleSubmit}>
                <div className="edit-form-top">
                    <div className="edit-form-input">
                        <label>Title</label>
                        <input
                            className="edit-form-top-input"
                            type="text"
                            value={title}
                            placeholder="Add a title..."
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errs.title}
                    </div>

                    <div className="habit-edit-input-ctn">
                        <label>Description</label>
                        <textarea
                            className="edit-form-top-input"
                            type="text"
                            value={description}
                            placeholder="Add notes"
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="edit-form-bottom">
                    <div className="edit-habit-plus-and-minus">
                        <div className="habit-btn-ctn">
                            <button
                                className={`pos-neg-habit-btn ${pos ? "selected" : null
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPos(!pos);
                                }}
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                            <div>Positive</div>
                        </div>

                        <div className="habit-btn-ctn">
                            <button
                                className={`pos-neg-habit-btn ${neg ? "selected" : null
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setNeg(!neg);
                                }}
                            >
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <div>Negative</div>
                        </div>
                    </div>

                    <div className="edit-habit-select-ctn">
                        <label>Difficulty</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value="1">Trivial</option>
                            <option value="2">Easy</option>
                            <option value="3">Medium</option>
                            <option value="4">Hard</option>
                        </select>
                    </div>

                    {/* Future Implementation */}
                    {/* <div className="edit-habit-select-ctn">
                    <label>Tags</label>
                    <select>
                        <option>Need</option>
                        <option>To</option>
                        <option>Query</option>
                        <option>Tags</option>
                    </select>
                </div> */}

                    {/* <div className="edit-habit-select-ctn">
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

            {/* <div className="edit-habit-del">
                {edit && (
                    <button
                        className="edit-habit-del-btn"
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

export default EditHabitForm
