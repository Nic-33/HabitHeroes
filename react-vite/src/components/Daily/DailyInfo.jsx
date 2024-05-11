
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import EditMenu from "../EditMenu/EditMenu"

const DailyInfo = ({ info_id }) => {

    const dailySlice = useSelector(state => state.dailies)
    const [daily, setDaily] = useState(dailySlice[info_id])

    useEffect(() => {
        setDaily(dailySlice[info_id])
    }, [dailySlice, info_id])
    return <div>
        <input type="checkbox" >
        </input>
        {daily && <div>
            <p>{daily.title} </p>
            <p>{daily.description}</p>
            <p>{daily.streak}</p>
            <div>
            <button>b</button>
            <EditMenu />
            </div>
        </div>
        }
    </div>
}

export default DailyInfo
