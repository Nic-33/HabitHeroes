import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
    thunkCreateHabits,
    thunkUpdateHabits,
    removeHabits,
} from "../../redux/habits";
import ".EditHabitForm.css";

function EditHabitForm({ habit, edit = true }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const [title, setTitle] = useState(habit.title);
    const [description, setDescription] = useState(habit.description);
    const [difficulty, setDifficulty] = useState(habit.difficulty);
    const [frequency, setFrequency] = useState(habit.frequency);
    const [pos, setPos] = useState(habit.pos);
    const [neg, setNeg] = useState(habit.neg);
    const [pos_count, setPos_count] = useState(habit.pos_count);
    const [neg_count, setNeg_count] = useState(habit.neg_count);
    const [advance, setAdvance] = useState(false);
    const [errs, setErrs] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};

        if (!title.length) {
            errors.title = "Title cannot be empty";
            setErrs(errors);
            return;
        }

        if (edit) {
            dispatch(thunkUpdateHabits(habit.id, data));
        } else {
            dispatch(thunkCreateHabits(data));
        }
        closeModal();
    };

    return (
        <div className="habit-edit-ctn">
            <div className="habit-title-and-btn">
                {edit ? <div>Edit Habit</div> : <div>Create Habit</div>}

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
                        <label>Notes</label>
                        <textarea
                            className="edit-form-top-input"
                            type="text"
                            value={description}
                            placeholder="Add notes"
                            onChange={(e) => setTitle(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="edit-form-bottom">
                    <div className="edit-habit-plus-and-minus">
                        <div className="habit-btn-ctn">
                            <button 
                                className={`pos-neg-habit-btn ${pos ? 'selected' : null }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPos(!pos)
                                }}
                                >
                                    <i className="fa-solid fa-plus"></i>
                            </button>
                            <div>Positive</div>
                        </div>

                        <div className="habit-btn-ctn">
                            <button 
                                className={`pos-neg-habit-btn ${neg ? 'selected' : null }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPos(!neg)
                                }}
                                >
                                    <i className="fa-solid fa-minus"></i>
                            </button>
                            <div>Negative</div>
                        </div>



                        
                    </div>
                    
                </div>
            </form>
        </div>
    );
}
