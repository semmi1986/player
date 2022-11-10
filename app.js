const audioPlay = document.querySelector('#audio__play'),
      playButton = document.querySelector('.play__button'),
      muteButton = document.querySelector('.mute__button'),
      durationTime= document.querySelector('.current__duration'),
      currentTime= document.querySelector('.current__time'),
      progresBar = document.querySelector('.progres__bar')
      defaultBar = document.querySelector('.default__bar')

let barSize = 640

const playOrPayse = () => {
  if (!audioPlay.paused && !audioPlay.ensed) {
    audioPlay.pause();
    playButton.style.backgroundImage = 'url(./audio/play.png)'
    window.clearInterval(updateTime);
  }
  else{
    audioPlay.play()
    playButton.style.backgroundImage = 'url(./audio/pause.png)';
    updateTime = setInterval(update, 500);
  }
}

const muteOrspeaker = () => {
  if (audioPlay.muted === true) {
    audioPlay.muted = false
    muteButton.style.backgroundImage = 'url(./audio/speaker.png)';
  }else{
    audioPlay.muted = true
    muteButton.style.backgroundImage = 'url(./audio/mute.png)';
  }
}
audioPlay.onloadeddata = () => {
  let minutes= parseInt(audioPlay.duration/60);
  let seconds= parseInt(audioPlay.duration%60);
  durationTime.innerHTML = `${minutes}:${seconds}`;
}

const update = () => {
  if(!audioPlay.ended){
    let playerMinute = parseInt(audioPlay.currentTime/60);
    let playerSecond = parseInt(audioPlay.currentTime%60);
    currentTime.innerHTML = `${playerMinute}:${playerSecond}`;
    
    let size = parseInt(audioPlay.currentTime*barSize/audioPlay.duration)
    progresBar.style.width = `${size}px`

  }else{
    currentTime.innerHTML = `0:00`;
    playButton.style.backgroundImage = 'url(./audio/play.png)';
    progresBar.style.width = `0px`;
    window.clearInterval(updateTime);
  }
}

const clickedBar= (e) => {
  if (!audioPlay.ended) {
    let moveX = e.pageX - defaultBar.offsetLeft;
    console.log(defaultBar.offsetLeft);
    let newTime = moveX*audioPlay.duration/barSize;
    audioPlay.currentTime = newTime;
    progresBar.style.width = `${moveX}px`;

  }
}



playButton.addEventListener('click',playOrPayse,false);
muteButton.addEventListener('click', muteOrspeaker,false);
defaultBar.addEventListener('click', clickedBar,false);
