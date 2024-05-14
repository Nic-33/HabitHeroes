
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import EditMenu from "../EditMenu/EditMenu"

const HabitInfo = ({ info_id }) => {

    const habitSlice = useSelector(state => state.habits)
    const [habit, setHabit] = useState(habitSlice[info_id])
    const [showDropMenu,setShowDropMenu] = useState(false)

    
    useEffect(() => {
        setHabit(habitSlice[info_id])
    }, [habitSlice, info_id])
    return <div className="item_section">
        <button type="button" >
            +
        </button>
        {habit && <div className="item_content">
            <div className="item_details">
                <div>
                    <p>{habit.title} </p>
                    <p>{habit.description}</p>
                </ div>
                <div className="options_button">
                    <button onClick={()=>setShowDropMenu(!showDropMenu)}>b</button>
                    {showDropMenu ? <EditMenu /> : null}
                </div>
            </div>
            <div className="streak_display">
                <p>{habit.pos_count} </p>
                <p>{habit.neg_count} </p>
            </ div>
        </div>
        }
        <button>
            -
        </button>
    </div>
}

export default HabitInfo
