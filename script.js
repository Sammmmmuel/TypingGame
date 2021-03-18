const testWrapper = document.querySelector('.text-wrapper')
const testArea = document.querySelector('#textArea')
const originText = document.querySelector('.text').innerHTML
const resetButton = document.querySelector('#reset')
const theTimer = document.querySelector('.timer')


// new code 

const typingDiv = document.getElementById('typing')
const text = originText
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
        const wpm = wps * 60.0
        document.getElementById('stats').innerText = `wpm = ${wpm}`
        document.removeEventListener("keydown", keyListener)
        return
    }
    cursorCharacter.classList.add('cursor')

})

// new code 



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
    let originTextMatch = originText.substring(0, textEntered.length)

    if (textEntered == originText) {
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
resetButton.addEventListener('click', reset, false)