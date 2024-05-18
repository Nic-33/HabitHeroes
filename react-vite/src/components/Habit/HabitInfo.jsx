
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
        <button type="button" onClick={() => incrementPos(info_id)}>
            +
        </button>
        {habit && <div className="item_content">
            <div className="item_details">
                <div>
                    <p>{habit.title} </p>
                    <p>{habit.description}</p>
                </ div>
                <div className="options_button">
                    <button onClick={() => setShowDropMenu(!showDropMenu)}>b</button>
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
        <button onClick={() => incrementNeg(info_id)}>
            -
        </button>
    </div>
}

export default HabitInfo
