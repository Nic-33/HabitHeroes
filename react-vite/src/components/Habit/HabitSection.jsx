import HabitInfo from "./HabitInfo"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetHabits } from "../../redux/habits"
import { useEffect, useState } from "react"


const HabitSection = () => {
    const dispatch = useDispatch()
    const habitSlice = useSelector(state => state.habits)
    // const [keys,setKeys] = useState(Object.keys(habitSlice));

    useEffect(() => {
        dispatch(thunkGetHabits());
        // setKeys(Object.keys(habitSlice))
    }, [dispatch])
    return <div>
        <h2>Habits</h2>
        <div>
            <input type="text" placeholder="Add a habit"></input>
            {Object.keys(habitSlice).map(element => {
                return (<div key={element}> <HabitInfo info_id={element} /></div>)
            })}
        </div>

    </div>

}
export default HabitSection
