import count from "./js/count"
import sum from "./js/sum"
console.log('count', count)
console.log('sum', sum)
// import "./js/iconfont"
// 引入样式资源
import "./css/index.css"
import "./css/index-less.less"
import "./css/index-sass.sass"
import "./css/index-stylus.styl"
import "./css/iconfont.css"
import videos from "./music/video.mp4"
// import p from "./music/Pickup.mp3"
// import mav from "./music/tips.wav"
const video = document.createElement('video')
video.src = videos
video.controls = true
video.style.display = 'block'
video.style.width = '300px'
document.body.appendChild(video)