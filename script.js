const testWrapper = document.querySelector('.text-wrapper')
const testArea = document.querySelector('#textArea')
const originText = document.querySelector('.text').innerHTML
const resetButton = document.querySelector('#reset')
const theTimer = document.querySelector('.timer')

const lyrics = [
    `Somebody once told me the world is gonna roll me I ain't the sharpest tool in the shed`,
    `My milkshake brings all the boys to the yard And they're like, it's better than yours Damn right it's better than yours`,
    `I walk a lonely road The only one that I have ever known Don't know where it goes But it's home to me, and I walk alone`,
    `No, I don't want no scrub A scrub is a guy that can't get no love from me Hangin' out the passenger side of his best friend's ride Tryin' to holla at me`,
    `I been tryin' to do it right I been livin' a lonely life I been sleepin' here instead I been sleepin' in my bed I been sleepin' in my bed`,
    `Stacy's mom has got it goin' on She's all I want And I've waited for so long Stacy, can't you see? You're just not the girl for me`,
    `Woah, we're half way there Woah, livin' on a prayer Take my hand, we'll make it I swear Woah, livin' on a prayer`,
    `You would not believe your eyes If ten million fireflies Lit up the world as I fell asleep`,
    `I'm hooked on a feeling I'm high on believing That you're in love with me`,
    `If you like piña coladas And gettin' caught in the rain If you're not into yoga If you have half a brain If you like makin' love at midnight`,
    `Lean on me When you're not strong And I'll be your friend I'll help you carry on... For it won't be long Till I'm gonna need somebody to lean on`,
    `Take me to your best friend's house Roll around this roundabout Oh yeah Take me to your best friend's house`,
    `Someone told me long ago There's a calm before the storm I know, it's been comin' for some time When it's over, so they say It'll rain a sunny day`,
    `Hey baby, won't you look my way? I can be your new addiction Hey baby, what you gotta say? All you're giving me is fiction`,
    `Hey, soul sister Ain't that Mr. Mister on the radio, stereo The way you move ain't fair, you know`,
    `Hey there, Delilah What's it like in New York city? I'm a thousand miles away But, girl, tonight you look so pretty Yes, you do`,
    `I was scared of dentists and the dark I was scared of pretty girls and starting conversations Oh, all my friends are turning green`,
    `Well, you done done me and you bet I felt it I tried to be chill, but you're so hot that I melted I fell right through the cracks Now I'm trying to get back`,
    `Big wheels keep on turnin' Carry me home to see my kin Singin' songs about the south-land I miss Alabamy once again and I think it's a sin, yes`,
    `Sweet Caroline Good times never seemed so good I've been inclined To believe they never would But now I`,
    `Uh, summa-lumma, dooma-lumma, you assumin' I'm a human What I gotta do to get it through to you I'm superhuman?`,

]


const typingDiv = document.getElementById('typing')
const text = lyrics[parseInt(Math.random() * lyrics.length)]
    // typingDiv.innerText = text
let cursorIndex = 0
const characters = text.split('').map((char) => {
    const span = document.createElement('span')
    span.innerText = char
    typingDiv.appendChild(span)
    return span
})

let cursorCharacter = characters[cursorIndex]
cursorCharacter.classList.add('cursor')

let startTime = null
let endTime = null

const keyListener = document.addEventListener('keydown', ({ key }) => {
    if (!startTime) {
        startTime = new Date()
    }
    if (key === cursorCharacter.innerText) {
        cursorCharacter.classList.remove('cursor')
        cursorCharacter.classList.add('done');
        cursorCharacter = characters[++cursorIndex]
    }
    if (cursorIndex >= characters.length) {
        endTime = new Date()
        const delta = endTime - startTime
        const seconds = delta / 1000
        const numberOfWords = text.split(" ").length
        const wps = numberOfWords / seconds
        const wpm = Math.round(wps * 60.0)
        document.getElementById('stats').innerText = `wpm = ${wpm}`
        document.removeEventListener("keydown", keyListener)
        return
    }
    cursorCharacter.classList.add('cursor')
})

let timer = [0, 0, 0, 0]
let interval
let timerRunning = false

function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time
    }
    return time
}

function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2])
    theTimer.innerHTML = currentTime
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60)
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60))
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000))
}

function reset() {
    clearInterval(interval)
    interval = null
    timer = [0, 0, 0, 0]
    timerRunning = false

    testArea.value = ""
    theTimer.innerHTML = "00:00:00"
    testWrapper.style.borderColor = "green"
}

function spellCheck() {
    let textEntered = testArea.value
    let originTextMatch = text.substring(0, textEntered.length)

    if (textEntered == text) {
        testWrapper.style.borderColor = 'orange';
        clearInterval(interval)
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = 'green';
        } else {
            testWrapper.style.borderColor = 'red';
        }
    }
}

function start() {
    let textEnteredLength = testArea.value.length
    if (textEnteredLength === 0) {
        timerRunning = true
        interval = setInterval(runTimer, 10)
    }
}

testArea.addEventListener('keypress', start, false)
testArea.addEventListener('keyup', spellCheck, false)
    // resetButton.addEventListener('click', reset, false)