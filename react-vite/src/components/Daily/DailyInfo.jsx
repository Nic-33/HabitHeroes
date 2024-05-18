
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import EditMenu from "../EditMenu/EditMenu"
import { thunkCompleteDaily } from "../../redux/dailies"

const DailyInfo = ({ info_id }) => {

    const dispatch = useDispatch()

    const dailySlice = useSelector(state => state.dailies)
    const [daily, setDaily] = useState(dailySlice[info_id])
    const [showDropMenu, setShowDropMenu] = useState(false)
   
    useEffect(() => {
        setDaily(dailySlice[info_id])
    }, [dailySlice, info_id])

    const completeDaily = async (e) => {
      
        dispatch(thunkCompleteDaily(info_id))
    }

    return <div className="item_section hoverable">
          <div className="checkbox_container">
        <input checked={dailySlice[info_id].completed} type="checkbox" className="select_box" onChange={(e) => completeDaily(e)}>
        </input>
        </div>
        {daily && <div className="item_content">
            <div className="item_details">
                <div>
                    <p>{daily.title} </p>
                    <p>{daily.description}</p>
                </div>
                <div className="options_button">
                    <button onClick={() => setShowDropMenu(!showDropMenu)}>b</button>
                    {showDropMenu ? <EditMenu type='Daily' id={info_id} /> : null}
                </div>
            </div>
            <div className="streak_display">
                <p>{daily.streak}</p>
            </div>
        </div>
        }
    </div>
}

export default DailyInfo
