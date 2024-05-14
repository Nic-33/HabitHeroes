import DailyInfo from "./DailyInfo"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetDailies,thunkCreateDailies } from "../../redux/dailies"
import { useEffect, useState } from "react"
import './DailySection.css'

const DailySection = () => {
    const dispatch = useDispatch()
    const dailySlice = useSelector(state => state.dailies)
    const [dailyInput, setDailyInput] = useState('');

    const handleDailyInput = (e) => {
        setDailyInput(e)
    }

    const handleKeyPressEnter = async (e) => {
        if (e.key === 'Enter') {

            const title = dailyInput.slice()
            const description = 'this is a place hold the description'
            const difficulty = 1
            const frequency = '0'
            const today = new Date(Date.now());
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const date_to_reset = tomorrow.toDateString()
            const obj = { title, description, difficulty, frequency, date_to_reset }
            await dispatch(thunkCreateDailies(obj))
            // dailySlice[8] = obj
            console.log(dailySlice)
            setDailyInput('');
        }
    }

    useEffect(() => {
        dispatch(thunkGetDailies());
    }, [dispatch])

    return <div>
        <h2>Dailies</h2>
        <div className="section">
            <input type="text" value={dailyInput} placeholder="Add a daily" onChange={(e) => handleDailyInput(e.target.value)} onKeyUpCapture={(e) => handleKeyPressEnter(e)}></input>
            <div>
                {Object.keys(dailySlice).map(element => {
                    return (<div key={element}> <DailyInfo info_id={element} /></div>)
                })}
            </div>
        </div>
    </div>
}

export default DailySection
