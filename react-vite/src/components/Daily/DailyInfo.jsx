
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import EditMenu from "../EditMenu/EditMenu"

const DailyInfo = ({ info_id }) => {

    const dailySlice = useSelector(state => state.dailies)
    const [daily, setDaily] = useState(dailySlice[info_id])
    const [showDropMenu,setShowDropMenu] = useState(false)

    useEffect(() => {
        setDaily(dailySlice[info_id])
    }, [dailySlice, info_id])
    return <div className="item_section">
        <input type="checkbox" >
        </input>
        {daily && <div className="item_content">
            <div className="item_details">
                <div>
                    <p>{daily.title} </p>
                    <p>{daily.description}</p>
                </div>
                <div className="options_button">
                    <button onClick={()=>setShowDropMenu(!showDropMenu)}>b</button>
                   {showDropMenu ? <EditMenu /> : null}
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
