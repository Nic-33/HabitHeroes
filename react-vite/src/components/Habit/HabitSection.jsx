import HabitInfo from "./HabitInfo"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetHabits, thunkCreateHabits } from "../../redux/habits"
import { useEffect, useState } from "react"
import './HabitSection.css'

const HabitSection = () => {
    const dispatch = useDispatch()
    const habitSlice = useSelector(state => state.habits)
    const [habitInput, setHabitInput] = useState('');

    const handleHabitInput = (e) => {
        setHabitInput(e)
    }

    const handleKeyPressEnter = async (e) => {
        if (e.key === 'Enter') {

            const title = habitInput.slice()
            const description = ''
            const difficulty = 1
            const frequency = 'daily'
            const today = new Date(Date.now());
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const date_to_reset = tomorrow.toDateString()
            const obj = { title, description, difficulty, frequency, date_to_reset }
            setHabitInput('');
            // habitSlice[3] = obj
            // const payload = JSON.stringify(obj)
            await dispatch(thunkCreateHabits(obj))
            // console.log(habitSlice)
            //    console.log(await  dispatch(thunkCreateHabits(obj)))
            // dispatch(thunkCreateHabits(payload))
            // console.log(habitSlice)
        }
    }

    useEffect(() => {
        dispatch(thunkGetHabits());
    }, [dispatch])

    return <div>
        <h2>Habits</h2>
        <div className="section">
            <input type="text" value={habitInput} placeholder="Add a habit" onChange={(e) => handleHabitInput(e.target.value)} onKeyUpCapture={(e) => handleKeyPressEnter(e)}></input>
            {/* <button onClick={handleAddHabitClick}>add habit</button> */}
            <div >
                {Object.keys(habitSlice).map(element => {
                    return (<div key={element}> <HabitInfo info_id={element} /></div>)
                })}
            </div>
        </div>
    </div>

}
export default HabitSection
