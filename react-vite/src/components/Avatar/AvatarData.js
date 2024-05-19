export const AvatarData = {
    'seed': ['Socks', 'Mimi', 'Scooter', 'Cookie', 'Jack'],
    'eyes': ['closed', 'closed2', 'crying', 'cute', 'glasses', 'love', 'pissed', 'plain', 'sad', 'shades', 'sleepClose', 'stars', 'tearDrop', 'wink', 'wink2'],
    'mouth': ['cute', 'drip', 'faceMask', 'kissHeart', 'lilSmile', 'pissed', 'plain', 'sad', 'shout', 'shy', 'sick', 'smileLol', 'smileTeeth', 'tongueOut', 'wideSmile'],

    seedIndex: (data, seed) => {
        for (let i = 0; i < data.seed.length; i++)
            if (data.seed[i].toLowerCase() === seed.toLowerCase()) {
                console.log(i)
                return i
            }
    },

    eyesIndex: (data, eyes) => {
        for (let i = 0; i < data.eyes.length; i++)
            if (data.eyes[i] === eyes)
                return i
    },

    mouthIndex: (data, mouth) => {
        for (let i = 0; i < data.mouth.length; i++)
            if (data.mouth[i] === mouth)
                return i
    },
}
