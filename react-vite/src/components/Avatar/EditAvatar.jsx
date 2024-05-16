import { useState, useEffect } from "react"
import { AvatarData } from "./AvatarData"
import './Avatar.css'
import { useDispatch, useSelector } from "react-redux"
import { thunkUpdateAvatar, thunkGetAvatar } from "../../redux/avatars"

const EditAvatar = ({ edit }) => {



    const dispatch = useDispatch()

    const avatarSlice = useSelector(state => state.avatar)
    console.table(avatarSlice)

    const [seed, setSeed] = useState(0)
    const [eyes, setEyes] = useState(0)
    const [mouth, setMouth] = useState(0)

    useEffect(() => {
        if (!avatarSlice['eyes']){
             dispatch(thunkGetAvatar())
             console.log("getting avatar")
        }
    }, [dispatch])


    const updateAvatar = () => {
        const obj = { seed, eyes, mouth }
        dispatch(thunkUpdateAvatar(obj))
    }

    const selectColor = (num) => {
        let index = seed + num
        if (index < 0) {
            index = AvatarData.seed.length - 1
        }
        if (index >= AvatarData.seed.length) {
            index = 0;
        }
        setSeed(index)
        console.log("color:", index)
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
        console.log("eyes:", index)
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
        console.log("mouth:", index)
        return
    }
    return (
        <div>

            <img className="avatar"
                src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${AvatarData.seed[seed]}&eyes=${AvatarData.eyes[eyes]}&mouth=${AvatarData.mouth[mouth]}`}
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
                <h2>Save</h2>
                <button onClick={() => updateAvatar()}>save </button>
            </> : null
            }
        </div>
    )
}
export default EditAvatar
