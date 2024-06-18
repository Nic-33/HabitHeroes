import { useEffect, useState } from "react"
import { AvatarData } from "./AvatarData"
import './Avatar.css'
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAvatar } from "../../redux/avatars"


const Avatar = ({ edit }) => {


    const dispatch = useDispatch()

    const avatarSlice = useSelector(state => state.user.avatar_url)



    const [seed, setSeed] = useState(0)
    const [eyes, setEyes] = useState(0)
    const [mouth, setMouth] = useState(0)

    // const initializeAvatar = () => {
    //     setSeed(avatarSlice["seed"])
    //     setEyes(avatarSlice["eyes"])
    //     setMouth(avatarSlice["mouth"])
    // }

    useEffect(() => {
        if (!avatarSlice['eyes']) {
            dispatch(thunkGetAvatar())

        }
    }, [dispatch])

    const selectColor = (num) => {
        let index = seed + num
        if (index < 0) {
            index = AvatarData.seed.length - 1
        }
        if (index >= AvatarData.seed.length) {
            index = 0;
        }
        setSeed(index)

        return
    }

    const selectEyes = (num) => {
        let index = eyes + num
        if (index < 0) {
            index = AvatarData.eyes.length - 1
        }
        if (index >= AvatarData.eyes.length) {
            index = 0;
        }
        setEyes(index)

        return
    }

    const selectMouth = (num) => {
        let index = mouth + num
        if (index < 0) {
            index = AvatarData.mouth.length - 1
        }
        if (index >= AvatarData.mouth.length) {
            index = 0;
        }
        setMouth(index)

        return
    }

    const createAvatarRoute = (seed, eyes, mouth) => {
        let route = 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=%seed%&eyes=%eyes%&mouth=%mouth%'
        route = route.replace('%seed%', seed)
        route = route.replace('%eyes%', eyes)
        route = route.replace('%seed%', mouth)
        return route
    }

    const parseQueryValues = (route) => {
        const obj = {}
        const seedIndex = route.indexOf("seed=")
        const eyesIndex = route.indexOf("eyes=")
        const mouthIndex = route.indexOf("mouth=")
        const seed = route.slice(seedIndex + 5, (eyesIndex - seedIndex - 5))
        const eyes = route.slice(eyesIndex + 5, (moutIndex - eyesIndex - 5))
        const mouth = route.slice(mouthIndex + 5)
        obj["seed"] = seed
        obj["eyes"] = eyes
        obj["mouth"] = mouth
        return obj
    }

    const mapQueryValuesToIndex = () => {

    }

    return (
        <div>
            <img className="avatar"
                src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${AvatarData.seed[avatarSlice["seed"]]}&eyes=${AvatarData.eyes[avatarSlice["eyes"]]}&mouth=${AvatarData.mouth[avatarSlice["mouth"]]}`}
                alt="avatar" />

            {edit ? <>
                <h2>Color</h2>
                <button onClick={() => selectColor(-1)}>- </button>
                <button onClick={() => selectColor(1)}> +</button>
                <h2>Eyes</h2>
                <button onClick={() => selectEyes(-1)}>- </button>
                <button onClick={() => selectEyes(1)}> +</button>
                <h2>Mouth</h2>
                <button onClick={() => selectMouth(-1)}>- </button>
                <button onClick={() => selectMouth(1)}> +</button>
            </> : null
            }
        </div>
    )
}
export default Avatar
