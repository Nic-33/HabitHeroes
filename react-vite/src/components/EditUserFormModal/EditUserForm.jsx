import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkUpdateUserInfo, thunkUpdateUserAvatar } from "../../redux/user";
import { thunkUpdateAvatar } from "../../redux/avatars";
import { AvatarData } from "../Avatar/AvatarData";

import "./EditUserForm.css";

const EditUserForm = () => {
    const parseQueryValues = (route) => {
        const obj = {}
        const seedIndex = route.indexOf("seed=")
        const eyesIndex = route.indexOf("eyes=")
        const mouthIndex = route.indexOf("mouth=")
        const seed = route.slice(seedIndex + 5, (eyesIndex - 1))
        const eyes = route.slice(eyesIndex + 5, (mouthIndex - 1))
        const mouth = route.slice(mouthIndex + 6)
        obj["seed"] = seed
        obj["eyes"] = eyes
        obj["mouth"] = mouth
        return obj
    }

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const avatarValues = parseQueryValues(user.avatar_url)
    const [loaded, setLoaded] = useState(false)
    const [about, setAbout] = useState(user.about)
    const [username, setUserName] = useState(user.username)
    const [seed, setSeed] = useState(0)
    const [eyes, setEyes] = useState(0)
    const [mouth, setMouth] = useState(0)
    const { closeModal } = useModal();
    console.table(avatar)
    const updateAbout = (e) => setAbout(e.target.value)
    const updateUserName = (e) => setUserName(e.target.value)

    const createAvatarRoute = (seed, eyes, mouth) => {
        let route = 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=%seed%&eyes=%eyes%&mouth=%mouth%'
        route = route.replace('%seed%', seed)
        route = route.replace('%eyes%', eyes)
        route = route.replace('%mouth%', mouth)
        return route
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const newUrl = createAvatarRoute(seed, eyes, mouth)
        const updateUser = {
            username,
            about,
            newUrl
        }
        console.log('UpdateUser!!!!!!!', updateUser)
        await dispatch(thunkUpdateUserInfo(updateUser))
        closeModal()
    }




    const selectColor = (num) => {
        let index = seed + num
        if (index < 0) {
            index = AvatarData.seed.length - 1
        }
        if (index >= AvatarData.seed.length) {
            index = 0;
        }
        index = parseInt(index)
        setSeed(index)
        console.log("color:", index)

    }

    const selectEyes = (num) => {
        let index = eyes + num
        if (index < 0) {
            index = AvatarData.eyes.length - 1
        }
        if (index >= AvatarData.eyes.length) {
            index = 0;
        }
        index = parseInt(index)
        setEyes(index)
        console.log("eyes:", index)

    }

    const selectMouth = (num) => {
        let index = mouth + num
        if (index < 0) {
            index = AvatarData.mouth.length - 1
        }
        if (index >= AvatarData.mouth.length) {
            index = 0;
        }
        index = parseInt(index)
        setMouth(index)
        console.log("mouth:", index)
    }
    console.log(user)
    return (
        <>
            <div>
                <img className="avatar"
                    src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${AvatarData.seed[seed]}&eyes=${AvatarData.eyes[eyes]}&mouth=${AvatarData.mouth[mouth]}`}
                    alt="avatar" />
                <h2>Color</h2>
                <button onClick={() => selectColor(-1)}>- </button>
                <button onClick={() => selectColor(1)}> +</button>
                <h2>Eyes</h2>
                <button onClick={() => selectEyes(-1)}>- </button>
                <button onClick={() => selectEyes(1)}> +</button>
                <h2>Mouth</h2>
                <button onClick={() => selectMouth(-1)}>- </button>
                <button onClick={() => selectMouth(1)}> +</button>
                <h2>User name</h2>
                <form className="UpdateUserForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={updateUserName} />
                    <h2>About</h2>
                    <textarea
                        type="text"
                        placeholder="About"
                        value={about}
                        onChange={updateAbout} />
                    <h2>Save</h2>
                    <button type="submit">save </button>
                </form>
            </div>
        </>
    )
}

export default EditUserForm
