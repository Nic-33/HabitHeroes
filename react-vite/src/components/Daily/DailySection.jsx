import DailyInfo from "./DailyInfo"
import { useDispatch,useSelector} from "react-redux"
import { thunkGetDailies } from "../../redux/dailies"
import { useEffect } from "react"

const DailySection = () =>{
    const dispatch = useDispatch()
    const dailySlice = useSelector(state => state.dailies)
    useEffect(()=>{
        dispatch(thunkGetDailies());
    },[dispatch])
    return <div>
        <h2>Dailies</h2>
        <div>
        <input type="text" placeholder="Add a daily"></input>
            {Object.keys(dailySlice).map(element => {
                return (<div key={element}> <DailyInfo info_id={element} /></div>)
            })}
        </div>
    </div>
}

export default DailySection
