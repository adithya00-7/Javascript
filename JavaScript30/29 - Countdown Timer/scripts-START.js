
let countdown;
const timedisplay=document.querySelector('.display__time-left');
const endtime=document.querySelector('.display__end-time');
const buttons=document.querySelectorAll('[data-time]');

function timer(seconds){
    const now=Date.now();
    const then = now+ seconds*1000;
    display(seconds);
    beback(then);


countdown=setInterval(()=>{
    const timeleft= Math.round((then-Date.now())/1000);
    if(timeleft<0){
        clearInterval(countdown);
        return;
    }
    display(timeleft);
},1000)
}

function display(seconds){
    const minutes=Math.floor(seconds/60);
    const remainderseconds=seconds%60;
    const display=`${minutes}:${remainderseconds<10? '0':''}${remainderseconds}`;
    timedisplay.textContent=display;
    document.title=display;
}

function beback(timestamp){
    const end=new Date(timestamp);
    const hours=end.getHours();
    const minutes=end.getMinutes();
    endtime.textContent=`Be back at ${hours>12?hours-12:hours}:${minutes<10? '0':''}${minutes}`;

}


function handler(){
    clearInterval(countdown);
    const sec=this.dataset.time;
    timer(sec);
}
buttons.forEach(button=>{
    button.addEventListener('click',handler);
})

document.customForm.addEventListener('submit',function(e){
    clearInterval(countdown);
    e.preventDefault()
    const mins=this.minutes.value;
    timer(mins*60);
    this.reset();

})