import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkUpdateUserInfo } from "../../redux/user";
import { thunkUpdateAvatar } from "../../redux/avatars";
import { AvatarData } from "../Avatar/AvatarData";
import "./EditUserForm.css";

const EditUserForm = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const avatar = useSelector((state) => state.avatar)
    const [loaded, setLoaded] = useState(false)
    const [about, setAbout] = useState(user.about)
    const [username, setUserName] = useState(user.username)
    const [seed, setSeed] = useState(avatar.seed)
    const [eyes, setEyes] = useState(avatar.eyes)
    const [mouth, setMouth] = useState(avatar.mouth)
    const { closeModal } = useModal();
    console.table(avatarSlice)
    const updateAbout = (e) => setAbout(e.target.value)
    const updateUserName = (e) => setUserName(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateUser = {
            username,
            about
        }
        console.log('UpdateUser!!!!!!!', updateUser)
        const obj = { seed, eyes, mouth }
        await dispatch(thunkUpdateAvatar(obj))
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
