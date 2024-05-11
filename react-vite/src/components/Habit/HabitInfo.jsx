
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import EditMenu from "../EditMenu/EditMenu"

const HabitInfo = ({ info_id }) => {

    const habitSlice = useSelector(state => state.habits)
    const [habit, setHabit] = useState(habitSlice[info_id])

    useEffect(() => {
        setHabit(habitSlice[info_id])
    }, [habitSlice, info_id])
    return <div>
        <button type="button" >
            +
        </button>
        {habit && <div>
            <p>{habit.title} </p>
            <p>{habit.description}</p>
            <p>{habit.pos_count} </p>
            <p>{habit.neg_count} </p>
            <div> 
                <button>b</button>
                <EditMenu />
            </div>
           
        </div>
        }
        <button>
            -
        </button>
    </div>
}

export default HabitInfo
