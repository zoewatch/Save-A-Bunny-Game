let screens = document.querySelectorAll('.screen');
let choose_bunny_btns = document.querySelectorAll('.choose-bunny-btn');
let start_btn = document.getElementById('start-btn')
let game_container = document.getElementById('game-container')
let timeEl = document.getElementById('time')
let scoreEl = document.getElementById('score')
let message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_bunny = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_bunny_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        let img = btn.querySelector('img')
        let src = img.getAttribute('src')
        let alt = img.getAttribute('alt')
        selected_bunny = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createbunny, 1000)
        startGame()
    })
})



function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createbunny() {
    let bunny = document.createElement('div')
    bunny.classList.add('bunny')
    let { x, y } = getRandomLocation()
    bunny.style.top = `${y}px`
    bunny.style.left = `${x}px`
    bunny.innerHTML = `<img src="${selected_bunny.src}" alt="${selected_bunny.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    bunny.addEventListener('click', catchbunny)

    game_container.appendChild(bunny)
}

function getRandomLocation() {
    let width = window.innerWidth
    let height = window.innerHeight
    let x = Math.random() * (width - 200) + 100
    let y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchbunny() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addbunnys()
}

function addbunnys() {
    setTimeout(createbunny, 1000)
    setTimeout(createbunny, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    if(score > 25) {
      message.classList.remove('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}
