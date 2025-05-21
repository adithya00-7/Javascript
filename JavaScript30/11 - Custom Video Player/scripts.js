const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function toggleplay(){
    if(video.paused){
        video.play();

    }
    else{
        video.pause();
    }

}

function updatebutton(){
    const icon=this.paused ? '►' : '❚❚';
    toggle.textContent=icon;
}
function skip(){
    video.currentTime=video.currentTime+parseFloat(this.dataset.skip);
}
function handlerange(){
    video[this.name] = this.value;
    
}
function handleProgress(){
    const perc=(video.currentTime)/(video.duration)*100;
    progressBar.style.flexBasis=`${perc}%`;
}
function seek(e){
    const seektime=(e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime=seektime;

}

video.addEventListener('click',toggleplay);
video.addEventListener('play',updatebutton);
video.addEventListener('pause',updatebutton);
toggle.addEventListener('click',toggleplay);
video.addEventListener('timeupdate',handleProgress);
skipButtons.forEach(button=>{
    button.addEventListener('click',skip);
});
ranges.forEach(range=>{
    range.addEventListener('change',handlerange);
})
let mousedown=false;
progress.addEventListener('click',seek);
progress.addEventListener('mousemove', (e) => mousedown && seek(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


const fullscreenButton = player.querySelector('.fullscreen');

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        player.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

fullscreenButton.addEventListener('click', toggleFullScreen);

