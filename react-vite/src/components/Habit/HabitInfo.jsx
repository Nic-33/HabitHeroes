
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import EditMenu from "../EditMenu/EditMenu"
import { thunkIncrementHabitPos, thunkIncrementHabitNeg } from "../../redux/habits"

const HabitInfo = ({ info_id }) => {

    const dispatch = useDispatch()

    const habitSlice = useSelector(state => state.habits)
    const [habit, setHabit] = useState(habitSlice[info_id])
    const [showDropMenu, setShowDropMenu] = useState(false)

    const incrementPos = () => {
        dispatch(thunkIncrementHabitPos(info_id))
    }
    const incrementNeg = () => {
        dispatch(thunkIncrementHabitNeg(info_id))
    }

    useEffect(() => {
        setHabit(habitSlice[info_id])
    }, [habitSlice, info_id])


    return <div className="item_section hoverable">
        <button className="border_false" type="button" onClick={() => incrementPos(info_id)}>
            <svg className="pos_neg_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
        </button>
        {habit && <div className="item_content">
            <div className="item_details">
                <div>
                    <p>{habit.title} </p>
                    <p>{habit.description}</p>
                </ div>
                <div className="options_button">
                    <button className="options_button" onClick={() => setShowDropMenu(!showDropMenu)}>
                    <svg className="option_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>
                    </button>
                    {showDropMenu ? <EditMenu type='Habit' id={info_id} /> : null}
                </div>
            </div>
            <div className="streak_display">
                <p>+{habit.pos_count} </p>
                <p>|</p>
                <p>-{habit.neg_count} </p>
            </ div>
        </div>
        }
        <button className="border_false" onClick={() => incrementNeg(info_id)}>
            <svg className="pos_neg_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" /></svg>
        </button>
    </div>
}

export default HabitInfo
