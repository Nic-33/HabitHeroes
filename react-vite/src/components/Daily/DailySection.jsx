import DailyInfo from "./DailyInfo"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetDailies, thunkCreateDailies } from "../../redux/dailies"
import { useEffect, useState } from "react"
import './DailySection.css'
import CreateDailyForm from "../CreateDailyForm/CreateDailyForm"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"

const DailySection = () => {
    const dispatch = useDispatch()
    const dailySlice = useSelector(state => state.dailies)
    const [dailyInput, setDailyInput] = useState('');
    const [toggleCompleted, setToggleCompleted] = useState(false)
    const [showAll, setShowAll] = useState(true)

    const handleDailyInput = (e) => {
        setDailyInput(e)
    }

    const handleKeyPressEnter = async (e) => {
        if (e.key === 'Enter') {

            const title = dailyInput.slice()
            const description = 'this is a place hold the description'
            const difficulty = 1
            const repeat_days = '0123456'
            // const today = new Date(Date.now());
            // const tomorrow = new Date(today);
            // tomorrow.setDate(today.getDate() + 1);
            // const due_date = new Date(Date.now()).getTime()/1000
            //
            const obj = { title, description, difficulty, repeat_days }
            // const obj = { title, description, difficulty, repeat_days, due_date }
            await dispatch(thunkCreateDailies(obj))
            // dailySlice[8] = obj
            //
            setDailyInput('');
        }
    }



    useEffect(() => {
        dispatch(thunkGetDailies());
    }, [dispatch])

    return <div className="section_container">
        <h2>Dailies</h2>
        <div className="create_button">
            <OpenModalMenuItem
                itemText="Create New Daily"
                modalComponent={<CreateDailyForm />}
            />
        </div>
        <button className="filter_button" onClick={() => setShowAll(true)} style={{ color: showAll ? "black" : "grey" }}>Show All</button>
        <button className="filter_button" style={{ color: !showAll && !toggleCompleted ? "black" : "grey" }} onClick={() => {
            setShowAll(false)
            setToggleCompleted(false)
        }}>Not Completed</button>
        <button className="filter_button" style={{ color: !showAll && toggleCompleted ? "black" : "grey" }} onClick={() => {
            setShowAll(false)
            setToggleCompleted(true)
        }}>Completed</button>
        <div className="section">
            <input className="quick_input hoverable" type="text" value={dailyInput} placeholder="Add a daily" onChange={(e) => handleDailyInput(e.target.value)} onKeyUpCapture={(e) => handleKeyPressEnter(e)}></input>
            <div>
                {showAll ? Object.keys(dailySlice).map(element => {
                    return (<div key={element}> <DailyInfo info_id={element} /></div>)
                }) : Object.keys(dailySlice).map(element => {
                    if (dailySlice[element].completed === toggleCompleted) return (<div key={element}> <DailyInfo info_id={element} /></div>)
                })}
            </div>
        </div>
    </div>
}

export default DailySection
